import "./globals.css";
import { Inter } from "next/font/google";
import { Roboto_Mono } from "next/font/google";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Metadata (SEO + Social Previews)
export const metadata = {
  metadataBase: new URL("https://rumble.votes.elyxium.ca"),
  title: "Elyxium • Rumble Community Picks",
  description:
    "Vote for your favorite drinks and snacks at Rumble! Powered by Elyxium — your choice, your fuel.",
  openGraph: {
    title: "Elyxium • Rumble Community Picks",
    description:
      "Help shape the fridge! Vote for your favorite drinks and snacks at Rumble.",
    url: "https://rumble.votes.elyxium.ca",
    siteName: "Elyxium Votes",
    images: [
      {
        url: "/images/og-image.png", // <- put this file in public/images/
        width: 1200,
        height: 630,
        alt: "Elyxium Rumble Votes",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elyxium • Rumble Community Picks",
    description:
      "Vote for your favorite drinks and snacks at Rumble! Powered by Elyxium.",
    images: ["/images/og-image.png"], // <- same file in public/images/
  },
  icons: {
    icon: "/favicon.ico", // replace in public/favicon.ico
  },
};

// Layout wrapper
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
