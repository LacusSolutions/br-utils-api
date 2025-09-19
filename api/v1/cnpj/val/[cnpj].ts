import { cnpj as cnpjUtils } from 'br-utils';

import { auth, middlewareChain } from '../../middlewares.js';

export async function GET(request: Request): Promise<Response> {
  try {
    await middlewareChain(request, auth());

    const { pathname } = new URL(request.url);
    const rawCnpjValue = pathname.split('/').at(-1) as string;
    const cnpjValue = decodeURIComponent(rawCnpjValue);
    const result = cnpjUtils.isValid(cnpjValue);

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    return Response.json({ error: 'Unable to validate CNPJ.' }, { status: 500 });
  }
}
