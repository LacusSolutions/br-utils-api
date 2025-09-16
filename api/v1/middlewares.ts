type Middleware = (request: Request) => Promise<undefined>;

export async function middlewareChain(
  request: Request,
  ...middlewares: Middleware[]
): ReturnType<Middleware> {
  for (const middleware of middlewares) {
    await middleware(request);
  }
}

export function auth(): Middleware {
  return async (request) => {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ', 1).at(1);

    console.log('💩', authHeader); // eslint-disable-line no-console
    console.log('💩', token); // eslint-disable-line no-console

    if (!token) {
      throw Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (token !== process.env.API_TOKEN) {
      throw Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    return undefined;
  };
}
