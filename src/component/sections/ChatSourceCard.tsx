import type { ChatSource } from "@/types/chat";
import { ArrowUpRight, BookOpen, Play } from "lucide-react";
import Link from "next/link";

/**
 * Compact citation pill rendered under an assistant message.
 *
 * Visually small but tappable; links to the underlying article or sermon.
 */
export default function ChatSourceCard({ source }: { source: ChatSource }) {
    const Icon = source.kind === "sermon" ? Play : BookOpen;

    return (
        <Link
            href={source.href}
            className="group flex items-start gap-3 rounded-2xl bg-white hover:bg-[#062365] hover:text-white border border-[#051D35]/10 hover:border-transparent p-3 md:p-4 transition-colors"
        >
            <span className="shrink-0 grid place-items-center h-10 w-10 rounded-xl bg-[#EEF1F7] text-[#062365] group-hover:bg-white/15 group-hover:text-white transition-colors">
                <Icon size={16} />
            </span>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#062365] group-hover:text-white/80">
                        {source.kind === "sermon" ? "Sermon" : "Article"}
                    </span>
                    <ArrowUpRight
                        size={14}
                        className="opacity-40 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                    />
                </div>
                <div className="mt-1 font-bold text-sm text-[#051D35] group-hover:text-white truncate">
                    {source.title}
                </div>
                {(source.author || source.meta) && (
                    <div className="text-xs text-[#051D35]/60 group-hover:text-white/70 truncate">
                        {source.author}
                        {source.author && source.meta && (
                            <span className="mx-1.5 opacity-50">·</span>
                        )}
                        {source.meta}
                    </div>
                )}
            </div>
        </Link>
    );
}
