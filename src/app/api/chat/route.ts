import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
        // Return a mocked response if no API key is provided for demo purposes
        return new Response(JSON.stringify({
            error: "Missing OPENAI_API_KEY. Please add it to your .env file to enable live AI Chat."
        }), { status: 400 });
    }

    const result = await streamText({
        model: openai('gpt-4o'),
        messages,
    });

    return result.toTextStreamResponse();
}
