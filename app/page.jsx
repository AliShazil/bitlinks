import Image from "next/image"
import localFont from 'next/font/local';
import Link from "next/link";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="bg-purple-200">
      <section className="flex h-[90vh] justify-center items-center px-4">
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <p className={`font-bold text-3xl ${poppins.className}`}>
            The best URL shortener in the market
          </p>
          <p className="px-6 lg:px-52 text-center">
            Welcome to our URL shortener, the simplest and most efficient way to shorten long URLs and share them with ease. Whether you're sharing links on social media, in emails, or through messaging apps, our tool allows you to create compact, custom short links that are easy to remember and share. With just a few clicks, you can generate personalized short URLs that redirect to your original web pages, making link sharing faster and more convenient.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/shortner">
              <button className="bg-purple-500 shadow-lg rounded-lg p-3 py-2 font-bold cursor-pointer text-white">
                Try Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>


  );
}
