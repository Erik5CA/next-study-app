import dayjs from "dayjs";
import relativeTiem from "dayjs/plugin/relativeTime";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
dayjs.extend(relativeTiem);

export const timeAgo = dayjs;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
