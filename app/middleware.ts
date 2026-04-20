import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Ensure these paths are exactly what you use in your app
const isPublicRoute = createRouteMatcher([
  '/', 
  '/signin(.*)', 
  '/signup(.*)',
  '/api/auth(.*)', // <--- CRITICAL: Allow Clerk to talk to itself
  '/api/webhook(.*)' // If you use webhooks later
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  // This matcher is standard, but ensure it's here
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};