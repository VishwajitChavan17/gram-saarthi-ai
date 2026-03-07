'use client';

import { useState } from 'react';
import { analyzeEligibility } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { INCOME_RANGES, OCCUPATIONS, STATES } from '@/lib/constants';
import ResultCard from '@/components/ResultCard';

const initialFormState = {
  age: '',
  state: '',
  occupation: '',
  income: '',
};

function EligibilityForm({ defaultValues = {}, onResult = null } = {}) {
  const [formData, setFormData] = useState({
    ...initialFormState,
    ...defaultValues,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await analyzeEligibility({
        age: Number(formData.age),
        state: formData.state.trim(),
        occupation: formData.occupation.trim(),
        income: formData.income,
      });
      setResult(response);
      if (onResult) {
        onResult(response);
      }
    } catch (submitError) {
      setResult(null);
      setError(submitError.message || 'Something went wrong while checking eligibility.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/10 bg-white shadow-xl shadow-black/5 transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">AI Eligibility Checker</CardTitle>
          <CardDescription>
            Enter your profile details to get instant scheme recommendations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium text-foreground">
                  Age
                </label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="h-11 rounded-xl border-primary/10 focus-visible:ring-primary/30"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium text-foreground">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="flex h-11 w-full rounded-xl border border-primary/10 bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select state</option>
                  {STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="occupation" className="text-sm font-medium text-foreground">
                  Occupation
                </label>
                <select
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="flex h-11 w-full rounded-xl border border-primary/10 bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select occupation</option>
                  {OCCUPATIONS.map((occupation) => (
                    <option key={occupation} value={occupation}>
                      {occupation}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="income" className="text-sm font-medium text-foreground">
                  Income
                </label>
                <select
                  id="income"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="flex h-11 w-full rounded-xl border border-primary/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select annual income range</option>
                  {INCOME_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 rounded-xl px-8 font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                  Analyzing...
                </span>
              ) : (
                'Check Eligibility'
              )}
            </Button>
          </form>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="mt-4 rounded-xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm text-primary">
              Fetching scheme recommendations...
            </div>
          ) : null}
        </CardContent>
      </Card>

      {result ? <ResultCard result={result} /> : null}
    </div>
  );
}

export default EligibilityForm;
