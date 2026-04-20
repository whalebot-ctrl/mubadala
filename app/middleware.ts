import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are "Public" (anyone can see them)
const isPublicRoute = createRouteMatcher(['/signin(.*)', '/signup(.*)', '/']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect(); // This forces login for any page not listed above
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};