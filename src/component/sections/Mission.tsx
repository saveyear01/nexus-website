import { Sparkles } from "lucide-react";

export default function Mission() {
    return (
        <section className="px-4 md:px-8 py-16 md:py-24">
            <div className="rounded-[2rem] bg-[#EEF1F7] p-8 md:p-14">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white text-[#062365] px-3 py-1.5">
                            <Sparkles size={14} />
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">
                                Our Covenant
                            </span>
                        </div>
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-[#051D35]">
                            A people gathered around the gospel of Jesus &mdash;{" "}
                            <span className="text-[#051D35]/40">
                                growing together, serving our city, and seeking the Father
                                in every season.
                            </span>
                        </h2>
                        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <Stat label="Members" value="320+" />
                            <Stat label="Small Groups" value="24" />
                            <Stat label="Weekly Gatherings" value="3" />
                            <Stat label="Years Serving" value="12" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="border-t border-[#051D35]/10 pt-4">
            <div className="text-3xl md:text-4xl font-extrabold text-[#062365]">
                {value}
            </div>
            <div className="text-xs md:text-sm text-[#051D35]/60 mt-1 uppercase tracking-wider font-semibold">
                {label}
            </div>
        </div>
    );
}
