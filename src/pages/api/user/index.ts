import { NextApiRequest, NextApiResponse } from "next";
import { getAllUserData } from "@/services/user";
import { useRouter } from "next/router";
export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userData = await getAllUserData();
    console.log(userData);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success get user",
      data: userData,
    });
  }

  if (req.method === "PUT") {
    const userData = req.body;
    console.log(userData);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success update user",
    });
  }
}
