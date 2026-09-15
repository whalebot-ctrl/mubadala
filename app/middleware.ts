import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes do NOT require a login
const isPublicRoute = createRouteMatcher([
  '/', 
  '/signin(.*)', 
  '/signup(.*)',
  '/trade(.*)',
  '/api/auth(.*)', // <--- This allows the sign-in POST request to work
  '/api/markets(.*)',
  '/api/trade-data(.*)',
  '/api/public(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  // This tells Next.js which files to run the middleware on
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};