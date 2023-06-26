import type { NextApiRequest, NextApiResponse } from "next";
import VehicleType from "./../../controllers/vehicle.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process a POST request
    return new VehicleType().index2(req, res);
  } else {
    // Handle any other HTTP method
    return new VehicleType().index(req, res);
  }
}
