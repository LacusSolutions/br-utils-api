import { cpf as cpfUtils } from 'br-utils';

import { auth, middlewareChain } from '../../middlewares.js';

export async function GET(request: Request): Promise<Response> {
  try {
    await middlewareChain(request, auth());

    const { pathname, searchParams } = new URL(request.url);
    const cpfValue = pathname.split('/').at(-1) as string;
    const dotKey = searchParams.get('dot_key') ?? '.';
    const dashKey = searchParams.get('dash_key') ?? '-';
    const escape = searchParams.get('escape') === 'true';
    const hidden = searchParams.get('hidden') === 'true';
    const hiddenKey = searchParams.get('hidden_key') ?? '*';
    const hiddenStart = searchParams.get('hidden_start') ?? '3';
    const hiddenEnd = searchParams.get('hidden_end') ?? '10';
    const result = cpfUtils.format(cpfValue, {
      delimiters: {
        dot: dotKey,
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
    // eslint-disable-next-line no-console
    console.log('💩', error);

    if (error instanceof TypeError) {
      return Response.json({ error: error.message }, { status: 422 });
    }

    return Response.json({ error: 'Unable to format CPF.' }, { status: 500 });
  }
}
