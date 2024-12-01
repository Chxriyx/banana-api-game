import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-center"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
      <Link href="/protected">
        <Button className="bg-orange-500 text-black text-2xl font-bold absolute top-4 left-4 border border-black rounded-full p-6 mt-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="mx-4">Back</span>
        </Button>
      </Link>
      <h1 className="text-6xl font-bold bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6">
        Leader Board
      </h1>
      <div className="bg-[#FFA500] bg-opacity-80 rounded-2xl mt-10 p-6 m-4 w-2/5">
        <div className="flex items-center justify-between text-2xl py-4 mx-6">
          <p className="font-bold text-3xl">Player One</p>
          <p className="font-bold text-3xl">100</p>
        </div>
        <div className="flex items-center justify-between text-2xl py-4 mx-6">
          <p className="font-bold text-3xl">Player Two</p>
          <p className="font-bold text-3xl">80</p>
        </div>
        <div className="flex items-center justify-between text-2xl py-4 mx-6">
          <p className="font-bold text-3xl">Player Three</p>
          <p className="font-bold text-3xl">60</p>
        </div>
        <div className="flex items-center justify-between text-2xl py-4 mx-6">
          <p className="font-bold text-3xl">Player Three</p>
          <p className="font-bold text-3xl">60</p>
        </div>
        <div className="flex items-center justify-between text-2xl py-4 mx-6">
          <p className="font-bold text-3xl">Player Three</p>
          <p className="font-bold text-3xl">60</p>
        </div>
      </div>
    </div>
  );
}

