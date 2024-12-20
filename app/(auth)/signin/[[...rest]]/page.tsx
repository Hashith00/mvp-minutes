import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-xl px-8 py-8 sm:px-12">
          <SignIn redirectUrl="/dashboard" />
        </div>
      </div>
    </section>
  );
}
