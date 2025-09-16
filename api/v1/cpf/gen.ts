import { cpf as cpfUtils } from 'br-utils';

import { auth, middlewareChain } from '../middlewares.js';

export async function GET(request: Request): Promise<Response> {
  try {
    await middlewareChain(request, auth());

    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || undefined;
    const format = searchParams.get('format') === 'true';
    const result = cpfUtils.generate({
      prefix,
      format,
    });

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('💩', error);

    if (error instanceof TypeError) {
      return Response.json({ error: error.message }, { status: 422 });
    }

    return Response.json({ error: 'Unable to generate CPF.' }, { status: 500 });
  }
}
