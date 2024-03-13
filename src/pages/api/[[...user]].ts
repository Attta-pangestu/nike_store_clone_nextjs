import { NextApiRequest, NextApiResponse } from "next";
import { getAllUserData } from "@/services/user";
import { updateData, deleteData } from "@/lib/firebase/service";
import jwt from "jsonwebtoken";
export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userData = await getAllUserData();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success get user",
      data: userData,
    });
  }

  if (req.method === "PUT") {
    console.log("calling PUT");
    const data = req.body;
    const id = getIdParams(req);
    const token = getToken(req);
    console.log(token);
    try {
      const decodeToken: any = await verifyToken(token as string);
      console.log(decodeToken);
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
    } catch (error) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  }

  if (req.method === "DELETE") {
    const idParams = getIdParams(req);
    const token = getToken(req);
    if (!token)
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Unauthorized",
      });

    try {
      const decoded = await verifyToken(token);

      await deleteData("users", idParams, (callback: boolean) => {
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
    } catch (error) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  }
}

const getIdParams = (req: NextApiRequest) => {
  const { user }: any = req.query;

  return user[1];
};

const getToken = (req: NextApiRequest) => {
  const token = req.headers.authorization;
  return token?.split(" ")[1];
};

const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.NEXT_SECRET || "", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
