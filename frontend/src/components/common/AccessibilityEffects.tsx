"use client";

import { useEffect } from "react";
import { useMemoraStore } from "@/lib/store/useMemoraStore";

const FONT_SCALE: Record<string, string> = {
  medium: "100%",
  large: "130%",
  xlarge: "160%",
};

export function AccessibilityEffects() {
  const fontSize = useMemoraStore((state) => state.fontSize);
  const highContrast = useMemoraStore((state) => state.highContrast);
  const audioAssistance = useMemoraStore((state) => state.audioAssistance);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = FONT_SCALE[fontSize] ?? FONT_SCALE.medium;
    root.classList.toggle("high-contrast", highContrast);
    root.dataset.fontSize = fontSize;
  }, [fontSize, highContrast]);

  useEffect(() => {
    if (!audioAssistance && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [audioAssistance]);

  return null;
}
