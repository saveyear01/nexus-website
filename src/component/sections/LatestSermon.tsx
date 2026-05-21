import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const QUICK = [
    { title: "Living the Beatitudes", speaker: "Ps. Daniel Cruz", duration: "42 min" },
    { title: "Faith that moves cities", speaker: "Ps. Maria Lim", duration: "35 min" },
    { title: "On prayer and presence", speaker: "Ps. Daniel Cruz", duration: "29 min" },
];

export default function LatestSermon() {
    return (
        <section className="px-4 md:px-8 py-12 md:py-20">
            <div className="flex items-end justify-between mb-8 md:mb-10">
                <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-white text-[#062365] px-3 py-1.5">
                        This Week
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 text-[#051D35]">
                        Latest sermon
                    </h2>
                </div>
                <Link
                    href="/sermons"
                    className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#062365] hover:text-[#051D35]"
                >
                    All sermons <ArrowUpRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
                <div className="lg:col-span-3 relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-[#051D35] group">
                    <Image
                        src="/images/claudia-raya-QO7yanWbYsc-unsplash.jpg"
                        alt="Latest sermon"
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051D35]/85 via-[#051D35]/20 to-transparent" />
                    <button
                        aria-label="Play sermon"
                        className="absolute inset-0 m-auto h-20 w-20 rounded-full bg-white text-[#062365] flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        <Play size={26} className="ml-1" fill="currentColor" />
                    </button>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
                            Sunday Service &middot; 38 min
                        </div>
                        <div className="text-2xl md:text-3xl font-extrabold mt-2 max-w-xl">
                            The God who keeps covenant
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-3">
                    {QUICK.map((s) => (
                        <Link
                            key={s.title}
                            href="/sermons"
                            className="group flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#062365] hover:text-white transition-colors"
                        >
                            <div className="h-12 w-12 shrink-0 rounded-full bg-[#062365] text-white group-hover:bg-white group-hover:text-[#062365] flex items-center justify-center transition-colors">
                                <Play size={16} fill="currentColor" className="ml-0.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold truncate">{s.title}</div>
                                <div className="text-sm opacity-70">
                                    {s.speaker} &middot; {s.duration}
                                </div>
                            </div>
                            <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100" />
                        </Link>
                    ))}

                    <Link
                        href="/sermons"
                        className="mt-1 grid place-items-center rounded-full bg-[#062365] text-white font-semibold py-3.5 hover:bg-[#051D35] transition-colors"
                    >
                        Browse the library
                    </Link>
                </div>
            </div>
        </section>
    );
}
