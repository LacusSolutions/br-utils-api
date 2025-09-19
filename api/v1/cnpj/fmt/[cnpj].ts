import { cnpj as cnpjUtils } from 'br-utils';

import { auth, middlewareChain } from '../../middlewares.js';

export async function GET(request: Request): Promise<Response> {
  try {
    await middlewareChain(request, auth());

    const { pathname, searchParams } = new URL(request.url);
    const rawCnpjValue = pathname.split('/').at(-1) as string;
    const cnpjValue = decodeURIComponent(rawCnpjValue);
    const dotKey = searchParams.get('dot_key') ?? '.';
    const slashKey = searchParams.get('slash_key') ?? '/';
    const dashKey = searchParams.get('dash_key') ?? '-';
    const escape = searchParams.get('escape') === 'true';
    const hidden = searchParams.get('hidden') === 'true';
    const hiddenKey = searchParams.get('hidden_key') ?? '*';
    const hiddenStart = searchParams.get('hidden_start') || '5';
    const hiddenEnd = searchParams.get('hidden_end') || '13';
    const result = cnpjUtils.format(cnpjValue, {
      delimiters: {
        dot: dotKey,
        slash: slashKey,
        dash: dashKey,
      },
      escape,
      hidden,
      hiddenKey,
      hiddenRange: {
        start: parseInt(hiddenStart),
        end: parseInt(hiddenEnd),
      },
      onFail() {
        throw new TypeError();
      },
    });

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    return Response.json({ error: 'Unable to format CNPJ.' }, { status: 500 });
  }
}
