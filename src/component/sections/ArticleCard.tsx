"use client";

import { formatDateShort } from "@/lib/date";
import type { Article, ArticleCategory } from "@/types/article";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/**
 * Per-category gradient for the card cover fallback.
 *
 * Kept in one place so adding a category in `types/article.ts` makes
 * TypeScript surface anywhere that still needs styling.
 */
const CATEGORY_GRADIENT: Record<ArticleCategory, string> = {
    Theology: "linear-gradient(135deg,#062365 0%,#051D35 100%)",
    Discipleship: "linear-gradient(135deg,#062365 0%,#1B3B8C 100%)",
    Mission: "linear-gradient(135deg,#051D35 0%,#062365 100%)",
    Community: "linear-gradient(135deg,#1B3B8C 0%,#062365 100%)",
};

type Props = {
    article: Article;
    /** Hide the category chip if the surrounding context already implies it. */
    showCategory?: boolean;
};

/**
 * Compact vertical card used in "read next" and related grids on article
 * pages. The horizontal `ArticleListItem` is preferred for the main feed.
 */
export default function ArticleCard({ article, showCategory = true }: Props) {
    const [imgFailed, setImgFailed] = useState(false);
    const gradient = CATEGORY_GRADIENT[article.category];

    return (
        <Link
            href={`/articles/${article.slug}`}
            className="group flex flex-col rounded-[1.75rem] overflow-hidden bg-[#EEF1F7] hover:-translate-y-1 transition-transform duration-300"
        >
            <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ background: gradient }}
            >
                {article.coverImage && !imgFailed && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={article.coverImage}
                        alt={article.title}
                        loading="lazy"
                        onError={() => setImgFailed(true)}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}
                <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                    }}
                />
                {showCategory && (
                    <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5">
                        {article.category}
                    </div>
                )}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1.5">
                    <Clock size={12} /> {article.readTime}
                </div>
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#051D35] leading-tight group-hover:text-[#062365] transition-colors">
                    {article.title}
                </h3>
                <p className="mt-3 text-[#051D35]/70 line-clamp-2 text-sm leading-relaxed">
                    {article.excerpt}
                </p>
                <div className="mt-auto pt-5 flex items-center justify-between">
                    <div className="text-xs text-[#051D35]/60">
                        <div className="font-semibold text-[#051D35]/80">
                            {article.author.name}
                        </div>
                        <div className="mt-0.5">
                            {formatDateShort(article.date)}
                        </div>
                    </div>
                    <ArrowUpRight
                        size={18}
                        className="text-[#051D35]/40 group-hover:text-[#062365] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                    />
                </div>
            </div>
        </Link>
    );
}
