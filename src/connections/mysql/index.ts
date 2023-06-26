import mysql, { Connection, MysqlError } from "mysql";

import type { ColumnDefinition } from "./mysql";
import type { IVehicleTypes } from "./../../types/VehicleTypes";
class Mysql {
  private connection: Connection = mysql.createConnection({
    host: "localhost", // Replace with your MySQL host
    user: "root", // Replace with your MySQL username
    password: "admin", // Replace with your MySQL password
    database: "MOMO_INOUT", // Replace with your MySQL database name
    port: 3306,
  });

  getAll(tableName: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      try {
        const sql = `SELECT * FROM ${tableName}`;

        this.connection.query(
          sql,
          (error: MysqlError | null, results: any[]) => {
            if (error) {
              console.error("Error fetching data:", error);
            } else {
              console.log("Data retrieved successfully:");
              resolve(results);
            }

            this.connection.end(); // Close the MySQL connection
          }
        );
      } catch (error) {
        console.log("[MYSQL]");
      }
    });
  }

  createTable(tableName: string, columns: ColumnDefinition[]): void {
    let columnDefinitions = "";

    columns.forEach((column, index) => {
      columnDefinitions += `${column?.name} ${column?.type}`;

      if (column?.length) {
        columnDefinitions += `(${column.length})`;
      }

      if (column?.notNull) {
        columnDefinitions += " NOT NULL";
      }

      if (column?.defaultValue !== undefined) {
        columnDefinitions += ` DEFAULT ${column?.defaultValue}`;
      }

      if (column?.autoIncrement) {
        columnDefinitions += " AUTO_INCREMENT";
      }

      if (column?.primary) {
        columnDefinitions += " PRIMARY KEY";
      }

      if (column?.unique) {
        columnDefinitions += " UNIQUE";
      }

      if (column?.foreignKey) {
        const { table, column: foreignKeyColumn } = column?.foreignKey;
        columnDefinitions += ` REFERENCES ${table}(${foreignKeyColumn})`;
      }

      if (index < columns.length - 1) {
        columnDefinitions += ", ";
      }
    });

    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`;

    console.log("[MYSQL] Create Table: ", sql);

    this.connection.connect((error) => {
      if (error) {
        console.error("Error connecting to MySQL database:", error);
      } else {
        console.log("Connected to MySQL database!");
        this.connection?.query(sql, (error: MysqlError | null) => {
          if (error) {
            console.error("Error creating table:", error);
          } else {
            console.log("Table created successfully!");
          }

          this.connection?.end(); // Close the MySQL connection
        });
      }
    });
  }

  dropTable(tableName: string): void {
    const sql = `DROP TABLE IF EXISTS ${tableName}`;

    this.connection.connect((error) => {
      if (error) {
        console.error("Error connecting to MySQL database:", error);
      } else {
        console.log("Connected to MySQL database!");
        this.connection.query(sql, (error: MysqlError | null) => {
          if (error) {
            console.error("Error dropping table:", error);
          } else {
            console.log("Table dropped successfully!");
          }

          this.connection.end(); // Close the MySQL connection
        });
      }
    });
  }
}

export default Mysql;
