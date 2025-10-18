import jwt, { SignOptions } from "jsonwebtoken";


interface TokenPayload {
    id: any;
    email: string;
    [key: string]: any;
}
export const generateToken = (payload: TokenPayload):  { accessToken: string; refreshToken: string }  => {
    const accessSecret = process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET as string;
    const refresSecret = process.env.NEXT_PUBLIC_JWT_REFRESS_TOKEN_SECRET as string;

    if (!accessSecret && !refresSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const options: SignOptions = {
        expiresIn: Number(process.env.NEXT_PUBLIC_JWT_EXPIRES_IN) || 60 * 60 * 24,
    };

    const accessToken = jwt.sign(payload, accessSecret, options);
    const refreshToken = jwt.sign(payload, refresSecret, options);
    return {
        accessToken,
        refreshToken
    };
};