import Footer from "@/component/layouts/Footer";
import Header from "@/component/layouts/Header";
import ArticleCard from "@/component/sections/ArticleCard";
import AskChat from "@/component/sections/AskChat";
import { getAllArticles } from "@/lib/articles";
import { BookOpen, Layers, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Ask Nexus · AI Assistant",
    description:
        "Ask anything — Nexus's AI assistant answers from our sermons, articles, and resources.",
};

export default function AskPage() {
    const recentArticles = getAllArticles().slice(0, 3);

    return (
        <div className="max-w-[1440px] mx-auto pt-4 md:pt-6 pb-8">
            <Header />
            <main className="mt-6 md:mt-10 px-4 md:px-8">
                {/* Hero */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                            AI Assistant
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-4 leading-[1.02] text-[#051D35]">
                            Ask Nexus<span className="text-[#062365]">.</span>
                        </h1>
                        <p className="mt-4 max-w-xl text-[#051D35]/70 text-lg">
                            Conversational answers grounded in our sermons, articles, and
                            resources &mdash; with sources you can read for yourself.
                        </p>
                    </div>
                    <ul className="text-sm text-[#051D35]/70 grid gap-3 max-w-sm">
                        <Trust icon={ShieldCheck} text="Grounded in Nexus teaching only" />
                        <Trust icon={BookOpen} text="Every answer comes with sources" />
                        <Trust icon={Layers} text="Free, private, no account needed" />
                    </ul>
                </div>

                {/* Chat */}
                <div className="mt-10 md:mt-14 max-w-4xl mx-auto">
                    <AskChat />
                </div>

                {/* Browse the library */}
                <section className="mt-16 md:mt-24">
                    <div className="flex items-end justify-between mb-6 md:mb-8">
                        <div>
                            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                                Or read on your own
                            </span>
                            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-[#051D35]">
                                Recommended reading
                            </h2>
                            <p className="mt-2 max-w-xl text-[#051D35]/70">
                                Prefer to dig in yourself? Start with these.
                            </p>
                        </div>
                        <Link
                            href="/articles"
                            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#062365] hover:underline"
                        >
                            All articles
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {recentArticles.map((article) => (
                            <ArticleCard
                                key={article.slug}
                                article={article}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function Trust({
    icon: Icon,
    text,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    text: string;
}) {
    return (
        <li className="flex items-center gap-3">
            <span className="grid place-items-center h-8 w-8 rounded-full bg-[#EEF1F7] text-[#062365] shrink-0">
                <Icon size={14} />
            </span>
            <span className="font-semibold text-[#051D35]/80">{text}</span>
        </li>
    );
}
