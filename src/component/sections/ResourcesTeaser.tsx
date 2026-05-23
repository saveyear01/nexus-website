import { ArrowUpRight, BookMarked, Headphones, NotebookPen } from "lucide-react";
import Link from "next/link";

const ITEMS = [
    {
        kind: "Reading Plan",
        title: "Through the Gospels in 40 days",
        meta: "Daily · 10 min",
        icon: BookMarked,
        tone: "navy",
    },
    {
        kind: "Podcast",
        title: "Covenant conversations",
        meta: "Weekly · 28 min",
        icon: Headphones,
        tone: "light",
    },
    {
        kind: "Study Guide",
        title: "A theology of generosity",
        meta: "PDF · 24 pages",
        icon: NotebookPen,
        tone: "deep",
    },
] as const;

export default function ResourcesTeaser() {
    return (
        <section className="px-4 md:px-8 py-12 md:py-20">
            <div className="flex items-end justify-between mb-8 md:mb-10">
                <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                        For your week
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 max-w-2xl text-[#051D35]">
                        Resources to grow on.
                    </h2>
                </div>
                <Link
                    href="/resources"
                    className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#062365] hover:text-[#051D35]"
                >
                    View all <ArrowUpRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {ITEMS.map(({ kind, title, meta, icon: Icon, tone }) => {
                    const styles =
                        tone === "navy"
                            ? "bg-[#062365] text-white"
                            : tone === "deep"
                                ? "bg-[#051D35] text-white"
                                : "bg-[#EEF1F7] text-[#051D35]";
                    return (
                        <Link
                            key={title}
                            href="/resources"
                            className={`group relative aspect-[5/6] md:aspect-[4/5] rounded-[2rem] overflow-hidden p-6 md:p-7 flex flex-col justify-between ${styles}`}
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className={`text-[10px] font-bold uppercase tracking-[0.25em] ${
                                        tone === "light" ? "text-[#062365]" : "opacity-80"
                                    }`}
                                >
                                    {kind}
                                </span>
                                <ArrowUpRight
                                    size={20}
                                    className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                />
                            </div>
                            <div>
                                <Icon
                                    size={40}
                                    className={tone === "light" ? "text-[#062365]" : "opacity-90"}
                                />
                                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mt-6">
                                    {title}
                                </h3>
                                <div
                                    className={`text-sm mt-3 ${
                                        tone === "light" ? "text-[#051D35]/60" : "opacity-70"
                                    }`}
                                >
                                    {meta}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
