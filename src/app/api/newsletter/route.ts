import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE =
  process.env.NODE_ENV === "production"
    ? "/tmp/scentdesk-subscribers.json"
    : path.join(process.cwd(), ".cache", "subscribers.json");

interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
  verified: boolean;
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: Subscriber[]): Promise<void> {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

// POST — Subscribe a new email
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();
    const subscribers = await getSubscribers();

    // Check for duplicates
    if (subscribers.some((s) => s.email === normalized)) {
      return NextResponse.json({ message: "You're already subscribed!" }, { status: 200 });
    }

    subscribers.push({
      email: normalized,
      subscribedAt: new Date().toISOString(),
      source: "widget",
      verified: false,
    });

    await saveSubscribers(subscribers);

    return NextResponse.json({
      message: "Welcome aboard! Your first brief arrives Monday.",
      count: subscribers.length,
    });
  } catch (error) {
    console.error("[Newsletter] Subscribe error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET — Admin: fetch subscriber count (protected)
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscribers = await getSubscribers();

  return NextResponse.json({
    count: subscribers.length,
    subscribers: subscribers.map((s) => ({
      email: s.email,
      subscribedAt: s.subscribedAt,
      source: s.source,
    })),
  });
}
