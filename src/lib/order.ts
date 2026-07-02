import { siteConfig } from "@/lib/site-config";

export const MEAL_PRICE = 95;
export const DELIVERY_FEE_PER_PLATE = 5;
export const FREE_DELIVERY_THRESHOLD = 5;

export const DELIVERY_AREAS = ["Three Rivers", "Risiville"] as const;
export type DeliveryArea = (typeof DELIVERY_AREAS)[number];

export type OrderMethod = "collection" | "delivery";

export interface OrderDay {
  label: string;
  /** 0 = Sunday ... 6 = Saturday, matches Date#getDay() */
  weekday: number;
}

export const orderDays: OrderDay[] = [
  { label: "Monday", weekday: 1 },
  { label: "Tuesday", weekday: 2 },
  { label: "Wednesday", weekday: 3 },
  { label: "Thursday", weekday: 4 },
];

/** Next occurrence (today-inclusive) of the given weekday. */
export function nextDateForWeekday(weekday: number, from: Date = new Date()): Date {
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  const diff = (weekday - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + diff);
  return date;
}

export function formatOrderDate(date: Date): string {
  return date.toLocaleDateString("en-ZA", { day: "numeric", month: "long" });
}

export interface OrderTotal {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function calculateOrderTotal(plates: number, method: OrderMethod): OrderTotal {
  const subtotal = plates * MEAL_PRICE;
  const deliveryFee =
    method === "delivery" ? (plates >= FREE_DELIVERY_THRESHOLD ? 0 : plates * DELIVERY_FEE_PER_PLATE) : 0;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}

/** wa.me expects digits only, no leading "+". */
const WHATSAPP_NUMBER = siteConfig.phoneHref.replace(/\D/g, "");

export interface OrderDetails {
  day: string;
  date: Date;
  plates: number;
  method: OrderMethod;
  area?: DeliveryArea;
  address?: string;
  name: string;
  whatsapp: string;
}

export function buildWhatsAppOrderLink(order: OrderDetails): string {
  const { subtotal, deliveryFee, total } = calculateOrderTotal(order.plates, order.method);

  const lines = [
    `Hi Strictly Come Coffee, I'd like to order a home cooked meal:`,
    ``,
    `Day: ${order.day}, ${formatOrderDate(order.date)}`,
    `Plates: ${order.plates}`,
    `Method: ${order.method === "delivery" ? "Delivery" : "Collection"}`,
  ];

  if (order.method === "delivery") {
    lines.push(`Area: ${order.area ?? ""}`);
    lines.push(`Address: ${order.address ?? ""}`);
  }

  lines.push(
    ``,
    `Subtotal: R${subtotal}`,
    `Delivery fee: R${deliveryFee}`,
    `Total: R${total}`,
    ``,
    `Name: ${order.name}`,
    `WhatsApp: ${order.whatsapp}`
  );

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
