"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = React.useState<null | any>(null);
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [isCorrect, setIsCorrect] = React.useState(null);

  useEffect(() => {
    axios.get("https://marcconrad.com/uob/banana/api.php").then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const restartGame = () => {
    setTimeLeft(60);
    setData(null);
    setSelectedAnswer(null);
    setIsCorrect(null);
    axios.get("https://marcconrad.com/uob/banana/api.php").then((res) => {
      setData(res.data);
    });
  };


  const handleAnswerClick = (num) => {
    setSelectedAnswer(num);
    setIsCorrect(num === data.solution);
    const popup = document.getElementById("popup") as HTMLDivElement;
    const popupContent = popup.querySelector(".popup-content") as HTMLDivElement;
    const popupText = popup.querySelector(".popup-text") as HTMLDivElement;
    const popupButton = popup.querySelector(".popup-button") as HTMLButtonElement;
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
    setTimeout(() => {
      popupContent.style.animation = "popup-close 0.5s ease-in-out";
      setTimeout(() => {
        popup.style.display = "none";
      }, 500);
    }, 1500);
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-around"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
        <Link href="/dificulty-level">
        <Button className="absolute top-4 left-4 border border-gray-500 rounded-full p-2">
          <span className="sr-only">Go back</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
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
              className="popup-content p-4 rounded-lg bg-white"
              style={{ width: "400px" }}
            >
              <div className="popup-text text-4xl font-bold text-center"></div>
              <button
                className="popup-button mt-8 bg-orange-500 px-12 py-4 rounded-full text-black font-bold block mx-auto"
                onClick={() => {
                  const popup = document.getElementById("popup") as HTMLDivElement;
                  popup.style.display = "none";
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

