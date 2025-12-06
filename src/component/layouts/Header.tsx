import { Button } from "@/components/ui/button";
import { audiowide, tiktokSans } from "@/fonts/fonts";



export default function Header() {
    return (<div className="flex justify-between p-4 md:m-4">
        <div className={`text-3xl font-bold tracking-widest ${audiowide.className}`}>
            NEXUS
        </div>
        <div className="hidden md:flex items-center justify-center gap-1">
            <Button variant={"ghost"}>Streams</Button>
            <Button variant={"ghost"}>Give</Button>
            <Button variant={"ghost"}>About</Button>
            <Button >Connect with Us</Button>
        </div>
    </div>)
}