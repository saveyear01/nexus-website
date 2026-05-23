import type { Article, ArticleAuthor } from "@/types/article";

/**
 * Reusable author records so each article doesn't repeat the same name/role.
 */
const AUTHORS: Record<string, ArticleAuthor> = {
    daniel: {
        name: "Ps. Daniel Cruz",
        role: "Lead Pastor",
        bio: "Daniel has pastored Nexus since 2018 and writes regularly on covenant, worship, and the local church.",
    },
    maria: {
        name: "Ps. Maria Lim",
        role: "Teaching Pastor",
        bio: "Maria leads our teaching team and oversees our reading-plan and study-guide catalog.",
    },
    james: {
        name: "Ps. James Aboitiz",
        role: "Pastor of Mission",
        bio: "James plants groups and partners with churches across our covenant network.",
    },
};

/**
 * The canonical list of articles.
 *
 * Pure data only — no queries or helpers belong here. For querying or sorting,
 * import from `@/lib/articles` instead.
 */
export const ARTICLES: Article[] = [
    {
        slug: "what-is-a-covenant-church",
        title: "What's a covenant church, anyway?",
        excerpt:
            "Beyond a name on the door — the words 'covenant church' carry a particular vision of belonging, mission, and shared life. Here's what we mean by it.",
        author: AUTHORS.maria,
        date: "2026-05-20",
        readTime: "7 min read",
        category: "Theology",
        tags: ["Covenant", "Membership", "Church"],
        featured: true,
        content: [
            {
                type: "paragraph",
                text: "If you've spent any time around Nexus, you've heard the word covenant. It's in our name. It's in our sermons. It's on our welcome card. But what does it actually mean — and why have we built so much of our life around it?",
            },
            {
                type: "heading",
                text: "Not a contract, not a club",
            },
            {
                type: "paragraph",
                text: "A contract protects two parties from each other. A club organizes people around a shared interest. A covenant is something altogether different — a binding, public commitment between people who pledge themselves to one another in love. It costs more than a contract. It demands more than a club.",
            },
            {
                type: "quote",
                text: "The covenant is not a fence we build around our friends. It's the trellis we grow on together so that more people can find shelter.",
                cite: "Eugene Peterson",
            },
            {
                type: "heading",
                text: "What it looks like in practice",
            },
            {
                type: "paragraph",
                text: "When someone joins Nexus, they're not signing up for a service to consume. They're making promises — to gather, to give, to be known, to serve, to forgive, to be forgiven. And we make the same promises back. That's why our membership process takes time. Covenant is a different kind of yes.",
            },
            {
                type: "list",
                items: [
                    "We gather weekly — not because it's required, but because it shapes us.",
                    "We share life in small groups — because we can't grow alone.",
                    "We give generously — because the church belongs to all of us.",
                    "We send each other — because the covenant is for the world.",
                ],
            },
            {
                type: "heading",
                text: "Why it matters now",
            },
            {
                type: "paragraph",
                text: "In a moment when most relationships are negotiable and church can feel like a streaming service, a covenant community offers something countercultural: a place where you're known and missed. Where you're loved before you've earned it. Where saying yes to a people is also saying yes to a God who has already said yes to you.",
            },
        ],
    },
    {
        slug: "praying-the-psalms",
        title: "Praying the Psalms when you don't know what to pray",
        excerpt:
            "The Psalter has been the prayer book of the church for two thousand years. A short guide to letting it pray you back to life.",
        author: AUTHORS.maria,
        date: "2026-05-13",
        readTime: "6 min read",
        category: "Discipleship",
        tags: ["Prayer", "Psalms", "Spiritual Formation"],
        content: [
            {
                type: "paragraph",
                text: "There are seasons when prayer just doesn't come. The words won't form. The mind wanders. The heart feels like it's on mute. If that's where you are right now, this article is for you — and the Psalms are your friend.",
            },
            {
                type: "heading",
                text: "Pray someone else's words first",
            },
            {
                type: "paragraph",
                text: "The Psalms give you a vocabulary when you don't have your own. They cover the full register of human emotion — joy, rage, grief, awe, doubt, repentance — and they sanctify all of it. You don't need to feel what the Psalmist felt to pray his prayer. You just need to read it slowly enough to let it shape you.",
            },
            {
                type: "heading",
                text: "A simple practice",
            },
            {
                type: "list",
                ordered: true,
                items: [
                    "Pick a Psalm. (Try Psalm 23, 42, 51, or 139.)",
                    "Read it slowly, out loud if you can.",
                    "Read it a second time. Notice a word or phrase that catches you.",
                    "Pray that word back to God in your own voice.",
                    "Sit in silence for a minute. End with the Lord's Prayer.",
                ],
            },
            {
                type: "quote",
                text: "Whenever the Psalter is abandoned, an incomparable treasure vanishes from the Christian church.",
                cite: "Dietrich Bonhoeffer",
            },
            {
                type: "paragraph",
                text: "If you want to go further, our reading plan 'A Psalm a Day' walks you through all 150 with daily prompts. But you can also just start with one. The Psalms are patient. They'll wait for you to come back.",
            },
        ],
    },
    {
        slug: "the-neighborhood-as-parish",
        title: "The neighborhood as parish",
        excerpt:
            "What if your block were your mission field? A short essay on rediscovering the parish imagination in a mobile, scattered age.",
        author: AUTHORS.james,
        date: "2026-05-06",
        readTime: "5 min read",
        category: "Mission",
        tags: ["Neighborhood", "Mission", "Place"],
        content: [
            {
                type: "paragraph",
                text: "For most of church history, Christians thought of mission in terms of a parish — a specific geography of streets and houses for which the church was responsible. You knew your neighbors. You buried them. You baptized their children.",
            },
            {
                type: "paragraph",
                text: "Modern life has eroded that imagination. We commute to work, commute to church, commute to friendship. Our 'community' lives in a group chat. The block we sleep on is functionally invisible to us.",
            },
            {
                type: "heading",
                text: "A small experiment",
            },
            {
                type: "paragraph",
                text: "What if, for the next month, you treated your block as your parish? Not a project to fix, not a target audience — but a place you're called to. A few small practices to try:",
            },
            {
                type: "list",
                items: [
                    "Walk your block once a week. Pray for each home you pass.",
                    "Learn the names of three neighbors you've never met.",
                    "Host one meal — simple, no agenda, just an invitation.",
                    "Notice who's missing from public life and ask why.",
                ],
            },
            {
                type: "quote",
                text: "We do not love a place because it is great. It becomes great because we love it.",
                cite: "Wendell Berry (paraphrased)",
            },
            {
                type: "paragraph",
                text: "The neighborhood isn't a strategy. It's a gift — and a calling. The God who became a neighbor in Jesus is still calling his people to be neighbors. Start small. Start where you are.",
            },
        ],
    },
    {
        slug: "small-groups-arent-optional",
        title: "Small groups aren't optional",
        excerpt:
            "You can't grow alone. A blunt case for why every member at Nexus belongs in a small group — and how to find yours.",
        author: AUTHORS.daniel,
        date: "2026-04-29",
        readTime: "4 min read",
        category: "Community",
        tags: ["Small Groups", "Discipleship", "Community"],
        content: [
            {
                type: "paragraph",
                text: "I want to make a case I've been making in private conversations for years, and put it on paper: at Nexus, small groups aren't a side dish. They're how we expect every member to grow.",
            },
            {
                type: "heading",
                text: "Sunday is too big and too short",
            },
            {
                type: "paragraph",
                text: "I love Sunday. I love preaching. I love singing together. But Sunday is a worship gathering — not a context for being known. You can attend for years and remain a stranger. That's not a critique of the gathering; it's a feature of its scale.",
            },
            {
                type: "paragraph",
                text: "Small groups are where the slow, hidden work happens. Confession. Encouragement. Asking the questions that take more than two minutes to answer. Being missed when you don't show up.",
            },
            {
                type: "quote",
                text: "The Christian life is not lived alone. It can't be. The New Testament knows nothing of a solo disciple.",
            },
            {
                type: "heading",
                text: "How to find yours",
            },
            {
                type: "list",
                items: [
                    "Visit the small-groups page and browse what's running this season.",
                    "Pick one that fits your neighborhood or life stage.",
                    "Show up three times before deciding if it's a fit.",
                    "If nothing fits, talk to a pastor — we'll help you start one.",
                ],
            },
        ],
    },
    {
        slug: "why-we-gather-weekly",
        title: "Why we gather every week",
        excerpt:
            "A short theology of the Sunday gathering — and why showing up matters more than you might think.",
        author: AUTHORS.daniel,
        date: "2026-04-22",
        readTime: "5 min read",
        category: "Theology",
        tags: ["Worship", "Sunday", "Sabbath"],
        content: [
            {
                type: "paragraph",
                text: "Every Sunday morning, alarms go off in homes across our city, and people make a small, repeated decision to show up. Why? In a streaming age, why gather at all?",
            },
            {
                type: "heading",
                text: "We are formed by what we repeat",
            },
            {
                type: "paragraph",
                text: "Worship isn't primarily about getting a spiritual boost for the week. It's a weekly re-formation. We sing, we confess, we listen, we eat the bread and drink the cup — and over years of repetition, the gospel works its way into our bones.",
            },
            {
                type: "quote",
                text: "You can't think your way into a new kind of living. You have to live your way into a new kind of thinking.",
                cite: "Richard Rohr",
            },
            {
                type: "heading",
                text: "We need each other",
            },
            {
                type: "paragraph",
                text: "Hebrews 10 doesn't tell us to keep meeting because it's nice. It tells us to meet because we forget. We forget the gospel. We forget we're loved. We forget who we are. Other Christians remember on our behalf until we remember again.",
            },
            {
                type: "paragraph",
                text: "If you've drifted from gathering, this isn't a guilt trip. It's an invitation. Try four weeks in a row. See if your soul knows something your schedule has been arguing with.",
            },
        ],
    },
];
