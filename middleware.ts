import { NextResponse, type NextRequest } from "next/server";

export const middleware = () => {
  const res = NextResponse.next();

  res.headers.append("ACCESS_CONTROL_ALLOW_ORIGIN", "*");

  return res;
};

export const config = {
  matcher: ["/api/:path*"],
};
