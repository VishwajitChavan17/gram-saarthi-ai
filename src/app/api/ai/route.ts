import { NextResponse } from 'next/server';
import { ASSISTANT_SYSTEM_PROMPT, buildSchemeContext } from '@/lib/ai-context';

const AI_BASE_URL = process.env.AI_BASE_URL || process.env.XAI_BASE_URL || 'https://api.groq.com/openai/v1';
const AI_MODEL = process.env.AI_MODEL || process.env.XAI_MODEL || 'llama-3.1-8b-instant';

function getNormalizedApiKey() {
  const raw = String(process.env.AI_API_KEY || process.env.XAI_API_KEY || '').trim();
  if (!raw) {
    return '';
  }

  return raw;
}

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

function sanitizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== 'object') return false;
      const candidate = item as ChatMessage;
      return (
        (candidate.role === 'user' || candidate.role === 'assistant') &&
        typeof candidate.content === 'string' &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 4000),
    }));
}

export async function POST(request: Request) {
  const apiKey = getNormalizedApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { status: 'error', message: 'Missing AI_API_KEY on server.' },
      { status: 500 }
    );
  }

  let payload: any = null;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const userMessages = sanitizeMessages(payload?.messages);
  if (!userMessages.length || userMessages[userMessages.length - 1].role !== 'user') {
    return NextResponse.json(
      { status: 'error', message: 'At least one user message is required.' },
      { status: 400 }
    );
  }

  const schemeContext = buildSchemeContext();
  const upstreamMessages: ChatMessage[] = [
    { role: 'system', content: ASSISTANT_SYSTEM_PROMPT },
    { role: 'system', content: schemeContext },
    ...userMessages,
  ];

  let upstream: Response;
  try {
    upstream = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: upstreamMessages,
        stream: true,
        temperature: 0.4,
      }),
      cache: 'no-store',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Unable to reach AI service.',
        detail: error instanceof Error ? error.message : 'Network error',
      },
      { status: 502 }
    );
  }

  if (!upstream.ok || !upstream.body) {
    const raw = await upstream.text().catch(() => '');
    return NextResponse.json(
      {
        status: 'error',
        message: 'AI provider returned an error.',
        detail: raw || `Status ${upstream.status}`,
      },
      { status: upstream.status || 502 }
    );
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
