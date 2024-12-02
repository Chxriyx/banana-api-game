'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

      const { data, error } = await supabase
        .from("scores")
        .select("user_email, score, difficulty")
        .order("score", { ascending: false })
        .limit(5);

      if (error) console.error("Error fetching scores:", error);
      else setScores(data);
    };

    fetchScores();
  }, []);

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-center"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
      <Link href="/">
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
      <div className="bg-[#FFA500] bg-opacity-80 rounded-2xl mt-10 p-6 m-4 w-3/5">
        <h2 className="text-4xl font-bold mb-4">Top five</h2>
        {scores.map((score, index) => (
          <div key={index} className="flex items-center justify-between text-2xl py-4 mx-6">
            <p className="font-bold text-3xl">{score.user_email}</p>
            <p className="font-bold text-3xl">{score.difficulty}</p>
            <p className="font-bold text-3xl">{score.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

