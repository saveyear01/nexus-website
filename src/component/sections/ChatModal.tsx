"use client";

import AskChat from "@/component/sections/AskChat";
import { useEffect, useState } from "react";

type Props = {
    onClose: () => void;
    /** When set, the chat opens with this question and auto-submits it. */
    initialQuery?: string;
};

/**
 * Responsive overlay that hosts the chat:
 * - Mobile (< md): bottom drawer that slides up, ~92vh tall with a drag handle
 * - Desktop (md+): centered modal, max-w-2xl, capped height
 *
 * Behaviors:
 * - Escape closes
 * - Backdrop click closes
 * - Body scroll is locked while open
 * - Mount → visible transition (slide-up on mobile, fade-up on desktop)
 * - Close runs the exit transition before unmounting
 */
export default function ChatModal({ onClose, initialQuery }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", onKey);

        return () => {
            cancelAnimationFrame(id);
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** Run the exit transition before notifying the parent to unmount. */
    const handleClose = () => {
        setVisible(false);
        window.setTimeout(onClose, 200);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Nexus Assistant"
            className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6"
        >
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close chat"
                tabIndex={-1}
                onClick={handleClose}
                className={`absolute inset-0 bg-[#051D35]/40 backdrop-blur-sm transition-opacity duration-200 ${
                    visible ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Surface */}
            <div
                className={`
                    relative w-full md:max-w-2xl
                    h-[92vh] md:h-[720px] md:max-h-[85vh]
                    bg-white rounded-t-[2rem] md:rounded-[2rem]
                    shadow-[0_-20px_60px_-20px_rgba(5,29,53,0.35)] md:shadow-[0_30px_80px_-20px_rgba(5,29,53,0.45)]
                    overflow-hidden flex flex-col
                    transition-all duration-300 ease-out
                    ${
                        visible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full md:translate-y-4 opacity-0 md:opacity-0"
                    }
                `}
            >
                <div
                    aria-hidden
                    className="md:hidden mx-auto mt-2.5 mb-1 h-1.5 w-12 rounded-full bg-[#051D35]/15 shrink-0"
                />

                <AskChat onClose={handleClose} initialQuery={initialQuery} />
            </div>
        </div>
    );
}
