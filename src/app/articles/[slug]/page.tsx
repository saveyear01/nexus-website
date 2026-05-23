import Footer from "@/component/layouts/Footer";
import Header from "@/component/layouts/Header";
import ArticleCard from "@/component/sections/ArticleCard";
import ArticleContent from "@/component/sections/ArticleContent";
import ShareButton from "@/component/sections/ShareButton";
import { ARTICLES } from "@/data/articles";
import { formatDate } from "@/lib/date";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import {
    ArrowLeft,
    ChevronRight,
    Clock,
    Tag,
    User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
    return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) return { title: "Article · Nexus" };
    return {
        title: `${article.title} · Nexus Articles`,
        description: article.excerpt,
    };
}

export default async function ArticleDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) notFound();

    const related = getRelatedArticles(slug, 3);

    return (
        <div className="max-w-[1440px] mx-auto pt-4 md:pt-6 pb-8">
            <Header />
            <main className="mt-6 md:mt-10">
                {/* Centered reading layout */}
                <article className="px-4 md:px-8">
                    {/* Breadcrumb */}
                    <nav className="max-w-3xl mx-auto flex items-center gap-2 text-sm text-[#051D35]/60">
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-1 hover:text-[#062365] font-semibold"
                        >
                            <ArrowLeft size={14} /> All articles
                        </Link>
                        <ChevronRight size={14} className="opacity-50" />
                        <span className="font-semibold text-[#062365]">
                            {article.category}
                        </span>
                    </nav>

                    {/* Title block (centered) */}
                    <header className="max-w-3xl mx-auto mt-10 md:mt-14 text-center">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                            {article.category}
                        </span>
                        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#051D35]">
                            {article.title}
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-[#051D35]/70 leading-relaxed">
                            {article.excerpt}
                        </p>
                        <div className="mt-8 inline-flex items-center gap-3">
                            <span className="grid place-items-center h-11 w-11 rounded-full bg-[#EEF1F7] text-[#062365]">
                                <User size={18} />
                            </span>
                            <div className="text-left text-sm">
                                <div className="font-bold text-[#051D35]">
                                    {article.author.name}
                                </div>
                                <div className="text-[#051D35]/60">
                                    {formatDate(article.date)}
                                    <span className="mx-2 text-[#051D35]/30">·</span>
                                    <span className="inline-flex items-center gap-1">
                                        <Clock size={11} /> {article.readTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>
                </article>

                {/* Full-width cover */}
                <div className="mt-12 md:mt-16 px-4 md:px-8">
                    <div
                        className="relative aspect-[16/8] md:aspect-[16/6] rounded-[2rem] overflow-hidden"
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
                        {article.coverImage && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={article.coverImage}
                                alt={article.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="px-4 md:px-8 mt-14 md:mt-20">
                    <div className="max-w-2xl mx-auto">
                        <ArticleContent blocks={article.content} />

                        {/* Tags + share */}
                        <div className="mt-16 pt-8 border-t border-[#051D35]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#051D35]/50 mb-3">
                                    <Tag size={12} /> Tags
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/articles?tag=${encodeURIComponent(tag)}`}
                                            className="text-xs font-semibold rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5 hover:bg-[#062365] hover:text-white transition-colors"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <ShareButton title={article.title} />
                        </div>

                        {/* Author bio (centered, no sidebar) */}
                        {article.author.bio && (
                            <div className="mt-14 rounded-[1.5rem] bg-[#EEF1F7] p-8 md:p-10">
                                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#051D35]/50">
                                    Written by
                                </div>
                                <div className="mt-4 flex items-start gap-4">
                                    <span className="shrink-0 grid place-items-center h-14 w-14 rounded-full bg-white text-[#062365]">
                                        <User size={22} />
                                    </span>
                                    <div>
                                        <div className="text-2xl font-extrabold tracking-tight text-[#051D35] leading-tight">
                                            {article.author.name}
                                        </div>
                                        <div className="text-sm text-[#051D35]/60 font-semibold">
                                            {article.author.role}
                                        </div>
                                        <p className="mt-3 text-[#051D35]/80 leading-relaxed">
                                            {article.author.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Read next */}
                {related.length > 0 && (
                    <div className="mt-20 md:mt-28 px-4 md:px-8">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-end justify-between mb-8 pb-6 border-b border-[#051D35]/10">
                                <div>
                                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                                        Read next
                                    </span>
                                    <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-[#051D35]">
                                        More on {article.category}
                                    </h2>
                                </div>
                                <Link
                                    href="/articles"
                                    className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#062365] hover:underline"
                                >
                                    All articles <ChevronRight size={16} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                                {related.map((a) => (
                                    <ArticleCard
                                        key={a.slug}
                                        article={a}
                                        showCategory={false}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
