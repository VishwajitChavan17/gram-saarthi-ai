'use client';

import { AuthForm } from '@/components/auth-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-foreground">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Log in to your GramSaarthi account
            </p>
          </div>
          <Card className="border-none shadow-2xl shadow-primary/5 rounded-[2rem] bg-white">
            <CardHeader className="pt-8 px-8 pb-4 text-center">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your benefits
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <AuthForm mode="login" onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
