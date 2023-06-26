import { ITypeMysql } from "./mysql";

interface IMysqlConstant {
  TYPE: Record<ITypeMysql, ITypeMysql>;
}

const MYSQL_CONSTANTS: IMysqlConstant = {
  TYPE: {
    INT: "INT",
    TEXT: "TEXT",
    DATE: "DATE",
    FLOAT: "FLOAT",
    DOUBLE: "DOUBLE",
    DECIMAL: "DECIMAL",
    VARCHAR: "VARCHAR",
    BOOLEAN: "BOOLEAN",
    DATETIME: "DATETIME",
    TIMESTAMP: "TIMESTAMP",
  },
};

export default MYSQL_CONSTANTS;
