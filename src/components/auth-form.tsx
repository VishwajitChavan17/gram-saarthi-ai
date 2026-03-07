'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/providers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { STATES, OCCUPATIONS, INCOME_RANGES, CATEGORIES } from '@/lib/constants';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSuccess?: () => void;
  isModal?: boolean;
}

export function AuthForm({ mode, onSuccess, isModal = false }: AuthFormProps) {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup({ 
          email, 
          name, 
          age, 
          state, 
          occupation, 
          incomeRange, 
          category 
        }, password);
      }
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'signup' && (
        <>
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Age</label>
              <Input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">State</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">Select State</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Occupation</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                required
              >
                <option value="">Select Occupation</option>
                {OCCUPATIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Annual Income Range (₹)</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={incomeRange}
              onChange={(e) => setIncomeRange(e.target.value)}
              required
            >
              <option value="">Select Income Range</option>
              {INCOME_RANGES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </>
      )}
      
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-col gap-2 pt-4">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
        </Button>
        
        {!isModal && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary font-bold hover:underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-bold hover:underline">
                  Log In
                </Link>
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
