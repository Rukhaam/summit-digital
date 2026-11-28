export const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const socialPosts = { standard: 12, premium: 24 };

export const plans = [
  {
    name: "Social Creative",
    prices: { standard: 6000, premium: 10000 },
    description: "A consistent set of graphics for your social channels.",
    features: [
      { standard: `${socialPosts.standard} social media posts`, premium: `${socialPosts.premium} social media posts` },
      "Custom designs and layouts",
      "Brand colors and typography setup",
      "Ready-to-post files",
      "Social creative strategy",
    ],
  },
  {
    name: "Web Development",
    prices: { standard: 20000, premium: 40000 },
    description: "A responsive site built around what visitors need to do.",
    featured: true,
    features: [
      { standard: "Static React website", premium: "Dynamic React website" },
      { standard: "Standard content layout", premium: "Admin panel" },
      "Responsive design",
      "Performance optimization",
      "Deployment on Vercel or Netlify",
    ],
  },
  {
    name: "Brand Transformation",
    prices: { standard: 50000, premium: 75000 },
    description: "A new identity, website, and content package for a coordinated launch.",
    features: [
      "Logo, brand colors, and type",
      { standard: "Logo and 15 social posts", premium: "Full online presence setup" },
      "Dynamic website with Firebase",
      "Responsive, performance-optimized build",
      "Complete deployment setup",
    ],
  },
];

