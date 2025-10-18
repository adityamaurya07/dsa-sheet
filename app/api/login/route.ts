import { NextResponse as res } from "next/server";
import bcrypt from "bcryptjs";
import User, { IUser } from "@/models/user";
import '@/lib/mongoose'
import { generateToken } from "@/lib/token";

export const POST = async (req: Request) => {
    try {

        const { email, password } = await req.json();

        if (!email || !password) {
            return res.json({ error: "Email and password required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) return res.json({ error: "Invalid credentials" }, { status: 401 });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.json({ error: "Invalid credentials" }, { status: 401 });

        // Generate JWT token using helper
        const token = generateToken({ id: user._id, email: user.email, name: user.name, });

        const result = res.json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
        });
        result.cookies.set('accessToken', token.accessToken, {
            httpOnly: true,
            secure: true,
            path: '/'
        })
        result.cookies.set('refreshToken', token.refreshToken, {
            httpOnly: true,
            secure: true,
            path: '/'
        })
        return result
    } catch (error: any) {
        console.error("Login Error:", error);
        return res.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
