"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    localStorage.setItem('name', e.target.value);
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-around"
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
        User Name
      </h1>
      <div className="w-3/12">
        <Input
          type="text"
          placeholder="Enter your name"
          className="bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6 text-3xl placeholder:text-black"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="flex gap-4">
        <Link href="/dificulty-level">
          <Button className="bg-orange-500 px-24 py-12 rounded-full text-black font-bold">
            <span className="text-5xl">Submit</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

