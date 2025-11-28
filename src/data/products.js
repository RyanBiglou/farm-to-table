export const products = [
  // Willowbrook Farm Products
  {
    id: 1,
    farmId: 1,
    name: "Heirloom Tomato Medley",
    description: "A gorgeous mix of Cherokee Purple, Brandywine, and Green Zebra tomatoes. Perfect for salads or fresh eating.",
    price: 6.99,
    unit: "lb",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1546470427-0d4db154cde8?w=600&q=80",
    inStock: true,
    organic: true
  },
  {
    id: 2,
    farmId: 1,
    name: "Farm Fresh Eggs",
    description: "Dozen eggs from our happy, free-range hens. Rich orange yolks and incredible flavor.",
    price: 7.50,
    unit: "dozen",
    category: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1489761826784-04d8deae9845?w=600&q=80",
    inStock: true,
    organic: true
  },
  {
    id: 3,
    farmId: 1,
    name: "Mixed Salad Greens",
    description: "A tender mix of baby lettuces, arugula, and spinach. Harvested fresh each morning.",
    price: 5.99,
    unit: "bunch",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    inStock: true,
    organic: true
  },
  // Sunrise Orchards Products
  {
    id: 4,
    farmId: 2,
    name: "Golden Peaches",
    description: "Sun-ripened peaches picked at peak sweetness. Juicy, fragrant, and absolutely divine.",
    price: 4.99,
    unit: "lb",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1595124299548-b0a8ae3e2866?w=600&q=80",
    inStock: true,
    organic: true
  },
  {
    id: 5,
    farmId: 2,
    name: "Honeycrisp Apples",
    description: "Perfectly balanced sweet-tart flavor with an explosive crunch. A family favorite.",
    price: 3.99,
    unit: "lb",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2ebb7?w=600&q=80",
    inStock: true,
    organic: true
  },
  {
    id: 6,
    farmId: 2,
    name: "Fresh-Pressed Apple Cider",
    description: "Unfiltered, unpasteurized cider made from our heritage apple varieties.",
    price: 8.99,
    unit: "half gallon",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1572359031780-af1c1e4f5200?w=600&q=80",
    inStock: true,
    organic: false
  },
  // Green Pastures Dairy Products
  {
    id: 7,
    farmId: 3,
    name: "Raw Whole Milk",
    description: "Creamy, grass-fed milk from our pasture-raised cows. The way milk should taste.",
    price: 9.99,
    unit: "gallon",
    category: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80",
    inStock: true,
    organic: false
  },
  {
    id: 8,
    farmId: 3,
    name: "Aged Farmhouse Cheddar",
    description: "Sharp, complex cheddar aged for 12 months in our cheese cave. Pairs perfectly with our apple cider.",
    price: 14.99,
    unit: "8 oz",
    category: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=600&q=80",
    inStock: true,
    organic: false
  },
  {
    id: 9,
    farmId: 3,
    name: "Hand-Churned Butter",
    description: "Rich, golden butter made in small batches. Lightly salted with sea salt.",
    price: 8.99,
    unit: "half lb",
    category: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80",
    inStock: true,
    organic: false
  },
  // Honeybee Haven Products
  {
    id: 10,
    farmId: 4,
    name: "Wildflower Honey",
    description: "Raw, unfiltered honey bursting with the flavors of local wildflowers. Never heated, never processed.",
    price: 12.99,
    unit: "16 oz jar",
    category: "Pantry",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
    inStock: true,
    organic: true
  },
  {
    id: 11,
    farmId: 4,
    name: "Honeycomb",
    description: "Pure beeswax honeycomb straight from the hive. A natural delicacy.",
    price: 18.99,
    unit: "12 oz",
    category: "Pantry",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80",
    inStock: true,
    organic: true
  },
  {
    id: 12,
    farmId: 4,
    name: "Beeswax Candles (Set of 3)",
    description: "Hand-rolled beeswax candles that purify the air and fill your home with a subtle honey scent.",
    price: 24.99,
    unit: "set",
    category: "Home",
    image: "https://images.unsplash.com/photo-1602523961358-f9f03af87f5b?w=600&q=80",
    inStock: true,
    organic: false
  },
  // Heritage Acres Products
  {
    id: 13,
    farmId: 5,
    name: "Heritage Berkshire Pork Chops",
    description: "Thick-cut chops from our pasture-raised Berkshire hogs. Unmatched marbling and flavor.",
    price: 16.99,
    unit: "lb",
    category: "Meat",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&q=80",
    inStock: true,
    organic: false
  },
  {
    id: 14,
    farmId: 5,
    name: "Butternut Squash",
    description: "Sweet, nutty heirloom butternut squash. Perfect for roasting or soups.",
    price: 3.49,
    unit: "each",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=600&q=80",
    inStock: true,
    organic: true
  },
  {
    id: 15,
    farmId: 5,
    name: "Heirloom Bean Collection",
    description: "A beautiful assortment of dried heirloom beans: Jacob's Cattle, Scarlet Runner, and Christmas Lima.",
    price: 9.99,
    unit: "1 lb bag",
    category: "Pantry",
    image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=600&q=80",
    inStock: true,
    organic: true
  },
  // Mountain Mushroom Co. Products
  {
    id: 16,
    farmId: 6,
    name: "Fresh Shiitake Mushrooms",
    description: "Meaty, umami-rich shiitakes perfect for stir-fries, soups, or grilling.",
    price: 11.99,
    unit: "8 oz",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=600&q=80",
    inStock: true,
    organic: true
  },
  {
    id: 17,
    farmId: 6,
    name: "Lion's Mane Mushrooms",
    description: "Delicate, seafood-like flavor with potential cognitive benefits. A gourmet treat.",
    price: 14.99,
    unit: "6 oz",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1612273648182-df4d26e7f9c9?w=600&q=80",
    inStock: true,
    organic: true
  },
  {
    id: 18,
    farmId: 6,
    name: "Oyster Mushroom Growing Kit",
    description: "Grow your own gourmet mushrooms at home! Produces multiple flushes.",
    price: 29.99,
    unit: "kit",
    category: "Home",
    image: "https://images.unsplash.com/photo-1604085792624-5a4c4ec6f0a1?w=600&q=80",
    inStock: true,
    organic: true
  }
];

export const categories = [
  "All",
  "Vegetables",
  "Fruits", 
  "Dairy & Eggs",
  "Meat",
  "Pantry",
  "Beverages",
  "Home"
];

export const getProductById = (id) => products.find(product => product.id === parseInt(id));
export const getProductsByFarmId = (farmId) => products.filter(product => product.farmId === parseInt(farmId));

