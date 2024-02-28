import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({
      status: false,
      statusCode: 405,
      message: "Only POST method is allowed",
    });

  await signUp(req.body, (status: boolean) => {
    if (status)
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "success register an account",
      });
    else
      res.status(400).json({
        status: false,
        statusCode: 400,
        message: "fail register an account",
      });
  });
}
