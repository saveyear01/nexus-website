"use client";

import { useChat } from "@/component/sections/ChatProvider";
import { audiowide } from "@/fonts/fonts";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Sermons", href: "/sermons" },
    { label: "Articles", href: "/articles" },
    { label: "Resources", href: "/resources" },
    { label: "Give", href: "/give" },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { open: openChat } = useChat();

    const launchChat = () => {
        setOpen(false);
        openChat();
    };

    return (
        <header className="sticky top-4 z-40 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between gap-4 rounded-full bg-white shadow-[0_8px_24px_-12px_rgba(5,29,53,0.15)] pl-3 pr-2 md:pl-5 md:pr-2 py-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 shrink-0"
                    >
                        <span className="grid place-items-center h-9 w-9 rounded-full bg-[#062365] text-white">
                            <span className={`text-sm tracking-widest ${audiowide.className}`}>
                                N
                            </span>
                        </span>
                        <span
                            className={`hidden sm:inline text-lg tracking-[0.25em] font-bold ${audiowide.className}`}
                        >
                            NEXUS
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {NAV.map((item) => {
                            const active =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname === item.href ||
                                      pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                                        active
                                            ? "text-[#062365]"
                                            : "text-[#051D35]/80 hover:text-[#062365]"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        type="button"
                        onClick={launchChat}
                        aria-label="Open Nexus Assistant"
                        className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#062365] hover:bg-[#051D35] text-white px-5 h-10 text-sm font-semibold transition-colors"
                    >
                        <Sparkles size={14} />
                        Ask Nexus
                    </button>

                    <button
                        className="md:hidden grid place-items-center h-9 w-9 rounded-full hover:bg-[#EEF1F7]"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {open && (
                    <div className="md:hidden mt-2 rounded-3xl bg-white shadow-[0_12px_32px_-12px_rgba(5,29,53,0.2)] p-3 flex flex-col gap-1">
                        {NAV.map((item) => {
                            const active =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname === item.href ||
                                      pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`px-4 py-3 rounded-2xl text-base font-semibold ${
                                        active
                                            ? "bg-[#EEF1F7] text-[#062365]"
                                            : "text-[#051D35]/80"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <button
                            type="button"
                            onClick={launchChat}
                            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#062365] hover:bg-[#051D35] text-white px-5 py-3 font-semibold transition-colors"
                        >
                            <Sparkles size={14} />
                            Ask Nexus
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
