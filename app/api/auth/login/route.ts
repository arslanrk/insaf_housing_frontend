import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // TODO: Replace with real auth (e.g. your backend API)
    // For now, accept any non-empty credentials for demo
    const user = {
      id: "1",
      email,
      name: email.split("@")[0],
    };

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    );
  }
}
