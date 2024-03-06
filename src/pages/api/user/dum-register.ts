import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({
        status: false,
        statusCode: 405,
        message: "Only POST method is allowed",
      });
  res.status(200).json({ data: req.body });
}
