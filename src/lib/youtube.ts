/**
 * YouTube URL helpers.
 *
 * Keeping these in one place means the player domain, thumbnail size, and
 * embed parameters can be changed once instead of being scattered across the
 * UI layer.
 */

const THUMBNAIL_HOST = "https://img.youtube.com";
const EMBED_HOST = "https://www.youtube.com/embed";
const WATCH_HOST = "https://www.youtube.com/watch";

/**
 * Return the highest-resolution thumbnail URL for a YouTube video.
 *
 * YouTube returns this image for any valid video ID. For invalid IDs the
 * request 404s — the UI is responsible for handling that fallback (typically
 * with an `onError` handler on the `<img>` element).
 */
export function getYouTubeThumbnail(videoId: string): string {
    return `${THUMBNAIL_HOST}/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Return an embed URL suitable for a YouTube `<iframe src>`.
 *
 * `rel=0` and `modestbranding=1` reduce the post-roll recommendations and
 * remove the prominent YouTube logo while a video is playing.
 */
export function getYouTubeEmbedUrl(videoId: string): string {
    return `${EMBED_HOST}/${videoId}?rel=0&modestbranding=1`;
}

/**
 * Return the public YouTube watch URL for a video.
 */
export function getYouTubeWatchUrl(videoId: string): string {
    return `${WATCH_HOST}?v=${videoId}`;
}
