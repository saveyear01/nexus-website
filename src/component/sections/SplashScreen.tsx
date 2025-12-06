import { audiowide, roadRage } from "@/fonts/fonts";
import Image from "next/image";
import { useEffect } from "react";

export default function SplashScreen({ finishLoading }: { finishLoading: () => void }) {

    useEffect(() => {
        setTimeout(() => {
            finishLoading();
        }, 4000);
    }, [ finishLoading ]);

    return (
        <>
            <div className="hidden md:flex fixed inset-0 items-center justify-center z-50 motion-opacity-0 motion-delay-2000">
                <div className={`text-9xl font-bold mb-2 tracking-widest motion-preset-slide-left motion-delay-[2500ms] ${audiowide.className}`}>NE</div>
                <div className="w-[150px] h-[150px] motion-delay-2000/rotate motion-rotate-out-45 motion-ease-spring-bouncier">
                    <div className="relative w-[150px] h-[230px] mb-4">
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src="/icons/crossline-vertical.svg"
                                alt="Vertical Cross"
                                fill
                                className="object-contain"
                            />
                        </div>
                        {/* Horizontal Line */}
                        <div className="absolute motion-ease-in top-[-32px] w-full h-full">
                            <Image
                                src="/icons/crossline-horizontal.svg"
                                alt="Horizontal Cross"
                                fill
                                className="object-contain"
                            />
                        </div>
                    {/* <Image
                    src="/icons/crossline-vertical.svg"
                    alt="Vertical Cross"
                    width={100}
                    height={100}
                    className="absolute inset-0 w-full h-full"
                    />
                    <Image
                    src="/icons/crossline-horizontal.svg"
                    alt="Horizontal Cross"
                    width={100}
                    height={100}
                    className="absolute top-[-32px] w-full h-full"
                    /> */}
                </div>
                </div>
                <div className={`text-9xl font-bold mb-2 tracking-widest motion-preset-slide-right motion-delay-[2500ms] ${audiowide.className}`}>US</div>
            </div>

            {/* for mobile view  */}
            <div className="md:hidden fixed inset-0 flex items-center justify-center z-50 motion-opacity-0 motion-delay-2000">
                <div className={`text-6xl font-bold mb-2 tracking-widest motion-preset-slide-left motion-delay-[2500ms] ${audiowide.className}`}>NE</div>
                <div className="w-[80px] h-[80px] motion-delay-2000/rotate motion-rotate-out-45 motion-ease-spring-bouncier">
                    <div className="relative w-[80px] h-[120px] mb-4">
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src="/icons/crossline-vertical.svg"
                                alt="Vertical Cross"
                                fill
                                className="object-contain"
                            />
                        </div>
                        {/* Horizontal Line */}
                        <div className="absolute motion-ease-in top-[-19px] w-full h-full">
                            <Image
                                src="/icons/crossline-horizontal.svg"
                                alt="Horizontal Cross"
                                fill
                                className="object-contain"
                            />
                        </div>
                    {/* <Image
                    src="/icons/crossline-vertical.svg"
                    alt="Vertical Cross"
                    width={100}
                    height={100}
                    className="absolute inset-0 w-full h-full"
                    />
                    <Image
                    src="/icons/crossline-horizontal.svg"
                    alt="Horizontal Cross"
                    width={100}
                    height={100}
                    className="absolute top-[-32px] w-full h-full"
                    /> */}
                </div>
                </div>
                <div className={`text-6xl font-bold mb-2 tracking-widest motion-preset-slide-right motion-delay-[2500ms] ${audiowide.className}`}>US</div>
            </div>
        </>
        
    );
}
