import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name") as string;

  const complimentsCache = getRequestContext().env.COMPLIMENTS;
  const cachedCompliment = await complimentsCache.get(name);

  console.log("name is: ", cachedCompliment);

  if (!cachedCompliment) {
    console.log('no cache')
    const messages = [
      {
        role: "system",
        content:
          "You are a friendly assistant that writes a compliment about a persons.",
      },
      {
        role: "user",
        content: `Write a 1 or 2 sentence compliment for ${name}`,
      },
    ];

    const { response } = await getRequestContext().env.AI.run(
      "@cf/tinyllama/tinyllama-1.1b-chat-v1.0",
      { messages }
    );

    console.log("response", response);
    await complimentsCache.put(name, response);
    return Response.json(response);
  } else {
    return Response.json(cachedCompliment);
  }
}
