import { NextApiRequest, NextApiResponse } from "next";
import { getAllUserData } from "@/services/user";
import { updateData } from "@/lib/firebase/service";

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
    const { id, data } = req.body;
    await updateData("users", id, data, (callback: boolean) => {
      if (callback) {
        return res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success update user",
        });
      }
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "fail update user",
      });
    });
    console.log(id, data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success update user",
    });
  }
}
