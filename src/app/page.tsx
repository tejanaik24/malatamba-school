import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WalkerScroll from "@/sections/WalkerScroll";
import LeadershipMessage from "@/sections/LeadershipMessage";
import FeaturesGrid from "@/sections/FeaturesGrid";
import VideoSection from "@/sections/VideoSection";
import GoogleReviews from "@/sections/GoogleReviews";
import GalleryPreview from "@/sections/GalleryPreview";
import { ImageData } from "@/lib/images";

async function getImages(): Promise<ImageData[]> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const filePath = path.join(process.cwd(), "public", "images.json");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export default async function Home() {
  const images = await getImages();

  return (
    <>
      <Navbar />
      <main>
        <WalkerScroll />
        <LeadershipMessage />
        <FeaturesGrid images={images} />
        <VideoSection images={images} />
        <GoogleReviews />
        <GalleryPreview />
      </main>
      <Footer />
    </>
  );
}
