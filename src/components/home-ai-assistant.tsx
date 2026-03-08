'use client';

import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Role = 'user' | 'assistant';

interface ChatMessage {
  role: Role;
  content: string;
}

function BotGlyph({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v3" />
      <rect x="4" y="7" width="16" height="12" rx="4" />
      <path d="M9 12h.01M15 12h.01" />
      <path d="M8 16h8" />
    </svg>
  );
}

function parseSseChunk(chunk: string) {
  const lines = chunk.split('\n');
  const outputs: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line.startsWith('data:')) {
      continue;
    }

    const data = line.replace(/^data:\s*/, '');
    if (!data || data === '[DONE]') {
      continue;
    }

    try {
      const parsed = JSON.parse(data);
      const token = parsed?.choices?.[0]?.delta?.content;
      if (typeof token === 'string' && token.length) {
        outputs.push(token);
      }
    } catch {
      // Ignore malformed lines.
    }
  }

  return outputs.join('');
}

const STARTER_QUESTION = 'How can I check which schemes are best for me?';

export function HomeAIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hi! I am GramSaarthi AI. Ask me about government schemes or any general question.',
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const handleSend = async (prefill?: string) => {
    const text = (prefill ?? input).trim();
    if (!text || isLoading) {
      return;
    }

    const userMessage: ChatMessage = { role: 'user', content: text };
    const optimisticMessages: ChatMessage[] = [
      ...messages,
      userMessage,
      { role: 'assistant', content: '' },
    ];
    setMessages(optimisticMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok || !response.body) {
        const errText = await response.text().catch(() => 'Unable to get response.');
        throw new Error(errText || 'Unable to get response.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let assistantText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          assistantText += parseSseChunk(part);
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: assistantText || '...',
          };
          return updated;
        });
      }

      if (buffer.trim()) {
        assistantText += parseSseChunk(buffer);
      }

      if (!assistantText.trim()) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'I could not generate a response right now. Please try again.',
          };
          return updated;
        });
      }
    } catch (sendError) {
      setMessages((prev) => prev.slice(0, -1));
      setError(sendError instanceof Error ? sendError.message : 'Request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80]">
      {open ? (
        <div className="w-[92vw] max-w-md rounded-3xl border border-primary/15 bg-white shadow-2xl shadow-black/15">
          <div className="flex items-center justify-between border-b border-primary/10 px-4 py-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BotGlyph className="h-4 w-4" />
              </span>
              GramSaarthi AI Assistant
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>

          <div className="max-h-[52vh] overflow-y-auto space-y-3 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === 'user' ? 'text-right' : 'text-left'}
              >
                <div
                  className={`inline-block max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-primary/5 text-foreground border border-primary/10'
                  }`}
                >
                  {message.role === 'user' ? (
                    message.content
                  ) : (
                    <div className="space-y-2 [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-black/10 [&_code]:px-1 [&_code]:py-0.5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/10 [&_pre]:p-2 [&_pre]:text-xs [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-primary/10 p-4 space-y-3">
            {error ? <p className="text-xs text-red-600">{error}</p> : null}

            <button
              type="button"
              onClick={() => handleSend(STARTER_QUESTION)}
              disabled={isLoading}
              className="text-xs font-semibold text-primary hover:underline disabled:opacity-60"
            >
              Try: {STARTER_QUESTION}
            </button>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, 600))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    void handleSend();
                  }
                }}
                placeholder="Ask about schemes or anything else..."
                className="h-11 rounded-full"
              />
              <Button
                type="button"
                onClick={() => void handleSend()}
                disabled={!canSend}
                className="h-11 rounded-full px-5 font-bold"
              >
                {isLoading ? '...' : 'Send'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          className="rounded-full px-6 h-12 font-bold shadow-xl shadow-primary/30"
          onClick={() => setOpen(true)}
        >
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            <BotGlyph className="h-4 w-4" />
          </span>
          Ask AI Bot
        </Button>
      )}
    </div>
  );
}
