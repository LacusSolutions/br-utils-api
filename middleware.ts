import { next } from '@vercel/edge';

export const config = {
  matcher: '/api/:path*',
};

export function middleware(request: Request): Response {
  // eslint-disable-next-line no-console
  console.log('💩 middleware called');

  const { pathname } = new URL(request.url);

  if (pathname.startsWith('/api/')) {
    const authHeader = request.headers.get('authorization');

    if (authHeader !== 'lacus') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return next();
}
