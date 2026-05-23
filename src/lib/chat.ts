import { ARTICLES } from "@/data/articles";
import { SERMONS } from "@/data/sermons";
import type { ChatSource, SuggestedPrompt } from "@/types/chat";

/**
 * Mock RAG engine — keyword retrieval over the existing articles + sermons.
 *
 * This file is intentionally the only seam between the UI and the backend.
 * When the real RAG engine is ready, replace `getAssistantResponse` with a
 * `fetch('/api/chat')` call (or whatever transport you settle on) and the
 * surface above doesn't need to change.
 */

const STOP_WORDS = new Set([
    "a", "an", "the", "and", "or", "but", "is", "are", "was", "were",
    "be", "been", "being", "do", "does", "did", "have", "has", "had",
    "what", "when", "where", "why", "how", "who", "whom", "which",
    "i", "you", "we", "they", "he", "she", "it", "me", "us", "them",
    "this", "that", "these", "those", "of", "in", "on", "at", "to",
    "for", "with", "by", "from", "about", "as", "into", "through",
    "tell", "please", "can", "could", "would", "should", "may", "might",
    "just", "like", "any", "some", "all", "more", "most", "other",
]);

/** Lower, strip punctuation, drop stop words, drop very short tokens. */
function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

/** Count how many tokens appear (even as substrings) in the haystack. */
function scoreOverlap(tokens: string[], haystack: string): number {
    const lowered = haystack.toLowerCase();
    return tokens.reduce(
        (acc, token) => acc + (lowered.includes(token) ? 1 : 0),
        0
    );
}

export type AssistantResponse = {
    text: string;
    sources: ChatSource[];
};

/**
 * Get a mock assistant response for a user query.
 *
 * Searches articles + sermons by keyword overlap, returns the top matches
 * as citations, and constructs a short response from the best match's
 * excerpt/summary. Returns a graceful "no match" message when nothing scores.
 *
 * The artificial latency (`SIMULATED_DELAY_MS`) makes the loading state
 * visible during development; remove it when the real engine arrives.
 */
const SIMULATED_DELAY_MS = 700;

export async function getAssistantResponse(
    query: string
): Promise<AssistantResponse> {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

    const tokens = tokenize(query);
    if (tokens.length === 0) {
        return {
            text: "I'm not sure what you're asking. Try a question about prayer, covenant, mission, or community at Nexus.",
            sources: [],
        };
    }

    const articleMatches = ARTICLES
        .map((article) => ({
            article,
            score: scoreOverlap(
                tokens,
                [
                    article.title,
                    article.excerpt,
                    article.tags.join(" "),
                    article.category,
                ].join(" ")
            ),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score);

    const sermonMatches = SERMONS
        .map((sermon) => ({
            sermon,
            score: scoreOverlap(
                tokens,
                [
                    sermon.title,
                    sermon.summary,
                    sermon.topics.join(" "),
                    sermon.series,
                    sermon.scripture,
                ].join(" ")
            ),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score);

    const sources: ChatSource[] = [
        ...articleMatches.slice(0, 2).map<ChatSource>((r) => ({
            kind: "article",
            slug: r.article.slug,
            title: r.article.title,
            href: `/articles/${r.article.slug}`,
            author: r.article.author.name,
            meta: r.article.readTime,
        })),
        ...sermonMatches.slice(0, 2).map<ChatSource>((r) => ({
            kind: "sermon",
            slug: r.sermon.slug,
            title: r.sermon.title,
            href: `/sermons/${r.sermon.slug}`,
            author: r.sermon.speaker,
            meta: r.sermon.duration,
        })),
    ];

    if (sources.length === 0) {
        return {
            text: "I couldn't find anything in our library about that specifically. Try a different angle, or browse our articles and sermons directly.",
            sources: [],
        };
    }

    const topArticle = articleMatches[0]?.article;
    const topSermon = sermonMatches[0]?.sermon;

    let text = "";
    if (topArticle) {
        text = topArticle.excerpt;
        if (topSermon) {
            text += ` This theme also runs through our recent sermon "${topSermon.title}" — see the sources below for the full discussion.`;
        } else {
            text += " You can read the full article in the source below.";
        }
    } else if (topSermon) {
        text = `${topSermon.summary} See the source below for the full message.`;
    }

    return { text, sources };
}

/** Prompts shown on the empty state to help new users get started. */
export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
    {
        label: "What's a covenant church?",
        hint: "How we think about belonging and membership.",
    },
    {
        label: "Help me start praying.",
        hint: "Where to begin when prayer feels hard.",
    },
    {
        label: "How do I find a small group?",
        hint: "Community is how we grow at Nexus.",
    },
    {
        label: "What does Nexus believe about mission?",
        hint: "Why we send, serve, and stay near the city.",
    },
];
