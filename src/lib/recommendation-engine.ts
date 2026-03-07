import { mockSchemes } from '@/lib/data';

interface EligibilityProfile {
  age: number;
  state: string;
  occupation: string;
  income: string;
}

interface SchemeRecord {
  id: string;
  name: string;
  category: string;
  status: string;
  reason: string;
  benefits: string;
}

export interface SchemeRecommendation {
  id: string;
  name: string;
  category: string;
  status: string;
  reason: string;
  benefits: string;
  score: number;
  eligibilityText: string;
}

function normalize(value: string) {
  return (value || '').toLowerCase().trim();
}

function hasAny(text: string, tokens: string[]) {
  return tokens.some((token) => text.includes(token));
}

export function toEligibilityProfile(raw: any): EligibilityProfile {
  return {
    age: Number(raw?.age) || 0,
    state: String(raw?.state || '').trim(),
    occupation: String(raw?.occupation || '').trim(),
    income: String(raw?.income || '').trim(),
  };
}

export function buildRecommendations(profile: EligibilityProfile): SchemeRecommendation[] {
  const schemes: SchemeRecord[] = Array.isArray(mockSchemes) ? mockSchemes : [];
  const scoreMap = new Map<string, number>();

  schemes.forEach((scheme) => scoreMap.set(scheme.id, 1));

  const add = (id: string, score: number) => {
    scoreMap.set(id, (scoreMap.get(id) || 0) + score);
  };

  const occupation = normalize(profile.occupation);
  const income = normalize(profile.income);
  const state = normalize(profile.state);

  if (hasAny(occupation, ['farmer', 'agri'])) {
    add('1', 9);
    add('4', 3);
    add('2', 2);
  } else if (hasAny(occupation, ['laborer', 'worker'])) {
    add('3', 8);
    add('5', 5);
    add('2', 3);
  } else if (hasAny(occupation, ['student'])) {
    add('6', 8);
    add('2', 3);
  } else if (hasAny(occupation, ['street vendor'])) {
    add('7', 10);
    add('10', 6);
    add('3', 3);
  } else if (hasAny(occupation, ['business', 'self-employed', 'entrepreneur', 'artisan'])) {
    add('10', 8);
    add('7', 5);
    add('5', 2);
  } else if (hasAny(occupation, ['retired'])) {
    add('8', 8);
    add('2', 4);
    add('5', 3);
  } else if (hasAny(occupation, ['unemployed'])) {
    add('3', 7);
    add('8', 5);
    add('2', 3);
  } else {
    add('2', 3);
    add('10', 2);
    add('4', 2);
  }

  if (profile.age >= 60) {
    add('8', 8);
    add('2', 4);
    add('5', 3);
  } else if (profile.age >= 40) {
    add('2', 4);
    add('4', 2);
    add('10', 2);
  } else if (profile.age >= 18) {
    add('3', 4);
    add('10', 4);
    add('5', 3);
  } else if (profile.age > 0) {
    add('6', 8);
    add('2', 2);
  }

  if (hasAny(income, ['below', '1,00,000', '2,50,000'])) {
    add('2', 5);
    add('3', 4);
    add('1', 4);
    add('4', 3);
    add('9', 3);
    add('8', 3);
  } else if (hasAny(income, ['5,00,000', '10,00,000', '2.5l', '5l'])) {
    add('10', 4);
    add('2', 3);
    add('5', 2);
  } else if (hasAny(income, ['above'])) {
    add('10', 5);
    add('2', 2);
  }

  if (hasAny(state, ['punjab', 'haryana', 'uttar pradesh', 'bihar', 'madhya pradesh', 'rajasthan'])) {
    add('1', 2);
    add('3', 1);
  } else if (hasAny(state, ['maharashtra', 'gujarat', 'karnataka', 'telangana'])) {
    add('10', 2);
    add('7', 1);
  } else if (hasAny(state, ['kerala', 'tamil nadu', 'delhi', 'goa'])) {
    add('2', 2);
    add('4', 1);
  }

  const ranked = schemes
    .map((scheme) => {
      const score = scoreMap.get(scheme.id) || 0;
      const eligibilityText = `Likely eligible based on occupation (${profile.occupation}), age (${profile.age}), and income (${profile.income}).`;
      return {
        ...scheme,
        score,
        eligibilityText,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return ranked;
}

export function isGenericBackendResponse(data: any) {
  const scheme = String(data?.scheme || '').trim().toLowerCase();
  const eligibility = String(data?.eligibility || '').trim().toLowerCase();
  const message = String(data?.message || '').trim().toLowerCase();

  return (
    scheme === 'pm kisan yojana' &&
    eligibility === 'likely eligible based on profile' &&
    message.includes('backend working')
  );
}
