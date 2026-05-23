"use client";

import Footer from "@/component/layouts/Footer";
import Header from "@/component/layouts/Header";
import ArticleListItem from "@/component/sections/ArticleListItem";
import { formatDateShort } from "@/lib/date";
import {
    getAllArticles,
    getAllCategories,
    getFeaturedArticle,
} from "@/lib/articles";
import type { Article, ArticleCategory } from "@/types/article";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpRight,
    Clock,
    Mail,
    Search,
    X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Sort = "newest" | "oldest";

export default function ArticlesPage() {
    const all = useMemo(() => getAllArticles(), []);
    const categories = useMemo(() => getAllCategories(), []);
    const featured = useMemo(() => getFeaturedArticle() ?? all[0], [all]);

    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] =
        useState<ArticleCategory | null>(null);
    const [sort, setSort] = useState<Sort>("newest");

    const filtered = useMemo(() => {
        let list = all.filter((a) => a.slug !== featured?.slug);
        if (activeCategory)
            list = list.filter((a) => a.category === activeCategory);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(
                (a) =>
                    a.title.toLowerCase().includes(q) ||
                    a.excerpt.toLowerCase().includes(q) ||
                    a.author.name.toLowerCase().includes(q) ||
                    a.tags.some((t) => t.toLowerCase().includes(q))
            );
        }
        return [...list].sort((a, b) =>
            sort === "newest"
                ? new Date(b.date).getTime() - new Date(a.date).getTime()
                : new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, [all, featured, query, activeCategory, sort]);

    const hasFilters = query || activeCategory;
    const clearFilters = () => {
        setQuery("");
        setActiveCategory(null);
    };

    const categoryCounts = useMemo(() => {
        const counts: Partial<Record<ArticleCategory, number>> = {};
        for (const a of all) {
            counts[a.category] = (counts[a.category] ?? 0) + 1;
        }
        return counts;
    }, [all]);

    const popularTags = useMemo(() => {
        const seen = new Map<string, number>();
        for (const a of all) {
            for (const tag of a.tags) {
                seen.set(tag, (seen.get(tag) ?? 0) + 1);
            }
        }
        return [...seen.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([tag]) => tag);
    }, [all]);

    return (
        <div className="max-w-[1440px] mx-auto pt-4 md:pt-6 pb-8">
            <Header />
            <main className="mt-6 md:mt-10 px-4 md:px-8">
                {/* Page header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                            Read & think
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-4 leading-[1.02] text-[#051D35]">
                            Articles<span className="text-[#062365]">.</span>
                        </h1>
                        <p className="mt-4 max-w-xl text-[#051D35]/70 text-lg">
                            Short essays from our pastors and teaching team — covenant,
                            mission, discipleship, and the everyday work of following
                            Jesus.
                        </p>
                    </div>
                    <div className="text-sm text-[#051D35]/60">
                        <span className="font-bold text-[#062365] text-2xl">
                            {all.length}
                        </span>{" "}
                        articles published
                    </div>
                </div>

                {/* Featured editorial hero */}
                {featured && <FeaturedArticle article={featured} />}

                {/* Feed + sidebar */}
                <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    <section className="lg:col-span-8">
                        <div className="flex items-baseline justify-between mb-6 md:mb-8">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#051D35]">
                                Latest
                            </h2>
                            <SortToggle sort={sort} onChange={setSort} />
                        </div>

                        {/* Search + chips */}
                        <div className="mb-6 md:mb-8">
                            <label className="flex items-center gap-2 rounded-full bg-[#EEF1F7] px-5 h-12">
                                <Search size={16} className="text-[#051D35]/50" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search title, author, tag..."
                                    className="flex-1 bg-transparent outline-none text-sm font-medium text-[#051D35] placeholder:text-[#051D35]/40"
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
                            <div className="mt-3 flex flex-wrap gap-2">
                                <Chip
                                    active={activeCategory === null}
                                    onClick={() => setActiveCategory(null)}
                                >
                                    All
                                </Chip>
                                {categories.map((c) => (
                                    <Chip
                                        key={c}
                                        active={activeCategory === c}
                                        onClick={() =>
                                            setActiveCategory((cur) =>
                                                cur === c ? null : c
                                            )
                                        }
                                    >
                                        {c}
                                    </Chip>
                                ))}
                            </div>
                        </div>

                        {hasFilters && (
                            <div className="flex items-center justify-between mb-2 text-sm">
                                <div className="text-[#051D35]/60">
                                    Showing{" "}
                                    <span className="font-bold text-[#062365]">
                                        {filtered.length}
                                    </span>{" "}
                                    of {all.length - 1}
                                </div>
                                <button
                                    onClick={clearFilters}
                                    className="font-semibold text-[#062365] hover:underline inline-flex items-center gap-1"
                                >
                                    <X size={14} /> Clear
                                </button>
                            </div>
                        )}

                        {filtered.length === 0 ? (
                            <EmptyState onReset={clearFilters} />
                        ) : (
                            <div className="divide-y divide-[#051D35]/10">
                                {filtered.map((a) => (
                                    <ArticleListItem key={a.slug} article={a} />
                                ))}
                            </div>
                        )}
                    </section>

                    <aside className="lg:col-span-4 space-y-6">
                        {/* Categories card */}
                        <SidebarCard title="Browse by category">
                            <ul className="space-y-1">
                                {categories.map((c) => (
                                    <li key={c}>
                                        <button
                                            onClick={() => setActiveCategory(c)}
                                            className="w-full group flex items-center justify-between py-2 px-3 -mx-3 rounded-xl hover:bg-[#EEF1F7] text-left"
                                        >
                                            <span className="font-semibold text-[#051D35] group-hover:text-[#062365]">
                                                {c}
                                            </span>
                                            <span className="text-sm text-[#051D35]/50 font-medium">
                                                {categoryCounts[c] ?? 0}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </SidebarCard>

                        {/* Popular tags */}
                        <SidebarCard title="Popular tags">
                            <div className="flex flex-wrap gap-2">
                                {popularTags.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setQuery(t)}
                                        className="text-xs font-semibold rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5 hover:bg-[#062365] hover:text-white transition-colors"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </SidebarCard>

                        {/* Newsletter */}
                        <div className="rounded-[1.5rem] bg-[#051D35] text-white p-6">
                            <Mail size={22} className="text-[#EEF1F7]" />
                            <h3 className="mt-4 text-2xl font-extrabold tracking-tight leading-tight">
                                One essay a week, straight to your inbox.
                            </h3>
                            <p className="mt-2 text-sm text-white/70">
                                A short Friday email with the best of what our team is
                                writing. No spam.
                            </p>
                            <Link
                                href="#"
                                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-[#062365] font-semibold px-4 h-10 text-sm hover:bg-[#EEF1F7] transition-colors"
                            >
                                Subscribe <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function FeaturedArticle({ article }: { article: Article }) {
    return (
        <Link
            href={`/articles/${article.slug}`}
            className="group block mt-10 md:mt-14"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div
                    className="relative lg:col-span-7 aspect-[16/10] rounded-[2rem] overflow-hidden"
                    style={{
                        background:
                            "linear-gradient(135deg,#062365 0%,#051D35 100%)",
                    }}
                >
                    <div
                        aria-hidden
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "22px 22px",
                        }}
                    />
                    <div className="absolute top-6 left-6 inline-flex items-center rounded-full bg-white text-[#062365] text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5">
                        Editor's pick
                    </div>
                </div>
                <div className="lg:col-span-5">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                            {article.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-[#EEF1F7] text-[#051D35]/70 px-3 py-1.5">
                            <Clock size={11} /> {article.readTime}
                        </span>
                    </div>
                    <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#051D35] group-hover:text-[#062365] transition-colors">
                        {article.title}
                    </h2>
                    <p className="mt-5 text-lg text-[#051D35]/70 leading-relaxed line-clamp-3">
                        {article.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-[#051D35]/70">
                            <span className="font-semibold text-[#051D35]">
                                {article.author.name}
                            </span>
                            <span className="mx-2 text-[#051D35]/30">·</span>
                            <span>{formatDateShort(article.date)}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#062365] group-hover:underline">
                            Read article <ArrowUpRight size={14} />
                        </span>
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
        <div className="inline-flex bg-[#EEF1F7] rounded-full p-1">
            <button
                onClick={() => onChange("newest")}
                className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-semibold transition-colors ${
                    sort === "newest"
                        ? "bg-[#062365] text-white"
                        : "text-[#051D35]/70 hover:text-[#062365]"
                }`}
            >
                <ArrowDown size={12} /> Newest
            </button>
            <button
                onClick={() => onChange("oldest")}
                className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-semibold transition-colors ${
                    sort === "oldest"
                        ? "bg-[#062365] text-white"
                        : "text-[#051D35]/70 hover:text-[#062365]"
                }`}
            >
                <ArrowUp size={12} /> Oldest
            </button>
        </div>
    );
}

function Chip({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${
                active
                    ? "bg-[#062365] text-white"
                    : "bg-[#EEF1F7] text-[#051D35]/70 hover:text-[#062365]"
            }`}
        >
            {children}
        </button>
    );
}

function SidebarCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-[1.5rem] bg-white border border-[#051D35]/10 p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#051D35]/50 mb-4">
                {title}
            </div>
            {children}
        </div>
    );
}

function EmptyState({ onReset }: { onReset: () => void }) {
    return (
        <div className="py-20 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-[#EEF1F7] grid place-items-center text-[#062365]">
                <Search size={22} />
            </div>
            <div className="mt-6 text-2xl font-extrabold tracking-tight text-[#051D35]">
                Nothing matches that search.
            </div>
            <p className="mt-2 text-[#051D35]/60 max-w-md mx-auto">
                Try a different term or clear your filters.
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
