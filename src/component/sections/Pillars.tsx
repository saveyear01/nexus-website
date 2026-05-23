import { BookOpen, HandHeart, Users } from "lucide-react";

const PILLARS = [
    {
        icon: BookOpen,
        title: "The Word",
        body: "Scripture is the foundation of our gathering. We study, memorize, and live the Bible together each week.",
    },
    {
        icon: Users,
        title: "Community",
        body: "Covenant is more than membership. We share meals, prayer, and burdens through small groups across the city.",
    },
    {
        icon: HandHeart,
        title: "Mission",
        body: "We give, serve, and send. From local outreach to global partnerships, the church exists for the world.",
    },
];

export default function Pillars() {
    return (
        <section className="px-4 md:px-8 py-12 md:py-20">
            <div className="max-w-5xl">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
                    What we stand on
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 text-[#051D35]">
                    Three pillars that hold us together.
                </h2>
            </div>

            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {PILLARS.map(({ icon: Icon, title, body }) => (
                    <div
                        key={title}
                        className="group relative p-8 rounded-[2rem] bg-[#EEF1F7] hover:bg-[#062365] hover:text-white transition-colors duration-300"
                    >
                        <div className="h-12 w-12 rounded-full bg-white text-[#062365] group-hover:bg-white grid place-items-center">
                            <Icon size={22} />
                        </div>
                        <h3 className="mt-8 text-2xl md:text-3xl font-extrabold">
                            {title}
                        </h3>
                        <p className="mt-3 text-[#051D35]/70 group-hover:text-white/80 leading-relaxed">
                            {body}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
