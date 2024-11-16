import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-around"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
      <h1 className="text-6xl font-bold bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6">
      Choose a Difficulty Level
      </h1>
        <div className="grid">
            <Link href="/">
                <Button className="bg-orange-500 px-24 py-12 rounded-full text-black font-bold mb-8">
                <span className="text-5xl">Easy</span>
                </Button>
            </Link>
            <Link href="/">
                <Button className="bg-orange-500 px-16 py-12 rounded-full text-black font-bold my-8">
                <span className="text-5xl">Medium</span>
                </Button>
            </Link>
            <Link href="/">
                <Button className="bg-orange-500 px-24 py-12 rounded-full text-black font-bold my-8">
                <span className="text-5xl">Hard</span>
                </Button>
            </Link>
        </div>
    </div>
  );
}


