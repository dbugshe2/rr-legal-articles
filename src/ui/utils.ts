/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "./hooks/useToast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
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

interface FormSubmissionOptions {
  submitFn: (values: Record<string, any>) => Promise<any>;
  values: Record<string, any>;
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
  errorMsg: string;
  successMsg: string;
}

export async function handleFormSubmission({
  submitFn,
  values,
  onSuccess,
  onError,
  errorMsg,
  successMsg,
}: FormSubmissionOptions): Promise<void> {
  try {
    const response = await submitFn?.(values);
    toast({
      title: "Great Success!!!🎉",
      description: successMsg,
    });
    onSuccess?.(response);
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      toast({ title: "Something went wrong", description: errorMsg });
      onError?.(error);
    }
  }
}
