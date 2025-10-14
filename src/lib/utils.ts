import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDataLocal = (key: string): any => {
  const data = localStorage.getItem(key);
  const parseData = data && JSON.parse(data);

  return parseData;
};

export const createUrlQuery = (name: string, value: string) => {
  const params = new URLSearchParams();

  params.set(name, value);
  return params.toString();
};
