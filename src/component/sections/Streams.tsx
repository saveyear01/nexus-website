import { Button } from "@/components/ui/button";
import { Facebook, Youtube } from "lucide-react";

export default function Streams() {
    return (
        <div className="flex flex-col items-center justify-center px-8 mt-12 md:mt-24 mb-8 gap-4">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
                Watch Our Latest Streams
            </h2>
            <p>Stay connected with the Nexus community. Join our live worship and teachings through our streaming platforms.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
                <Button size={'xl'} variant="outline" className="w-full md:w-auto"> <Facebook className="mr-2 text-blue-700" /> Facebook Live</Button>
                <Button size={'xl'} variant="outline" className="w-full md:w-auto"> <Youtube className="mr-2 text-red-700" /> Youtube Live</Button>
            </div>
        </div>
    );
}