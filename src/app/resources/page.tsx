import Footer from "@/component/layouts/Footer";
import Header from "@/component/layouts/Header";

export default function ResourcesPage() {
  return (
    <div className="max-w-[1440px] mx-auto pt-4 md:pt-6 pb-8">
      <Header />
      <main className="mt-6 md:mt-10 px-4 md:px-8">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-[#EEF1F7] text-[#062365] px-3 py-1.5">
          For your week
        </span>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mt-4 max-w-4xl text-[#051D35]">
          Resources.
        </h1>
        <p className="mt-6 max-w-2xl text-[#051D35]/70 text-lg">
          Reading plans, study guides, podcasts, and tools to help you walk
          closer with Jesus.
        </p>
        <div className="mt-12 grid place-items-center h-60 rounded-[2rem] bg-[#EEF1F7] text-[#051D35]/50">
          Resources catalog coming soon.
        </div>
      </main>
      <Footer />
    </div>
  );
}
