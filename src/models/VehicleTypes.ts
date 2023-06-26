import Model from "./Model";
import MYSQL_CONSTANTS from "./../connections/mysql/constants";

import type { IModel } from "./interfaces/Model";
import type { ColumnDefinition } from "../connections/mysql/mysql";

class VehicleTypes extends Model implements IModel {
  private name: string = "VehicleTypes";

  migrate() {
    const column: ColumnDefinition[] = [
      {
        name: "typeId",
        type: MYSQL_CONSTANTS.TYPE.INT,
        unique: true,
        autoIncrement: true,
        notNull: true,
        primary: true,
        unsigned: true,
      },
    ];

    this.createTable(this.name, column);
  }
}

export default VehicleTypes;
