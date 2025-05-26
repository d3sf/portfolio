"use client";

import Link from "next/link";
// import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Designed and developed by{" "}
            <Link
              href="https://x.com/deepxtwt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
            >
              Deep Patel
              {/* <SiX className="h-3 w-3 inline-block ml-1" /> */}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 