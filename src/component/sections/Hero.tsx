import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/images/claudia-raya-QO7yanWbYsc-unsplash.jpg";

export default function Hero() {
    return (
        <section className="px-4 md:px-8 pt-8 md:pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                <div className="lg:col-span-6 xl:col-span-5">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-[#051D35]">
                        Nexus Covenant
                        <br />
                        Church &mdash; a people
                        <br />
                        connected through Christ.
                    </h1>
                    <p className="mt-6 max-w-lg text-base md:text-lg text-[#051D35]/70 leading-relaxed">
                        We&apos;re a covenant of believers gathering each week to worship,
                        grow, and serve our city. Wherever you are on the journey,
                        there&apos;s a place at the table for you.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            href="/sermons"
                            className="inline-flex items-center gap-2 rounded-full bg-[#062365] hover:bg-[#051D35] text-white font-semibold px-6 py-3.5 transition-colors"
                        >
                            Learn more
                            <ArrowUpRight size={18} />
                        </Link>
                        <Link
                            href="/give"
                            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-white/80 text-[#062365] font-semibold px-6 py-3.5 transition-colors border border-[#051D35]/10"
                        >
                            Partner with us
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-6 xl:col-span-7">
                    <PhotoCollage />
                </div>
            </div>
        </section>
    );
}

function PhotoCollage() {
    return (
        <div className="grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 h-[420px] md:h-[520px]">
            <div className="col-span-3 row-span-3 relative rounded-3xl overflow-hidden bg-[#C7C7D0]">
                <Image
                    src={HERO_IMAGE}
                    alt="Community gathering"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <Tile className="col-span-2 row-span-2 bg-[#062365]">
                <CollagePattern variant="dots" />
            </Tile>

            <Tile className="col-span-1 row-span-2 bg-[#051D35]">
                <CollagePattern variant="diag" />
            </Tile>

            <Tile className="col-span-3 row-span-3 bg-[#C7C7D0] relative">
                <Image
                    src={HERO_IMAGE}
                    alt="Worship"
                    fill
                    className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-[#062365]/10" />
            </Tile>

            <Tile className="col-span-2 row-span-2 bg-white border border-[#051D35]/5">
                <div className="h-full w-full grid place-items-center p-4 text-center">
                    <div>
                        <div className="text-3xl md:text-4xl font-extrabold text-[#062365]">
                            320+
                        </div>
                        <div className="text-xs uppercase tracking-[0.18em] text-[#051D35]/60 mt-1">
                            Covenant members
                        </div>
                    </div>
                </div>
            </Tile>

            <Tile className="col-span-1 row-span-2 bg-[#062365]">
                <div className="h-full w-full grid place-items-center text-white font-bold text-xs tracking-[0.2em] rotate-[-90deg]">
                    EST. 2013
                </div>
            </Tile>
        </div>
    );
}

function Tile({
    className = "",
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    return (
        <div
            className={`relative rounded-3xl overflow-hidden ${className}`}
        >
            {children}
        </div>
    );
}

function CollagePattern({ variant }: { variant: "dots" | "diag" }) {
    if (variant === "dots") {
        return (
            <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                }}
            />
        );
    }
    return (
        <div
            aria-hidden
            className="absolute inset-0 opacity-25"
            style={{
                backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 12px)",
            }}
        />
    );
}
