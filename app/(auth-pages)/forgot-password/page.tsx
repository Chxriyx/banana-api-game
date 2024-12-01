import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Button } from "@nextui-org/react";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-evenly"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
      <Link href="/sign-in">
        <Button className="bg-orange-500 text-black text-2xl font-bold absolute top-4 left-4 border border-black rounded-full p-6 mt-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="mx-4">Back</span>
        </Button>
      </Link>
    <h1 className="text-6xl font-bold bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6">Reset Password</h1>
      <form className="">
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Input name="email" placeholder="Enter your email" required className="bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6 text-3xl placeholder:text-black" />
          <SubmitButton className="bg-orange-500 px-24 py-9 rounded-full text-black font-bold" formAction={forgotPasswordAction}>
            <span className="text-3xl">Reset Password</span>
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

