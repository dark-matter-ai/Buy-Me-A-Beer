"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <footer className="min-h-screen w-full bg-white flex flex-col justify-between pt-24 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16 mb-8 md:mb-0">
            <div>
              <h2 className="text-lg font-semibold mb-4">Community</h2>
              <nav className="flex flex-col space-y-2 text-gray-500">
                <Link className="hover:text-gray-700" href="#">
                  Blog
                </Link>
                <Link className="hover:text-gray-700" href="#">
                  Support
                </Link>
              </nav>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Company</h2>
              <nav className="flex flex-col space-y-2 text-gray-500">
                <Link className="hover:text-gray-700" href="#">
                  Terms of Use
                </Link>
                <Link className="hover:text-gray-700" href="#">
                  Privacy Policy
                </Link>
                <Link className="hover:text-gray-700" href="#">
                  Imprint
                </Link>
              </nav>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Investors</h2>
              <nav className="flex flex-col space-y-2 text-gray-500">
                <Link className="hover:text-gray-700" href="#">
                  Token
                </Link>
              </nav>
            </div>
          </div>
          <div className="w-full md:w-auto flex space-x-10 justify-start md:justify-end">
            <Link className="text-gray-500 hover:text-gray-700" href="#">
              <Twitter className="h-12 w-12" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link className="text-gray-500 hover:text-gray-700" href="#">
              <Linkedin className="h-12 w-12" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link className="text-gray-500 hover:text-gray-700" href="#">
              <Facebook className="h-12 w-12" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link className="text-gray-500 hover:text-gray-700" href="#">
              <Youtube className="h-12 w-12" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-[150px] font-bold leading-none tracking-tighter md:text-[210px]"
        >
          Buy Me A Beer
        </motion.div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 py-8 text-sm text-gray-500">
          <p>BuyMeABeer 2024©. ALL RIGHTS RESERVED.</p>
          <p className="flex items-center">
            Made with <span className="mx-2">♥</span> from
            <a
              href="https://github.com/dark-matter-ai"
              target="_blank"
              rel="noopener noreferrer"  
              className="ml-1 hover:animate-pulse focus:outline-none"
            >
              DarkMatter
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
