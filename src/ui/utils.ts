import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}
export function formatDate(date: string | number | Date, formatString: string = "MMM do, yyyy") {
  if (!date) {
    return "";
  }

  if (isString(date)) {
    return format(parseISO(date), formatString);
  }
  return format(date, formatString);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  const splitString = text.split(" ");
  let stringLength = 0;
  const words = [];

  for (let i = 0; i < splitString.length; i++) {
    stringLength += splitString[i].length + 1;
    if (stringLength > maxLength) {
      break;
    }
    words.push(splitString[i]);
  }

  return words.join(" ") + "...";
}

// a utility function to get initials from a name
export const getInitials = (name: string) => {
  const names = name.split(" ");
  return names.length > 1 ? names[0][0]?.toUpperCase() + names[1][0]?.toUpperCase() : names[0][0]?.toUpperCase();
};
