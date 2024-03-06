import type { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "@/pages/services/auth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body as { email: string; password: string };
  if (req.method !== "POST")
    return res.status(405).json({
      status: false,
      statusCode: 405,
      message: "Only POST method is allowed",
    });

  const user = await signIn(email);
  res.status(200).json({ status: "Berhasil masuk", data: user });
}
