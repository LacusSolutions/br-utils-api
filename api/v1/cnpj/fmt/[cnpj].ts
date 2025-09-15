import { cnpj as cnpjUtils } from 'br-utils';

interface GetParams {
  params: Promise<{
    cnpj: string;
  }>;
}

export async function GET(request: Request, { params }: GetParams): Promise<Response> {
  try {
    const { cnpj: cnpjValue } = await params;
    const { searchParams } = new URL(request.url);
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
    if (error instanceof TypeError) {
      return Response.json({ error: error.message }, { status: 422 });
    }

    return Response.json({ error: 'Unable to format CNPJ.' }, { status: 500 });
  }
}
