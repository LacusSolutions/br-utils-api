import { cpf as cpfUtils } from 'br-utils';

interface GetParams {
  params: Promise<{
    cpf: string;
  }>;
}

export async function GET(_: unknown, { params }: GetParams): Promise<Response> {
  try {
    const { cpf: cpfValue } = await params;
    const result = cpfUtils.isValid(cpfValue);

    return Response.json({ result }, { status: 200 });
  } catch {
    return Response.json({ error: 'Unable to validate CPF.' }, { status: 500 });
  }
}
