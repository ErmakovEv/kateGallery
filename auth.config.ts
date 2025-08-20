import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      const isLoginRoute = nextUrl.pathname.startsWith('/login');
      if (isAdminRoute) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn && isLoginRoute) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
