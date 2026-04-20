export type GalleryCategory =
  | "All"
  | "Shade Structures"
  | "Pavillions"
  | "Sports Courts"
  | "Shade Replacement";

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  categories: GalleryCategory[];
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "Shade Structures",
  "Pavillions",
  "Sports Courts",
  "Shade Replacement",
];

export const galleryItems: GalleryItem[] = [
  {
    src: "/gallery/IMG_3224.jpg",
    alt: "4 single-post shade structures over school playground",
    title: "Single-Post Shade Structures",
    description: "Four single-post fabric shade structures installed over a school playground.",
    categories: ["Shade Structures"],
  },
  {
    src: "/gallery/IMG_3223.jpg",
    alt: "Hexagon pavilion with green metal roof",
    title: "Hexagon Pavilion",
    description: "Hexagonal pavilion with green metal roof — supplied and installed.",
    categories: ["Pavillions"],
  },
  {
    src: "/gallery/IMG_3221.jpg",
    alt: "Yellow shade structure over basketball court at charter school",
    title: "Charter School Basketball Court",
    description: "Shade structure + full acrylic court coating at a local charter school. Hoop installation included.",
    categories: ["Shade Structures", "Sports Courts"],
  },
  {
    src: "/gallery/IMG_3216.jpg",
    alt: "Large shade structure over full basketball court",
    title: "Full Court with Shade & Hoops",
    description: "Large-span shade structure, full court coating in blue and green, and basketball hoop installation.",
    categories: ["Shade Structures", "Sports Courts"],
  },
  {
    src: "/gallery/IMG_3217.jpg",
    alt: "Aerial view of dual shade structures over multi-court complex",
    title: "Multi-Court Complex — Aerial View",
    description: "Two large shade structures spanning multiple sports courts. Full court coating and striping.",
    categories: ["Shade Structures", "Sports Courts"],
  },
];
