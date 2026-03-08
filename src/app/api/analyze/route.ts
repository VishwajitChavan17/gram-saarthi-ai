import { NextResponse } from 'next/server';
import {
  buildRecommendations,
  isGenericBackendResponse,
  toEligibilityProfile,
} from '@/lib/recommendation-engine';

const ANALYZE_ENDPOINT =
  process.env.ANALYZE_API_URL ||
  'https://m4iamtrw84.execute-api.us-east-1.amazonaws.com/analyze';

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  try {
    const profile = toEligibilityProfile(payload);
    const upstream = await fetch(ANALYZE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const rawText = await upstream.text();
    let data: any = null;

    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = { message: 'Non-JSON response from eligibility service.' };
    }

    if (!upstream.ok) {
      return NextResponse.json(
        {
          status: 'error',
          message: data?.message || 'Eligibility service returned an error.',
        },
        { status: upstream.status }
      );
    }

    const recommendations = buildRecommendations(profile);
    const topRecommendation = recommendations[0];
    const shouldEnhanceResponse = !data || isGenericBackendResponse(data);

    if (shouldEnhanceResponse && topRecommendation) {
      return NextResponse.json({
        status: 'success',
        message: 'Recommendations generated from profile analysis.',
        ai_explanation: `Based on your profile as a ${profile.occupation} in ${profile.state}, you are highly likely to qualify for several key welfare schemes. We recommend focusing on ${topRecommendation.name} which offers significant ${topRecommendation.benefits}.`,
        recommended_schemes: recommendations.map(rec => ({
          scheme_name: rec.name,
          description: rec.benefits,
          confidence: (rec.score / 15), // Normalize score to 0-1 range roughly
          reason: rec.reason
        })),
        profileReceived: profile
      });
    }

    return NextResponse.json(data || { status: 'error', message: 'Empty response from service.' });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Could not reach eligibility service.',
        detail: error instanceof Error ? error.message : 'Unknown network error',
      },
      { status: 502 }
    );
  }
}
