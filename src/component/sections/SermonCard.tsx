"use client";

import { Clock, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatDateShort } from "@/lib/date";
import { getYouTubeThumbnail } from "@/lib/youtube";
import type { Sermon } from "@/types/sermon";

const SERIES_GRADIENT: Record<string, string> = {
    "The God who keeps covenant":
        "linear-gradient(135deg,#062365 0%,#051D35 100%)",
    "Living the Beatitudes":
        "linear-gradient(135deg,#062365 0%,#1B3B8C 100%)",
};

export default function SermonCard({
    sermon,
    showSeries = true,
}: {
    sermon: Sermon;
    showSeries?: boolean;
}) {
    const [imgFailed, setImgFailed] = useState(false);

    const gradient =
        SERIES_GRADIENT[sermon.series] ||
        "linear-gradient(135deg,#062365 0%,#051D35 100%)";

    const thumbnailSrc =
        sermon.thumbnail ?? getYouTubeThumbnail(sermon.youtubeId);

    return (
        <Link
            href={`/sermons/${sermon.slug}`}
            className="group flex flex-col rounded-[1.75rem] overflow-hidden bg-[#EEF1F7] hover:-translate-y-1 transition-transform duration-300"
        >
            <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ background: gradient }}
            >
                {!imgFailed && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={thumbnailSrc}
                        alt={sermon.title}
                        loading="lazy"
                        onError={() => setImgFailed(true)}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}
                <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#051D35]/75 via-[#051D35]/15 to-[#051D35]/40"
                />
                {imgFailed && (
                    <div
                        aria-hidden
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                        }}
                    />
                )}
                {showSeries && (
                    <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5">
                        {sermon.series}
                    </div>
                )}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1.5">
                    <Clock size={12} /> {sermon.duration}
                </div>
                <div className="absolute inset-0 grid place-items-center">
                    <div className="h-16 w-16 rounded-full bg-white text-[#062365] grid place-items-center group-hover:scale-110 transition-transform shadow-[0_8px_24px_-8px_rgba(5,29,53,0.5)]">
                        <Play size={22} className="ml-0.5" fill="currentColor" />
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] opacity-90">
                        {sermon.scripture}
                    </div>
                </div>
            </div>
            <div className="p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-extrabold text-[#051D35] leading-tight group-hover:text-[#062365] transition-colors">
                    {sermon.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-sm text-[#051D35]/60">
                    <span className="font-semibold text-[#051D35]/80">
                        {sermon.speaker}
                    </span>
                    <span>&middot;</span>
                    <span>{formatDateShort(sermon.date)}</span>
                </div>
            </div>
        </Link>
    );
}
