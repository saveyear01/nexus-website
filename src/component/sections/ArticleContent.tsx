import type { ArticleBlock } from "@/types/article";
import { Quote } from "lucide-react";

/**
 * Renders an article's body from typed content blocks.
 *
 * Uses the site's standard Nunito typography for consistency with the rest
 * of the product. To add a new block type: extend the `ArticleBlock` union
 * in `types/article.ts` — TypeScript will then force an update of the
 * exhaustive switch below.
 */
export default function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
    return (
        <div className="text-lg text-[#051D35]/85 leading-relaxed">
            {blocks.map((block, idx) => (
                <BlockRenderer key={idx} block={block} />
            ))}
        </div>
    );
}

function BlockRenderer({ block }: { block: ArticleBlock }) {
    switch (block.type) {
        case "paragraph":
            return <p className="mt-6 first:mt-0">{block.text}</p>;

        case "heading":
            return (
                <h2 className="mt-12 mb-1 text-2xl md:text-3xl font-extrabold tracking-tight text-[#051D35]">
                    {block.text}
                </h2>
            );

        case "quote":
            return (
                <figure className="my-10 rounded-[1.5rem] bg-[#EEF1F7] p-6 md:p-8">
                    <Quote size={28} className="text-[#062365] opacity-60" />
                    <blockquote className="mt-3 text-xl md:text-2xl font-semibold text-[#051D35] leading-snug">
                        “{block.text}”
                    </blockquote>
                    {block.cite && (
                        <figcaption className="mt-4 text-sm font-semibold text-[#051D35]/60 uppercase tracking-[0.15em]">
                            — {block.cite}
                        </figcaption>
                    )}
                </figure>
            );

        case "list": {
            const items = block.items.map((item, i) => (
                <li key={i} className="pl-2">
                    {item}
                </li>
            ));
            return block.ordered ? (
                <ol className="mt-6 list-decimal pl-6 space-y-3 marker:text-[#062365] marker:font-bold">
                    {items}
                </ol>
            ) : (
                <ul className="mt-6 list-disc pl-6 space-y-3 marker:text-[#062365]">
                    {items}
                </ul>
            );
        }

        default: {
            // Exhaustiveness check — adding a new block type without a case
            // here will trigger a TypeScript error.
            const _exhaustive: never = block;
            return _exhaustive;
        }
    }
}
