import { audiowide } from "@/fonts/fonts";
import Image from "next/image";
import { useEffect } from "react";

const NAVY_FILTER =
    "brightness(0) saturate(100%) invert(11%) sepia(82%) saturate(2654%) hue-rotate(220deg) brightness(83%) contrast(101%)";

export default function SplashScreen({
    finishLoading,
}: {
    finishLoading: () => void;
}) {
    useEffect(() => {
        const t = setTimeout(() => {
            finishLoading();
        }, 4000);
        return () => clearTimeout(t);
    }, [finishLoading]);

    return (
        <div className="fixed inset-0 z-50 bg-[#EEF1F7] motion-opacity-0 motion-delay-[3500ms]">
            <Pattern />

            <div className="relative h-full w-full flex items-center justify-center px-6">
                {/* Desktop */}
                <div className="hidden md:flex items-center justify-center">
                    <div
                        className={`text-9xl font-bold mb-2 tracking-widest text-[#062365] motion-preset-slide-left motion-delay-[2500ms] ${audiowide.className}`}
                    >
                        NE
                    </div>
                    <div className="w-[150px] h-[150px] motion-delay-2000/rotate motion-rotate-out-45 motion-ease-spring-bouncier">
                        <div className="relative w-[150px] h-[230px] mb-4">
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src="/icons/crossline-vertical.svg"
                                    alt="Vertical Cross"
                                    fill
                                    className="object-contain"
                                    style={{ filter: NAVY_FILTER }}
                                />
                            </div>
                            <div className="absolute motion-ease-in top-[-32px] w-full h-full">
                                <Image
                                    src="/icons/crossline-horizontal.svg"
                                    alt="Horizontal Cross"
                                    fill
                                    className="object-contain"
                                    style={{ filter: NAVY_FILTER }}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`text-9xl font-bold mb-2 tracking-widest text-[#062365] motion-preset-slide-right motion-delay-[2500ms] ${audiowide.className}`}
                    >
                        US
                    </div>
                </div>

                {/* Mobile */}
                <div className="md:hidden flex items-center justify-center">
                    <div
                        className={`text-6xl font-bold mb-2 tracking-widest text-[#062365] motion-preset-slide-left motion-delay-[2500ms] ${audiowide.className}`}
                    >
                        NE
                    </div>
                    <div className="w-[80px] h-[80px] motion-delay-2000/rotate motion-rotate-out-45 motion-ease-spring-bouncier">
                        <div className="relative w-[80px] h-[120px] mb-4">
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src="/icons/crossline-vertical.svg"
                                    alt="Vertical Cross"
                                    fill
                                    className="object-contain"
                                    style={{ filter: NAVY_FILTER }}
                                />
                            </div>
                            <div className="absolute motion-ease-in top-[-19px] w-full h-full">
                                <Image
                                    src="/icons/crossline-horizontal.svg"
                                    alt="Horizontal Cross"
                                    fill
                                    className="object-contain"
                                    style={{ filter: NAVY_FILTER }}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`text-6xl font-bold mb-2 tracking-widest text-[#062365] motion-preset-slide-right motion-delay-[2500ms] ${audiowide.className}`}
                    >
                        US
                    </div>
                </div>

                <div className="absolute bottom-10 inset-x-0 text-center motion-preset-fade motion-delay-[3000ms]">
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#051D35]/60 font-semibold">
                        Connected. Together in Christ.
                    </p>
                </div>
            </div>
        </div>
    );
}

function Pattern() {
    return (
        <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
                backgroundImage:
                    "radial-gradient(rgba(6,35,101,0.18) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        />
    );
}
