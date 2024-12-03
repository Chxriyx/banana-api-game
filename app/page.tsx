import Link from "next/link";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/app/actions";



export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-evenly"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
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

