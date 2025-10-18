import { NextResponse as res } from "next/server"


export const config = {
    matcher: ['/profile', '/topics', '/progress']
}

export const middleware =async (req: any) => {
    console.log(req?.nextUrl?.origin,"req")
    const cookies = req.cookies.get('accessToken')
    if (!cookies) return res.redirect(new URL('/login', req.url))
    console.log(cookies, "cookites")
    // await fetch(`${process.env.SERVER}/api/session`)
}