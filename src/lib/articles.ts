import { ARTICLES } from "@/data/articles";
import type { Article, ArticleCategory } from "@/types/article";

/**
 * Sort articles by date in descending order (newest first).
 *
 * Pure helper — does not mutate the input.
 */
function byDateDesc(a: Article, b: Article): number {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/**
 * Returns every article, newest first.
 *
 * The result is a fresh array, so consumers can safely sort or filter it
 * without affecting the canonical `ARTICLES` constant.
 */
export function getAllArticles(): Article[] {
    return [...ARTICLES].sort(byDateDesc);
}

/**
 * Find an article by its URL slug.
 *
 * Returns `undefined` if no article matches — callers decide how to handle
 * the miss (e.g. calling `notFound()` in a route).
 */
export function getArticleBySlug(slug: string): Article | undefined {
    return ARTICLES.find((article) => article.slug === slug);
}

/**
 * Get articles in the same category as `slug`, excluding the article itself.
 *
 * @param slug  The slug of the current article.
 * @param limit Maximum number of articles to return (default 3).
 */
export function getRelatedArticles(slug: string, limit = 3): Article[] {
    const current = getArticleBySlug(slug);
    if (!current) return [];

    return ARTICLES.filter(
        (article) =>
            article.slug !== slug && article.category === current.category
    )
        .sort(byDateDesc)
        .slice(0, limit);
}

/**
 * Return the unique list of categories in order of first appearance.
 *
 * Useful for rendering filter chips on the articles index.
 */
export function getAllCategories(): ArticleCategory[] {
    return Array.from(new Set(ARTICLES.map((article) => article.category)));
}

/**
 * Pick the article that should be featured on the list hero.
 *
 * Prefers any article flagged with `featured: true`; falls back to the most
 * recent article if none is explicitly featured.
 */
export function getFeaturedArticle(): Article | undefined {
    const all = getAllArticles();
    return all.find((article) => article.featured) ?? all[0];
}
