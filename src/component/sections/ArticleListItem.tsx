"use client";

import { formatDateShort } from "@/lib/date";
import type { Article, ArticleCategory } from "@/types/article";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CATEGORY_GRADIENT: Record<ArticleCategory, string> = {
    Theology: "linear-gradient(135deg,#062365 0%,#051D35 100%)",
    Discipleship: "linear-gradient(135deg,#062365 0%,#1B3B8C 100%)",
    Mission: "linear-gradient(135deg,#051D35 0%,#062365 100%)",
    Community: "linear-gradient(135deg,#1B3B8C 0%,#062365 100%)",
};

/**
 * Horizontal row used in the main article feed.
 *
 * Visually distinct from sermon cards by using a row layout with a side
 * thumbnail and visible excerpt, while keeping the same site-wide typography
 * and surface conventions.
 */
export default function ArticleListItem({ article }: { article: Article }) {
    const [imgFailed, setImgFailed] = useState(false);
    const gradient = CATEGORY_GRADIENT[article.category];

    return (
        <Link
            href={`/articles/${article.slug}`}
            className="group grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5 md:gap-7 py-7 md:py-9 border-b border-[#051D35]/10 first:pt-2 last:border-b-0"
        >
            <div
                className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden"
                style={{ background: gradient }}
            >
                {article.coverImage && !imgFailed && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={article.coverImage}
                        alt={article.title}
                        loading="lazy"
                        onError={() => setImgFailed(true)}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
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
            </div>

            <div className="flex flex-col justify-center min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                        {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-[#EEF1F7] text-[#051D35]/70 px-3 py-1.5">
                        <Clock size={11} /> {article.readTime}
                    </span>
                </div>
                <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-[#051D35] group-hover:text-[#062365] transition-colors">
                    {article.title}
                </h3>
                <p className="mt-3 text-[#051D35]/70 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                    <div className="text-sm text-[#051D35]/70">
                        <span className="font-semibold text-[#051D35]">
                            {article.author.name}
                        </span>
                        <span className="mx-2 text-[#051D35]/30">·</span>
                        <span>{formatDateShort(article.date)}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#062365] group-hover:underline">
                        Read article
                        <ArrowUpRight
                            size={14}
                            className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                        />
                    </span>
                </div>
            </div>
        </Link>
    );
}
