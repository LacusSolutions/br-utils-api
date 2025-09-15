import { type VercelRequest as Request } from '@vercel/node';
import { cpf as cpfUtils } from 'br-utils';

export async function GET(request: Request): Promise<Response> {
  try {
    const cpfValue = request.query.cpf.toString();
    const result = cpfUtils.isValid(cpfValue);

    return Response.json({ result }, { status: 200 });
  } catch {
    return Response.json({ error: 'Unable to validate CPF.' }, { status: 500 });
  }
}
