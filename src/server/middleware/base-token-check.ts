import { NextRequest, NextResponse } from "next/server";

import { BASE_TOKEN } from "@/server/env";

export const checkBaseToken = (request: NextRequest): NextResponse | null => {
  if (!BASE_TOKEN) {
    // If no BASE_TOKEN is set, allow all requests
    return null;
  }
  const token = request.nextUrl.searchParams.get("t");
  if (token === BASE_TOKEN) {
    return null;
  }
  return new NextResponse("Forbidden", { status: 403 });
};
