import { type VercelRequest as Request } from '@vercel/node';
import { cpf as cpfUtils } from 'br-utils';

export async function GET(request: Request): Promise<Response> {
  try {
    const prefix = request.query.prefix?.toString() || undefined;
    const format = request.query.format?.toString() === 'true';
    const result = cpfUtils.generate({
      prefix,
      format,
    });

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    if (error instanceof TypeError) {
      return Response.json({ error: error.message }, { status: 422 });
    }

    return Response.json({ error: 'Unable to generate CPF.' }, { status: 500 });
  }
}
