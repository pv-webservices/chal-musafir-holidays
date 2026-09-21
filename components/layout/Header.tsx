'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Mail, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { addressLine, nav, site, whatsappUrl, type NavItem } from '@/data/site';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close dropdowns on outside click / Escape
  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenGroup(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenGroup(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const isActive = (item: NavItem) => {
    if (item.href === '/') return pathname === '/';
    if (pathname.startsWith(item.href)) return true;
    return Boolean(item.children?.some((child) => pathname.startsWith(child.href) && child.href !== '/'));
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-[var(--brand-navy)] text-white lg:block">
        <div className="container-shell flex items-center justify-between gap-6 py-2 text-xs">
          <p className="flex items-center gap-2 text-blue-100">
            <MapPin className="h-3.5 w-3.5 text-orange-300" aria-hidden />
            {addressLine}
          </p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="focus-ring flex items-center gap-2 rounded text-blue-100 transition-colors hover:text-white">
              <Mail className="h-3.5 w-3.5 text-orange-300" aria-hidden />
              {site.email}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-2 rounded text-blue-100 transition-colors hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5 text-green-400" aria-hidden />
              WhatsApp
            </a>
            <span className="font-bold text-orange-300">{site.legalNote} · Since {site.established}</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b border-[var(--line)] bg-white/95 glass transition-shadow duration-300 ${scrolled ? 'shadow-[0_10px_30px_rgba(16,49,77,0.08)]' : ''}`}
      >
        <div className={`container-shell flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-3.5'}`}>
          <Link href="/" aria-label={`${site.name} — home`} className="focus-ring shrink-0 rounded-xl">
            <Image
              src={site.logo}
              alt={site.name}
              width={720}
              height={355}
              preload
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-[52px] lg:h-[58px]' : 'h-[58px] lg:h-[80px]'}`}
            />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href} className="relative">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                        aria-expanded={openGroup === item.label}
                        className={`focus-ring inline-flex items-center gap-1 rounded-lg px-3.5 py-2.5 text-[13.5px] font-extrabold transition-colors duration-300 ${
                          isActive(item) ? 'text-[var(--brand-blue)]' : 'text-slate-700 hover:text-[var(--brand-blue)]'
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${openGroup === item.label ? 'rotate-180' : ''}`}
                          aria-hidden
                        />
                      </button>
                      {openGroup === item.label && (
                        <div className="animate-fade-up absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3">
                          <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-2 shadow-[0_24px_60px_rgba(10,40,70,0.18)]">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="focus-ring block rounded-xl px-4 py-3 transition-colors duration-300 hover:bg-[var(--surface-alt)]"
                              >
                                <span className="block text-sm font-black text-slate-800">{child.label}</span>
                                {child.description && <span className="mt-0.5 block text-xs text-slate-500">{child.description}</span>}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`focus-ring relative inline-flex rounded-lg px-3.5 py-2.5 text-[13.5px] font-extrabold transition-colors duration-300 after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[var(--brand-red)] after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                        isActive(item) ? 'text-[var(--brand-blue)] after:scale-x-100' : 'text-slate-700 hover:text-[var(--brand-blue)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href={`tel:${site.primaryPhone}`} className="focus-ring group flex items-center gap-2.5 rounded-lg text-xs text-slate-500">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--brand-blue)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--brand-blue)] group-hover:text-white">
                <Phone className="h-4 w-4" aria-hidden />
              </span>
              <span className="leading-tight">
                <strong className="block text-[13px] text-slate-800">+91 {site.phones[0]}</strong>
                Talk to our Travel Expert
              </span>
            </a>
            <Link href="/quote" className="btn btn-ocean btn-sm focus-ring">
              <span>Get a Quote</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${site.primaryPhone}`}
              aria-label={`Call ${site.name}`}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--brand-blue)]"
            >
              <Phone className="h-4 w-4" aria-hidden />
            </a>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white text-slate-700 transition-colors hover:bg-[var(--surface-alt)]"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-96px)] overflow-y-auto border-t border-[var(--line)] bg-white shadow-[0_24px_60px_rgba(10,40,70,0.18)] lg:hidden">
          <nav className="container-shell py-5" aria-label="Mobile">
            <ul className="grid gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                        aria-expanded={openGroup === item.label}
                        className="focus-ring flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-extrabold hover:bg-[var(--surface-alt)]"
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openGroup === item.label ? 'rotate-180' : ''}`} aria-hidden />
                      </button>
                      {openGroup === item.label && (
                        <ul className="mb-2 ml-3 grid gap-0.5 border-l-2 border-[var(--line)] pl-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} className="focus-ring block rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-[var(--surface-alt)]">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="focus-ring block rounded-xl px-4 py-3.5 text-sm font-extrabold hover:bg-[var(--surface-alt)]">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-3">
              <Link href="/quote" className="btn btn-primary focus-ring w-full">
                <span>Get a Free Quote</span>
              </Link>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost focus-ring w-full">
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp Us
                </span>
              </a>
            </div>

            <div className="mt-6 rounded-2xl bg-[var(--surface-alt)] p-4 text-sm">
              <p className="flex gap-2 font-bold text-slate-700">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-red)]" aria-hidden />
                {addressLine}
              </p>
              <div className="mt-3 grid gap-1.5 text-slate-600">
                {site.phones.map((phone) => (
                  <a key={phone} href={`tel:+91${phone}`} className="focus-ring rounded font-bold hover:text-[var(--brand-blue)]">
                    +91 {phone}
                  </a>
                ))}
                <a href={`mailto:${site.email}`} className="focus-ring break-all rounded hover:text-[var(--brand-blue)]">
                  {site.email}
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
