import { cnpj as cnpjUtils } from 'br-utils';

import { auth, middlewareChain } from '../middlewares.js';

export async function GET(request: Request): Promise<Response> {
  try {
    await middlewareChain(request, auth());

    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || undefined;
    const format = searchParams.get('format') === 'true';
    const result = cnpjUtils.generate({
      prefix,
      format,
    });

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    return Response.json({ error: 'Unable to generate CNPJ.' }, { status: 500 });
  }
}
