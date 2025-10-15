import { NextResponse } from "next/server";
import { getWalletFromCookie } from "./utils/wallet";
import { addressToSlug } from "./lib/slug-actions";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const wallet = getWalletFromCookie(req);

  let slug;

  if (wallet) {
    slug = addressToSlug(wallet);
  }

  // allow home and about
  if (pathname === "/" || pathname === "/about") return NextResponse.next();

  // /project without slug
  if (pathname === "/project") {
    if (wallet) {
      return NextResponse.redirect(new URL(`/project/${slug}`, req.url));
    }
    return NextResponse.next(); // allow if not connected
  }

  // /project/[slug] must be connected
  if (pathname.startsWith("/project/")) {
    if (!wallet) {
      return NextResponse.redirect(new URL("/project", req.url));
    }
  }

  // /project without slug
  if (pathname === "/browse/") {
   if (!wallet) {
       NextResponse.redirect(new URL(`/browse/${slug}`, req.url));
   }
    return NextResponse.next(); // allow if not connected
  }

  // /project/[slug] must be connected
  if (pathname.startsWith("/browse/")) {
       NextResponse.redirect(new URL(`/browse/${slug}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/about", "/project/:path*", "/browse/:path*"],
};
