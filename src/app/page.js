"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Flame,
  ThumbsUp,
  TrendingUp,
  Star,
  CheckCircle,
  Crown,
  Info,
  Share2,
  BarChart2,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

// ——————————————————————————————————————————————
// Elyxium • Community Picks — Rumble Edition
// Premium, mobile-first voting page to crowdsource a machine planogram.
// Palette: teal, gold, black, white (with subtle gradients + glass effect)
// Background: Uploaded teal waves (Blue - Vertical.png)
// ——————————————————————————————————————————————

const BRAND = {
  teal: "#0C7C86",
  tealDark: "#085C63",
  gold: "#D4AF37",
  black: "#0B0B0B",
  white: "#FFFFFF",
};

const CATEGORIES = [
  { id: "energy", label: "Energy Drinks" },
  { id: "protein-drink", label: "Protein Drinks" },
  { id: "hydration", label: "Hydration" },
  { id: "snack", label: "Snacks" },
];

// Naming for images (place files inside /public/products)
// Filenames: all lowercase, hyphenated, no spaces, e.g. "alani-breezeberry-355.png".
// Each item can include `img: "/products/<file>.png"`.

const ITEMS = [
  // ——— ENERGY ———
  { id: "celsius-peach-vibe-355", name: "Celsius Energy • Peach Vibe 355 mL", category: "energy", img: "/products/celsius-peach-vibe-355.webp" },
  { id: "celsius-tropical-vibe-355", name: "Celsius Energy • Tropical Vibe 355 mL", category: "energy", img: "/products/celsius-tropical-vibe-355.webp" },
  { id: "celsius-arctic-vibe-355", name: "Celsius Energy • Arctic Vibe 355 mL", category: "energy", img: "/products/celsius-arctic-vibe-355.webp"},
  { id: "alani-breezeberry-355", name: "Alani Nu Energy • Breezeberry 355 mL", category: "energy", img: "/products/alani-breezeberry-355.png" },
  { id: "alani-cherry-355", name: "Alani Nu Energy • Cherry Twist 355 mL", category: "energy", img: "/products/alani-cherry-twist-355.png" },
  { id: "alani-cosmic-355", name: "Alani Nu Energy • Cosmic Stardust 355 mL", category: "energy", img: "/products/alani-cosmic-stardust-355.png" },
  { id: "redbull-250", name: "Red Bull Energy Drink • Original 250 mL", category: "energy", img: "/products/redbull-250.webp" },
  { id: "monster-zero-ultra-473", name: "Monster Energy • Zero Ultra (White Can) 473 mL", category: "energy", img: "/products/monster-zero-ultra-473.webp" },
  { id: "bum-cherry-355", name: "BUM Energy • Cherry Frost 355 mL", category: "energy", img: "/products/bum-cherry-frost-355.png" },
  { id: "bum-citrus-355", name: "BUM Energy • Citrus Burst 355 mL", category: "energy", img: "/products/bum-citrus-burst-355.png" },
  { id: "bum-orange-355", name: "BUM Energy • Orange Sunrise 355 mL", category: "energy", img: "/products/bum-orange-sunrise-355.png" },
  { id: "bum-peach-355", name: "BUM Energy • Peach Mango 355 mL", category: "energy", img: "/products/bum-peach-mango-355.png" },
  { id: "exponent-sectorc-355", name: "Exponent Energy • Sector C 355 mL", category: "energy", img: "/products/exponent-sector-c-355.webp" },
  { id: "ghost-cherry-limeade-473", name: "Ghost Energy • Cherry Limeade 473 mL", category: "energy", img: "/products/ghost-cherry-limeade-473.webp" },
  { id: "ghost-grape-473", name: "Ghost Energy • Welch's Grape 473 mL", category: "energy", img: "/products/ghost-welchs-grape-473.webp" },
  { id: "ghost-green-apple-473", name: "Ghost Energy • Warheads Sour Green Apple 473 mL", category: "energy", img: "/products/ghost-warheads-green-apple-473.webp" },
  { id: "ghost-watermelon-473", name: "Ghost Energy • Warheads Sour Watermelon 473 mL", category: "energy", img: "/products/ghost-warheads-watermelon-473.webp" },
  { id: "reign-fuel-cherry-limeade-473", name: "Reign Fuel • Cherry Limeade 473 mL", category: "energy", img: "/products/reign-fuel-cherry-limeade-473.webp" },
  { id: "reign-fuel-orange-dreamsicle-473", name: "Reign Fuel • Orange Dreamsicle 473 mL", category: "energy", img: "/products/reign-fuel-orange-dreamsicle-473.webp" },
  { id: "reign-fuel-razzle-berry-473", name: "Reign Fuel • Razzle Berry 473 mL", category: "energy", img: "/products/reign-fuel-razzle-berry-473.webp" },
  { id: "ryse-fuel-tpunch-473", name: "RYSE Fuel • Kool-Aid Tropical Punch 473 mL", category: "energy", img: "/products/ryse-fuel-kool-aid-tropical-punch-473.webp" },
  { id: "ryse-fuel-pink-473", name: "RYSE Fuel • Pink Splash 473 mL", category: "energy", img: "/products/ryse-fuel-pink-splash-473.webp" },
  { id: "ryse-fuel-berry-473", name: "RYSE Fuel • Ring Pop Berry Blast 473 mL", category: "energy", img: "/products/ryse-fuel-berry-blast-473.webp" },
  { id: "ryse-fuel-sunnyd-473", name: "RYSE Fuel • SunnyD Tango Original 473 mL", category: "energy", img: "/products/ryse-fuel-sunnyd-473.webp" },
  { id: "ryse-fuel-blue-rasp-473", name: "RYSE Fuel • Sour Punch Blue Raspberry 473 mL", category: "energy", img: "/products/ryse-fuel-sour-punch-blue-rasp-473.webp" },

  // ——— PROTEIN DRINKS ———
  { id: "raw-choc-355", name: "RAW Protein Shake • Chocolate 355 mL", category: "protein-drink", img: "/products/raw-protein-chocolate-355.webp" },
  { id: "raw-cookies-355", name: "RAW Protein Shake • Cookies & Cream 355 mL", category: "protein-drink", img: "/products/raw-protein-cookies-cream-355.webp" },
  { id: "raw-mocha-355", name: "RAW Protein Shake • Mocha 355 mL", category: "protein-drink", img: "/products/raw-protein-mocha-355.webp" },
  { id: "raw-salted-355", name: "RAW Protein Shake • Salted Caramel 355 mL", category: "protein-drink", img: "/products/raw-protein-salted-caramel-355.webp" },
  { id: "raw-strawberry-355", name: "RAW Protein Shake • Strawberry 355 mL", category: "protein-drink", img: "/products/raw-protein-strawberry-355.webp" },
  { id: "raw-vanilla-355", name: "RAW Protein Shake • Vanilla 355 mL", category: "protein-drink", img: "/products/raw-protein-vanilla-355.webp" },
  { id: "alani-prot-fruity-355", name: "Alani Nu Protein Shake • Fruity Cereal 355 mL", category: "protein-drink", img: "/products/alani-protein-fruity-cereal-355.png" },
  { id: "alani-protein-strawberry-355", name: "Alani Nu Protein Shake • Strawberry 355 mL", category: "protein-drink", img: "/products/alani-protein-strawberry-355.webp" },
  { id: "alani-protein-cookies-cream-355", name: "Alani Nu Protein Shake • Cookies & Cream 355 mL", category: "protein-drink", img: "/products/alani-protein-cookies-cream-355.webp" },
  { id: "ryse-clear-lemonade-500", name: "RYSE Clear Whey RTD • Country Time Lemonade 500 mL", category: "protein-drink", img: "/products/ryse-clear-lemonade-500.webp" },
  { id: "ryse-clear-pineapple-500", name: "RYSE Clear Whey RTD • Jell-O Island Pineapple 500 mL", category: "protein-drink", img: "/products/ryse-clear-pineapple-500.webp" },
  { id: "ryse-clear-keylime-500", name: "RYSE Clear Whey RTD • Key Lime Pie 500 mL", category: "protein-drink", img: "/products/ryse-clear-key-lime-500.webp" },
  { id: "ryse-clear-straw-banana-500", name: "RYSE Clear Whey RTD • Strawberry Banana 500 mL", category: "protein-drink", img: "/products/ryse-clear-strawberry-banana-500.webp" },
  { id: "fairlife-protein-chocolate-414", name: "Fairlife Protein Shake • Chocolate 414 mL", category: "protein-drink", img: "/products/fairlife-protein-chocolate-414.webp" },
  { id: "fairlife-protein-vanilla-414", name: "Fairlife Protein Shake • Vanilla 414 mL", category: "protein-drink", img: "/products/fairlife-protein-vanilla-414.webp" },
  { id: "fairlife-protein-strawberry-414", name: "Fairlife Protein Shake • Strawberry 414 mL", category: "protein-drink", img: "/products/fairlife-protein-strawberry-414.webp" },


  // ——— HYDRATION ———
  { id: "fiji-500", name: "FIJI Water 500 mL", category: "hydration", img: "/products/fiji-500.png" },
  { id: "smartwater-591", name: "smartwater 591 mL", category: "hydration", img: "/products/smartwater-591.png" },
  { id: "path-still-500", name: "PATH Water • Still 500 mL (Aluminum Bottle)", category: "hydration", img: "/products/path-still-500.webp" },
  { id: "gatorade-zero-lime-591", name: "Gatorade Zero • Lemon-Lime 591 mL", category: "hydration", img: "/products/gatorade-zero-lemon-lime-591.png" },
  { id: "gatorade-orange-591", name: "Gatorade • Orange 591 mL", category: "hydration", img: "/products/gatorade-orange-591.png" },
  { id: "gatorade-glacier-freeze-591", name: "Gatorade • Glacier Freeze 591 mL", category: "hydration", img: "/products/gatorade-glacier-freeze-591.webp" },
  { id: "powerade-mountain-591", name: "Powerade • Mountain Berry Blast 591 mL", category: "hydration", img: "/products/powerade-mountain-berry-591.webp" },
  { id: "powerade-zero-fruit-punch-591", name: "Powerade Zero • Fruit Punch 591 mL", category: "hydration", img: "/products/powerade-zero-fruit-punch-591.webp" },
  { id: "coconut-vita-330", name: "Vita Coco • Original Coconut Water 330 mL", category: "hydration", img: "/products/vita-coco-original-330.png" },
  { id: "coconut-thirsty-buddha-pineapple-355", name: "Thirsty Buddha • Sparkling Coconut Water Pineapple 355 mL", category: "hydration", img: "/products/thirsty-buddha-sparkling-pineapple-355.webp" },
  { id: "biosteel-blue-raspberry-500", name: "BioSteel Sports Drink • Blue Raspberry 500 mL", category: "hydration", img: "/products/biosteel-blue-raspberry-500.webp" },
  { id: "biosteel-peach-mango-500", name: "BioSteel Sports Drink • Peach Mango 500 mL", category: "hydration", img: "/products/biosteel-peach-mango-500.webp" }, 
  { id: "biosteel-white-freeze-500", name: "BioSteel Sports Drink • White Freeze 500 mL", category: "hydration", img: "/products/biosteel-white-freeze-500.webp" },


  // ——— SNACKS ———
  { id: "quest-bar-cookie-dough-60", name: "Quest Bar • Chocolate Chip Cookie Dough 60 g", category: "snack", img: "/products/quest-bar-cookie-dough-60.webp" },
  { id: "quest-bar-cookies-cream-60", name: "Quest Bar • Cookies & Cream 60 g", category: "snack", img: "/products/quest-bar-cookies-cream-60.png" },
  { id: "legendary-pastry-blue-61", name: "Legendary Protein Pastry • Blueberry 61 g", category: "snack", img: "/products/legendary-pastry-blueberry-61.webp" },
  { id: "legendary-pastry-choc-61", name: "Legendary Protein Pastry • Chocolate Cake 61 g", category: "snack", img: "/products/legendary-pastry-chocolate-61.webp" },
  { id: "legendary-pastry-cherry-61", name: "Legendary Protein Pastry • Cherry Crumble 61 g", category: "snack", img: "/products/legendary-pastry-cherry-61.webp" },
  { id: "legendary-pastry-smores-61", name: "Legendary Protein Pastry • S'mores 61 g", category: "snack", img: "/products/legendary-pastry-smores-61.webp" },
  { id: "legendary-roll-choc-67", name: "Legendary Protein Sweet Roll • Chocolate 67 g", category: "snack", img: "/products/legendary-roll-chocolate-67.webp" },
  { id: "legendary-roll-cinn-63", name: "Legendary Protein Sweet Roll • Cinnamon 63 g", category: "snack", img: "/products/legendary-roll-cinnamon-63.webp" },
  { id: "legendary-roll-berry-64", name: "Legendary Protein Sweet Roll • Wild Berry 64 g", category: "snack", img: "/products/legendary-roll-wild-berry-64.webp" },
  { id: "legendary-chips-bbq-34", name: "Legendary Protein Chips • Barbeque 34 g", category: "snack", img: "/products/legendary-chips-bbq-34.webp" },
  { id: "legendary-chips-jal-34", name: "Legendary Protein Chips • Jalapeño 34 g", category: "snack", img: "/products/legendary-chips-jalapeno-34.webp" },
  { id: "legendary-chips-ranch-34", name: "Legendary Protein Chips • Ranch 34 g", category: "snack", img: "/products/legendary-chips-ranch-34.webp" },
  { id: "legendary-donut-choc-2_2", name: "Legendary Protein Donut • Chocolate Dipped 2.2 oz", category: "snack", img: "/products/legendary-donut-chocolate-2-2.webp" },
  { id: "legendary-donut-cinn-2_2", name: "Legendary Protein Donut • Cinnamon Crumble 2.2 oz", category: "snack", img: "/products/legendary-donut-cinnamon-2-2.webp" },
  { id: "legendary-donut-pink-2_2", name: "Legendary Protein Donut • Pink Sprinkle 2.2 oz", category: "snack", img: "/products/legendary-donut-pink-2-2.webp" },
  { id: "legendary-donut-vanilla-2_4", name: "Legendary Protein Donut • Vanilla Glazed 2.4 oz", category: "snack", img: "/products/legendary-donut-vanilla-2-4.webp" },
  { id: "one-bar-blue-60", name: "ONE Protein Bar • Blueberry Cobbler 60 g", category: "snack", img: "/products/one-bar-blueberry-cobbler-60.webp" },
  { id: "one-bar-bday-60", name: "ONE Protein Bar • Birthday Cake 60 g", category: "snack", img: "/products/one-bar-birthday-cake-60.webp" },
  { id: "one-bar-hershey-60", name: "ONE Protein Bar • Hershey's Cookies N' Cream 60 g", category: "snack", img: "/products/one-bar-hersheys-cookies-cream-60.webp" },
  { id: "prot-candy-classic-55", name: "Protein Candy • Classic Fruit 55 g", category: "snack", img: "/products/protein-candy-classic-fruit-55.png" },
  { id: "prot-candy-tropical-55", name: "Protein Candy • Tropical Fruit 55 g", category: "snack", img: "/products/protein-candy-tropical-fruit-55.webp" },
];

