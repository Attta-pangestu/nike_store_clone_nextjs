import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

// export function middleware(request: NextRequest) {

// if (pathname === "/") {
//   const url = request.nextUrl.clone();
//   url.pathname = "/auth/login";
//   return NextResponse.redirect(url);
// }
// }

export default withAuth(() => NextResponse.next(), ["admin", "", "auth"]);
