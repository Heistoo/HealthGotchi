from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from fila_missoes import Missao, FilaMissoes
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))


missoes_diarias = [
    Missao(1, "Alimente o bichinho com um alimento dessa categoria: Carnes e Ovos", 1, 1, "Carnes e Ovos"),
    Missao(2, "Alimente o bichinho, pelo menos, 3 vezes no dia.", 1, 3, "refeicoes"),
    Missao(3, "Alimente o bichinho com um alimento dessa categoria: Leguminosas", 1, 1, "Leguminosas"),
    Missao(4, "Alimente o bichinho com 2 frutas.", 1, 2, "Frutas"),
    Missao(5, "Evite alimentar o bichinho com Doces, guloseimas e salgadinhos", 1, 0, "Doces, guloseimas e salgadinhos")
]


fila_missoes_diarias = FilaMissoes(missoes_diarias)

@app.route('/verificar_missao', methods=['POST'])
def verificar_missao():
    data = request.get_json()
    usuario_id = data.get('usuarioId')
    
    if not usuario_id:
        return jsonify({"error": "Dados inválidos. 'usuarioId' não fornecido."}), 400

    missao_atual = missao_atual_do_usuario(usuario_id)
    
    if missao_atual is None:
        return jsonify({"error": "Erro ao obter a missão atual do usuário."}), 401

    criterios = pegar_criterio_numero_e_tipo(missao_atual)
    
    if "error" in criterios:
        return jsonify(criterios), 402
    
    criterio_numero = criterios.get('criterio_numero')
    criterio_tipo = criterios.get('criterio_tipo')

    if not criterio_tipo or not criterio_numero:
        return jsonify({"error": "Critérios não encontrados."}), 403
    
    progresso = criterios.get('progresso')

    if criterio_tipo == "Carnes e Ovos":
        if progresso >= 1:#o criterio numero deve ser o progresso para poder saber quando acaba
            proxima_missao()
            proxima_missao_db(usuario_id)#melhorar a lógica para verificar se a missão foi completada
            return jsonify({"message": "Missão completa!"}), 200
        else:
            return jsonify({"error": "Missão não completa."}), 200
    elif criterio_tipo == "refeicoes":
        if progresso >= 3:
            proxima_missao()
            proxima_missao_db(usuario_id)
            return jsonify({"message": "Missão completa!"}), 200
        else:
            return jsonify({"error": "Missão não completa."}), 200
    elif criterio_tipo == "Leguminosas":
        if progresso >= 1:
            proxima_missao()
            proxima_missao_db(usuario_id)
            return jsonify({"message": "Missão completa!"}), 200
        else:
            return jsonify({"error": "Missão não completa."}), 200
    elif criterio_tipo == "Frutas":
        if progresso >= 2:
            proxima_missao()
            proxima_missao_db(usuario_id)
            return jsonify({"message": "Missão completa!"}), 200
        else:
            return jsonify({"error": "Missão não completa."}), 200
    elif criterio_tipo == "Doces, guloseimas e salgadinhos":
        if progresso == 0:
            proxima_missao()
            proxima_missao_db(usuario_id)
            return jsonify({"message": "Missão completa!"}), 200
        else:
            return jsonify({"error": "Missão não completa."}), 200
    else:
        return jsonify({"error": "Tipo de critério inválido."}), 400
    
