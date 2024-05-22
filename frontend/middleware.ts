import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getUserMeLoader } from "@/app/services/get-user-me-loader";

// middleware is a function that allows you to inspect all of the requests recieved by your server.
// that allows you to decide what to do with the request before it is passed to the handler.
export async function middleware(request: NextRequest) {
  // getUserMeLoader is going to check with strapi to see if the token in the cookie is valid
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
