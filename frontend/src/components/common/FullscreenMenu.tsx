"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { X, Sparkles, Heart, Activity, ShieldCheck, Home, Eye, Wifi, Settings, Box } from "lucide-react";
import { useMemoraStore } from "@/lib/store/useMemoraStore";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { href: "/", label: "Home", icon: Home, badge: "Showcase" },
  { href: "/play", label: "Patient Activities", icon: Sparkles, badge: "Calm" },
  { href: "/care", label: "Caregiver Portal", icon: Heart, badge: "Family" },
  { href: "/asha", label: "ASHA Clinical Triage", icon: Eye, badge: "Community" },
  { href: "/house", label: "3D Memory House", icon: Box, badge: "Gallery" },
  { href: "/sync", label: "Offline & Sync Center", icon: Wifi, badge: "Local" },
  { href: "/settings", label: "Accessibility Settings", icon: Settings, badge: "Preferences" },
  { href: "/privacy", label: "Privacy & Consent", icon: ShieldCheck, badge: "DPDP 2023" },
];

export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const pathname = usePathname();
  const { calmMode, toggleCalmMode } = useMemoraStore();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      ref={dialogRef}
      className="glass-menu-overlay fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 md:p-8 transition-opacity duration-300"
      style={{
        background: "rgba(31, 41, 51, 0.9)",
        backdropFilter: "blur(18px) saturate(125%)",
        WebkitBackdropFilter: "blur(18px) saturate(125%)",
        color: "var(--bg)",
      }}
    >
      {/* ── Top Bar inside Menu ── */}
      <div className="glass-menu-toolbar flex items-center justify-between gap-3 rounded-[var(--radius-card)] border px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/6DE0315E-FC3B-4C8D-BE04-76F73846572E.png"
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 shrink-0 rounded-full border border-[var(--accent-light)] object-cover"
          />
          <div>
            <span className="text-xl font-bold tracking-tight block">Memora</span>
            <span className="text-xs uppercase tracking-wider block opacity-75">North East India</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Calm mode quick toggle */}
          <button
            type="button"
            onClick={toggleCalmMode}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-colors cursor-pointer"
            style={{
              minHeight: "48px",
              background: calmMode ? "var(--primary)" : "rgba(251, 248, 243, 0.06)",
              color: "var(--bg)",
              borderColor: "rgba(251, 248, 243, 0.22)",
            }}
            aria-pressed={calmMode}
          >
            <Activity size={16} />
            <span>Calm Mode: {calmMode ? "ON" : "OFF"}</span>
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="glass-menu-close w-12 h-12 rounded-full border flex items-center justify-center transition-colors cursor-pointer"
            style={{ color: "var(--bg)" }}
            aria-label="Close menu"
          >
            <X size={26} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Menu Links with Struck-Through Current Page ── */}
      <nav className="my-auto grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 gap-3 py-5 sm:py-7 overflow-y-auto" aria-label="Main navigation">
        {MENU_LINKS.map((item) => {
          const isCurrent =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`glass-menu-link group flex min-h-20 items-center justify-between gap-3 rounded-[var(--radius-card)] border px-4 py-3 sm:px-5 no-underline transition-all duration-200 ${
                isCurrent ? "line-through opacity-50" : "opacity-95 hover:opacity-100"
              }`}
              style={{ color: "var(--bg)" }}
              aria-current={isCurrent ? "page" : undefined}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <span className="glass-menu-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
                  <Icon size={21} />
                </span>
                <span className="min-w-0 text-lg font-bold leading-tight sm:text-xl md:text-2xl">{item.label}</span>
              </div>
              <span className="glass-menu-badge shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider sm:px-3 sm:text-[10px]">
                {item.badge}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Footer within Menu ── */}
      <div className="glass-menu-footer flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-card)] border px-4 py-3 text-[11px] sm:px-5 sm:text-xs">
        <p>Offline-first · Zero facial tracking · DPDP Act 2023 compliant</p>
        <p>Built for North East India (SIH26003)</p>
      </div>
    </div>
  );
}
