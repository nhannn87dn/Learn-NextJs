import Button from "@/components/Button";
import type { Metadata } from "next";

//Meta title tĩnh, cố định
export const metadata: Metadata = {
  title: "Home page",
  description: "Home page description",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl">Home Page</h1>
      <Button />
    </div>
  );
}
