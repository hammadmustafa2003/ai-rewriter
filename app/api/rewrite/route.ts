import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

type ReqBody = {
  input: string;
  tone?: string;
  instructions?: string;
};

const SYSTEM_PROMPT = `You are a helpful writing assistant. Rewrite the user's text to improve grammar, clarity, and tone, while preserving the original meaning. When a tone is provided, adapt to it (e.g., professional, friendly, concise, persuasive, empathetic). Return only the rewritten text.`;

export async function POST(req: NextRequest) {
  try {
    const { input, tone = 'professional', instructions = '' } = (await req.json()) as ReqBody;

    if (!input || !input.trim()) {
      return NextResponse.json({ error: 'Input text is required.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const mocked = `[MOCKED • ${tone}] ` + input.trim();
      return NextResponse.json({ output: mocked, model: 'mock', mocked: true });
    }

    const client = new OpenAI({ apiKey });

    const userPrompt = [
      instructions ? `Extra instructions: ${instructions}` : '',
      `Desired tone: ${tone}`,
      `Text: """${input}"""`
    ].filter(Boolean).join('\n\n');

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2,
    });

    const output = completion.choices[0]?.message?.content || '';
    return NextResponse.json({
      output,
      model: completion.model || 'gpt-4o-mini',
    });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}