import { NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";
export const POST = async (req) => {
  try {
    const { token } = await req.json();
    const session = await jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET
    );
    return res.json(session);
  } catch (error) {
    return res.json({ success: false, status: 401 });
  }
};
