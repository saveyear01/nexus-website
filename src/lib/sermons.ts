import { SERMONS } from "@/data/sermons";
import type { Sermon } from "@/types/sermon";

/**
 * Sort sermons by date in descending order (newest first).
 *
 * Pure helper — does not mutate the input.
 */
function byDateDesc(a: Sermon, b: Sermon): number {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/**
 * Returns every sermon, newest first.
 *
 * The result is a fresh array, so consumers can safely sort or filter it
 * without affecting the canonical `SERMONS` constant.
 */
export function getAllSermons(): Sermon[] {
    return [...SERMONS].sort(byDateDesc);
}

/**
 * Find a sermon by its URL slug.
 *
 * Returns `undefined` if no sermon matches — callers are responsible for
 * deciding how to handle the miss (e.g. calling `notFound()` in a route).
 */
export function getSermonBySlug(slug: string): Sermon | undefined {
    return SERMONS.find((sermon) => sermon.slug === slug);
}

/**
 * Get sermons in the same series as `slug`, excluding the sermon itself.
 *
 * @param slug  The slug of the current sermon.
 * @param limit Maximum number of sermons to return (default 3).
 */
export function getRelatedSermons(slug: string, limit = 3): Sermon[] {
    const current = getSermonBySlug(slug);
    if (!current) return [];

    return SERMONS.filter(
        (sermon) => sermon.slug !== slug && sermon.series === current.series
    )
        .sort(byDateDesc)
        .slice(0, limit);
}

/**
 * Return the unique list of series names in chronological order of first appearance.
 *
 * Useful for rendering filter chips on the sermons index.
 */
export function getAllSeries(): string[] {
    return Array.from(new Set(SERMONS.map((sermon) => sermon.series)));
}

/**
 * Return the unique list of speaker names in order of first appearance.
 *
 * Useful for rendering filter chips on the sermons index.
 */
export function getAllSpeakers(): string[] {
    return Array.from(new Set(SERMONS.map((sermon) => sermon.speaker)));
}

/**
 * Pick the sermon that should be featured on the home/list hero.
 *
 * Prefers any sermon flagged with `featured: true`; falls back to the most
 * recent sermon if none is explicitly featured.
 */
export function getFeaturedSermon(): Sermon | undefined {
    const all = getAllSermons();
    return all.find((sermon) => sermon.featured) ?? all[0];
}
