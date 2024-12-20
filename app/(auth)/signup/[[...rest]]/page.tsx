import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-xl px-8 py-8 sm:px-12">
          <SignUp redirectUrl="/dashboard" />
        </div>
      </div>
    </section>
  );
}
