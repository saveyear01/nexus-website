/**
 * Domain types for sermons.
 *
 * Types live here so they can be imported by data, lib (queries), and UI
 * without any of those layers depending on each other.
 */

/** A single point in a sermon's outline. */
export type OutlinePoint = {
    heading: string;
    /** Optional scripture reference (e.g. "Genesis 15:9-18"). */
    verse?: string;
    /** Optional short note shown under the heading. */
    note?: string;
};

/** Kind of related resource attached to a sermon. */
export type SermonResourceKind =
    | "Reading Plan"
    | "Study Guide"
    | "Book"
    | "Article"
    | "Podcast";

/** A resource a viewer can engage with after watching a sermon. */
export type SermonResource = {
    kind: SermonResourceKind;
    title: string;
    description: string;
    /** Short metadata line (e.g. "PDF · 18 pages", "14 days · ~10 min/day"). */
    meta?: string;
    href: string;
};

/** A single sermon entry. */
export type Sermon = {
    slug: string;
    title: string;
    speaker: string;
    speakerRole: string;
    /** ISO date string (YYYY-MM-DD). */
    date: string;
    /** Human-readable duration (e.g. "38 min"). */
    duration: string;
    series: string;
    topics: string[];
    /** Primary scripture reference. */
    scripture: string;
    /** YouTube video ID used both for embed and thumbnail fallback. */
    youtubeId: string;
    /** Optional override for the card thumbnail. Falls back to YouTube. */
    thumbnail?: string;
    summary: string;
    outline: OutlinePoint[];
    /** Small-group discussion questions. */
    questions: string[];
    /** Optional curated resources to go deeper. */
    relatedResources?: SermonResource[];
    /** Marks the hero/featured sermon on the list and homepage. */
    featured?: boolean;
};
