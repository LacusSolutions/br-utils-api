import { cnpj as cnpjUtils } from 'br-utils';

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || undefined;
    const format = searchParams.get('format') === 'true';
    const result = cnpjUtils.generate({
      prefix,
      format,
    });

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    if (error instanceof TypeError) {
      return Response.json({ error: error.message }, { status: 422 });
    }

    return Response.json({ error: 'Unable to generate CNPJ.' }, { status: 500 });
  }
}
