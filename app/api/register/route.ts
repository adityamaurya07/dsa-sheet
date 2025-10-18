import '@/lib/mongoose'

import { NextResponse as res } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return res.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            name: username,
            email,
            password: hashedPassword,
        });
        return res.json(
            {
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        // console.log("Registration Error:", error);
        return res.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export const GET = async (req: Request) => {
    try {
        // Fetch all users as an array
        const users = await User.find({}).lean();

        // // Map to remove sensitive data (like password)
        // const usersArray = users.map((user) => ({
        //   id: user._id,
        //   name: user.name,
        //   email: user.email,
        //   createdAt: user.createdAt,
        //   updatedAt: user.updatedAt,
        // }));

        return res.json({ users: users }, { status: 200 });
    } catch (error: any) {
        console.error("Get Users Error:", error);
        return res.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
};
