import { NextRequest, NextResponse } from 'next/server';
export const runtime = "edge";

export async function POST(req: NextRequest) {
    // const body: { randomData: string } = await req.json();
    // const { randomData } = body;

    const formData = await req.formData();
    const randomData = formData.get('randomData') as string;


    console.log('Received random data:', randomData);
    // if (!randomData) {
    //     return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    // }

    // // Process the text and return a response
    // const sentiment = analyzeSentiment(randomData);

    return NextResponse.json("good", { status: 200 });
}
