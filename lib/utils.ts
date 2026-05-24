import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  return (
    ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
    outputMin
  );
}
