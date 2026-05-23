/**
 * Domain types for articles.
 *
 * Lives here so types are dependency-free and can be imported by data, lib
 * (queries), and UI without creating cycles.
 */

/** Author metadata used in cards, detail headers, and bio blocks. */
export type ArticleAuthor = {
    name: string;
    role: string;
    /** Optional short biography rendered on the detail page. */
    bio?: string;
};

/**
 * Article body is composed of typed content blocks. This is more structured
 * than HTML/markdown strings and gives us full control over rendering and
 * styling at the React layer.
 */
export type ArticleBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "quote"; text: string; cite?: string }
    | { type: "list"; items: string[]; ordered?: boolean };

/**
 * The set of categories articles can belong to.
 *
 * Literal union (not `string`) so filter chips and queries get autocomplete
 * and typos surface at compile time. Add new categories here and TS will
 * tell you everywhere that needs updating.
 */
export type ArticleCategory =
    | "Theology"
    | "Discipleship"
    | "Mission"
    | "Community";

/** A single article entry. */
export type Article = {
    slug: string;
    title: string;
    /** Short summary shown on cards and used for search. */
    excerpt: string;
    author: ArticleAuthor;
    /** ISO date string (YYYY-MM-DD). */
    date: string;
    /** Human-readable read time (e.g. "5 min read"). */
    readTime: string;
    category: ArticleCategory;
    tags: string[];
    /** Optional cover image URL. UI falls back to a category-tinted gradient. */
    coverImage?: string;
    /** Article body as an array of typed blocks. */
    content: ArticleBlock[];
    /** Marks the hero/featured article on the list and any home spotlight. */
    featured?: boolean;
};
