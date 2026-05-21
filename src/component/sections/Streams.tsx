import { Facebook, Youtube } from "lucide-react";
import Link from "next/link";

export default function Streams() {
    return (
        <section className="px-4 md:px-8 py-12 md:py-20">
            <div className="rounded-[2rem] bg-white p-8 md:p-14 text-center">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#D4DAE9] text-[#062365] px-3 py-1.5">
                    Live & On-demand
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 text-[#051D35]">
                    Watch our streams.
                </h2>
                <p className="mt-4 max-w-xl mx-auto text-[#051D35]/70">
                    Stay connected with the Nexus community. Join our live worship and
                    teachings through our streaming platforms.
                </p>
                <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3">
                    <Link
                        href="#"
                        className="inline-flex items-center gap-2 w-full md:w-auto justify-center rounded-full bg-[#062365] text-white px-6 py-3.5 font-semibold hover:bg-[#051D35] transition-colors"
                    >
                        <Facebook size={18} /> Facebook Live
                    </Link>
                    <Link
                        href="#"
                        className="inline-flex items-center gap-2 w-full md:w-auto justify-center rounded-full bg-[#D4DAE9] text-[#062365] px-6 py-3.5 font-semibold hover:bg-[#C7C7D0] transition-colors"
                    >
                        <Youtube size={18} /> YouTube Live
                    </Link>
                </div>
            </div>
        </section>
    );
}
