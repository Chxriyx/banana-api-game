import Link from "next/link";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/app/actions";
import { Button } from "@nextui-org/react";



export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-evenly"
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
      <h1 className="text-6xl font-bold bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6">Sign in</h1>
      <form>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Input 
          name="email" 
          placeholder="Enter your email"
          className="bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6 text-3xl placeholder:text-black"
          required 
        />
        <div className="flex justify-between items-center">
        </div>
        <Input
          type="password"
          name="password"
          className="bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6 text-3xl placeholder:text-black"
          placeholder="Your password"
          required
        />
        <SubmitButton className="bg-orange-500 px-24 py-9 rounded-full text-black font-bold" pendingText="Signing In..." formAction={signInAction}>
        <span className="text-3xl">Sign in</span>
        </SubmitButton>
        <FormMessage message={searchParams} />
        <div className="flex justify-between items-center text-black font-bold py-2">
          <p className="text-lg rounded-full bg-[#D9D9D9] px-2">
            Don't have an account?{" "}
            <Link className="font-bold text-black underline" href="/sign-up">
              Sign up
            </Link>
          </p>
          <Link
            className="text-lg rounded-full bg-[#D9D9D9] px-2 underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </form>
    </div>
  );
}

