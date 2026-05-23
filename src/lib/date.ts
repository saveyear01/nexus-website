/**
 * Date formatting helpers.
 *
 * All functions take an ISO date string in `YYYY-MM-DD` form. We append a
 * fixed time component so the parsed `Date` is interpreted as the start of
 * the day in the local timezone — avoiding off-by-one issues that occur when
 * `new Date("YYYY-MM-DD")` is interpreted as UTC midnight.
 */

const LOCALE = "en-US";

/**
 * Format an ISO date as a long human-readable string.
 *
 * @example
 * formatDate("2026-05-18") // "May 18, 2026"
 */
export function formatDate(iso: string): string {
    return parseIsoDate(iso).toLocaleDateString(LOCALE, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Format an ISO date as a compact human-readable string.
 *
 * @example
 * formatDateShort("2026-05-18") // "May 18, 2026"
 */
export function formatDateShort(iso: string): string {
    return parseIsoDate(iso).toLocaleDateString(LOCALE, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function parseIsoDate(iso: string): Date {
    return new Date(`${iso}T00:00:00`);
}
