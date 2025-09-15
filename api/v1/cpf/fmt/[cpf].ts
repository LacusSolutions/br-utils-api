import { type VercelRequest as Request } from '@vercel/node';
import { cpf as cpfUtils } from 'br-utils';

export async function GET(request: Request): Promise<Response> {
  try {
    const cpfValue = request.query.cpf.toString();
    const dotKey = request.query.dot_key?.toString() ?? '.';
    const dashKey = request.query.dash_key?.toString() ?? '-';
    const escape = request.query.escape?.toString() === 'true';
    const hidden = request.query.hidden?.toString() === 'true';
    const hiddenKey = request.query.hidden_key?.toString() ?? '*';
    const hiddenStart = request.query.hidden_start?.toString() ?? '3';
    const hiddenEnd = request.query.hidden_end?.toString() ?? '10';
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
    if (error instanceof TypeError) {
      return Response.json({ error: error.message }, { status: 422 });
    }

    return Response.json({ error: 'Unable to format CPF.' }, { status: 500 });
  }
}
