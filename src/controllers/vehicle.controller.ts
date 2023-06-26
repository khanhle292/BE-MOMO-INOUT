import type { NextApiRequest, NextApiResponse } from "next";

class VehicleType {
  index(req: NextApiRequest, res: NextApiResponse) {
    res.send("hello");
  }

  index2(req: NextApiRequest, res: NextApiResponse) {
    res.send("hello 2");
  }
}

export default VehicleType;
