import { cnpj as cnpjUtils } from 'br-utils';

interface GetParams {
  params: Promise<{
    cnpj: string;
  }>;
}

export async function GET(_: unknown, { params }: GetParams): Promise<Response> {
  try {
    const { cnpj: cnpjValue } = await params;
    const result = cnpjUtils.isValid(cnpjValue);

    return Response.json({ result }, { status: 200 });
  } catch {
    return Response.json({ error: 'Unable to validate CNPJ.' }, { status: 500 });
  }
}
