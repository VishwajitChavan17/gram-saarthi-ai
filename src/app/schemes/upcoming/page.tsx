'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUpcomingSchemes, getAllCategories } from '@/lib/data';
import { NotifyLaunchModal } from '@/components/NotifyLaunchModal';

interface UpcomingSchemeItem {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string;
}

export default function UpcomingSchemesPage() {
  const schemes = getUpcomingSchemes();
  const categories = getAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [notifyScheme, setNotifyScheme] = useState<UpcomingSchemeItem | null>(null);

  const filteredSchemes = selectedCategory === 'All'
    ? schemes
    : schemes.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 rounded-full border-none font-bold">
            Coming Soon
          </Badge>
          <h1 className="mb-2 text-4xl font-bold">Upcoming Schemes</h1>
          <p className="text-muted-foreground">
            New government schemes launching soon that you should know about
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
          {filteredSchemes.map((scheme: UpcomingSchemeItem) => (
              <Card key={scheme.id} className="flex flex-col h-full bg-white border-none shadow-xl shadow-black/5 hover:shadow-primary/10 transition-all rounded-[2rem] overflow-hidden group">
                <CardHeader className="pt-8 px-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{scheme.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2 bg-primary/5 text-primary border-none font-bold">
                        {scheme.category}
                      </Badge>
                    </div>
                    <Badge variant="destructive" className="ml-2 bg-red-500 text-white border-none font-bold uppercase tracking-wider text-[10px] py-1 px-3 rounded-full">Coming Soon</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 space-y-4 px-8 pb-8">
                  <div className="flex-1 space-y-6">
                    <div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">&quot;{scheme.description}&quot;</p>
                    </div>
                    
                    <div className="p-5 bg-primary/5 rounded-2xl border border-primary/5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Benefit Focus</p>
                      <p className="text-sm font-bold text-foreground leading-relaxed">{scheme.benefits}</p>
                    </div>
                  </div>

                  <div className="pt-6 mt-auto">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 pb-4 border-b border-primary/5">
                      Launch Expected: Oct 2026
                    </div>
                    <Button
                      className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/10 bg-primary hover:bg-primary/90 transition-all"
                      variant="default"
                      onClick={() => setNotifyScheme(scheme)}
                    >
                      Notify Me on Launch
                    </Button>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No upcoming schemes in this category</p>
          </div>
        )}
      </div>

      <NotifyLaunchModal
        open={Boolean(notifyScheme)}
        scheme={notifyScheme}
        onClose={() => setNotifyScheme(null)}
      />
    </div>
  );
}
