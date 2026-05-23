"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);

    const onClick = async () => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        try {
            if (navigator.share) {
                await navigator.share({ title, url });
                return;
            }
        } catch {
            // user cancelled or share unavailable — fall through to copy
        }
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // ignore
        }
    };

    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-full bg-[#EEF1F7] hover:bg-white text-[#062365] font-semibold px-5 h-11 transition-colors"
        >
            {copied ? (
                <>
                    <Check size={16} /> Link copied
                </>
            ) : (
                <>
                    <Share2 size={16} /> Share
                </>
            )}
        </button>
    );
}
