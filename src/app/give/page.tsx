import Footer from "@/component/layouts/Footer";
import Header from "@/component/layouts/Header";
import { Heart } from "lucide-react";

const AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function GivePage() {
  return (
    <div className="max-w-[1440px] mx-auto pt-4 md:pt-6 pb-8">
      <Header />
      <main className="mt-6 md:mt-10 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-white text-[#062365] px-3 py-1.5">
              Partner with us
            </span>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mt-4 leading-[1.02] text-[#051D35]">
              Give<span className="text-[#062365]">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[#051D35]/70 text-lg">
              Your generosity sends missionaries, plants groups, feeds
              neighbors, and keeps the lights on. Thank you for standing with
              us.
            </p>

            <div className="mt-10 rounded-[2rem] bg-white p-6 md:p-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#051D35]/60 mb-4">
                Choose an amount
              </div>
              <div className="grid grid-cols-3 gap-3">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    className="h-14 rounded-full bg-[#D4DAE9] hover:bg-[#062365] hover:text-white text-[#062365] font-bold transition-colors"
                  >
                    ${a}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <label className="text-sm font-semibold text-[#051D35]/70">
                  Or enter another amount
                </label>
                <div className="mt-2 flex items-center rounded-full bg-[#D4DAE9] focus-within:ring-2 focus-within:ring-[#062365] px-5">
                  <span className="text-[#051D35]/40 font-bold">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 h-14 px-3 bg-transparent outline-none font-semibold"
                  />
                </div>
              </div>

              <button className="w-full mt-6 inline-flex items-center gap-2 justify-center rounded-full bg-[#062365] hover:bg-[#051D35] text-white px-6 py-4 font-semibold transition-colors">
                <Heart size={16} /> Continue to checkout
              </button>
              <p className="text-xs text-[#051D35]/50 mt-3">
                Secure payments. You&apos;ll receive a receipt by email.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-[2rem] bg-[#051D35] text-white p-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4DAE9]">
                Where it goes
              </div>
              <ul className="mt-6 space-y-4 text-white/80">
                <li>
                  <span className="font-bold text-white">60%</span> &mdash; Local
                  ministry, gatherings, and small groups
                </li>
                <li>
                  <span className="font-bold text-white">25%</span> &mdash; Global
                  missions and partnerships
                </li>
                <li>
                  <span className="font-bold text-white">15%</span> &mdash;
                  Benevolence and city outreach
                </li>
              </ul>
            </div>

            <div className="rounded-[2rem] bg-white p-8">
              <div className="font-extrabold text-xl text-[#051D35]">
                Other ways to give
              </div>
              <ul className="mt-4 space-y-2 text-[#051D35]/80">
                <li>Mail a check to 123 Covenant Ave</li>
                <li>Stock and IRA transfers</li>
                <li>Estate and legacy giving</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
