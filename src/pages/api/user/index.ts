import { NextApiRequest, NextApiResponse } from "next";

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res
      .status(405)
      .json({
        status: false,
        statusCode: 405,
        message: "Only GET method is allowed",
      });

  res
    .status(200)
    .json({ status: true, statusCode: 200, message: "success get user" });
}