@app.route('/aumentar_progresso', methods=['PUT'])
def aumentar_progresso():
    data = request.get_json()
    usuario_id = data.get('usuarioId')
    grupo = data.get('grupo')
    
    if not usuario_id:
        return jsonify({"error": "Dados inválidos. 'usuarioId' não fornecido."}), 400

    missao_atual = missao_atual_do_usuario(usuario_id)
    
    if missao_atual is None:
        return jsonify({"error": "Erro ao obter a missão atual do usuário."}), 404

    criterios = pegar_criterio_numero_e_tipo(missao_atual)
    
    if "error" in criterios:
        return jsonify(criterios), 404
    
    criterio_numero = criterios.get('criterio_numero')
    criterio_tipo = criterios.get('criterio_tipo')

    if not criterio_tipo or not criterio_numero:
        return jsonify({"error": "Critérios não encontrados."}), 404
    
    if criterio_tipo != grupo and criterio_tipo != "refeicoes":
        return jsonify({"error": "Grupo de alimento não condiz com a missão."}), 400

    if criterio_tipo == "Carnes e Ovos":
        fila_missoes_diarias.aumentar_progresso(missao_atual)
        return jsonify({"message": "Progresso aumentado com sucesso!"}), 200
    
    elif criterio_tipo == "refeicoes":
        fila_missoes_diarias.aumentar_progresso(missao_atual)
        return jsonify({"message": "Progresso aumentado com sucesso!"}), 200
    
    elif criterio_tipo == "Leguminosas":
        fila_missoes_diarias.aumentar_progresso(missao_atual)
        return jsonify({"message": "Progresso aumentado com sucesso!"}), 200
    
    elif criterio_tipo == "Frutas":
        fila_missoes_diarias.aumentar_progresso(missao_atual)
        return jsonify({"message": "Progresso aumentado com sucesso!"}), 200
    
    elif criterio_tipo == "Doces, guloseimas e salgadinhos":
        fila_missoes_diarias.aumentar_progresso(missao_atual)
        return jsonify({"message": "Progresso aumentado com sucesso!"}), 200
    
    else:
        return jsonify({"error": "Tipo de critério inválido."}), 400



