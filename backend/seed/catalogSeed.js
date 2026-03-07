const TravelPackage = require("../models/TravelPackage");
const Addon = require("../models/Addon");
const TouristSpot = require("../models/TouristSpot");
const Cottage = require("../models/cottage");

const defaultTravelPackages = [
  {
    id: "pkg-onam-celebration",
    name: "Onam Celebration Offer",
    price: 3800,
    description: "Seasonal Onam plan with festive ambience and add-on support.",
    associatedAddons: [5, 7],
  },
  {
    id: "pkg-christmas-festive",
    name: "Christmas Festive Offer",
    price: 4200,
    description: "Christmas-themed package with festive setup and activities.",
    associatedAddons: [3, 5],
  },
  {
    id: "pkg-vacation-family",
    name: "Vacation Family Offer",
    price: 3600,
    description: "Budget-friendly family vacation package with flexible options.",
    associatedAddons: [1, 4],
  },
  {
    id: "pkg-summer-saver",
    name: "Summer Saver Offer",
    price: 2500,
    description: "Low-cost summer package for short comfortable getaways.",
    associatedAddons: [5],
  },
  {
    id: "pkg-weekend-comfort",
    name: "Weekend Comfort",
    price: 4500,
    description: "Relaxing weekend plan with curated comfort inclusions.",
    associatedAddons: [1],
  },
  {
    id: "pkg-family-joy",
    name: "Family Joy",
    price: 7000,
    description: "Family-focused package with flexible activity options.",
    associatedAddons: [4, 7],
  },
  {
    id: "pkg-romantic-retreat",
    name: "Romantic Retreat",
    price: 8500,
    description: "Couple-centered stay setup with premium ambience.",
    associatedAddons: [3, 6],
  },
  {
    id: "pkg-premium-signature",
    name: "Premium Signature",
    price: 12000,
    description: "High-end package with premium resort experiences.",
    associatedAddons: [1, 3, 6],
  },
];

const defaultAddons = [
  { id: 1, name: "Airport Pickup", price: 500 },
  { id: 3, name: "Romantic Dinner", price: 2000 },
  { id: 4, name: "Adventure Tour", price: 1200 },
  { id: 5, name: "Breakfast Upgrade", price: 300 },
  { id: 6, name: "Photography Session", price: 2500 },
  { id: 7, name: "Tourist Places Visit", price: 1800 },
];

const defaultTouristSpots = [
  { id: 1, name: "Padagiri View Point", price: 1200 },
  { id: 2, name: "Thittumpuram View Point", price: 1000 },
  { id: 3, name: "Avitis View Point", price: 900 },
  { id: 4, name: "Kombankallu View Point", price: 1100 },
  { id: 5, name: "Meenampara - Nelliyampathy Hill View Point 1", price: 1500 },
  { id: 6, name: "Seetharkundu Viewpoint", price: 1600 },
  { id: 7, name: "Nelliyampathy Falls", price: 1300 },
  { id: 8, name: "Karapara Water Falls", price: 1700 },
  { id: 9, name: "Charpa Waterfalls", price: 2200 },
  { id: 10, name: "Thoomanam Waterfalls", price: 1800 },
  { id: 11, name: "Mannathipara Waterfalls", price: 1400 },
  { id: 12, name: "Vattayi Waterfalls", price: 1500 },
  { id: 13, name: "Nellikulangara Bhagavathi Temple", price: 800 },
  { id: 14, name: "Perungottukavu Bhagavathy Temple", price: 900 },
  { id: 15, name: "Sree Dharmasastha Temple Trust", price: 850 },
];

const defaultCottages = [
  { id: 1, name: "Deluxe Cottage", price: 5000 },
  { id: 2, name: "Premium Villa", price: 10000 },
];

async function seedModelIfEmpty(Model, data) {
  const count = await Model.countDocuments();
  if (count > 0) return;
  await Model.insertMany(data);
}

async function seedCatalogData() {
  await seedModelIfEmpty(TravelPackage, defaultTravelPackages);
  await seedModelIfEmpty(Addon, defaultAddons);
  await seedModelIfEmpty(TouristSpot, defaultTouristSpots);
  await seedModelIfEmpty(Cottage, defaultCottages);
}

module.exports = { seedCatalogData };
