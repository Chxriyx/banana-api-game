import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-evenly"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
    <h1 className="text-6xl font-bold bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6">Sign up</h1>
      <form>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Input 
            name="email" 
            placeholder="Enter your email"
            className="bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6 text-3xl placeholder:text-black"
            required 
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6 text-3xl placeholder:text-black"
            minLength={6}
            required
          />
          <SubmitButton className="bg-orange-500 px-24 py-9 rounded-full text-black font-bold" formAction={signUpAction} pendingText="Signing up...">
           <span className="text-3xl">Sign up</span>
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
        <p className="text-lg rounded-full bg-[#D9D9D9] px-2 flex items-center justify-center mt-5">
            Already have an account?{" "}
            <Link className="font-bold text-black underline" href="/sign-in">
              Sign in
            </Link>
          </p>
      </form>
      <SmtpMessage />
    </div>
  );
}
