import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  let responseText = "Hello World";

  // In the edge runtime you can use Bindings that are available in your application
  // (for more details see:
  //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
  //    - https://developers.cloudflare.com/pages/functions/bindings/
  // )
  //
  // KV Example:
  // const myKv = getRequestContext().env.MY_KV_NAMESPACE
  // await myKv.put('suffix', ' from a KV store!')
  // const suffix = await myKv.get('suffix')
  // responseText += suffix

  return new Response(responseText);
}

// app/api/whisper/route.ts

export async function POST(request: Request) {
  try {
    const audioBlob = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      request.body?.pipeTo(
        new WritableStream({
          write(chunk) {
            chunks.push(chunk);
          },
          close() {
            resolve(Buffer.concat(chunks));
          },
          abort(err) {
            reject(err);
          },
        })
      );
    });
    // console.log("Received audio blob:", audioBlob);

    const response = await getRequestContext().env.AI.run(
      "@cf/openai/whisper",
      audioBlob
    );

    return Response.json({ input: { audio: [] }, response });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return new Response(JSON.stringify({ error: "Error transcribing audio" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
