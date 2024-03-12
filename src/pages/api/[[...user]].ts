import { NextApiRequest, NextApiResponse } from "next";
import { getAllUserData } from "@/services/user";
import { updateData, deleteData } from "@/lib/firebase/service";

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

  if (req.method === "POST") {
    const { data } = req.body;
    console.log(data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success add user",
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

  if (req.method === "DELETE") {
    const { user }: any = req.query;
    await deleteData("users", user[1], (callback: boolean) => {
      if (callback) {
        return res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success delete user",
        });
      }
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "fail delete user",
      });
    });
  }
}
