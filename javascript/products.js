const products = [
  // Robes
  { id: 1, name: "Robe Florale Élégante", category: "robes", price: 4500, oldPrice: 6000, image: "/img/image2.jpg", rating: 4.8, reviews: 124, badge: "Bestseller", description: "Robe légère à imprimé floral, parfaite pour l'été.", sizes: ["XS","S","M","L","XL"], colors: ["Rose","Bleu","Blanc"] },
  { id: 2, name: "Robe de Soirée Noire", category: "robes", price: 7800, oldPrice: null, image: "/img/image8.jpg", rating: 4.9, reviews: 89, badge: "Nouveau", description: "Robe de soirée longue, coupe sirène, tissu satiné.", sizes: ["S","M","L"], colors: ["Noir","Bordeaux"] },
  { id: 3, name: "Robe Bohème Midi", category: "robes", price: 3200, oldPrice: 4000, image: "/img/image9.jpg", rating: 4.5, reviews: 67, badge: "Solde", description: "Robe midi style bohème, broderie artisanale.", sizes: ["XS","S","M","L","XL","XXL"], colors: ["Terre","Crème","Orange"] },
  { id: 4, name: "Robe Casual Rayée", category: "robes", price: 2800, oldPrice: null, image: "/img/image10.jpg", rating: 4.3, reviews: 45, badge: null, description: "Robe courte rayée, confortable au quotidien.", sizes: ["XS","S","M","L"], colors: ["Bleu marine","Rouge","Noir"] },

  // Hauts
  { id: 5, name: "Blouse en Soie Ivoire", category: "hauts", price: 2900, oldPrice: 3500, image: "/img/image3.jpg", rating: 4.7, reviews: 102, badge: "Bestseller", description: "Blouse en soie naturelle, col V, manches longues.", sizes: ["XS","S","M","L","XL"], colors: ["Ivoire","Nude","Noir"] },
  { id: 6, name: "T-shirt Oversize Vintage", category: "hauts", price: 1500, oldPrice: null, image: "/img/image12.jpg", rating: 4.4, reviews: 230, badge: "Populaire", description: "T-shirt oversize 100% coton, style vintage lavé.", sizes: ["S","M","L","XL"], colors: ["Blanc","Gris","Noir","Rose pâle"] },
  { id: 7, name: "Chemise Lin Estivale", category: "hauts", price: 3100, oldPrice: 3800, image: "/img/image13.jpg", rating: 4.6, reviews: 58, badge: "Solde", description: "Chemise en lin naturel, légère et respirante.", sizes: ["XS","S","M","L","XL"], colors: ["Blanc","Beige","Vert sauge"] },
  { id: 8, name: "Pull Mohair Doux", category: "hauts", price: 5200, oldPrice: null, image: "/img/image14.jpg", rating: 4.8, reviews: 76, badge: "Nouveau", description: "Pull en mohair extra-doux, coupe décontractée.", sizes: ["S","M","L"], colors: ["Lavande","Camel","Rose"] },

  // Pantalons
  { id: 9, name: "Jean Taille Haute Slim", category: "pantalons", price: 4200, oldPrice: 5000, image: "/img/image4.jpg", rating: 4.7, reviews: 315, badge: "Bestseller", description: "Jean slim taille haute, stretch confortable.", sizes: ["34","36","38","40","42","44"], colors: ["Bleu clair","Bleu foncé","Noir"] },
  { id: 10, name: "Pantalon Large Palazzo", category: "pantalons", price: 3600, oldPrice: null, image: "/img/image16.jpg", rating: 4.5, reviews: 88, badge: "Tendance", description: "Pantalon palazzo fluide, taille élastique.", sizes: ["XS","S","M","L","XL"], colors: ["Noir","Beige","Kaki"] },
  { id: 11, name: "Legging Sport Premium", category: "pantalons", price: 2400, oldPrice: 3000, image: "/img/image17.jpg", rating: 4.6, reviews: 189, badge: "Solde", description: "Legging gainant haute performance, tissu respirant.", sizes: ["XS","S","M","L","XL"], colors: ["Noir","Gris","Marine"] },
  { id: 12, name: "Pantalon Cuir Écologique", category: "pantalons", price: 6500, oldPrice: null, image: "/img/image18.jpg", rating: 4.4, reviews: 42, badge: "Nouveau", description: "Pantalon en cuir écologique, coupe droite moderne.", sizes: ["S","M","L"], colors: ["Noir","Marron"] },

  // Vestes
  { id: 13, name: "Veste Blazer Structurée", category: "vestes", price: 8900, oldPrice: 11000, image: "/img/image19.jpg", rating: 4.9, reviews: 97, badge: "Bestseller", description: "Blazer à épaules structurées, tissu premium.", sizes: ["XS","S","M","L","XL"], colors: ["Noir","Beige","Blanc cassé"] },
  { id: 14, name: "Veste Jean Brodée", category: "vestes", price: 5500, oldPrice: null, image: "/img/image20.jpg", rating: 4.6, reviews: 63, badge: "Tendance", description: "Veste en jean avec broderies florales au dos.", sizes: ["S","M","L","XL"], colors: ["Bleu clair","Bleu foncé"] },
  { id: 15, name: "Cardigan Long Cachemire", category: "vestes", price: 7200, oldPrice: 9000, image: "/img/image21.jpg", rating: 4.8, reviews: 54, badge: "Solde", description: "Cardigan long en cachemire, ultra-doux.", sizes: ["S","M","L"], colors: ["Crème","Gris","Noir"] },
  { id: 16, name: "Manteau Laine Oversize", category: "vestes", price: 12500, oldPrice: null, image: "/img/image22.jpg", rating: 4.7, reviews: 38, badge: "Luxe", description: "Manteau en laine vierge, coupe oversize élégante.", sizes: ["S","M","L","XL"], colors: ["Camel","Noir","Gris anthracite"] },

  // Accessoires
  { id: 17, name: "Sac Bandoulière Cuir", category: "accessoires", price: 6800, oldPrice: 8500, image: "/img/image6.jpg", rating: 4.9, reviews: 142, badge: "Bestseller", description: "Sac bandoulière en cuir véritable, fermeture magnétique.", sizes: ["Unique"], colors: ["Noir","Cognac","Blanc"] },
  { id: 18, name: "Foulard Soie Imprimé", category: "accessoires", price: 1800, oldPrice: null, image: "/img/image23.jpg", rating: 4.5, reviews: 87, badge: "Populaire", description: "Foulard en soie pure, imprimé artistique exclusif.", sizes: ["Unique"], colors: ["Multicolore","Bleu","Rose"] },
  { id: 19, name: "Ceinture Large Dorée", category: "accessoires", price: 2200, oldPrice: 2800, image: "/img/image24.jpg", rating: 4.3, reviews: 55, badge: "Solde", description: "Ceinture large avec boucle dorée, matière synthétique premium.", sizes: ["S/M","L/XL"], colors: ["Noir","Blanc","Marron"] },
  { id: 20, name: "Chapeau Bob Élégant", category: "accessoires", price: 1600, oldPrice: null, image: "/img/image25.jpg", rating: 4.4, reviews: 39, badge: "Nouveau", description: "Bob en coton tressé, protection UV 50+.", sizes: ["Unique"], colors: ["Beige","Noir","Blanc"] }
];

const users = [
  { email: "admin@femmechic.dz", password: "Admin123!", name: "Administrateur", role: "admin" },
  { email: "sara@email.com", password: "Sara2024!", name: "Sara Benali", role: "user" },
  { email: "amina@email.com", password: "Amina123!", name: "Amina Cherif", role: "user" }
];
