import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { checkBaseToken } from "@/server/middleware/base-token-check";

export const middleware = (request: NextRequest) =>
  checkBaseToken(request) || NextResponse.next();

export const config = {
  matcher: ["/"],
};
