from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from fila_missoes import Missao, FilaMissoes
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

# missoes_semanais = {
#     Missao(1, "Complete 10,000 passos.", 1),
#     Missao(2, "Alimente o bichinho com um alimento dessas categorias: Frutas, Legumes e Verduras, Leguminosas", 1),
#     Missao(3, "Alimente o bichinho com 10 frutas.", 1),
#     Missao(4, "Alimente o bichinho com um alimento dessas categorias: Frutas, Carnes e Ovos, Cereais, tuberculos, paes e raizes, Leguminosas, Leites e Derivados", 1),
#     Missao(5, "Evite alimentar o bichinho com Doces, guloseimas e salgadinhos",1)
# }


# fila_missoes_semanais = FilaMissoes(missoes_semanais)


def conectar_db():
    connection = mysql.connector.connect(
        host="mysql-hg-pii-db-health.a.aivencloud.com",
        user="avnadmin",
        password=os.environ.get("SENHAKEY"),
        port="10202",
        database="defaultdb"
    )
    return connection

@app.route('/')
def index():
    return 'API de Bichinhos Saudáveis'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    senha = data['senha']

    connection = conectar_db()
    cursor = connection.cursor()
    try:
        insert_query = "INSERT INTO usuario (email,senha) VALUES (%s, %s)"
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
    data = request.get_json()
    usuario_id = data.get('usuarioId')
    connection = conectar_db()
    cursor = connection.cursor()
    try:
        query = "SELECT saudavel, energia, felicidade, forca, resistencia  FROM bichinho WHERE id = %s"
        cursor.execute(query, (pega_bichinho_id(usuario_id),))
        pet_status = cursor.fetchone()

        if pet_status:
            status = {
                "saudavel": pet_status[0],
                "energia": pet_status[1],
                "felicidade": pet_status[2],
                "forca": pet_status[3],
                "resistencia": pet_status[4]
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
        if usuario_id != int(usuario_id):
            return jsonify({"error": "Usuário inválido."}), 400
        
        resultado = cursor.fetchone()

        if not resultado:
            return jsonify({"error": "Usuário não encontrado ou não possui um bichinho associado."}), 404

        bichinho_id = resultado[0]
    except Exception as e:
        return jsonify({"error": f"Erro ao buscar o id do bichinho: {e}"}), 500
    finally:
        cursor.close()
        connection.close()
    return bichinho_id

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
        if usuario_id != int(usuario_id):
            return jsonify({"error": "Usuário inválido."}), 400
        if grupo != str(grupo):
            return jsonify({"error": "Grupo inválido."}), 400
        resultado = cursor.fetchone()

        if not resultado:
            return jsonify({"error": "Usuário não encontrado ou não possui um bichinho associado."}), 404

        bichinho_id = resultado[0]

        status_alimento = obter_pontos_grupo(grupo)
        if "error" in status_alimento:
            return jsonify(status_alimento), status_alimento["error"]

        update_query = """UPDATE bichinho SET saudavel = saudavel + %s, energia = energia + %s, forca = forca + %s, resistencia = resistencia + %s, felicidade = felicidade + %s WHERE bichinho_id = %s"""
        cursor.execute(update_query, (status_alimento["saudavel"], 
                                      status_alimento["energia"], 
                                      status_alimento["forca"], 
                                      status_alimento["resistencia"], 
                                      status_alimento["felicidade"], 
                                      bichinho_id))
        connection.commit()

        return jsonify({"message": "Status atualizado e pontos atribuídos com sucesso!"}), 200
    except Exception as e:
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
                "saudavel": comida_status[0]/140,
                "energia": comida_status[1]/140,
                "felicidade": comida_status[2]/140,
                "resistencia": comida_status[3]/140,
                "forca": comida_status[4]/140
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
        
# @app.route('/proxima_missao', methods=['GET'])
# def proxima_missao():
#     resultado = fila_missoes_semanais.proxima_missao()
#     return jsonify({"message": resultado})

# @app.route('/posicao_atual', methods=['GET'])
# def posicao_atual():
#     posicao = fila_missoes_semanais.posicao_atual()
#     return jsonify({"posicao": posicao})

# @app.route('/missao_atual', methods=['GET'])
# def missao_atual():
#     missao = fila_missoes_semanais.missao_atual()
#     return jsonify({"message": missao})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)