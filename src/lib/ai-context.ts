import { mockSchemes } from '@/lib/data';

type SchemeRecord = {
  id: string;
  name: string;
  category: string;
  status: string;
  benefits: string;
  eligibility?: string[];
  applicationDeadline?: string;
};

const MAX_SCHEMES = 12;

export function buildSchemeContext() {
  const schemes = (Array.isArray(mockSchemes) ? mockSchemes : []) as SchemeRecord[];
  const topSchemes = schemes.slice(0, MAX_SCHEMES);

  if (!topSchemes.length) {
    return 'No local scheme data is currently available.';
  }

  const lines = topSchemes.map((scheme) => {
    const eligibility = Array.isArray(scheme.eligibility) ? scheme.eligibility.join(', ') : 'Not specified';
    const deadline = scheme.applicationDeadline || 'Not specified';

    return [
      `- ${scheme.name} (${scheme.category}, ${scheme.status})`,
      `  Benefits: ${scheme.benefits}`,
      `  Eligibility: ${eligibility}`,
      `  Deadline: ${deadline}`,
    ].join('\n');
  });

  return `Use this local scheme catalog when the user asks about schemes:\n${lines.join('\n')}`;
}

export const ASSISTANT_SYSTEM_PROMPT = [
  'You are GramSaarthi AI Assistant.',
  'You help users with government scheme questions and general guidance.',
  'When the question is about schemes, prioritize the provided local scheme catalog.',
  'If a scheme detail is missing, clearly say it is not available in local data instead of guessing.',
  'For general questions, provide concise and practical answers.',
  'Keep replies short, clear, and user-friendly.',
].join(' ');
