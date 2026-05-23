"use client";

import ChatSourceCard from "@/component/sections/ChatSourceCard";
import { SUGGESTED_PROMPTS, getAssistantResponse } from "@/lib/chat";
import type { ChatMessage, SuggestedPrompt } from "@/types/chat";
import { ArrowUp, RotateCcw, Sparkles, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MAX_INPUT_HEIGHT = 200;

type Props = {
    /**
     * When provided, the chat renders in "embedded" mode (no outer card frame,
     * with a close button in the top bar). When omitted, the chat renders as
     * a standalone card suitable for embedding in a page layout.
     */
    onClose?: () => void;
    /**
     * Optional question that is automatically submitted on mount.
     *
     * Used by hero compose handoffs and suggestion chips — the user types or
     * picks a prompt in one surface, opens the chat, and the conversation is
     * already underway.
     */
    initialQuery?: string;
};

/**
 * Conversation thread. Manages messages locally and routes queries through
 * `getAssistantResponse` (the single seam to the future RAG backend).
 *
 * Accessibility:
 * - The message list is a `role="log"` region with `aria-live="polite"` so
 *   screen readers announce new assistant turns without interrupting input.
 * - The input is labelled via a visually-hidden label and a clear submit
 *   button. Enter submits; Shift+Enter inserts a newline.
 * - Loading state is announced via `aria-busy` on the message list.
 */
export default function AskChat({ onClose, initialQuery }: Props) {
    const embedded = Boolean(onClose);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isPending, setIsPending] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    const submittedInitialRef = useRef(false);

    // Auto-resize textarea up to a max height.
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, MAX_INPUT_HEIGHT)}px`;
    }, [input]);

    // Auto-scroll to the latest message.
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, isPending]);

    // Focus input on first mount.
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    // Auto-submit an initial query once on mount (e.g. handed off from the
    // hero compose or a suggestion chip).
    useEffect(() => {
        if (!initialQuery || submittedInitialRef.current) return;
        submittedInitialRef.current = true;
        submit(initialQuery);
        // submit is stable for this effect's purposes — guarded by the ref.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialQuery]);

    const submit = async (raw: string) => {
        const text = raw.trim();
        if (!text || isPending) return;

        const userMessage: ChatMessage = {
            id: `u-${Date.now()}`,
            role: "user",
            text,
            createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsPending(true);

        try {
            const response = await getAssistantResponse(text);
            const assistantMessage: ChatMessage = {
                id: `a-${Date.now()}`,
                role: "assistant",
                text: response.text,
                sources: response.sources,
                createdAt: Date.now(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: `a-err-${Date.now()}`,
                    role: "assistant",
                    text: "Something went wrong reaching the engine. Please try again.",
                    createdAt: Date.now(),
                },
            ]);
        } finally {
            setIsPending(false);
            requestAnimationFrame(() => textareaRef.current?.focus());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit(input);
        }
    };

    const handlePromptClick = (prompt: SuggestedPrompt) => {
        submit(prompt.label);
    };

    const reset = () => {
        setMessages([]);
        setInput("");
        requestAnimationFrame(() => textareaRef.current?.focus());
    };

    const isEmpty = messages.length === 0;

    const frameClasses = embedded
        ? "flex flex-col h-full bg-white"
        : "rounded-[2rem] bg-white border border-[#051D35]/10 overflow-hidden flex flex-col min-h-[560px] md:min-h-[640px]";

    return (
        <div className={frameClasses}>
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#051D35]/8 shrink-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#051D35]">
                    <span className="grid place-items-center h-7 w-7 rounded-full bg-[#062365] text-white">
                        <Sparkles size={14} />
                    </span>
                    Nexus Assistant
                </div>
                <div className="flex items-center gap-1">
                    {!isEmpty && (
                        <button
                            onClick={reset}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#051D35]/60 hover:text-[#062365] rounded-full px-3 py-1.5 hover:bg-[#EEF1F7] transition-colors"
                            aria-label="Start a new conversation"
                        >
                            <RotateCcw size={12} /> New
                        </button>
                    )}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="grid place-items-center h-8 w-8 rounded-full text-[#051D35]/60 hover:text-[#062365] hover:bg-[#EEF1F7] transition-colors"
                            aria-label="Close chat"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Conversation */}
            <div
                role="log"
                aria-live="polite"
                aria-busy={isPending}
                className="flex-1 min-h-0 px-4 md:px-6 py-6 md:py-8 overflow-y-auto"
            >
                {isEmpty ? (
                    <EmptyState onPrompt={handlePromptClick} />
                ) : (
                    <div className="space-y-6">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                        {isPending && <ThinkingBubble />}
                        <div ref={endRef} />
                    </div>
                )}
            </div>

            {/* Composer */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit(input);
                }}
                className="border-t border-[#051D35]/8 p-3 md:p-4 bg-[#EEF1F7]/40 shrink-0"
            >
                <label htmlFor="chat-input" className="sr-only">
                    Type your question
                </label>
                <div className="flex items-end gap-2 rounded-2xl bg-white border border-[#051D35]/10 focus-within:border-[#062365] transition-colors px-4 py-2.5">
                    <textarea
                        ref={textareaRef}
                        id="chat-input"
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about anything — covenant, prayer, mission, small groups..."
                        disabled={isPending}
                        className="flex-1 resize-none bg-transparent outline-none text-[#051D35] placeholder:text-[#051D35]/40 leading-relaxed py-1.5 disabled:opacity-50"
                        style={{ maxHeight: MAX_INPUT_HEIGHT }}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isPending}
                        aria-label="Send message"
                        className="shrink-0 grid place-items-center h-10 w-10 rounded-full bg-[#062365] text-white hover:bg-[#051D35] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowUp size={18} />
                    </button>
                </div>
                <p className="mt-2 text-xs text-[#051D35]/50 text-center">
                    Answers are AI-generated from Nexus teaching. Always verify with a
                    pastor.
                </p>
            </form>
        </div>
    );
}

function EmptyState({
    onPrompt,
}: {
    onPrompt: (prompt: SuggestedPrompt) => void;
}) {
    return (
        <div className="max-w-2xl mx-auto py-4 md:py-6">
            <div className="grid place-items-center h-14 w-14 mx-auto rounded-full bg-[#062365] text-white">
                <Sparkles size={22} />
            </div>
            <h2 className="mt-5 text-center text-2xl md:text-3xl font-extrabold tracking-tight text-[#051D35]">
                What would you like to know?
            </h2>
            <p className="mt-2 text-center text-[#051D35]/65 max-w-md mx-auto">
                Ask anything — I'll answer using our sermons, articles, and
                resources, and point you to the originals.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                        key={prompt.label}
                        onClick={() => onPrompt(prompt)}
                        className="group text-left rounded-2xl bg-[#EEF1F7] hover:bg-[#062365] hover:text-white p-4 transition-colors"
                    >
                        <div className="font-bold text-[#051D35] group-hover:text-white">
                            {prompt.label}
                        </div>
                        <div className="text-sm text-[#051D35]/60 group-hover:text-white/80 mt-1">
                            {prompt.hint}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function MessageBubble({ message }: { message: ChatMessage }) {
    if (message.role === "user") {
        return (
            <div className="flex justify-end">
                <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="rounded-2xl rounded-tr-md bg-[#062365] text-white px-4 py-3 leading-relaxed">
                        {message.text}
                    </div>
                    <span
                        aria-hidden
                        className="shrink-0 grid place-items-center h-8 w-8 rounded-full bg-[#EEF1F7] text-[#062365] mt-0.5"
                    >
                        <User size={14} />
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[95%]">
                <span
                    aria-hidden
                    className="shrink-0 grid place-items-center h-8 w-8 rounded-full bg-[#062365] text-white mt-0.5"
                >
                    <Sparkles size={14} />
                </span>
                <div className="flex-1 min-w-0">
                    <div className="rounded-2xl rounded-tl-md bg-[#EEF1F7] text-[#051D35] px-4 py-3 leading-relaxed">
                        {message.text}
                    </div>
                    {message.sources && message.sources.length > 0 && (
                        <div className="mt-3">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#051D35]/50 mb-2">
                                Sources
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {message.sources.map((source) => (
                                    <ChatSourceCard
                                        key={`${source.kind}-${source.slug}`}
                                        source={source}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ThinkingBubble() {
    return (
        <div className="flex justify-start">
            <div className="flex items-start gap-3">
                <span
                    aria-hidden
                    className="shrink-0 grid place-items-center h-8 w-8 rounded-full bg-[#062365] text-white mt-0.5"
                >
                    <Sparkles size={14} />
                </span>
                <div
                    className="rounded-2xl rounded-tl-md bg-[#EEF1F7] px-4 py-3"
                    role="status"
                    aria-label="Generating response"
                >
                    <span className="inline-flex gap-1 items-center">
                        <Dot delay={0} />
                        <Dot delay={150} />
                        <Dot delay={300} />
                    </span>
                </div>
            </div>
        </div>
    );
}

function Dot({ delay }: { delay: number }) {
    return (
        <span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full bg-[#062365] animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
        />
    );
}
