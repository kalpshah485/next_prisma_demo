const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();
async function main() {
  // Seed data for the Product model
  const products = [
    {
      name: "Product 1",
      description: "Description for Product 1",
      price: 99.99,
    },
    {
      name: "Product 2",
      description: "Description for Product 2",
      price: 199.99,
    },
    {
      name: "Product 3",
      description: "Description for Product 3",
      price: 299.99,
    },
  ];

  // Insert data into the database
  for (const product of products) {
    await client.product.create({
      data: product,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });