import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Banana Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
      </head>
      <body className="bg-[#1A202C]">
        <audio
          src="/sounds/banana-game-intro.mp3"
          autoPlay={true}
          loop={true}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}

