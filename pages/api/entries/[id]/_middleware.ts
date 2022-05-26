import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const id = req.page.params?.id || '';

  const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

  if (!checkMongoIDRegExp.test(id as string)) {
    return new Response(
      JSON.stringify({
        error: 'El ID enviado no es válido ' + id,
        success: false,
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  console.log(`middleware [id]: ${id} called`);

  return NextResponse.next();
}
