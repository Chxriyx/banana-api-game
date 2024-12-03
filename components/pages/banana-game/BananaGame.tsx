"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
  const [data, setData] = useState<null | any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showFinishModal, setShowFinishModal] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const difficulty = query.get("difficulty");
    const userNameParam = query.get("user_name");

    if (userNameParam) {
      setUserName(userNameParam);
    }

    switch (difficulty) {
      case "Easy":
        setTimeLeft(30);
        break;
      case "Medium":
        setTimeLeft(20);
        break;
      case "Hard":
      default:
        setTimeLeft(10);
        break;
    }

    axios.get("https://marcconrad.com/uob/banana/api.php").then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      showGameOverPopup();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const restartGame = () => {
    const query = new URLSearchParams(window.location.search);
    const difficulty = query.get("difficulty");

    switch (difficulty) {
      case "Easy":
        setTimeLeft(30);
        break;
      case "Medium":
        setTimeLeft(20);
        break;
      case "Hard":
      default:
        setTimeLeft(10);
        break;
    }

    setData(null);
    setSelectedAnswer(null);
    setIsCorrect(null);
    axios.get("https://marcconrad.com/uob/banana/api.php").then((res) => {
      setData(res.data);
    });
  };

  const handleAnswerClick = (num: number) => {
    setSelectedAnswer(num as any);
    setIsCorrect(num === data.solution);
    if (num === data.solution) {
      setShowFinishModal(true);
    } else {
      const popup = document.getElementById("popup");
      if (popup) {
        const popupContent = popup.querySelector(".popup-content") as HTMLDivElement;
        const popupText = popup.querySelector(".popup-text") as HTMLDivElement;
        popup.style.display = "flex";
        popupContent.style.animation = "popup-open 0.5s ease-in-out";
        popupText.textContent = "Wrong!";
        popupText.style.color = "#FF0000";
      }
    }
  };

  const showGameOverPopup = () => {
    const popup = document.getElementById("popup");
    if (popup) {
      const popupContent = popup.querySelector(".popup-content") as HTMLDivElement;
      const popupText = popup.querySelector(".popup-text") as HTMLDivElement;
      popup.style.display = "flex";
      popupContent.style.animation = "popup-open ease-in-out";
      popupText.textContent = "Game Over!";
      popupText.style.color = "#FF0000";
    }
  };

  const saveScore = () => {
    const query = new URLSearchParams(window.location.search);
    const difficulty = query.get("difficulty");

    supabase
      .from("scores")
      .insert({
        user_name: userName,
        difficulty,
        score: timeLeft,
      })
      .then(({ data }) => {
        if (data) {
          console.log("Score saved successfully");
        } else {
          console.log("Error saving score");
        }
      });
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-around"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
      <Link href="/protected/dificulty-level">
        <Button className="bg-orange-500 text-black text-2xl font-bold absolute top-4 left-4 border border-black rounded-full p-6 mt-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="mx-4">Back</span>
        </Button>
      </Link>
      {data ? (
        <div className="relative">
          <div className="p-2 text-black font-bold text-3xl flex justify-end">
            <span>Time Left: {timeLeft}</span>
          </div>
          <img
            src={data.question}
            alt="Question"
            className="mx-auto"
            style={{ display: "block" }}
          />
          <p>{data.solution}</p>
          <div className="flex justify-center gap-3 mt-10">
            {[...Array(10).keys()].map((num) => (
              <div
                key={num}
                className={`flex items-center justify-center rounded-full bg-[#FFFF00] opacity-80 w-16 h-16 text-3xl font-bold ${
                  selectedAnswer === num
                    ? isCorrect
                      ? "bg-green-500"
                      : "bg-red-500"
                    : ""
                }`}
                onClick={() => handleAnswerClick(num)}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <button
              className="bg-orange-500 px-12 py-4 rounded-full text-black font-bold my-8 text-3xl"
              onClick={restartGame}
            >
              Restart
            </button>
            <Link href="/protected/leader-board">
              <button
                className="bg-orange-500 px-12 py-4 rounded-full text-black font-bold my-8 text-3xl"
              >
                Finish
              </button>
            </Link>
          </div>
          <div
            id="popup"
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center hidden"
          >
            <div
              className="popup-content p-8 rounded-lg bg-white"
              style={{ width: "400px" }}
            >
              <div className="popup-text text-4xl font-bold text-center mb-6"></div>
              <div className="flex justify-center gap-3 mt-4">
                <button
                  className="bg-orange-500 px-8 py-2 rounded-full text-black font-bold"
                  onClick={restartGame}
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
          {showFinishModal && (
            <div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            >
              <div
                className="p-8 rounded-lg bg-white"
                style={{ width: "400px" }}
              >
                <div className="text-4xl font-bold text-center mb-6">Correct!</div>
                <div className="flex justify-center gap-3 mt-4">
                  <button
                    className="bg-orange-500 px-8 py-2 rounded-full text-black font-bold"
                    onClick={() => {
                      saveScore();
                      setShowFinishModal(false);
                    }}
                  >
                    Finish
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

