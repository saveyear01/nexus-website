import { Button } from "@/components/ui/button";
import { audiowide, notoSans, tiktokSans } from "@/fonts/fonts";
import { ArrowDown, ChevronsDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col px-4 md:px-8 mt-8">
        <div className="flex flex-col pt-8 md:pt-12">
            <div className={`hidden md:block text-5xl md:text-[200px] font-bold mb-4`}>
                Connected<span className="text-blue-800">.</span> 
            </div>

            <div className={`md:hidden text-5xl md:text-[200px] font-bold mb-4`} style={ {textAlign: 'center'} }>
                Connected<span className="text-blue-800">.</span> 
            </div>
            
            
            <h1 className={`hidden md:block text-7xl md:text-9xl font-bold mb-4 mt-4 md:text-end`}>
                Together in <span className="font-extrabold">Jesus</span>
                {/* Grow. Worship. Together in Christ. */}
            </h1>

            <h1 className={`md:hidden text-7xl md:text-9xl font-bold mb-4 mt-4 md:text-end`} style={ {textAlign: 'center'} }>
                Together in <span className="font-extrabold text-blue-800">Jesus</span>
                {/* Grow. Worship. Together in Christ. */}
            </h1>

            <div className="flex md:hidden items-center justify-center mt-12 ">
                <ChevronsDown size={32} className="text-blue-800 animate-bounce" />
            </div>
            <div className="hidden md:flex items-center justify-center mt-12 ">
                <ChevronsDown size={60} className="text-blue-800 animate-bounce" />
            </div>
        </div>
        <div className="my-8">
            <video className="rounded-lg w-full h-full" src="https://content.elevationchurch.org/on-demand/public/OnlineIntroBumper_Edit_V5_Website.m3u8" autoPlay loop muted></video>
        </div>
    </div>
    // <div className="flex flex-col items-center justify-center pt-10">
    //     <div className="flex items-center justify-center my-14">
    //         <div className={`text-9xl font-bold mb-2 tracking-widest  ${audiowide.className}`}>NE</div>
    //         <div className="w-[150px] h-[150px] rotate-45">
    //             <div className="relative w-[150px] h-[230px] mb-4">
    //                 <div className="absolute inset-0 w-full h-full">
    //                     <Image
    //                         src="/icons/crossline-vertical.svg"
    //                         alt="Vertical Cross"
    //                         fill
    //                         className="object-contain"
    //                     />
    //                 </div>
    //                 {/* Horizontal Line */}
    //                 <div className="absolute top-[-32px] w-full h-full">
    //                     <Image
    //                         src="/icons/crossline-horizontal.svg"
    //                         alt="Horizontal Cross"
    //                         fill
    //                         className="object-contain"
    //                     />
    //                 </div>
    //         </div>
    //         </div>
    //         <div className={`text-9xl font-bold mb-2 tracking-widest ${audiowide.className}`}>US</div>
    //     </div>
    //     <p className={`text-3xl mb-2 tracking-widest ${notoSans.className}`}>Connect. Grow. Worship. Together in Christ.</p>

    //     <video src=""></video>
    // </div>
  );
}