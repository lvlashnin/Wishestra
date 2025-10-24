const API_URL = "https://wishestra.onrender.com/";

export async function deleteWish(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/wishes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete wish");
  }
}
export async function updateWish(
  id: number,
  wish: {
    image: string;
    title: string;
    description: string;
    price: number;
  }
): Promise<any> {
  const response = await fetch(`${API_URL}/wishes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...wish, updatedAt: new Date().toISOString() }),
  });
  if (!response.ok) {
    throw new Error("Failed to update wish");
  }
  return response.json();
}
export async function addWish(wish: {
  image: string;
  title: string;
  description: string;
  price: number;
}): Promise<any> {
  const now = new Date().toISOString();
  const response = await fetch(`${API_URL}/wishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...wish, createdAt: now, updatedAt: now }),
  });
  if (!response.ok) {
    throw new Error("Failed to add wish");
  }
  return response.json();
}
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
