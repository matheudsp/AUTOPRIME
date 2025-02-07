const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Limpar dados existentes (opcional, apenas para desenvolvimento)
    await prisma.image.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.category.deleteMany();

    // Categorias
    const categoriesData = [
      {
        name: "Hatch",
        slug: "hatch",
        imageUrl: "https://images.unsplash.com/photo-1592840331052-16e15c2c6f95",
      },
      {
        name: "Sedan",
        slug: "sedan",
        imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
      },
      {
        name: "SUV",
        slug: "suv",
        imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
      },
      {
        name: "Pickup",
        slug: "pickup",
        imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
      },
      {
        name: "Esportivo",
        slug: "esportivo",
        imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
      },
      {
        name: "Moto",
        slug: "moto",
        imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc",
      },
    ];

    // Criar categorias
    const categories = await Promise.all(
      categoriesData.map((data) => prisma.category.create({ data }))
    );

    // Função auxiliar para criar veículos com imagens
    const createVehicleWithImages = async (vehicleData: {
        name: string; model: string; version: string; year: string; km: string; basePrice: number; gas: string; transmission: string; armored: string; categoryId: any; specialTag: string; slug: string; // Slug único
        description: string; plateEnd: string; whatsApp: string; cover: string;
      }, imageURLs: any[]) => {
      const vehicle = await prisma.vehicle.create({
        data: {
          ...vehicleData,
          images: {
            createMany: {
              data: imageURLs.map((url) => ({ url })),
            },
          },
        },
      });
      return vehicle;
    };

    // Veículos
    const vehiclesData = [
      {
        name: "Fiat Pulse",
        model: "1.0 Turbo",
        version: "Audace",
        year: "2023",
        km: "0",
        basePrice: 115000.0,
        gas: "Flex",
        transmission: "Automático",
        armored: "Não",
        categoryId: categories.find((c) => c.name === "SUV")?.id,
        specialTag: "NEW",
        slug: `fiat-pulse-${Date.now()}`, // Slug único
        description: "SUV compacto, completo e moderno.",
        plateEnd: "0",
        whatsApp: "89 9 94176493",
        cover: "https://images.unsplash.com/photo-1632660670988-9e3068231c6f",
      },
      {
        name: "Chevrolet Onix",
        model: "1.0 Turbo",
        version: "Premier",
        year: "2024",
        km: "5000",
        basePrice: 90000.0,
        gas: "Flex",
        transmission: "Automático",
        armored: "Não",
        categoryId: categories.find((c) => c.name === "Hatch")?.id,
        specialTag: "USED",
        slug: `chevrolet-onix-${Date.now()}`, // Slug único
        description: "Hatchback líder de vendas, econômico e confiável.",
        plateEnd: "1",
        whatsApp: "89 9 94176493",
        cover: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
      },
      {
        name: "Honda Civic",
        model: "2.0 EXL",
        version: "Touring",
        year: "2023",
        km: "10000",
        basePrice: 150000.0,
        gas: "Flex",
        transmission: "Automático",
        armored: "Não",
        categoryId: categories.find((c) => c.name === "Sedan")?.id,
        specialTag: "USED",
        slug: `honda-civic-${Date.now()}`, // Slug único
        description: "Sedan esportivo, confortável e tecnológico.",
        plateEnd: "2",
        whatsApp: "89 9 94176493",
        cover: "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
      },
      {
        name: "Toyota Hilux",
        model: "2.8",
        version: "SRV",
        year: "2022",
        km: "20000",
        basePrice: 250000.0,
        gas: "Diesel",
        transmission: "Automático",
        armored: "Não",
        categoryId: categories.find((c) => c.name === "Pickup")?.id,
        specialTag: "USED",
        slug: `toyota-hilux-${Date.now()}`, // Slug único
        description: "Pickup robusta, ideal para trabalho e aventura.",
        plateEnd: "3",
        whatsApp: "89 9 94176493",
        cover: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
      },
      {
        name: "Porsche 911",
        model: "Carrera",
        version: "S",
        year: "2023",
        km: "500",
        basePrice: 999999.99,
        gas: "Gasolina",
        transmission: "Automático",
        armored: "Não",
        categoryId: categories.find((c) => c.name === "Esportivo")?.id,
        specialTag: "NEW",
        slug: `porsche-911-${Date.now()}`, // Slug único
        description: "Esportivo de alta performance, luxo e tecnologia.",
        plateEnd: "4",
        whatsApp: "89 9 94176493",
        cover: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
      },
      {
        name: "Honda CB 500X",
        model: "500",
        version: "Adventure",
        year: "2023",
        km: "1000",
        basePrice: 40000.0,
        gas: "Gasolina",
        transmission: "Manual",
        armored: "Não",
        categoryId: categories.find((c) => c.name === "Moto")?.id,
        specialTag: "NEW",
        slug: `honda-cb500x-${Date.now()}`, // Slug único
        description: "Moto versátil, ideal para estradas e aventuras.",
        plateEnd: "5",
        whatsApp: "89 9 94176493",
        cover: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc",
      },
    ];

    // Criar veículos com imagens
    await Promise.all(
      vehiclesData.map(async (vehicleData) => {
        const imageURLs = [
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
          "https://images.unsplash.com/photo-1502877338535-766e1452684a",
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        ];
        await createVehicleWithImages(vehicleData, imageURLs);
      })
    );

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });