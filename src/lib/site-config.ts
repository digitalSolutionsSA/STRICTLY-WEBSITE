export const siteConfig = {
  name: "Strictly Come Coffee",
  tagline: "Coffee House & Eatery",
  motto: "Where Friends Meet",
  phone: "079 255 5418",
  phoneHref: "tel:+27792555418",
  address: "Riversquare Mall, Nile Drive, Three Rivers, Gauteng, 1935",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Riversquare+Mall+Nile+Drive+Three+Rivers+Gauteng+1935",
  hours: [
    { day: "Monday – Friday", time: "07:00 – 17:00" },
    { day: "Saturday", time: "07:30 – 16:00" },
    { day: "Sunday", time: "08:00 – 14:00" },
  ],
  recommended: 98,
};

export const stats = [
  { value: "120+", label: "Menu Items" },
  { value: "98%", label: "Recommended" },
  { value: "7", label: "Days A Week" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/#story" },
  { label: "Menu", href: "/menu" },
  { label: "Platters", href: "/platters" },
  { label: "Home Cooked Meals", href: "/home-cooked-meals" },
  { label: "Visit", href: "/#location" },
];

/** Slimmed-down link set used by the navbar only — footer keeps the full navLinks above. */
export const primaryNavLinks = [
  { label: "Home", href: "/" },
  { label: "Platters", href: "/platters" },
  { label: "Home Cooked Meals", href: "/home-cooked-meals" },
  { label: "Menu", href: "/menu" },
];
