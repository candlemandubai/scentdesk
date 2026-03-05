import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

const BLOB_KEY = "scentdesk/subscribers.json";
const LOCAL_FILE = path.join(process.cwd(), ".cache", "subscribers.json");

interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
  verified: boolean;
}

async function getSubscribers(): Promise<Subscriber[]> {
  // Production: Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
      if (blobs.length === 0) return [];
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  }

  // Local dev: filesystem
  try {
    const data = await fs.readFile(LOCAL_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: Subscriber[]): Promise<void> {
  const json = JSON.stringify(subscribers, null, 2);

  // Production: Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(BLOB_KEY, json, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  // Local dev: filesystem
  const dir = path.dirname(LOCAL_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(LOCAL_FILE, json);
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
      message: "You're in! We'll notify you when the beta launches.",
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
