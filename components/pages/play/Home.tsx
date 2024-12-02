import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClientServer } from "@/utils/supabase/server";
import { signOutAction } from "@/app/actions";

export default async function Home() {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-around"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
      <h1 className="text-6xl font-bold bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6">
        Banana Quiz
      </h1>
      <div className="absolute top-4 right-4 flex justify-center items-center">
        {user ? (
          <>
            <div className="flex items-center justify-center bg-[#FFC107] p-2 rounded-full mr-4">
              <span className="text-sm font-bold">Welcome {user.email}!</span>
            </div>
            <form action={signOutAction}>
              <Button type="submit" className="bg-orange-500 px-10 py-4 rounded-full text-black font-bold">
                <span className="text-lg">Sign out</span>
              </Button>
            </form>
          </>
        ) : (
          <></>
        )}
      </div>
      <Link href="/protected/user-name">
          <Button className="bg-orange-500 px-24 py-12 rounded-full text-black font-bold block mr-4 flex justify-center animate-bounce">
            <span className="text-5xl">Play</span>
          </Button>
        </Link>
    </div>
  );
}

