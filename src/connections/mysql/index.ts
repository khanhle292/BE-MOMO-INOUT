import mysql, { Connection, MysqlError } from "mysql";
import type { ColumnDefinition } from "./mysql";
class Mysql {
  private connection: Connection = mysql.createConnection({
    host: "localhost", // Replace with your MySQL host
    user: "root", // Replace with your MySQL username
    password: "admin", // Replace with your MySQL password
    database: "MOMO_INOUT", // Replace with your MySQL database name
    port: 3306,
  });

  constructor() {
    this.connection.connect((error) => {
      if (error) {
        console.error("Error connecting to MySQL database:", error);
      } else {
        console.log("Connected to MySQL database!");
      }
    });
  }

  createTable(tableName: string, columns: ColumnDefinition[]): void {
    let columnDefinitions = "";
    let primaryKey = "";

    columns.forEach((column, index) => {
      columnDefinitions += `${column.name} ${column.type}`;

      if (column.primary) {
        primaryKey = `PRIMARY KEY (${column.name})`;
      }

      if (column.notNull) {
        columnDefinitions += " NOT NULL";
      }

      if (column.autoIncrement) {
        columnDefinitions += " AUTO_INCREMENT";
      }

      if (column.foreignKey) {
        const { table, column: foreignKeyColumn } = column.foreignKey;
        columnDefinitions += `, FOREIGN KEY (${column.name}) REFERENCES ${table}(${foreignKeyColumn})`;
      }

      if (index < columns.length - 1) {
        columnDefinitions += ", ";
      }
    });

    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`;

    this.connection.query(sql, (error: MysqlError | null) => {
      if (error) {
        console.error("Error creating table:", error);
      } else {
        console.log("Table created successfully!");
      }

      this.connection.end(); // Close the MySQL connection
    });
  }

  dropTable(tableName: string): void {
    const sql = `DROP TABLE IF EXISTS ${tableName}`;

    this.connection.query(sql, (error: MysqlError | null) => {
      if (error) {
        console.error("Error dropping table:", error);
      } else {
        console.log("Table dropped successfully!");
      }

      this.connection.end(); // Close the MySQL connection
    });
  }
}

export default Mysql;
