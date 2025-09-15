import { type VercelRequest as Request } from '@vercel/node';
import { cnpj as cnpjUtils } from 'br-utils';

export async function GET(request: Request): Promise<Response> {
  try {
    const cnpjValue = request.query.cnpj.toString();
    const result = cnpjUtils.isValid(cnpjValue);

    return Response.json({ result }, { status: 200 });
  } catch {
    return Response.json({ error: 'Unable to validate CNPJ.' }, { status: 500 });
  }
}
