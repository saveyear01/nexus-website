"use client";

import Footer from "@/component/layouts/Footer";
import Header from "@/component/layouts/Header";
import SermonCard from "@/component/sections/SermonCard";
import { formatDateShort } from "@/lib/date";
import {
    getAllSermons,
    getAllSeries,
    getAllSpeakers,
    getFeaturedSermon,
} from "@/lib/sermons";
import { getYouTubeThumbnail } from "@/lib/youtube";
import type { Sermon } from "@/types/sermon";
import { ArrowDown, ArrowUp, Clock, Play, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Sort = "newest" | "oldest";

export default function SermonsPage() {
    const all = useMemo(() => getAllSermons(), []);
    const series = useMemo(() => getAllSeries(), []);
    const speakers = useMemo(() => getAllSpeakers(), []);

    const [query, setQuery] = useState("");
    const [activeSeries, setActiveSeries] = useState<string | null>(null);
    const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
    const [sort, setSort] = useState<Sort>("newest");

    const featured = useMemo(() => getFeaturedSermon() ?? all[0], [all]);

    const filtered = useMemo(() => {
        let list = all;
        if (activeSeries) list = list.filter((s) => s.series === activeSeries);
        if (activeSpeaker) list = list.filter((s) => s.speaker === activeSpeaker);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(
                (s) =>
                    s.title.toLowerCase().includes(q) ||
                    s.speaker.toLowerCase().includes(q) ||
                    s.summary.toLowerCase().includes(q) ||
                    s.scripture.toLowerCase().includes(q) ||
                    s.topics.some((t) => t.toLowerCase().includes(q))
            );
        }
        list = [...list].sort((a, b) =>
            sort === "newest"
                ? new Date(b.date).getTime() - new Date(a.date).getTime()
                : new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        return list;
    }, [all, query, activeSeries, activeSpeaker, sort]);

    const hasFilters = query || activeSeries || activeSpeaker;

    const clearFilters = () => {
        setQuery("");
        setActiveSeries(null);
        setActiveSpeaker(null);
    };

    return (
        <div className="max-w-[1440px] mx-auto pt-4 md:pt-6 pb-8">
            <Header />
            <main className="mt-6 md:mt-10 px-4 md:px-8">
                {/* Page header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                            The Library
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-4 leading-[1.02] text-[#051D35]">
                            Sermons<span className="text-[#062365]">.</span>
                        </h1>
                        <p className="mt-4 max-w-xl text-[#051D35]/70 text-lg">
                            Every message from our gatherings — search, filter, and dig
                            into the series shaping our covenant.
                        </p>
                    </div>
                    <div className="text-sm text-[#051D35]/60">
                        <span className="font-bold text-[#062365] text-2xl">
                            {all.length}
                        </span>{" "}
                        sermons in the archive
                    </div>
                </div>

                {/* Featured */}
                {featured && (
                    <FeaturedSermon sermon={featured} className="mt-10 md:mt-14" />
                )}

                {/* Filter bar */}
                <div className="mt-12 md:mt-16">
                    <div className="rounded-[2rem] bg-[#EEF1F7] p-4 md:p-5">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <label className="flex items-center gap-2 flex-1 rounded-full bg-white px-5 h-12 md:h-14">
                                <Search size={18} className="text-[#051D35]/50" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search title, speaker, scripture, topic..."
                                    className="flex-1 bg-transparent outline-none font-medium text-[#051D35] placeholder:text-[#051D35]/40"
                                />
                                {query && (
                                    <button
                                        onClick={() => setQuery("")}
                                        aria-label="Clear search"
                                        className="text-[#051D35]/50 hover:text-[#062365]"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </label>

                            <SortToggle sort={sort} onChange={setSort} />
                        </div>

                        {/* Series chips */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Chip
                                active={activeSeries === null}
                                onClick={() => setActiveSeries(null)}
                            >
                                All series
                            </Chip>
                            {series.map((s) => (
                                <Chip
                                    key={s}
                                    active={activeSeries === s}
                                    onClick={() =>
                                        setActiveSeries((current) => (current === s ? null : s))
                                    }
                                >
                                    {s}
                                </Chip>
                            ))}
                        </div>

                        {/* Speaker chips */}
                        <div className="mt-3 flex flex-wrap gap-2 items-center">
                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#051D35]/50 mr-1">
                                Speaker
                            </span>
                            <Chip
                                small
                                active={activeSpeaker === null}
                                onClick={() => setActiveSpeaker(null)}
                            >
                                Anyone
                            </Chip>
                            {speakers.map((sp) => (
                                <Chip
                                    key={sp}
                                    small
                                    active={activeSpeaker === sp}
                                    onClick={() =>
                                        setActiveSpeaker((c) => (c === sp ? null : sp))
                                    }
                                >
                                    {sp}
                                </Chip>
                            ))}
                        </div>
                    </div>

                    {hasFilters && (
                        <div className="flex items-center justify-between mt-4 px-2">
                            <div className="text-sm text-[#051D35]/60">
                                Showing{" "}
                                <span className="font-bold text-[#062365]">
                                    {filtered.length}
                                </span>{" "}
                                of {all.length}
                            </div>
                            <button
                                onClick={clearFilters}
                                className="text-sm font-semibold text-[#062365] hover:underline inline-flex items-center gap-1"
                            >
                                <X size={14} /> Clear filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Grid */}
                <div className="mt-8 md:mt-10">
                    {filtered.length === 0 ? (
                        <EmptyState onReset={clearFilters} />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {filtered.map((s) => (
                                <SermonCard key={s.slug} sermon={s} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function FeaturedSermon({
    sermon,
    className,
}: {
    sermon: Sermon;
    className?: string;
}) {
    const [imgFailed, setImgFailed] = useState(false);
    const thumbnailSrc =
        sermon.thumbnail ?? getYouTubeThumbnail(sermon.youtubeId);

    return (
        <Link
            href={`/sermons/${sermon.slug}`}
            className={`group block rounded-[2rem] overflow-hidden ${className ?? ""}`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto bg-[#051D35] overflow-hidden">
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(135deg,#062365 0%,#051D35 100%)",
                        }}
                    />
                    {!imgFailed && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={thumbnailSrc}
                            alt={sermon.title}
                            onError={() => setImgFailed(true)}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    )}
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[#051D35]/75 via-[#051D35]/20 to-[#051D35]/40"
                    />
                    {imgFailed && (
                        <div
                            aria-hidden
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage:
                                    "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                                backgroundSize: "22px 22px",
                            }}
                        />
                    )}
                    <div className="absolute top-6 left-6 inline-flex items-center rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5">
                        Featured · This week
                    </div>
                    <div className="absolute inset-0 grid place-items-center">
                        <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-white text-[#062365] grid place-items-center group-hover:scale-110 transition-transform shadow-[0_12px_32px_-8px_rgba(5,29,53,0.5)]">
                            <Play
                                size={30}
                                className="ml-1"
                                fill="currentColor"
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5 bg-[#EEF1F7] p-8 md:p-12 flex flex-col justify-between gap-8">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#062365]">
                            {sermon.series}
                        </div>
                        <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-[#051D35]">
                            {sermon.title}
                        </h2>
                        <p className="mt-4 text-[#051D35]/70 line-clamp-3">
                            {sermon.summary}
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="text-[#051D35]/70">
                            <div className="font-bold text-[#051D35]">
                                {sermon.speaker}
                            </div>
                            <div>{sermon.speakerRole}</div>
                        </div>
                        <div className="flex items-center gap-3 text-[#051D35]/60">
                            <span className="inline-flex items-center gap-1">
                                <Clock size={14} /> {sermon.duration}
                            </span>
                            <span>·</span>
                            <span>{formatDateShort(sermon.date)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function SortToggle({
    sort,
    onChange,
}: {
    sort: Sort;
    onChange: (s: Sort) => void;
}) {
    return (
        <div className="inline-flex bg-white rounded-full p-1 self-start md:self-auto">
            <button
                onClick={() => onChange("newest")}
                className={`inline-flex items-center gap-1.5 px-4 h-10 rounded-full text-sm font-semibold transition-colors ${
                    sort === "newest"
                        ? "bg-[#062365] text-white"
                        : "text-[#051D35]/70 hover:text-[#062365]"
                }`}
            >
                <ArrowDown size={14} /> Newest
            </button>
            <button
                onClick={() => onChange("oldest")}
                className={`inline-flex items-center gap-1.5 px-4 h-10 rounded-full text-sm font-semibold transition-colors ${
                    sort === "oldest"
                        ? "bg-[#062365] text-white"
                        : "text-[#051D35]/70 hover:text-[#062365]"
                }`}
            >
                <ArrowUp size={14} /> Oldest
            </button>
        </div>
    );
}

function Chip({
    active,
    onClick,
    children,
    small,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    small?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full font-semibold transition-colors ${
                small ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2"
            } ${
                active
                    ? "bg-[#062365] text-white"
                    : "bg-white text-[#051D35]/70 hover:text-[#062365]"
            }`}
        >
            {children}
        </button>
    );
}

function EmptyState({ onReset }: { onReset: () => void }) {
    return (
        <div className="rounded-[2rem] bg-[#EEF1F7] py-20 px-8 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-white grid place-items-center text-[#062365]">
                <Search size={22} />
            </div>
            <div className="mt-6 text-2xl font-extrabold text-[#051D35]">
                No sermons match those filters.
            </div>
            <p className="mt-2 text-[#051D35]/60 max-w-md mx-auto">
                Try a different search term or clear your filters to see the full
                library.
            </p>
            <button
                onClick={onReset}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#062365] text-white font-semibold px-5 py-3 hover:bg-[#051D35] transition-colors"
            >
                Reset filters
            </button>
        </div>
    );
}
