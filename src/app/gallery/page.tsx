import { readdirSync } from "fs";
import { join } from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient, { EventData } from "./GalleryClient";

const EVENTS = [
  { folder: "school-life-2026", name: "School Life 2026",     cover: "mar16-01.png" },
  { folder: "annual-day-2023",  name: "Annual Day 2023",      cover: "dsc-7509-506x337.webp" },
  { folder: "awareness-program", name: "Awareness Program",   cover: "img-873-506x285.webp" },
  { folder: "childrens-day",    name: "Children's Day",        cover: "dsc04217-4240x2400.webp" },
  { folder: "christmas-day",    name: "Christmas Day",         cover: "dsc04718-506x286.webp" },
  { folder: "convocation-day",  name: "Convocation Day",       cover: "dsc05697-506x286.webp" },
  { folder: "eye-screening",    name: "Eye Screening",         cover: "whatsapp-image-2023-01-24-at-4.37.37-pm-506x675.webp" },
  { folder: "fruits-day",       name: "Fruits Day",            cover: "untitled-2-408x612.webp" },
  { folder: "green-day",        name: "Green Day",             cover: "dsc02808-596x334.webp" },
  { folder: "inauguration",     name: "Inauguration",          cover: "dsc01938-510x286.webp" },
  { folder: "independence-day", name: "Independence Day",      cover: "0g8a9313-4480x6720.webp" },
  { folder: "maths-day",        name: "Maths Day",             cover: "dsc04606-506x286.webp" },
  { folder: "republic-day",     name: "Republic Day",          cover: "0g8a6729-596x397.webp" },
  { folder: "sankrathi",        name: "Sankrathi",             cover: "dsc04819-596x337.webp" },
  { folder: "science-day",      name: "Science Day",           cover: "whatsapp-image-2023-02-28-at-4.06.10-pm-506x285.webp" },
  { folder: "science-fair",     name: "Science Fair",          cover: "dsc04003-596x337.webp" },
  { folder: "self-defence",     name: "Self Defence",          cover: "untitled-2-408x612.webp" },
  { folder: "tedx-talks",       name: "TEDx Talks",            cover: "0c405d62-0c77-45a6-a9f0-ad765e0049f8-596x795.webp" },
  { folder: "telugu-hindi-day", name: "Telugu & Hindi Day",    cover: "dsc02857-596x334.webp" },
  { folder: "womens-day-holi",  name: "Women's Day & Holi",   cover: "d9a1a09a-3b65-4414-8cf6-b94efad0c0ca-963x1280.webp" },
];

const SKIP_PATTERNS = ["logo-aa", "kisspng-virtual"];

export default function GalleryPage() {
  const events: EventData[] = EVENTS.map((event) => {
    const dir = join(process.cwd(), "public", "real-photos", "events", event.folder);
    let photos: string[] = [];
    try {
      photos = readdirSync(dir).filter(
        (f) => !SKIP_PATTERNS.some((p) => f.includes(p))
      );
    } catch {
      // folder not found — skip gracefully
    }
    return { ...event, photos };
  });

  return (
    <>
      <Navbar />
      <GalleryClient events={events} />
      <Footer />
    </>
  );
}
