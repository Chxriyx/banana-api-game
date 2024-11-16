"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = React.useState<null | any>(null);
  const [timeLeft, setTimeLeft] = React.useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [isCorrect, setIsCorrect] = React.useState(null);

  useEffect(() => {
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
    const popup = document.getElementById("popup");
    if (popup) {
      const popupContent = popup.querySelector(".popup-content") as HTMLDivElement;
      const popupText = popup.querySelector(".popup-text") as HTMLDivElement;
      popup.style.display = "flex";
      popupContent.style.animation = "popup-open 0.5s ease-in-out";
      if (num === data.solution) {
        popupText.textContent = "Correct!";
        popupText.style.color = "#34C759";
        setTimeout(restartGame, 1500);
      } else {
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

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-around"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
      <Link href="/dificulty-level">
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
            <Link href="/leader-board">
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
                  {isCorrect ? "Close" : "Restart"}
                </button>
                {isCorrect ? null : (
                  <Link href="/leader-board">
                    <button
                      className="bg-orange-500 px-8 py-2 rounded-full text-black font-bold"
                    >
                      Finish
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}


