import { audiowide } from "@/fonts/fonts";
import Image from "next/image";
import { useEffect } from "react";

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
        <div className="fixed inset-0 z-50 bg-[#D4DAE9] motion-opacity-0 motion-delay-[3500ms]">
            <Pattern />

            <div className="relative h-full w-full grid place-items-center px-6">
                <div className="flex items-center justify-center">
                    <div
                        className={`text-7xl md:text-[10rem] font-bold tracking-widest text-[#062365] motion-preset-slide-left motion-delay-[2500ms] ${audiowide.className}`}
                    >
                        NE
                    </div>

                    <div className="relative mx-2 md:mx-3 h-[80px] w-[80px] md:h-[150px] md:w-[150px] motion-delay-2000/rotate motion-rotate-out-45 motion-ease-spring-bouncier">
                        <div className="relative h-full w-full">
                            <div className="absolute inset-0">
                                <Image
                                    src="/icons/crossline-vertical.svg"
                                    alt=""
                                    fill
                                    className="object-contain"
                                    style={{
                                        filter:
                                            "brightness(0) saturate(100%) invert(11%) sepia(82%) saturate(2654%) hue-rotate(220deg) brightness(83%) contrast(101%)",
                                    }}
                                />
                            </div>
                            <div className="absolute -top-5 md:-top-8 inset-x-0 h-full">
                                <Image
                                    src="/icons/crossline-horizontal.svg"
                                    alt=""
                                    fill
                                    className="object-contain motion-ease-in"
                                    style={{
                                        filter:
                                            "brightness(0) saturate(100%) invert(11%) sepia(82%) saturate(2654%) hue-rotate(220deg) brightness(83%) contrast(101%)",
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`text-7xl md:text-[10rem] font-bold tracking-widest text-[#062365] motion-preset-slide-right motion-delay-[2500ms] ${audiowide.className}`}
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
