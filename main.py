from flask import Flask, request, jsonify
#Importa um serviço de nuvem, o CORS, que permite a comunicação do sistema web com recursos de outros servidores
from flask_cors import CORS
#Biblioteca que permite a conexão e interação com o banco de dadso MySQL
import mysql.connector
#Importa um pacote que permite o carregamento de variáveis de ambiente para o login do banco de dados
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir requisições do frontend

# Configurações do banco de dados
db_config = {
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_DATABASE')
}

# Rota para cadastrar um novo produto
@app.route('/add-product', methods=['POST'])
def add_product():
    data = request.json
    product_name = data['nome']
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO produtos (nome) VALUES (%s)", (product_name,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Produto cadastrado com sucesso!"}), 201

# Rota para buscar produtos
@app.route('/get-products', methods=['GET'])
def get_products():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM produtos")
    produtos = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(produtos), 200

if __name__ == '__main__':
    app.run(debug=True)