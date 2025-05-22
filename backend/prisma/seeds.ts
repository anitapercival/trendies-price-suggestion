import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Rolex Submariner',
        brand: 'Rolex',
        category: 'Watches',
        price: '120000.00',
        description: 'Iconic luxury diving watch from Rolex.',
        photo: 'https://example.com/photos/rolex-submariner.jpg',
        sold: false,
      },
      {
        name: 'Omega Speedmaster',
        brand: 'Omega',
        category: 'Watches',
        price: '55000.00',
        description: 'Legendary chronograph known as the Moonwatch.',
        photo: 'https://example.com/photos/omega-speedmaster.jpg',
        sold: false,
      },
      {
        name: 'Tiffany & Co. Diamond Necklace',
        brand: 'Tiffany & Co.',
        category: 'Jewellery',
        price: '70000.00',
        description: 'Elegant diamond necklace from Tiffany & Co.',
        photo: 'https://example.com/photos/tiffany-necklace.jpg',
        sold: false,
      },
      {
        name: 'Cartier Love Bracelet',
        brand: 'Cartier',
        category: 'Jewellery',
        price: '62000.00',
        description: 'Classic Cartier Love bracelet in rose gold.',
        photo: 'https://example.com/photos/cartier-bracelet.jpg',
        sold: false,
      },
      {
        name: 'Louis Vuitton Speedy 30',
        brand: 'Louis Vuitton',
        category: 'Bags',
        price: '15000.00',
        description: 'Iconic Speedy 30 bag in monogram canvas.',
        photo: 'https://example.com/photos/lv-speedy30.jpg',
        sold: false,
      },
      {
        name: 'Chanel Classic Flap Bag',
        brand: 'Chanel',
        category: 'Bags',
        price: '55000.00',
        description: 'Timeless Chanel classic flap bag in black leather.',
        photo: 'https://example.com/photos/chanel-flap-bag.jpg',
        sold: false,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
