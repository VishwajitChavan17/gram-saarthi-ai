'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/app/providers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-primary bg-primary/10 rounded-full border-none font-bold">
              Trusted by 10,000+ Citizens
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6">
              Empowering India through <span className="text-primary">Digital Access</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Discover schemes <span className="text-foreground font-semibold italic">you&apos;re eligible for</span> in minutes. Simple, transparent, and direct access to government benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={user ? '/schemes/ongoing' : '/signup'}>
                <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-full shadow-xl shadow-primary/25 transition-transform hover:scale-105 active:scale-95">
                  {user ? 'View My Eligibility' : 'Check My Eligibility Now'}
                </Button>
              </Link>
              <Button size="lg" variant="ghost" className="h-14 px-8 text-lg font-bold rounded-full border-2 border-transparent hover:border-primary/20">
                How it works
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-2xl lg:max-w-none">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/hero.jpg"
                alt="Rural farmer using digital technology"
                width={800}
                height={600}
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats/News Strip */}
      <div className="bg-primary text-white py-6">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap justify-center md:justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider opacity-90">Live: 1,402 Schemes Active</span>
          </div>
          <div className="flex gap-12 text-center">
            <div>
              <p className="text-2xl font-black">₹450Cr+</p>
              <p className="text-[10px] font-bold uppercase opacity-70 tracking-tighter">Disbursed via Direct Transfer</p>
            </div>
            <div>
              <p className="text-2xl font-black">2.4M</p>
              <p className="text-[10px] font-bold uppercase opacity-70 tracking-tighter">Verified Citizens Assisted</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full font-bold shadow-sm">
              View Latest Announcements
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Popular Categories */}
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="h-6 w-1 bg-primary rounded-full" />
                Popular Sectors
              </h3>
              <div className="space-y-3">
                {['Agriculture & Farming', 'Healthcare & Welfare', 'Education & Scholarships', 'Small Business (MSME)', 'Women & Children', 'Housing & Infrastructure'].map((cat) => (
                  <Button key={cat} variant="outline" className="w-full justify-start h-12 bg-white border-primary/5 hover:border-primary/20 hover:bg-primary/5 rounded-xl font-semibold transition-all">
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Middle Column: Featured Cards */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold tracking-tight">Featured Initiatives</h3>
                <Link href="/schemes" className="text-primary font-bold text-sm hover:underline">View All</Link>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    title: 'PM-Kisan Samman Nidhi',
                    tag: 'Agriculture',
                    desc: 'Income support of ₹6,000 per year in three equal installments to all land-holding farmer families.',
                    img: '/scheme1.jpg'
                  },
                  {
                    title: 'Ayushman Bharat (PM-JAY)',
                    tag: 'Healthcare',
                    desc: 'Health cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization.',
                    img: '/scheme2.jpg'
                  }
                ].map((scheme, i) => (
                  <Card key={i} className="group border-none shadow-xl shadow-black/5 hover:shadow-primary/10 transition-all rounded-3xl overflow-hidden bg-white">
                    <div className="relative h-48">
                      <Image src={scheme.img} alt={scheme.title} fill className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                      <Badge className="absolute top-4 right-4 bg-white/90 text-primary font-bold backdrop-blur-sm border-none">
                        {scheme.tag}
                      </Badge>
                    </div>
                    <CardHeader className="pt-6">
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{scheme.title}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground leading-relaxed pt-2">
                        {scheme.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-8">
                      <Link href={user ? '/schemes/ongoing' : '/signup'}>
                        <Button className="w-full rounded-xl h-12 font-bold bg-secondary text-primary hover:bg-primary hover:text-white border-none shadow-none">
                          Check My Eligibility
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column: Trending/Quick Links */}
            <div className="lg:col-span-3">
              <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-foreground">Trending Updates</h3>
                <div className="space-y-6">
                  {[
                    { date: 'Oct 24', title: 'New Scholarship Portal Live' },
                    { date: 'Oct 22', title: 'Solar Subsidy Cap Increased' },
                    { date: 'Oct 19', title: 'PM-Kisan 15th Installment' }
                  ].map((news, i) => (
                    <div key={i} className="group cursor-pointer">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{news.date}</p>
                      <h4 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{news.title}</h4>
                      <div className="mt-4 border-b border-primary/10" />
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-8 rounded-2xl h-14 font-black shadow-lg shadow-primary/20 bg-white text-primary border-2 border-primary/10 hover:bg-primary hover:text-white transition-all">
                  Join Newsletter
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Simple CTA Footer Area */}
      <section className="py-24 bg-foreground text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -mr-64 -mt-64" />
        <div className="mx-auto max-w-4xl text-center px-4 relative z-10">
          <h2 className="mb-6 text-4xl lg:text-5xl font-black">Start Your Digital Journey Today</h2>
          <p className="mb-12 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Dont miss out on benefits that are rightfully yours. Thousands of citizens use GramSaarthi daily to secure their future.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={user ? '/schemes/ongoing' : '/signup'}>
              <Button size="lg" className="h-16 px-12 text-xl font-bold rounded-full shadow-2xl shadow-primary/40 bg-primary text-white hover:scale-105 transition-transform">
                {user ? 'View My Schemes' : 'Apply for First Scheme'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
