'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EligibilityForm from '@/components/EligibilityForm';
import { useAuth } from '@/app/providers';
import { StorageService } from '@/lib/storage';
import { mockSchemes } from '@/lib/data';

interface AppliedScheme {
  schemeId: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const appliedSchemes: AppliedScheme[] = StorageService.getAppliedSchemes();
  const appliedSchemeDetails = appliedSchemes.map((app: AppliedScheme) => ({
    ...app,
    scheme: mockSchemes.find(s => s.id === app.schemeId)
  }));

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="mt-1">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Age</label>
                <p className="mt-1">{user.age || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Occupation</label>
                <p className="mt-1">{user.occupation || '-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{appliedSchemes.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {appliedSchemes.filter(a => a.status === 'pending').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {appliedSchemes.filter(a => a.status === 'approved').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Eligibility Analyzer */}
        <div className="mb-8">
          <EligibilityForm
            defaultValues={{
              age: user.age || '',
              state: user.state || '',
              occupation: user.occupation || '',
              income: user.incomeRange || '',
            }}
          />
        </div>

        {/* Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
            <CardDescription>Track your scheme applications</CardDescription>
          </CardHeader>
          <CardContent>
            {appliedSchemes.length === 0 ? (
              <p className="text-muted-foreground">No applications yet</p>
            ) : (
              <div className="space-y-4">
                {appliedSchemeDetails.map(app => (
                  <div key={app.schemeId} className="border rounded-lg p-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{app.scheme?.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Applied on {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={
                      app.status === 'approved' ? 'default' :
                      app.status === 'rejected' ? 'destructive' :
                      'secondary'
                    }>
                      {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
