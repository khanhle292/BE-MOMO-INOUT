export interface ColumnDefinition {
  name: string;
  type: ITypeMysql;
  length?: number;
  precision?: number;
  scale?: number;
  primary?: boolean;
  notNull?: boolean;
  defaultValue?: any;
  autoIncrement?: boolean;
  unique?: boolean;
  unsigned?: boolean;
  zerofill?: boolean;
  foreignKey?: { table: string; column: string };
}

export type ITypeMysql =
  | "INT"
  | "TEXT"
  | "DATE"
  | "FLOAT"
  | "DOUBLE"
  | "DECIMAL"
  | "VARCHAR"
  | "BOOLEAN"
  | "DATETIME"
  | "TIMESTAMP";
