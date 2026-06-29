export interface ImageData {
  section: string;
  url: string;
  alt: string;
}

let cachedImages: ImageData[] = [];

export async function getImages(): Promise<ImageData[]> {
  if (cachedImages.length > 0) return cachedImages;
  const res = await fetch("/images.json");
  cachedImages = (await res.json()) as ImageData[];
  return cachedImages;
}

export function getImageBySection(section: string, images: ImageData[]): ImageData | undefined {
  return images.find((img) => img.section === section);
}
