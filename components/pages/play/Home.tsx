import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-around"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
      <h1 className="text-6xl font-bold bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6">
        Banana Quiz
      </h1>
      <div className="flex justify-center animate-bounce">
        <Link href="/user-name">
          <Button className="bg-orange-500 px-24 py-12 rounded-full text-black font-bold">
            <span className="text-5xl">Play</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}


