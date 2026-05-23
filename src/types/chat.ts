/**
 * Domain types for the RAG chat interface.
 *
 * Kept dependency-free so types can be imported by data, lib, and UI without
 * creating cycles.
 */

/** Where a cited resource lives in our system. */
export type ChatSourceKind = "article" | "sermon";

/**
 * A cited resource shown beneath an assistant message.
 *
 * Slim by design — the chat doesn't need to know the full Article/Sermon
 * shape, only what's needed to render and link the citation.
 */
export type ChatSource = {
    kind: ChatSourceKind;
    slug: string;
    title: string;
    href: string;
    author?: string;
    /** Short meta line: read time, duration, etc. */
    meta?: string;
};

/** A single message in the conversation thread. */
export type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    text: string;
    /** Citations are only set on assistant messages that pulled from sources. */
    sources?: ChatSource[];
    createdAt: number;
};

/** A canned starter prompt shown when the conversation is empty. */
export type SuggestedPrompt = {
    label: string;
    /** Short tagline rendered under the label. */
    hint: string;
};
