import { audiowide } from "@/fonts/fonts";
import { ArrowUpRight, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-4 md:px-8 mt-8">
            <div className="rounded-[2rem] bg-[#051D35] text-white p-8 md:p-14">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3">
                            <span className="grid place-items-center h-12 w-12 rounded-full bg-[#062365] text-white">
                                <span className={`text-base tracking-widest ${audiowide.className}`}>
                                    N
                                </span>
                            </span>
                            <div
                                className={`text-4xl md:text-5xl tracking-widest ${audiowide.className}`}
                            >
                                NEXUS
                            </div>
                        </div>
                        <p className="mt-5 max-w-md text-white/70">
                            A covenant of people connected through Christ. Gather with us
                            in person or online &mdash; everyone&apos;s welcome.
                        </p>

                        <Link
                            href="/give"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-[#062365] font-semibold px-5 py-3 hover:bg-[#EEF1F7] transition-colors"
                        >
                            Become a partner <ArrowUpRight size={16} />
                        </Link>

                        <div className="flex gap-2 mt-6">
                            <SocialLink href="#" label="Facebook">
                                <Facebook size={16} />
                            </SocialLink>
                            <SocialLink href="#" label="Instagram">
                                <Instagram size={16} />
                            </SocialLink>
                            <SocialLink href="#" label="YouTube">
                                <Youtube size={16} />
                            </SocialLink>
                        </div>
                    </div>

                    <FooterCol
                        title="Visit"
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Sermons", href: "/sermons" },
                            { label: "Resources", href: "/resources" },
                            { label: "Give", href: "/give" },
                        ]}
                    />
                    <FooterCol
                        title="Gather"
                        items={[
                            { label: "Sundays 9:00 AM", href: "#" },
                            { label: "Sundays 11:00 AM", href: "#" },
                            { label: "Wednesday Prayer", href: "#" },
                            { label: "Small Groups", href: "#" },
                        ]}
                    />
                    <FooterCol
                        title="Contact"
                        items={[
                            { label: "hello@nexuschurch.org", href: "mailto:hello@nexuschurch.org" },
                            { label: "(555) 010-0144", href: "tel:5550100144" },
                            { label: "123 Covenant Ave", href: "#" },
                            { label: "Newsletter", href: "#" },
                        ]}
                    />
                </div>

                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-white/60">
                    <div>
                        &copy; {new Date().getFullYear()} Nexus Covenant Church. All rights
                        reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-white">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterCol({
    title,
    items,
}: {
    title: string;
    items: { label: string; href: string }[];
}) {
    return (
        <div className="md:col-span-2">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">
                {title}
            </div>
            <ul className="space-y-2">
                {items.map((i) => (
                    <li key={i.label}>
                        <Link href={i.href} className="text-white/80 hover:text-white">
                            {i.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SocialLink({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            aria-label={label}
            className="h-10 w-10 rounded-full bg-white/5 hover:bg-white hover:text-[#062365] flex items-center justify-center transition-colors"
        >
            {children}
        </Link>
    );
}
