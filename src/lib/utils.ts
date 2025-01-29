import { type ClassValue, clsx } from "clsx";
import imageNotFound from "../assets/images/404.png";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = imageNotFound;
}
