'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const [scores, setScores] = useState({} as { [key: string]: any[] });

  useEffect(() => {
    const fetchScores = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

      const { data, error } = await supabase
        .from("scores")
        .select("user_name, score, difficulty")
        .order("score", { ascending: false });

      if (error) console.error("Error fetching scores:", error);
      else {
        const scoresByDifficulty = {} as { [key: string]: any[] };
        data.forEach(score => {
          if (!scoresByDifficulty[score.difficulty]) scoresByDifficulty[score.difficulty] = [];
          scoresByDifficulty[score.difficulty].push(score);
        });
        setScores(scoresByDifficulty);
      }
    };

    fetchScores();
  }, []);

  const renderScores = (difficulty: string) => (
    <div className="bg-[#FFA500] bg-opacity-80 rounded-2xl mt-10 p-6 m-4 w-3/5 flex flex-col">
      <h2 className="text-4xl font-bold mb-4">{difficulty} Level</h2>
      <div className="flex flex-col">
        {scores[difficulty] ? (
          scores[difficulty].slice(0, 5).map((score, index) => (
            <div key={index} className="flex items-center justify-between text-2xl py-4 mx-6 border-b border-black">
              <p className="font-bold text-3xl">{score.user_name}</p>
              <p className="font-bold text-3xl">{score.score}</p>
            </div>
          ))
        ) : (
          <p className="text-3xl text-center">No data</p>
        )}
      </div>
    </div>
  );

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
      <div className="flex space-x-4 w-[90%]">{renderScores("Easy")}{renderScores("Medium")}{renderScores("Hard")}</div>
    </div>
  );
}

