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
        User Name
      </h1>
      <div className="w-3/12">
        <Input
          type="text"
          placeholder="Enter your name"
          className="bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6 text-3xl placeholder:text-black"
        />
      </div>
      <div className="flex gap-4">
        <Link href="/">
          <Button className="bg-transparent border border-input rounded-full px-8 py-2 text-black font-bold hover:bg-input hover:text-black transition-colors duration-200">
            <span className="text-3xl">Back</span>
          </Button>
        </Link>
        <Link href="/dificulty-level">
          <Button className="bg-orange-500 px-24 py-12 rounded-full text-black font-bold">
            <span className="text-5xl">Submit</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}


