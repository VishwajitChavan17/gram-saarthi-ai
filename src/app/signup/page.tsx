'use client';

import { AuthForm } from '@/components/auth-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-foreground leading-tight">
              Create a <span className="text-primary">New Account</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign up to discover the schemes you qualify for
            </p>
          </div>
          <Card className="border-none shadow-2xl shadow-primary/5 rounded-[2.5rem] bg-white">
            <CardHeader className="pt-8 px-10 pb-4 text-center">
              <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
              <CardDescription>
                Provide your details for personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <AuthForm mode="signup" onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
