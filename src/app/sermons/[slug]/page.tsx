import Footer from "@/component/layouts/Footer";
import Header from "@/component/layouts/Header";
import SermonCard from "@/component/sections/SermonCard";
import ShareButton from "@/component/sections/ShareButton";
import { SERMONS } from "@/data/sermons";
import { formatDate } from "@/lib/date";
import { getRelatedSermons, getSermonBySlug } from "@/lib/sermons";
import { getYouTubeEmbedUrl, getYouTubeWatchUrl } from "@/lib/youtube";
import type { SermonResource, SermonResourceKind } from "@/types/sermon";
import {
    ArrowLeft,
    ArrowUpRight,
    BookMarked,
    BookOpenText,
    Calendar,
    ChevronRight,
    Clock,
    Download,
    ExternalLink,
    FileText,
    Headphones,
    Library,
    MessageCircleQuestion,
    Music,
    Newspaper,
    User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
    return SERMONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const sermon = getSermonBySlug(slug);
    if (!sermon) return { title: "Sermon · Nexus" };
    return {
        title: `${sermon.title} · Nexus Sermons`,
        description: sermon.summary,
    };
}

export default async function SermonDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const sermon = getSermonBySlug(slug);
    if (!sermon) notFound();

    const related = getRelatedSermons(slug, 3);
    const bibleGatewayUrl = (ref: string) =>
        `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=ESV`;

    return (
        <div className="max-w-[1440px] mx-auto pt-4 md:pt-6 pb-8">
            <Header />
            <main className="mt-6 md:mt-10 px-4 md:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-[#051D35]/60">
                    <Link href="/sermons" className="inline-flex items-center gap-1 hover:text-[#062365] font-semibold">
                        <ArrowLeft size={14} /> All sermons
                    </Link>
                    <ChevronRight size={14} className="opacity-50" />
                    <span className="font-semibold text-[#062365]">{sermon.series}</span>
                </nav>

                {/* Title block */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
                    <div className="lg:col-span-8">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                                {sermon.series}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-[#EEF1F7] text-[#051D35]/70 px-3 py-1.5">
                                <Calendar size={12} /> {formatDate(sermon.date)}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-[#EEF1F7] text-[#051D35]/70 px-3 py-1.5">
                                <Clock size={12} /> {sermon.duration}
                            </span>
                        </div>
                        <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02] text-[#051D35]">
                            {sermon.title}
                        </h1>
                        <div className="mt-5 flex items-center gap-3 text-[#051D35]/70">
                            <span className="grid place-items-center h-9 w-9 rounded-full bg-[#EEF1F7] text-[#062365]">
                                <User size={16} />
                            </span>
                            <div className="text-sm">
                                <div className="font-bold text-[#051D35]">{sermon.speaker}</div>
                                <div className="text-[#051D35]/60">{sermon.speakerRole}</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
                        <ShareButton title={sermon.title} />
                        <Link
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full bg-[#EEF1F7] hover:bg-white text-[#062365] font-semibold px-5 h-11 transition-colors"
                        >
                            <Download size={16} /> Notes
                        </Link>
                    </div>
                </div>

                {/* Video */}
                <div className="mt-8 md:mt-12 rounded-[2rem] overflow-hidden bg-[#051D35]">
                    <div className="relative w-full aspect-video">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={getYouTubeEmbedUrl(sermon.youtubeId)}
                            title={sermon.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* Listen elsewhere */}
                <div className="mt-4 flex flex-wrap gap-2">
                    <a
                        href={getYouTubeWatchUrl(sermon.youtubeId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#EEF1F7] hover:bg-white text-[#062365] font-semibold px-4 h-10 text-sm transition-colors"
                    >
                        <ExternalLink size={14} /> Watch on YouTube
                    </a>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#EEF1F7] hover:bg-white text-[#062365] font-semibold px-4 h-10 text-sm transition-colors"
                    >
                        <Music size={14} /> Spotify
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#EEF1F7] hover:bg-white text-[#062365] font-semibold px-4 h-10 text-sm transition-colors"
                    >
                        <Headphones size={14} /> Apple Podcasts
                    </button>
                </div>

                {/* Body grid */}
                <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main column */}
                    <div className="lg:col-span-8 space-y-10">
                        <Section
                            eyebrow="Summary"
                            heading={`What this sermon is about`}
                        >
                            <p className="text-lg leading-relaxed text-[#051D35]/80">
                                {sermon.summary}
                            </p>
                        </Section>

                        <Section eyebrow="Outline" heading="Where it goes">
                            <ol className="space-y-3">
                                {sermon.outline.map((point, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-4 rounded-2xl bg-[#EEF1F7] p-5"
                                    >
                                        <span className="shrink-0 h-8 w-8 rounded-full bg-[#062365] text-white font-bold grid place-items-center text-sm">
                                            {idx + 1}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-[#051D35]">
                                                {point.heading}
                                            </div>
                                            {point.verse && (
                                                <a
                                                    href={bibleGatewayUrl(point.verse)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-1 inline-flex items-center gap-1 text-sm text-[#062365] font-semibold hover:underline"
                                                >
                                                    <BookOpenText size={14} /> {point.verse}
                                                </a>
                                            )}
                                            {point.note && (
                                                <p className="mt-2 text-sm text-[#051D35]/70">
                                                    {point.note}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </Section>

                        <Section
                            eyebrow="Small Group"
                            heading="Discussion questions"
                        >
                            <ul className="space-y-3">
                                {sermon.questions.map((q, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-4 rounded-2xl bg-[#EEF1F7] p-5"
                                    >
                                        <span className="shrink-0 grid place-items-center h-8 w-8 rounded-full bg-white text-[#062365]">
                                            <MessageCircleQuestion size={16} />
                                        </span>
                                        <p className="text-[#051D35]/85 leading-relaxed">
                                            {q}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-5 inline-flex flex-wrap gap-2">
                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#062365] hover:bg-[#051D35] text-white font-semibold px-5 h-11 text-sm transition-colors"
                                >
                                    <Download size={14} /> Download as PDF
                                </Link>
                                <Link
                                    href="/resources"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#EEF1F7] hover:bg-white text-[#062365] font-semibold px-5 h-11 text-sm transition-colors"
                                >
                                    Find a small group
                                </Link>
                            </div>
                        </Section>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-5">
                        <div className="rounded-[1.5rem] bg-[#EEF1F7] p-6">
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#051D35]/50">
                                Scripture
                            </div>
                            <a
                                href={bibleGatewayUrl(sermon.scripture)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 group inline-flex items-center gap-2 text-2xl font-extrabold text-[#062365] hover:underline"
                            >
                                <BookOpenText size={20} className="opacity-70" />
                                {sermon.scripture}
                            </a>
                            <p className="mt-2 text-sm text-[#051D35]/60">
                                Tap to open in Bible Gateway
                            </p>
                        </div>

                        <div className="rounded-[1.5rem] bg-[#EEF1F7] p-6">
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#051D35]/50">
                                Topics
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {sermon.topics.map((t) => (
                                    <Link
                                        key={t}
                                        href={`/sermons?topic=${encodeURIComponent(t)}`}
                                        className="text-xs font-semibold rounded-full bg-white text-[#062365] px-3 py-1.5 hover:bg-[#062365] hover:text-white transition-colors"
                                    >
                                        {t}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[1.5rem] bg-[#051D35] text-white p-6">
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#EEF1F7]">
                                In this series
                            </div>
                            <div className="mt-3 text-xl font-extrabold">
                                {sermon.series}
                            </div>
                            <p className="mt-2 text-sm text-white/70">
                                Continue the journey through the whole series.
                            </p>
                            <Link
                                href={`/sermons?series=${encodeURIComponent(sermon.series)}`}
                                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-[#062365] font-semibold px-4 h-10 text-sm hover:bg-[#EEF1F7] transition-colors"
                            >
                                View series <ChevronRight size={14} />
                            </Link>
                        </div>
                    </aside>
                </div>

                {/* Related resources */}
                {sermon.relatedResources && sermon.relatedResources.length > 0 && (
                    <div className="mt-16 md:mt-24">
                        <div className="flex items-end justify-between mb-6 md:mb-8">
                            <div>
                                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                                    Go deeper
                                </span>
                                <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-[#051D35]">
                                    Related resources
                                </h2>
                                <p className="mt-3 max-w-xl text-[#051D35]/70">
                                    Hand-picked reading plans, books, and studies to keep
                                    growing in this theme through the week.
                                </p>
                            </div>
                            <Link
                                href="/resources"
                                className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#062365] hover:underline"
                            >
                                All resources <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            {sermon.relatedResources.map((r) => (
                                <ResourceCard key={r.title} resource={r} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Related sermons */}
                {related.length > 0 && (
                    <div className="mt-16 md:mt-24">
                        <div className="flex items-end justify-between mb-6 md:mb-8">
                            <div>
                                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                                    Keep listening
                                </span>
                                <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-[#051D35]">
                                    More from this series
                                </h2>
                            </div>
                            <Link
                                href="/sermons"
                                className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#062365] hover:underline"
                            >
                                All sermons <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {related.map((s) => (
                                <SermonCard key={s.slug} sermon={s} showSeries={false} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

function Section({
    eyebrow,
    heading,
    children,
}: {
    eyebrow: string;
    heading: string;
    children: React.ReactNode;
}) {
    return (
        <section>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#062365]">
                {eyebrow}
            </div>
            <h2 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight text-[#051D35]">
                {heading}
            </h2>
            <div className="mt-5">{children}</div>
        </section>
    );
}

const KIND_ICON: Record<SermonResourceKind, React.ComponentType<{ size?: number; className?: string }>> = {
    "Reading Plan": BookMarked,
    "Study Guide": FileText,
    Book: Library,
    Article: Newspaper,
    Podcast: Headphones,
};

function ResourceCard({ resource }: { resource: SermonResource }) {
    const Icon = KIND_ICON[resource.kind];
    return (
        <Link
            href={resource.href}
            className="group flex items-start gap-5 rounded-[1.5rem] bg-[#EEF1F7] hover:bg-white p-5 md:p-6 transition-colors"
        >
            <div className="shrink-0 grid place-items-center h-14 w-14 rounded-2xl bg-white group-hover:bg-[#062365] group-hover:text-white text-[#062365] transition-colors">
                <Icon size={22} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#062365]">
                        {resource.kind}
                    </span>
                    <ArrowUpRight
                        size={16}
                        className="text-[#051D35]/40 group-hover:text-[#062365] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                    />
                </div>
                <h3 className="mt-1 font-extrabold text-lg text-[#051D35] leading-tight">
                    {resource.title}
                </h3>
                <p className="mt-1 text-sm text-[#051D35]/70 leading-relaxed">
                    {resource.description}
                </p>
                {resource.meta && (
                    <div className="mt-2 text-xs text-[#051D35]/50 font-semibold">
                        {resource.meta}
                    </div>
                )}
            </div>
        </Link>
    );
}
