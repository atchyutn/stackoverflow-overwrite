import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import getOrCreteDB from "./models/server/dbSetup";
import getOrCreateBucket from "./models/server/storage.collection";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    await Promise.all(
        [getOrCreteDB(), getOrCreateBucket()]
    )
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    /* match all request paths except for the ones that starts with:
    - api (API routes)
    - _next/static (static files)
    - _next/image (image optimization files)
    - favicon.ico (favicon file)
    */
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
