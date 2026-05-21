import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function GiveBand() {
    return (
        <section className="px-4 md:px-8 py-12 md:py-20">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#051D35] text-white p-10 md:p-16">
                <div
                    aria-hidden
                    className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#062365]/60 blur-3xl"
                />
                <div
                    aria-hidden
                    className="absolute -left-32 -bottom-32 h-[420px] w-[420px] rounded-full bg-[#062365]/40 blur-3xl"
                />
                <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />

                <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
                    <div className="md:col-span-7">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-white/10 text-[#D4DAE9] px-3 py-1.5">
                            Partner with us
                        </span>
                        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mt-4 leading-[1.02]">
                            Generosity is how a covenant moves.
                        </h2>
                        <p className="mt-6 text-white/70 text-lg max-w-xl">
                            Every gift sends a missionary, plants a small group, or feeds a
                            neighbor. Give once or set up a monthly partnership &mdash;
                            thank you for standing with us.
                        </p>
                    </div>
                    <div className="md:col-span-5 flex flex-col md:items-end gap-3">
                        <Link
                            href="/give"
                            className="inline-flex items-center gap-2 w-full md:w-auto justify-center rounded-full bg-white text-[#062365] font-semibold px-7 py-4 hover:bg-[#D4DAE9] transition-colors"
                        >
                            Give Now <ArrowUpRight size={18} />
                        </Link>
                        <Link
                            href="/give"
                            className="inline-flex items-center gap-2 w-full md:w-auto justify-center rounded-full bg-transparent text-white font-semibold px-7 py-4 border border-white/25 hover:bg-white/10 transition-colors"
                        >
                            Become a monthly partner
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
