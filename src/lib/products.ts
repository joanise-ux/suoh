export interface Product {
  slug: string;
  name: string;
  namePL: string;
  price: number;
  priceFormatted: string;
  image: string;
  images: string[];
  tag: string;
  tagPL: string;
  category: "bags" | "keychains" | "gifts";
  description: string;
  descriptionPL: string;
  materials: string;
  materialsPL: string;
  dimensions: string;
}

export const products: Product[] = [
  {
    slug: "noir-crossbody",
    name: "Noir Crossbody",
    namePL: "Noir Crossbody",
    price: 490,
    priceFormatted: "490 PLN",
    image: "/images/noir-mini-satin.jpg",
    images: ["/images/noir-mini-satin.jpg", "/images/noir-crossbody-gold.jpg"],
    tag: "Handmade · Black",
    tagPL: "Ręcznie robiona · Czarna",
    category: "bags",
    description:
      "A refined crossbody bag with gold-tone hardware. Clean silhouette, minimal design — perfect for evenings out or everyday elegance.",
    descriptionPL:
      "Elegancka torebka crossbody ze złotymi okuciami. Minimalistyczny design — idealna na wieczorne wyjścia i codzienną elegancję.",
    materials: "100% polyester silk cord, crochet, gold-tone metal hardware, satin lining",
    materialsPL: "Sznurek z jedwabiu poliestrowego 100%, szydełko, złote okucia metalowe, satynowa podszewka",
    dimensions: "22 × 15 × 7 cm",
  },
  {
    slug: "mauve-shoulder",
    name: "Mauve Shoulder",
    namePL: "Mauve na ramię",
    price: 420,
    priceFormatted: "420 PLN",
    image: "/images/mauve-shoulder.jpg",
    images: ["/images/mauve-shoulder.jpg"],
    tag: "Handmade · Mauve",
    tagPL: "Ręcznie robiona · Wrzosowa",
    category: "bags",
    description:
      "Soft mauve shoulder bag with a relaxed structure. Spacious interior with interior pocket. Perfect companion for your daily essentials.",
    descriptionPL:
      "Miękka torebka na ramię w kolorze wrzosowym. Przestronne wnętrze z wewnętrzną kieszenią. Idealny towarzysz na co dzień.",
    materials: "100% polyester silk cord, crochet, brushed silver hardware, cotton lining",
    materialsPL: "Sznurek z jedwabiu poliestrowego 100%, szydełko, srebrne okucia, bawełniana podszewka",
    dimensions: "28 × 20 × 10 cm",
  },
  {
    slug: "slate-chain-bag",
    name: "Slate Chain Bag",
    namePL: "Slate z łańcuszkiem",
    price: 540,
    priceFormatted: "540 PLN",
    image: "/images/slate-chain-bag.jpg",
    images: ["/images/slate-chain-bag.jpg"],
    tag: "Handmade · Graphite",
    tagPL: "Ręcznie robiona · Grafitowa",
    category: "bags",
    description:
      "Statement chain bag in deep graphite. Detachable chain strap lets you wear it as a clutch or crossbody. A bold yet timeless piece.",
    descriptionPL:
      "Efektowna torebka z łańcuszkiem w głębokim graficie. Odpinany łańcuszek pozwala nosić jako kopertówkę lub crossbody.",
    materials: "100% polyester silk cord, crochet, gunmetal chain, microfiber lining",
    materialsPL:
      "Sznurek z jedwabiu poliestrowego 100%, szydełko, łańcuszek w kolorze gunmetal, podszewka z mikrofibry",
    dimensions: "24 × 14 × 6 cm",
  },
  {
    slug: "monochrome-statement",
    name: "Monochrome Statement",
    namePL: "Monochrome Statement",
    price: 590,
    priceFormatted: "590 PLN",
    image: "/images/monochrome-statement.jpg",
    images: ["/images/monochrome-statement.jpg"],
    tag: "Handmade · Monochrome",
    tagPL: "Ręcznie robiona · Monochromatyczna",
    category: "bags",
    description:
      "Our most architectural piece. Bold geometric lines in monochrome palette. Structured silhouette that holds its shape beautifully.",
    descriptionPL:
      "Nasz najbardziej architektoniczny model. Odważne geometryczne linie w monochromatycznej palecie. Strukturalna sylwetka.",
    materials: "100% polyester silk cord, crochet, matte black hardware, structured foam interior",
    materialsPL:
      "Sznurek z jedwabiu poliestrowego 100%, szydełko, matowe czarne okucia, strukturalne wnętrze z pianką",
    dimensions: "26 × 18 × 9 cm",
  },
  {
    slug: "crochet-keychain-noir",
    name: "Crochet Keychain Noir",
    namePL: "Brelok szydełkowy Noir",
    price: 45,
    priceFormatted: "45 PLN",
    image: "/images/keychain-mini-bears.jpg",
    images: ["/images/keychain-mini-bears.jpg", "/images/collection-keychains.jpg"],
    tag: "Handmade · Keychain",
    tagPL: "Ręcznie robiony · Brelok",
    category: "keychains",
    description:
      "Minimalist crocheted keychain with gold clasp. Each one handmade in our Wrocław studio.",
    descriptionPL:
      "Minimalistyczny szydełkowy brelok ze złotym zapięciem. Każdy ręcznie wykonany w naszym wrocławskim studio.",
    materials: "100% polyester silk cord, crochet, gold-tone clasp",
    materialsPL: "Sznurek z jedwabiu poliestrowego 100%, szydełko, złote zapięcie",
    dimensions: "8 × 3 cm",
  },
  {
    slug: "braided-keychain-whiskey",
    name: "Braided Keychain Whiskey",
    namePL: "Brelok pleciony Whiskey",
    price: 45,
    priceFormatted: "45 PLN",
    image: "/images/keychain-whiskey.jpg",
    images: ["/images/keychain-whiskey.jpg", "/images/keychain-mini-bears.jpg"],
    tag: "Handmade · Keychain",
    tagPL: "Ręcznie robiony · Brelok",
    category: "keychains",
    description:
      "Hand-crocheted keychain in warm whiskey tone. Unique crochet pattern makes each piece one of a kind.",
    descriptionPL:
      "Ręcznie szydełkowany brelok w ciepłym kolorze whiskey. Unikalny wzór szydełkowy sprawia, że każda sztuka jest jedyna w swoim rodzaju.",
    materials: "100% polyester silk cord, crochet, silver-tone ring",
    materialsPL: "Sznurek z jedwabiu poliestrowego 100%, szydełko, srebrne kółeczko",
    dimensions: "10 × 2.5 cm",
  },
  {
    slug: "gift-set-essentials",
    name: "Gift Set — Essentials",
    namePL: "Zestaw prezentowy — Essentials",
    price: 160,
    priceFormatted: "160 PLN",
    image: "/images/gift-bear-pink.jpg",
    images: ["/images/gift-bear-pink.jpg", "/images/gift-bear-grey.jpg"],
    tag: "Handmade · Gift Set",
    tagPL: "Ręcznie robiony · Zestaw",
    category: "gifts",
    description:
      "Curated gift set including a crocheted keychain, card holder and linen pouch. Beautifully packaged in our signature box.",
    descriptionPL:
      "Zestaw prezentowy zawierający szydełkowy brelok, etui na karty i lnianą saszetkę. Pięknie zapakowany w nasze firmowe pudełko.",
    materials: "100% polyester silk cord, crochet, linen, cardboard gift box",
    materialsPL: "Sznurek z jedwabiu poliestrowego 100%, szydełko, len, kartonowe pudełko prezentowe",
    dimensions: "Box: 25 × 18 × 8 cm",
  },
  {
    slug: "gift-set-luxe",
    name: "Gift Set — Luxe",
    namePL: "Zestaw prezentowy — Luxe",
    price: 160,
    priceFormatted: "160 PLN",
    image: "/images/gift-bear-grey.jpg",
    images: ["/images/gift-bear-grey.jpg", "/images/gift-bear-pink.jpg"],
    tag: "Handmade · Gift Set",
    tagPL: "Ręcznie robiony · Zestaw",
    category: "gifts",
    description:
      "Premium gift set with a mini crossbody bag, keychain and personalized note card. The ultimate SUOH experience.",
    descriptionPL:
      "Ekskluzywny zestaw z mini torebką crossbody, brelokiem i personalizowaną kartką. Pełne doświadczenie SUOH.",
    materials: "100% polyester silk cord, crochet, linen, luxury gift box",
    materialsPL:
      "Sznurek z jedwabiu poliestrowego 100%, szydełko, len, luksusowe pudełko prezentowe",
    dimensions: "Box: 30 × 22 × 12 cm",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export const categories = [
  {
    slug: "bags",
    name: "Bags",
    namePL: "Torebki",
    image: "/images/collection-bags.jpg",
  },
  {
    slug: "keychains",
    name: "Keychains",
    namePL: "Breloki",
    image: "/images/collection-keychains.jpg",
  },
  {
    slug: "gifts",
    name: "Gifts",
    namePL: "Prezenty",
    image: "/images/gift-bear-grey.jpg",
  },
];
