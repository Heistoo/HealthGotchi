const DBConnection = require('./Connection');
const DBCommands = require('./Db_Commands');

class DBTesting {
  async testDropTable() {
    const dbConnection = new DBConnection();//instancia a classe connect
    await dbConnection.connect();//estabelece a conexão

    const dbCommands = new DBCommands(dbConnection.client);//instancia a classe DBCommands e liga com o connect para ser usado em DBCommands.js
    await dbCommands.dropTable('sample_table');//chama a função em si

    await dbConnection.disconnect();//termina a conexão
  }

  async testSelectTable() {
    const dbConnection = new DBConnection();
    await dbConnection.connect();

    const dbCommands = new DBCommands(dbConnection.client);
    await dbCommands.selectTable();

    await dbConnection.disconnect();
  }
}

//const dbConnection = new DBConnection();//instancia a classe connect
//const dbCommands = new DBCommands(dbConnection.client);//instancia a classe DBCommands e constroi dbConnection.client para ser usado em DBCommands.js

// Test the drop table command
const dbTesting = new DBTesting();

dbTesting.testSelectTable();