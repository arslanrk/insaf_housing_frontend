"use client";

import Image from "next/image";
import { BsBuilding } from "react-icons/bs";
import { LoginForm } from "@/components/login/login-form";
import { cn } from "@/lib/utils";

export function LoginPage() {
  return (
    <div
      className={cn(
        "flex min-h-dvh w-full flex-col bg-background",
        "md:flex-row md:flex-nowrap"
      )}
    >
      {/* Left: Image — hidden on mobile, 60% on desktop */}
      <section
        className={cn(
          "relative hidden min-h-[40vh] w-full shrink-0 overflow-hidden",
          "md:flex md:min-h-dvh md:w-[60%] md:flex-col"
        )}
        aria-hidden
      >
        <Image
          src="/loginbg.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-center"
        />

        {/* Branding top-left */}
        <div className="relative z-10 flex items-center gap-3 p-8 md:p-10">
          <span
            className="flex size-12 items-center justify-center rounded-full bg-white text-foreground shadow-md"
            aria-hidden
          >
            <BsBuilding className="size-6" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Insaf Housing
          </span>
        </div>

      </section>

      {/* Right: Form — full width on mobile, 40% on desktop */}
      <section
        className={cn(
          "relative flex min-w-0 flex-1 flex-col overflow-hidden bg-background",
          "px-6 py-10",
          "sm:px-10 sm:py-14",
          "md:w-[40%] md:shrink-0 md:justify-center md:px-12 md:py-16",
          "lg:px-16"
        )}
      >
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-md md:px-4 md:pt-0 lg:max-w-lg">
          {/* Welcome — centered at top of form area */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back to Insaf Housing
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Sign in to your account to continue.
            </p>
          </div>

          <LoginForm className="gap-5" />
        </div>
      </section>
    </div>
  );
}
