"use client";

import { useChat } from "@/component/sections/ChatProvider";
import {
    ArrowRight,
    BookOpenText,
    Lock,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import { useState } from "react";

const SUGGESTIONS: { label: string; query: string }[] = [
    { label: "Covenant", query: "What does Nexus believe about covenant?" },
    { label: "Prayer", query: "Help me start praying." },
    { label: "Small groups", query: "How do I find a small group?" },
    { label: "Mission", query: "What does Nexus believe about mission?" },
    { label: "Giving", query: "Where does my giving go at Nexus?" },
];

/**
 * Homepage hero. Single-column, center-aligned, plain white background.
 *
 * The compose input is the visual anchor — Ask Nexus is positioned as the
 * primary way into the church.
 */
export default function Hero() {
    return (
        <section className="relative bg-white px-4 md:px-8 pt-28 md:pt-20 pb-20 md:pb-28">
            <div className="relative max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                    <Sparkles size={14} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                        AI Assistant · Trained on Nexus
                    </span>
                </span>

                <h1 className="mt-6 text-6xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tight leading-[0.95] text-[#051D35]">
                    Ask <span className="text-[#062365]">Nexus</span>
                    <br />
                    anything<span className="text-[#062365]">.</span>
                </h1>

                <p className="mt-6 mx-auto max-w-2xl text-lg md:text-xl text-[#051D35]/70 leading-relaxed">
                    A conversational way to explore what we believe, how we gather,
                    and the next step on your faith journey &mdash; with answers
                    drawn from our sermons, articles, and resources.
                </p>

                <div className="mt-10">
                    <AskCompose />
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
                    <TrustBadge icon={ShieldCheck} text="Grounded in Nexus teaching" />
                    <TrustBadge icon={BookOpenText} text="Every answer cited" />
                    <TrustBadge icon={Lock} text="Free, private, no account" />
                </div>
            </div>
        </section>
    );
}

function AskCompose() {
    const { open } = useChat();
    const [value, setValue] = useState("");

    const handoff = (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) {
            open();
            return;
        }
        setValue("");
        open(trimmed);
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handoff(value);
                }}
                className="flex items-center gap-2 rounded-2xl bg-white border border-[#051D35]/10 focus-within:border-[#062365] transition-colors p-2 md:p-2.5 shadow-[0_24px_60px_-24px_rgba(5,29,53,0.35)] text-left"
            >
                <span
                    aria-hidden
                    className="grid place-items-center h-11 w-11 md:h-12 md:w-12 rounded-xl bg-[#EEF1F7] text-[#062365] shrink-0"
                >
                    <Sparkles size={20} />
                </span>
                <label htmlFor="hero-ask" className="sr-only">
                    Ask Nexus a question
                </label>
                <input
                    id="hero-ask"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Ask anything — prayer, covenant, small groups..."
                    className="flex-1 min-w-0 bg-transparent outline-none text-[#051D35] placeholder:text-[#051D35]/40 font-medium text-base md:text-lg"
                />
                <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#062365] hover:bg-[#051D35] text-white font-semibold px-4 md:px-5 h-11 md:h-12 text-sm transition-colors shrink-0"
                >
                    Ask
                    <ArrowRight size={14} />
                </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#051D35]/50 mr-1">
                    Try
                </span>
                {SUGGESTIONS.map((s) => (
                    <button
                        key={s.label}
                        type="button"
                        onClick={() => handoff(s.query)}
                        className="text-xs font-semibold rounded-full bg-white text-[#062365] border border-[#051D35]/10 px-3 py-1.5 hover:bg-[#062365] hover:text-white hover:border-transparent transition-colors"
                    >
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function TrustBadge({
    icon: Icon,
    text,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    text: string;
}) {
    return (
        <span className="inline-flex items-center gap-1.5 text-[#051D35]/70 font-semibold">
            <Icon size={14} className="text-[#062365]" />
            {text}
        </span>
    );
}
