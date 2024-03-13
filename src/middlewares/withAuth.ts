import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  NextMiddleware,
} from "next/server";

const onlyAdminAccess = ["admin"];
const authUserNoAccess = ["auth"];

export default function withAuth(
  middleware: NextMiddleware,
  watcherURL: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];
    console.log(pathname);

    if (watcherURL.includes(pathname)) {
      const token = await getToken({ req, secret: process.env.NEXT_SECRET });
      if (!token && !authUserNoAccess.includes(pathname)) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      // LOGIN SUCCESS
      else if (token) {
        // if already login, redirect to home, restrict to auth page
        if (authUserNoAccess.includes(pathname)) {
          const url = new URL("/", req.url);
          return NextResponse.redirect(url);
        }

        if (token?.role !== "admin" && onlyAdminAccess.includes(pathname)) {
          const url = new URL("/", req.url);
          return NextResponse.redirect(url);
        }
      }
    }
  };
}
