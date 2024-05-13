from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

def conectar_db():
    connection = mysql.connector.connect(
        host="mysql-hg-pii-db-health.a.aivencloud.com",
        user="avnadmin",
        password="AVNS_mrnDIRzqDjjvj9Kre7K",
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
        query = "SELECT * FROM usuario WHERE email = %s AND senha = %s"
        cursor.execute(query, (email, senha))
        usuario = cursor.fetchone()

        if usuario:
            return jsonify({"message": "Login bem-sucedido!"}), 200
        else:
            return jsonify({"error": "Credenciais inválidas. Login falhou."}), 401
    except Exception as e:
        return jsonify({"error": f"Erro ao realizar login: {e}"}), 500
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)