// ——————————————————————————————————————————————
// Local persistence helpers
// ——————————————————————————————————————————————
const STORAGE_KEY = "elyxium-votes-rumble-v1";

function readVotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeVotes(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {}
}

// ——————————————————————————————————————————————
// UI Helpers
// ——————————————————————————————————————————————
function HeaderBadge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
         style={{ borderColor: BRAND.gold, color: BRAND.gold }}>
      <Crown size={14} /> {children}
    </div>
  );
}

function Glass({ children, className = "" }) {
  return (
    <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl ${className}`}>{children}</div>
  );
}

// ——————————————————————————————————————————————
// Card Component
// ——————————————————————————————————————————————
function VoteCard({ item, count, onVote, disabled, onImageClick }) {
  return (
    <Card className="overflow-hidden rounded-2xl bg-black/60 border-white/10">
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className="h-14 w-14 rounded-xl bg-white flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={onImageClick}
        >
          {item.img ? (
            <img
              src={item.img}
              alt={item.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <Star size={22} className="text-gray-500" />
          )}
        </div>

        <div className="flex-1">
          <div className="text-white text-sm font-medium leading-tight">
            {item.name}
          </div>
          <div className="text-white/60 text-xs mt-1 capitalize">
            {item.category.replace("-", " ")}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-white/80 text-sm tabular-nums">{count || 0}</div>
          <Button
            onClick={() => onVote(item.id)}
            disabled={disabled}
            className="rounded-xl px-3 py-2 text-sm"
            style={{
              background: disabled
                ? "rgba(212,175,55,0.25)"
                : `linear-gradient(135deg, ${BRAND.gold}, #f1d97a)`,
              color: BRAND.black,
            }}
          >
            <ThumbsUp className="mr-1 h-4 w-4" /> Vote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ——————————————————————————————————————————————
// Main Page
// ——————————————————————————————————————————————
export default function RumbleCommunityPicks() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("energy");
  const [votes, setVotes] = useState({});
  const [justVoted, setJustVoted] = useState(null);
  const [toast, setToast] = useState("");

  const [openIndex, setOpenIndex] = useState(null);

  const whyRef = useRef(null);
  const totalsRef = useRef(null);

  const smoothScroll = (ref) => {
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Elyxium • Rumble Community Picks",
          text: "Vote for your favorite drinks and snacks at Rumble!",
          url,
        });
        setToast("Link shared ✨");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setToast("Link copied ✅");
      } else {
        setToast("Copy this link: " + url);
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(url);
        setToast("Link copied ✅");
      } catch {}
    }
    setTimeout(() => setToast(""), 2200);
  };

  useEffect(() => {
    setVotes(readVotes());
  }, []);

  useEffect(() => {
    writeVotes(votes);
  }, [votes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.filter((i) => i.category === tab && (!q || i.name.toLowerCase().includes(q)));
  }, [query, tab]);

  const topPicks = useMemo(() => {
    const counts = Object.entries(votes);
    const sorted = counts
      .sort((a, b) => (b[1] || 0) - (a[1] || 0))
      .slice(0, 5)
      .map(([id]) => ITEMS.find((i) => i.id === id))
      .filter(Boolean);
    return sorted;
  }, [votes]);

  const hasVotedFor = (id) => {
    try {
      const userKey = `${STORAGE_KEY}-user`;
      const raw = localStorage.getItem(userKey);
      const voted = raw ? JSON.parse(raw) : {};
      return Boolean(voted[id]);
    } catch {
      return false;
    }
  };

  const markVotedFor = (id) => {
    try {
      const userKey = `${STORAGE_KEY}-user`;
      const raw = localStorage.getItem(userKey);
      const voted = raw ? JSON.parse(raw) : {};
      voted[id] = true;
      localStorage.setItem(userKey, JSON.stringify(voted));
    } catch {}
  };

  const onVote = async (id) => {
    if (hasVotedFor(id)) {
      setToast("You already voted for this item ✅");
      setTimeout(() => setToast(""), 2000);
      return;
    }

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id }),
      });

      if (!res.ok) throw new Error("Vote failed");

      markVotedFor(id); // 🔒 lock this device from voting again
      await fetchVotes(); // refresh counts
      setJustVoted(id);
      setTimeout(() => setJustVoted(null), 900);
    } catch (err) {
      console.error("Vote failed", err);
      setToast("Something went wrong ❌");
      setTimeout(() => setToast(""), 2000);
    }
  };

  // Fetch all votes
    const fetchVotes = async () => {
    try {
      const res = await fetch("/api/votes");
      if (!res.ok) throw new Error("Fetch votes failed");

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid data format");

      const mapped = {};
      data.forEach((row) => {
        mapped[row.item_id] = Number(row.count);
      });

      setVotes(mapped);
    } catch (err) {
      console.error("Fetch votes failed", err);
    }
  };

  // Auto-refresh every 5s
  useEffect(() => {
    fetchVotes();
    const interval = setInterval(fetchVotes, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextItem = () => {
    if (filtered.length === 0) return;
    setOpenIndex((prev) => (prev + 1) % filtered.length);
  };
 
    const prevItem = () => {
    if (filtered.length === 0) return;
    setOpenIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (openIndex === null) return;
      if (e.key === "ArrowRight") nextItem();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex, filtered]);

  const bgUrl = "/Blue%20-%20Vertical.png"; // encode space for reliability

return (
  <div
    className="min-h-screen w-full"
    style={{
      background: `radial-gradient(1200px 600px at 50% -10%, ${BRAND.gold}, ${BRAND.black})`,
    }}
  >
    {/* Sticky Header */}
    <div
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-white/10"
      style={{ background: "rgba(0,0,0,0.45)" }}
    >
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        {/* Left side (Logo + Name) */}
        <a
          href="https://www.elyxium.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          <img
            src="/images/logo.png"
            alt="Elyxium Logo"
            className="h-17 w-20 object-contain"
          />

        </a>

        {/* Right side (Badge) */}
        <HeaderBadge>Rumble • Premium Picks</HeaderBadge>
      </div>
    </div>

    {/* Padding so content doesn’t overlap sticky header */}
    <div className="pt-20"></div>

    {/* Hero Section */}
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-4">
      <div className="mt-6 text-white">
        <h1 className="text-3xl font-bold leading-tight mb-4">
          Your <span className="italic">choice</span>, your <span className="italic">fuel</span>
        </h1>

        <p className="text-white/80 text-sm leading-relaxed mb-2">
          A <span className="font-semibold">new way</span> to fuel your workouts is here.  
          <span className="font-semibold italic"> Vote</span> for your favorites drinks and snacks.
        </p>
        <p className="text-white/80 text-sm leading-relaxed">
          Only the <span className="font-semibold">strongest</span> picks make it. 
          <span className="italic"> Your studio, your rules.</span>
        </p>

        {/* Divider */}
        <div className="border-t border-yellow-500/40 mt-4 mb-3"></div>

        {/* Hint */}
        <div className="flex items-center gap-2 text-white/60 text-xs">
          <Info size={14} /> One tap = One Upvote per item (per device).
        </div>
      </div>
    </div>

      

      {/* Top picks */}
      <div ref={totalsRef} className="mx-auto max-w-3xl px-4">
        <Glass className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-white">
              <TrendingUp size={18} /> <span className="font-semibold">Top Picks (live)</span>
            </div>
            <div className="text-white/60 text-xs">Auto-updating</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topPicks.length === 0 && (
              <div className="text-white/60 text-sm">No votes yet. Be the first!</div>
            )}
            {topPicks.map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="text-white text-sm">{i.name}</div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Flame size={16} /> {(votes[i.id] || 0)}
                </div>
              </div>
            ))}
          </div>
        </Glass>
      </div>

      {/* Controls */}
      <div className="mx-auto max-w-3xl px-4 mt-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-xl bg-white/10 pl-10 pr-3 py-3 text-sm text-white placeholder-white/50 border border-white/10 focus:outline-none"
            />
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-white/60" />
          </div>
          <button
            onClick={() => smoothScroll(whyRef)}
            className="rounded-xl px-3 py-3 text-sm font-medium border"
            style={{ borderColor: BRAND.gold, color: BRAND.gold }}
          >
            Why votes matter
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setTab(c.id)}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap border ${tab === c.id ? "text-black" : "text-white/80"}`}
              style={{
                borderColor: tab === c.id ? BRAND.gold : "rgba(255,255,255,0.2)",
                background: tab === c.id ? `linear-gradient(135deg, ${BRAND.gold}, #f1d97a)` : "transparent",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
        <div className="mx-auto max-w-3xl px-4 mt-4 pb-24 grid grid-cols-1 gap-3">
                {filtered.map((item, idx) => (
                  <motion.div key={item.id} layout>
                    <VoteCard
                      item={item}
                      count={votes[item.id]}
                      onVote={onVote}
                      disabled={hasVotedFor(item.id)}
                      onImageClick={() => setOpenIndex(idx)}
                    />
                    <AnimatePresence>
                      {justVoted === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="mt-2 flex items-center gap-2 text-emerald-300 text-sm"
                        >
                          <CheckCircle size={16} /> Counted! Thanks for voting.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

                    {/* Fullscreen Modal */}
<AnimatePresence>
  {openIndex !== null && filtered[openIndex] && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={() => setOpenIndex(null)} // Backdrop closes
    >
      {/* Modal content (stops backdrop close) */}
      <div
        className="relative w-full max-w-md mx-auto bg-white rounded-2xl p-6 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button inside content, now works */}
        <button
          type="button"
          onClick={() => setOpenIndex(null)}
          className="absolute top-3 right-3 z-10 text-black/60 hover:text-black"
        >
          ✕
        </button>

        {/* Image with swipe */}
        <motion.img
          src={filtered[openIndex].img}
          alt={filtered[openIndex].name}
          className="max-h-[50vh] object-contain mb-4"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset, velocity }) => {
            if (offset.x < -100 || velocity.x < -500) {
              nextItem();
            } else if (offset.x > 100 || velocity.x > 500) {
              prevItem();
            }
          }}
        />

        {/* Info */}
        <div className="text-center mb-4">
          <div className="text-black font-semibold text-sm">
            {filtered[openIndex].name}
          </div>
          <div className="text-gray-500 text-xs">
            {filtered[openIndex].category}
          </div>
        </div>

        {/* Vote */}
        <Button
          onClick={() => onVote(filtered[openIndex].id)}
          disabled={hasVotedFor(filtered[openIndex].id)}
          className="rounded-xl px-4 py-2 text-sm"
          style={{
            background: hasVotedFor(filtered[openIndex].id)
              ? "rgba(212,175,55,0.25)"
              : `linear-gradient(135deg, ${BRAND.gold}, #f1d97a)`,
            color: BRAND.black,
          }}
        >
          <ThumbsUp className="mr-1 h-4 w-4" />{" "}
          {hasVotedFor(filtered[openIndex].id) ? "Voted" : "Vote"}
        </Button>

        {/* Nav arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={prevItem}
            className="p-3 text-black/70 hover:text-black text-2xl"
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={nextItem}
            className="p-3 text-black/70 hover:text-black text-2xl"
          >
            ›
          </button>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>




      {/* Why this matters */}
      <div id="why" ref={whyRef} className="mx-auto max-w-3xl px-4 pb-28">
      <Glass className="p-5">
        <div className="text-white text-base font-semibold">Why your vote matters</div>
        <p className="text-white/80 text-sm mt-2">
          At Rumble and Elyxium, <span className="font-semibold italic">you</span> come first.  
          Every vote helps us keep your fridge stocked with the products you crave, 
          the flavours that fuel <span className="font-semibold italic">your workouts</span> and the snacks you actually want on hand.  
          It’s about building the perfect selection, together.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "More Fuel = Better Workouts",
            "The Best Products, just for You",
            "Seamless Grab & Go",
            "A fridge curated by the Rumble Community",
          ].map((b) => (
            <div
              key={b}
              className="text-xs rounded-full px-3 py-1 border"
              style={{ borderColor: BRAND.gold, color: BRAND.gold }}
            >
              {b}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            onClick={() => smoothScroll(totalsRef)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium"
            style={{ background: `linear-gradient(135deg, ${BRAND.gold}, #f1d97a)`, color: BRAND.black }}
          >
            <BarChart2 size={16} /> See live votes
          </button>
        </div>
      </Glass>

      </div>

      {/* Sticky footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur border-t border-white/10" style={{ background: "rgba(0,0,0,0.45)" }}>
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="text-white text-sm flex items-center gap-2">
            <Flame className="h-4 w-4" /> Votes are live — tap your favorites
          </div>
          <div className="flex items-center">
            <button
              onClick={handleShare}
              className="rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2"
              style={{ background: `linear-gradient(135deg, ${BRAND.teal}, ${BRAND.tealDark})`, color: BRAND.white }}
            >
              <Share2 size={16} /> Share link
            </button>
            {toast && (
              <div className="ml-3 text-xs text-white/90 px-2 py-1 rounded-lg border border-white/10 bg-black/50">
                {toast}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
