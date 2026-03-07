'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/providers';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { STATES, OCCUPATIONS, INCOME_RANGES, CATEGORIES } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    state: '',
    occupation: '',
    incomeRange: '',
    category: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
    if (user) {
      setFormData({
        name: user.name || '',
        age: user.age || '',
        state: user.state || '',
        occupation: user.occupation || '',
        incomeRange: user.incomeRange || '',
        category: user.category || ''
      });
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-2xl">User Profile</CardTitle>
                <CardDescription>View and manage your personal information</CardDescription>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Age</label>
                      <Input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">State</label>
                      <select
                        name="state"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.state}
                        onChange={handleChange}
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
                        name="occupation"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.occupation}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Occupation</option>
                        {OCCUPATIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <select
                        name="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.category}
                        onChange={handleChange}
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
                      name="incomeRange"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.incomeRange}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Income Range</option>
                      {INCOME_RANGES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">Save Changes</Button>
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                      <p className="text-lg">{user.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Age</p>
                      <p className="text-lg">{user.age || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">State</p>
                      <p className="text-lg">{user.state || 'Not specified'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Occupation</p>
                      <p className="text-lg">{user.occupation || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <p className="text-lg">{user.category || 'Not specified'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Annual Income Range</p>
                    <p className="text-lg">{user.incomeRange || 'Not specified'}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
