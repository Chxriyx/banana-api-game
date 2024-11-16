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
      <body>
            <main>{children}</main>
      </body>
    </html>
  );
}
