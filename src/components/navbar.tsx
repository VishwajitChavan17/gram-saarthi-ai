'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/providers';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20">
                G
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Gram<span className="text-primary">Saarthi</span>
              </span>
            </Link>

            {/* Nav Links - Center */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              {user && (
                <>
                  <Link href="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/schemes/ongoing" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                    My Schemes
                  </Link>
                </>
              )}
              <Link href="/schemes/upcoming" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                Upcoming Schemes
              </Link>
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end mr-2">
                    <span className="text-xs text-muted-foreground">Welcome back</span>
                    <Link href="/profile" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                      {user.name}
                    </Link>
                  </div>
                  <Button
                    variant="secondary"
                    className="rounded-full px-6 font-semibold"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="font-semibold text-muted-foreground hover:text-primary"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      className="rounded-full px-8 font-bold shadow-lg shadow-primary/25"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden inline-flex items-center justify-center rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-foreground"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-6">
              <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white/90 p-4 shadow-sm">
                <Link
                  href="/"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-primary/5"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                {user && (
                  <>
                    <Link
                      href="/dashboard"
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-primary/5"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/schemes/ongoing"
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-primary/5"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Schemes
                    </Link>
                  </>
                )}
                <Link
                  href="/schemes/upcoming"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-primary/5"
                  onClick={() => setMenuOpen(false)}
                >
                  Upcoming Schemes
                </Link>

                <div className="mt-3 border-t border-primary/10 pt-3">
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/profile"
                        className="text-sm font-semibold text-foreground"
                        onClick={() => setMenuOpen(false)}
                      >
                        {user.name}
                      </Link>
                      <Button
                        variant="secondary"
                        className="w-full rounded-full px-6 font-semibold"
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link href="/login" onClick={() => setMenuOpen(false)}>
                        <Button variant="ghost" className="w-full font-semibold text-muted-foreground hover:text-primary">
                          Log In
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setMenuOpen(false)}>
                        <Button className="w-full rounded-full px-8 font-bold shadow-lg shadow-primary/25">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
