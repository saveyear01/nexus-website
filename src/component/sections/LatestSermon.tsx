"use client";

import { formatDateShort } from "@/lib/date";
import { getAllSermons, getFeaturedSermon } from "@/lib/sermons";
import { getYouTubeThumbnail } from "@/lib/youtube";
import type { Sermon } from "@/types/sermon";
import { ArrowUpRight, Clock, Play } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function LatestSermon() {
    const { featured, quickPicks } = useMemo(() => {
        const f = getFeaturedSermon();
        if (!f) return { featured: undefined, quickPicks: [] as Sermon[] };
        const q = getAllSermons()
            .filter((s) => s.slug !== f.slug)
            .slice(0, 3);
        return { featured: f, quickPicks: q };
    }, []);

    if (!featured) return null;

    return (
        <section className="px-4 md:px-8 py-12 md:py-20">
            <div className="flex items-end justify-between mb-8 md:mb-10">
                <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                        This Week
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 text-[#051D35]">
                        Latest sermon
                    </h2>
                </div>
                <Link
                    href="/sermons"
                    className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#062365] hover:underline"
                >
                    All sermons <ArrowUpRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
                <FeaturedCard sermon={featured} />

                <div className="lg:col-span-2 flex flex-col gap-3">
                    {quickPicks.map((s) => (
                        <QuickPick key={s.slug} sermon={s} />
                    ))}

                    <Link
                        href="/sermons"
                        className="mt-1 grid place-items-center rounded-full bg-[#062365] text-white font-semibold py-3.5 hover:bg-[#051D35] transition-colors"
                    >
                        Browse the library
                    </Link>
                </div>
            </div>
        </section>
    );
}

function FeaturedCard({ sermon }: { sermon: Sermon }) {
    const [imgFailed, setImgFailed] = useState(false);
    const src = sermon.thumbnail ?? getYouTubeThumbnail(sermon.youtubeId);

    return (
        <Link
            href={`/sermons/${sermon.slug}`}
            className="lg:col-span-3 group relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-[#051D35] block"
        >
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(135deg,#062365 0%,#051D35 100%)",
                }}
            />
            {!imgFailed && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    src={src}
                    alt={sermon.title}
                    onError={() => setImgFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
            )}
            <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#051D35]/85 via-[#051D35]/20 to-transparent"
            />

            <div className="absolute top-5 left-5 inline-flex items-center rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5">
                {sermon.series}
            </div>
            <div className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1.5">
                <Clock size={12} /> {sermon.duration}
            </div>

            <div className="absolute inset-0 grid place-items-center">
                <div className="h-20 w-20 rounded-full bg-white text-[#062365] grid place-items-center group-hover:scale-110 transition-transform shadow-[0_12px_32px_-8px_rgba(5,29,53,0.6)]">
                    <Play size={28} className="ml-1" fill="currentColor" />
                </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
                    {sermon.speaker} &middot; {formatDateShort(sermon.date)}
                </div>
                <div className="text-2xl md:text-3xl font-extrabold mt-2 max-w-xl leading-tight">
                    {sermon.title}
                </div>
            </div>
        </Link>
    );
}

function QuickPick({ sermon }: { sermon: Sermon }) {
    const [imgFailed, setImgFailed] = useState(false);
    const src = sermon.thumbnail ?? getYouTubeThumbnail(sermon.youtubeId);

    return (
        <Link
            href={`/sermons/${sermon.slug}`}
            className="group flex items-center gap-4 p-3 rounded-2xl bg-[#EEF1F7] hover:bg-white transition-colors"
        >
            <div
                className="relative h-16 w-24 shrink-0 rounded-xl overflow-hidden"
                style={{
                    background: "linear-gradient(135deg,#062365 0%,#051D35 100%)",
                }}
            >
                {!imgFailed && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={src}
                        alt={sermon.title}
                        onError={() => setImgFailed(true)}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-[#051D35]/40 group-hover:bg-[#051D35]/30 transition-colors" />
                <div className="absolute inset-0 grid place-items-center">
                    <Play
                        size={18}
                        className="text-white ml-0.5"
                        fill="currentColor"
                    />
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-bold text-[#051D35] truncate">
                    {sermon.title}
                </div>
                <div className="text-sm text-[#051D35]/60 truncate">
                    {sermon.speaker} &middot; {sermon.duration}
                </div>
            </div>
            <ArrowUpRight
                size={18}
                className="text-[#051D35]/40 group-hover:text-[#062365] shrink-0"
            />
        </Link>
    );
}
