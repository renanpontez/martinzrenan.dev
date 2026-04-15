import { NextResponse, type NextRequest } from "next/server";

// Simple HTTP Basic Auth for proposal pages.
// Keyed by exact pathname so each client can have its own credentials.
const PROPOSAL_AUTH: Record<string, { user: string; pass: string }> = {
  "/proposals/pinkfilmsapp": { user: "pink", pass: "pink+agility" },
};

export function middleware(req: NextRequest) {
  const creds = PROPOSAL_AUTH[req.nextUrl.pathname];
  if (!creds) return NextResponse.next();

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const [user, pass] = atob(header.slice(6)).split(":");
      if (user === creds.user && pass === creds.pass) {
        return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Proposal", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: "/proposals/:path*",
};
