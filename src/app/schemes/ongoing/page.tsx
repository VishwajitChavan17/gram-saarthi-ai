'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getOngoingSchemes, getAllCategories } from '@/lib/data';
import { StorageService } from '@/lib/storage';
import { useAuth } from '@/app/providers';

export default function OngoingSchemesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const schemes = getOngoingSchemes();
  const categories = getAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [appliedSchemes, setAppliedSchemes] = useState<any[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Protect route and initialize state
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
      return;
    }
    
    // Only access localStorage after hydration
    if (!loading) {
      setAppliedSchemes(StorageService.getAppliedSchemes());
      setHydrated(true);
    }
  }, [user, loading, router]);

  const filteredSchemes = selectedCategory === 'All'
    ? schemes
    : schemes.filter(s => s.category === selectedCategory);

  const handleApply = (schemeId: string) => {
    StorageService.addAppliedScheme(schemeId, { status: 'pending' });
    setAppliedSchemes(StorageService.getAppliedSchemes());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 rounded-full border-none font-bold">
            Available Now
          </Badge>
          <h1 className="mb-2 text-4xl font-bold">My Eligible Schemes</h1>
          <p className="text-muted-foreground">
            Explore active government schemes based on your profile
          </p>
        </div>

        {/* Filter */}
        <div className="mb-10 flex flex-wrap gap-3">
          {['All', ...categories].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-6 h-10 font-bold transition-all ${
                selectedCategory === cat 
                  ? 'shadow-lg shadow-primary/20' 
                  : 'bg-white border-primary/10 hover:bg-primary/5'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Schemes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSchemes.map((scheme) => {
            const isApplied = appliedSchemes.some(a => a.schemeId === scheme.id);
            return (
              <Card key={scheme.id} className="flex flex-col h-full bg-white border-none shadow-xl shadow-black/5 hover:shadow-primary/10 transition-all rounded-[2rem] overflow-hidden group">
                <CardHeader className="pt-8 px-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{scheme.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2 bg-primary/5 text-primary border-none font-bold">
                        {scheme.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 space-y-4 px-8 pb-8">
                  <div className="flex-1 space-y-6">
                    <div className="p-5 bg-primary/5 rounded-2xl border border-primary/5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Benefit Focus</p>
                      <p className="text-sm font-bold text-foreground leading-relaxed">{scheme.benefits}</p>
                    </div>
                    
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Why you qualify</p>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">&quot;{scheme.reason}&quot;</p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Key Criteria</p>
                      <ul className="text-xs space-y-2">
                        {scheme.eligibility.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
                            <span className="text-muted-foreground font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-auto">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 pb-4 border-b border-primary/5">
                      Deadline: {scheme.applicationDeadline}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold border-primary/10 hover:bg-primary/5">
                        Details
                      </Button>
                      {!isApplied ? (
                        <Button
                          className="flex-1 rounded-xl h-12 font-bold shadow-lg shadow-primary/10"
                          onClick={() => handleApply(scheme.id)}
                        >
                          Apply Now
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          className="flex-1 rounded-xl h-12 font-bold bg-green-50 text-green-600 border-none"
                          disabled
                        >
                          Applied
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No schemes found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
