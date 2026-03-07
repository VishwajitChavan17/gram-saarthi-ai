'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function formatConfidence(confidence) {
  const numericConfidence = Number(confidence);

  if (!Number.isFinite(numericConfidence)) {
    return 'N/A';
  }

  const percentValue = numericConfidence <= 1 ? numericConfidence * 100 : numericConfidence;
  return `${Math.round(percentValue)}%`;
}

function getConfidencePercent(confidence) {
  const numericConfidence = Number(confidence);

  if (!Number.isFinite(numericConfidence)) {
    return null;
  }

  const percentValue = numericConfidence <= 1 ? numericConfidence * 100 : numericConfidence;
  return Math.max(0, Math.min(100, Math.round(percentValue)));
}

function ResultCard({ result }) {
  if (!result) {
    return null;
  }

  const recommendedSchemes = Array.isArray(result.recommended_schemes)
    ? result.recommended_schemes
    : [];

  return (
    <div className="space-y-4">
      <Card className="border-primary/10 bg-white shadow-xl shadow-primary/5 transition-all duration-300">
        <CardHeader className="space-y-4 pb-4">
          <div className="flex items-center justify-between gap-3">
            <Badge className="bg-primary/10 text-primary border-none px-3 py-1 rounded-full font-semibold">
              Recommendation
            </Badge>
            <Badge className="border-none px-3 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-700">
              AI Recommended
            </Badge>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Recommended Schemes
            </p>
            <CardTitle className="text-2xl leading-tight text-foreground">Personalized Results</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {recommendedSchemes.length === 0 ? (
            <div className="rounded-2xl bg-primary/5 p-4 border border-primary/10">
              <p className="text-sm text-foreground leading-relaxed">
                No recommended schemes found for the selected profile.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recommendedSchemes.map((scheme, index) => {
                const confidencePercent = getConfidencePercent(scheme.confidence);

                return (
                  <div
                    key={`${scheme.scheme_name || 'scheme'}-${index}`}
                    className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-3"
                  >
                    <p className="font-semibold text-foreground">{scheme.scheme_name || 'Unnamed Scheme'}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {scheme.description || 'No description available.'}
                    </p>
                    <p className="text-xs text-foreground mt-2">
                      Confidence: {formatConfidence(scheme.confidence)}
                    </p>
                    {confidencePercent !== null ? (
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${confidencePercent}%` }}
                        />
                      </div>
                    ) : null}
                    <p className="text-xs text-muted-foreground mt-1">
                      Reason: {scheme.reason || 'No reason provided.'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ResultCard;
