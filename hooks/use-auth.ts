// This forces the app to think you are logged in locally
export const useAuth = () => {
  return {
    isSignedIn: true,
    user: {
      id: 'demo_123',
      firstName: 'SterlingRidge',
      lastName: 'Investor',
      emailAddresses: [{ emailAddress: 'investor@sterlingridge.com' }],
      imageUrl: 'https://avatar.vercel.sh/investor',
    },
    isLoaded: true
  };
};