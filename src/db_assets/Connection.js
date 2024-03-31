const { Client } = require('pg');

class DBConnection {
  constructor() {//construtor da classe DBConnection com as informações do db
    this.client = new Client({
      user: 'allan',
      host: 'hg-db-teste.cnec4kys463r.sa-east-1.rds.amazonaws.com',
      database: 'hg_db',
      password: 'supersenhaimt',
      port: 5432, // Default PostgreSQL port
    });
  }

  async connect() {//função connect para poder conectar
    try {
      await this.client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  async disconnect() {//função disconnect para poder desligar a conexão
    try {
      await this.client.end();
      console.log('Disconnected from the database');
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
    }
  }
}

module.exports = DBConnection;//nome para poder importar o db