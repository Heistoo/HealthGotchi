class DBCommands {
  constructor(client) {
    this.client = client;
  }

  async dropTable(tableName) {//deleta a tabela inteira dado o nome dela
    const query = `DROP TABLE IF EXISTS ${tableName}`;
    try {
      await this.client.query(query);
      console.log(`Table ${tableName} dropped successfully`);
    } catch (error) {
      console.error(`Error dropping table ${tableName}:`, error);
    }
  }

  async createTable() {//comando para criar uma tabela
    const query = `
      CREATE TABLE IF NOT EXISTS sample_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        age INTEGER
      )
    `;
    try {
      await this.client.query(query);
      console.log('Table created successfully');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }

  async insertData(name, age) {//comando para inserir uma linha, recebendo nome e idade (para mudar os valores, trocar os parametros e o comando sql)
    const query = `INSERT INTO sample_table (name, age) VALUES ($1, $2)`;
    try {
      await this.client.query(query, [name, age]);
      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }

  async selectData(name) {//comando para selecionar a linha, dado o nome e retorna a linha
    const query = `SELECT * FROM sample_table WHERE $1`;
    try {
      const res = await this.client.query(query);
      console.log('Selected data:');
      console.table(res.rows);
    } catch (error) {
      console.error('Error selecting data:', error);
    }
  }

  async selectTable() {
    const query = `SELECT * FROM sample_table`;
    try {
      const res = await this.client.query(query);
      console.log('Selected data:');
      console.table(res.rows);
    } catch (error) {
      console.error('Error selecting data:', error);
    }
  }

  async deleteData(id) { //deleta uma linha dado o id
    const query = `DELETE FROM sample_table WHERE id = $1`;
    try {
      await this.client.query(query, [id]);
      console.log('Data deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
}

module.exports = DBCommands;