def conectar_db():
    connection = mysql.connector.connect(
        host=os.environ.get("HOSTKEY"),
        user=os.environ.get("USERKEY"),
        password=os.environ.get("SENHAKEY"),
        port=os.environ.get("PORTKEY"),
        database=os.environ.get("DATABASEKEY")
    )
    return connection


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    senha = data['senha']

    connection = conectar_db()
    cursor = connection.cursor()
    try:
        insert_query = "INSERT INTO usuario (email,senha,missao_atual_semanal,missao_atual_diaria,pontos) VALUES (%s, %s,1,1,0)"
        cursor.execute(insert_query, (email, senha))
        connection.commit()
        return jsonify({"message": "Usuário registrado com sucesso!"}), 201
    except Exception as e:
        connection.rollback()
        return jsonify({"error": f"Erro ao registrar usuário: {e}"}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    senha = data['senha']

    connection = conectar_db()
    cursor = connection.cursor()
    try:
        query = "SELECT id FROM usuario WHERE email = %s AND senha = %s"
        cursor.execute(query, (email, senha))
        usuario_id = cursor.fetchone()

        if usuario_id:
            return jsonify({"message": "Login bem-sucedido!", "usuario_id": usuario_id[0]}), 200
        else:
            return jsonify({"error": "Credenciais inválidas. Login falhou."}), 401
    except Exception as e:
        return jsonify({"error": f"Erro ao realizar login: {e}"}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/select_status', methods=['GET'])
def get_pet_status():
    usuario_id = request.args.get('usuarioId')
    if not usuario_id:
        return jsonify({"error": "Usuário ID é necessário."}), 400

    try:
        usuario_id = int(usuario_id)
    except ValueError:
        return jsonify({"error": "Usuário ID inválido."}), 400
    connection = conectar_db()
    cursor = connection.cursor()
    try:
        query = "SELECT saudavel, energia, felicidade, forca, resistencia  FROM bichinho WHERE bichinho_id = %s"
        cursor.execute(query, (pega_bichinho_id(usuario_id),))
        pet_status = cursor.fetchone()

        if pet_status:
            max_value = 140.0
            status = {
                "saudavel": pet_status[0] / max_value,
                "energia": pet_status[1] / max_value,
                "felicidade": pet_status[2] / max_value,
                "forca": pet_status[3] / max_value,
                "resistencia": pet_status[4] / max_value
            }
            return jsonify(status), 200
        else:
            return jsonify({"error": "Pet não encontrado."}), 404
    except Exception as e:
        return jsonify({"error": f"Erro ao obter status do pet: {e}"}), 500
    finally:
        cursor.close()
        connection.close()
        
def pega_bichinho_id(usuario_id):
    connection = conectar_db()
    cursor = connection.cursor()
    
    try:
        query = "SELECT bichinho_id FROM usuario WHERE id = %s"
        cursor.execute(query, (usuario_id,))
        
        resultado = cursor.fetchone()

        if not resultado:
            return jsonify({"error": "Usuário não encontrado ou não possui um bichinho associado."}), 404

        bichinho_id = resultado[0]
        return bichinho_id
    except Exception as e:
        return jsonify({"error": f"Erro ao buscar o id do bichinho: {e}"}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/edit_status_and_assign_points', methods=['PUT'])
def edit_status_and_assign_points():
    data = request.get_json()
    usuario_id = data.get('usuarioId')
    grupo = data.get('grupo')

    if not usuario_id or not grupo:
        return jsonify({"error": "Usuário e grupo são necessários."}), 400

    connection = conectar_db()
    cursor = connection.cursor()

    try:
        query = "SELECT bichinho_id FROM usuario WHERE id = %s"
        cursor.execute(query, (usuario_id,))
        resultado = cursor.fetchone()

        if not resultado:
            return jsonify({"error": "Usuário não encontrado ou não possui um bichinho associado."}), 404

        bichinho_id = resultado[0]

        status_alimento = obter_pontos_grupo(grupo)

        if "error" in status_alimento:
            return jsonify(status_alimento), status_alimento["error"]

        # Verificar os valores atuais do bichinho antes de atualizar
        select_query = "SELECT saudavel, energia, forca, resistencia, felicidade FROM bichinho WHERE bichinho_id = %s"
        cursor.execute(select_query, (bichinho_id,))
        status_atual = cursor.fetchone()

        if not status_atual:
            return jsonify({"error": "Bichinho não encontrado."}), 404

        saudavel_atual, energia_atual, forca_atual, resistencia_atual, felicidade_atual = status_atual

        print("Status atual do bichinho:", status_atual)
        print("Pontos a serem adicionados:", status_alimento)

        # Garantir que os novos valores não excedam o limite de 140
        novo_saudavel = min(saudavel_atual + status_alimento["saudavel"], 140)
        novo_energia = min(energia_atual + status_alimento["energia"], 140)
        novo_forca = min(forca_atual + status_alimento["forca"], 140)
        novo_resistencia = min(resistencia_atual + status_alimento["resistencia"], 140)
        novo_felicidade = min(felicidade_atual + status_alimento["felicidade"], 140)

        print("Novos valores calculados:", novo_saudavel, novo_energia, novo_forca, novo_resistencia, novo_felicidade)

        # Certifique-se de que nenhum valor está fora dos limites antes da atualização
        if novo_saudavel > 140 or novo_energia > 140 or novo_forca > 140 or novo_resistencia > 140 or novo_felicidade > 140:
            raise ValueError("Os valores calculados estão fora dos limites permitidos.")

        update_query = """UPDATE bichinho SET saudavel = LEAST(%s, 140), 
                            energia = LEAST(%s, 140), 
                            forca = LEAST(%s, 140), 
                            resistencia = LEAST(%s, 140), 
                            felicidade = LEAST(%s, 140) 
                            WHERE bichinho_id = %s"""
        cursor.execute(update_query, (novo_saudavel, 
                                      novo_energia, 
                                      novo_forca, 
                                      novo_resistencia, 
                                      novo_felicidade, 
                                      bichinho_id))
        connection.commit()

        return jsonify({"message": "Status atualizado e pontos atribuídos com sucesso!"}), 200
    except ValueError as ve:
        print(f"Erro de validação: {ve}")
        return jsonify({"error": f"Erro de validação: {ve}"}), 400
    except Exception as e:
        print(f"Erro ao atualizar status e atribuir pontos: {e}")
        return jsonify({"error": f"Erro ao atualizar status e atribuir pontos: {e}"}), 500
    finally:
        cursor.close()
        connection.close()
        
def obter_pontos_grupo(grupo):
    connection = conectar_db()
    cursor = connection.cursor()
    try:
        query = "SELECT saudavel, energia, felicidade, resistencia, forca FROM comidas WHERE grupo = %s"
        cursor.execute(query, (grupo,))
        comida_status = cursor.fetchone()

        if comida_status:
            return {
                "saudavel": comida_status[0],
                "energia": comida_status[1],
                "felicidade": comida_status[2],
                "resistencia": comida_status[3],
                "forca": comida_status[4]
            }
        else:
            return {"error": "Grupo não encontrado."}, 404
    except Exception as e:
        return {"error": f"Erro ao obter status do grupo: {e}"}, 500
    finally:
        cursor.close()
        connection.close()
        
@app.route('/create_pet', methods=['POST'])
def create_pet():
    data = request.get_json()
    #dependendo da escolha na tela do inicial, o nome virá como o padrão do bichinho escolhido e passado aqui.
    nome = data['nome']
    usuario_id = data['usuarioId']
    
    saudavel = 0
    energia = 0
    forca = 0
    resistencia = 0
    felicidade = 0

    connection = conectar_db()
    cursor = connection.cursor()
    try:
        # Inserir o novo bichinho na tabela bichinho
        insert_query = """INSERT INTO bichinho (nome, saudavel, energia, forca, resistencia, felicidade) VALUES (%s, %s, %s, %s, %s, %s)"""
        cursor.execute(insert_query, (nome, saudavel, energia, forca, resistencia, felicidade))
        bichinho_id = cursor.lastrowid

        # Atualizar o id do bichinho na tabela usuario
        update_query = "UPDATE usuario SET bichinho_id = %s WHERE id = %s"
        cursor.execute(update_query, (bichinho_id, usuario_id))
        connection.commit()

        return jsonify({"message": "Bichinho criado com sucesso!"}), 201
    except Exception as e:
        connection.rollback()
        return jsonify({"error": f"Erro ao criar bichinho: {e}"}), 500
    finally:
        cursor.close()
        connection.close()
        
@app.route('/get_user_id', methods=['POST'])
def get_user_id():
    data = request.get_json()
    email = data['email']
    senha = data['senha']

    connection = conectar_db()
    cursor = connection.cursor()
    try:
        query = "SELECT id FROM usuario WHERE email = %s AND senha = %s"
        cursor.execute(query, (email, senha))
        usuario = cursor.fetchone()

        if usuario:
            usuario_id = usuario[0]
            return jsonify({"message": "Login bem-sucedido!", "usuario_id": usuario_id}), 200
        else:
            return jsonify({"error": "Credenciais inválidas. Login falhou."}), 401
    except Exception as e:
        return jsonify({"error": f"Erro ao realizar login: {e}"}), 500
    finally:
        cursor.close()
        connection.close()
        
def proxima_missao_db(usuarioId):
    connection = conectar_db()
    cursor = connection.cursor()
    update_query = "UPDATE usuario SET missao_atual_diaria = missao_atual_diaria + 1 WHERE id = %s"
    cursor.execute(update_query, (usuarioId,))
    connection.commit()
        
@app.route('/missao_diaria', methods=['GET'])
def get_missao_diaria():
    usuario_id = request.args.get('usuarioId')
    missao_atual_index = missao_atual_do_usuario(usuario_id)
    if missao_atual_index is None:
        return jsonify({"error": "Erro ao obter a missão atual do usuário."}), 404

    return jsonify(fila_missoes_diarias.missao_atual(missao_atual_index-1))
        
def pegar_criterio_numero_e_tipo(missao_atual_index):
    missao = fila_missoes_diarias.fila[missao_atual_index-1]
    if missao:
        return {"criterio_numero": missao.get_criterio_numero(), "criterio_tipo": missao.get_criterio_tipo(), "progresso": missao.get_progresso()}
    else:
        return {"error": "Missão não encontrada."}

def missao_atual_do_usuario(usuario_id):
    connection = conectar_db()
    cursor = connection.cursor()
    try:
        query = "SELECT missao_atual_diaria FROM usuario WHERE id = %s"
        cursor.execute(query, (usuario_id,))
        missao_atual = cursor.fetchone()

        if missao_atual:
            return missao_atual[0]
        else:
            return None
    except Exception as e:
        return None
    finally:
        cursor.close()
        connection.close()

def proxima_missao():
    fila_missoes_diarias.proxima_missao()
    return jsonify({"message": "Missão avançada com sucesso!"}), 200

@app.route('/posicao_atual', methods=['GET'])
def posicao_atual():
    return fila_missoes_diarias.posicao_atual()

@app.route('/missao_atual', methods=['GET'])
def missao_atual():
    return fila_missoes_diarias.missao_atual()

    
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)