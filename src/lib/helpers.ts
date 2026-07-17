export const MainRoutes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
];

export const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
