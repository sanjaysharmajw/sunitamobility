export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#models", label: "Models" },
  { href: "#charging", label: "Charging" },
  { href: "#savings", label: "Savings" },
  { href: "#contact", label: "Contact" },
];

export type BikeModel = {
  name: string;
  tagline: string;
  range: number;
  topSpeed?: number;
  battery: string;
  charge?: string;
  image: string;
  /** Scooter cut-outs sit on a white backdrop and are shown whole; the flagship photo fills its frame. */
  featured?: boolean;
  badge?: string;
};

export const MODELS: BikeModel[] = [
  {
    name: "Faast F4",
    tagline: "Long-range scooter for daily city rides",
    range: 160,
    topSpeed: 70,
    battery: "2.2 kWh",
    image: "/images/faast-f4.avif",
  },
  {
    name: "Faast F2B",
    tagline: "Smart, easy commuter for everyday use",
    range: 80,
    topSpeed: 70,
    battery: "2.2 kWh",
    charge: "4 hrs",
    image: "/images/faast-f2b.png",
    badge: "Bestseller",
  },
  {
    name: "FEV 650",
    tagline: "Flagship electric sports bike for long rides",
    range: 198,
    battery: "4.4 kWh",
    charge: "4 hrs",
    image: "/images/f-ev-650.jpg",
    featured: true,
    badge: "Flagship",
  },
];

export const TESTIMONIALS = [
  {
    name: "Rahul Verma",
    city: "Jaipur",
    model: "Faast F2B",
    text: "Petrol ka kharcha almost zero ho gaya! Office aane-jaane me roz ₹150 bachte hain, aur ride itni smooth hai ki traffic me bhi maza aata hai.",
  },
  {
    name: "Priya Sharma",
    city: "Delhi",
    model: "Faast F4",
    text: "Light weight hai, chalana bahut easy hai. Ghar pe normal socket se charge ho jaati hai. College ke liye perfect EV hai.",
  },
  {
    name: "Amit Patel",
    city: "Ahmedabad",
    model: "FEV 650",
    text: "198 km ki range sach me milti hai. Weekend trips ab bina tension ke. Mobile app se battery aur location dono track hote hain.",
  },
];
