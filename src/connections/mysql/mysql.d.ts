export interface ColumnDefinition {
  name: string;
  type: string;
  primary?: boolean;
  notNull?: boolean;
  autoIncrement?: boolean;
  foreignKey?: { table: string; column: string };
}
