"use client";

import { audiowide } from "@/fonts/fonts";
import { ChevronDown, Eye, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
    { label: "Home", href: "/" },
    {
        label: "Sermons",
        href: "/sermons",
        children: [
            { label: "Latest series", href: "/sermons" },
            { label: "By speaker", href: "/sermons" },
            { label: "By topic", href: "/sermons" },
        ],
    },
    {
        label: "Resources",
        href: "/resources",
        children: [
            { label: "Reading plans", href: "/resources" },
            { label: "Study guides", href: "/resources" },
            { label: "Podcast", href: "/resources" },
        ],
    },
    { label: "Give", href: "/give" },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-4 z-40 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between gap-4 rounded-full bg-white shadow-[0_8px_24px_-12px_rgba(5,29,53,0.15)] px-3 md:px-5 py-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 pl-2 pr-1 shrink-0"
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
                                pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(item.href));
                            return (
                                <div key={item.href} className="relative group">
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-full transition-colors ${
                                            active
                                                ? "text-[#062365]"
                                                : "text-[#051D35]/80 hover:text-[#062365]"
                                        }`}
                                    >
                                        {item.label}
                                        {item.children && (
                                            <ChevronDown
                                                size={14}
                                                className="opacity-60 group-hover:rotate-180 transition-transform"
                                            />
                                        )}
                                    </Link>
                                    {item.children && (
                                        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                            <div className="min-w-[200px] rounded-2xl bg-white shadow-[0_12px_32px_-12px_rgba(5,29,53,0.25)] p-2">
                                                {item.children.map((c) => (
                                                    <Link
                                                        key={c.label}
                                                        href={c.href}
                                                        className="block px-3 py-2 text-sm rounded-xl text-[#051D35]/80 hover:bg-[#D4DAE9] hover:text-[#062365]"
                                                    >
                                                        {c.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    <div className="hidden md:flex items-center gap-1 pr-1">
                        <IconBtn label="Search">
                            <Search size={16} />
                        </IconBtn>
                        <IconBtn label="Accessibility">
                            <Eye size={16} />
                        </IconBtn>
                        <div className="text-xs font-semibold text-[#051D35]/70 px-2">
                            <span className="hover:text-[#062365] cursor-pointer">EN</span>
                            <span className="mx-1 opacity-30">|</span>
                            <span className="hover:text-[#062365] cursor-pointer">ES</span>
                        </div>
                    </div>

                    <button
                        className="md:hidden grid place-items-center h-9 w-9 rounded-full hover:bg-[#D4DAE9]"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {open && (
                    <div className="md:hidden mt-2 rounded-3xl bg-white shadow-[0_12px_32px_-12px_rgba(5,29,53,0.2)] p-3 flex flex-col gap-1">
                        {NAV.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`px-4 py-3 rounded-2xl text-base font-semibold ${
                                        active
                                            ? "bg-[#D4DAE9] text-[#062365]"
                                            : "text-[#051D35]/80"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/give"
                            onClick={() => setOpen(false)}
                            className="mt-2 grid place-items-center px-4 py-3 rounded-full bg-[#062365] text-white font-semibold"
                        >
                            Partner With Us
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

function IconBtn({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <button
            aria-label={label}
            className="grid place-items-center h-9 w-9 rounded-full hover:bg-[#D4DAE9] text-[#051D35]/70 hover:text-[#062365]"
        >
            {children}
        </button>
    );
}
