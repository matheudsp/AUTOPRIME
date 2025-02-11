import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Categorias já existentes
  const categories = ['Hatch', 'Esportivo', 'Picape', 'Moto', 'Sedan', 'SUV'];

  // Verifica se as categorias já foram inseridas
  for (const categoryName of categories) {
    const categoryExists = await prisma.category.findFirst({
      where: { name: categoryName },
    });

    if (!categoryExists) {
      await prisma.category.create({
        data: {
          name: categoryName,
          slug: categoryName.toLowerCase(),
          imageUrl: `https://source.unsplash.com/random/300x300/?${categoryName.toLowerCase()}`,
        },
      });
    }
  }

  // Veículos para cada categoria
  const vehicles = [
    {
      name: 'Fiat Argo',
      model: 'Argo',
      version: 'Drive 1.3',
      year: '2022',
      km: '15.000',
      basePrice: 65000.0,
      discountPercentage: 5,
      slug: 'fiat-argo-drive-1-3',
      description: 'Carro hatch compacto e econômico.',
      gas: 'Flex',
      transmission: 'Manual',
      armored: false,
      categoryName: 'Hatch',
      images: [
        'https://source.unsplash.com/random/800x600/?fiat,argo',
        'https://source.unsplash.com/random/800x600/?car,hatchback',
      ],
    },
    {
      name: 'Porsche 911',
      model: '911',
      version: 'Carrera S',
      year: '2021',
      km: '8.000',
      basePrice: 800000.0,
      discountPercentage: 10,
      slug: 'porsche-911-carrera-s',
      description: 'Carro esportivo de alta performance.',
      gas: 'Gasolina',
      transmission: 'Automático',
      armored: false,
      categoryName: 'Esportivo',
      images: [
        'https://source.unsplash.com/random/800x600/?porsche,911',
        'https://source.unsplash.com/random/800x600/?sports,car',
      ],
    },
    {
      name: 'Toyota Hilux',
      model: 'Hilux',
      version: 'SRV 4x4',
      year: '2020',
      km: '30.000',
      basePrice: 250000.0,
      discountPercentage: 7,
      slug: 'toyota-hilux-srv-4x4',
      description: 'Picape robusta e versátil.',
      gas: 'Diesel',
      transmission: 'Automático',
      armored: true,
      categoryName: 'Picape',
      images: [
        'https://source.unsplash.com/random/800x600/?toyota,hilux',
        'https://source.unsplash.com/random/800x600/?pickup,truck',
      ],
    },
    {
      name: 'Honda CB 500X',
      model: 'CB 500X',
      version: 'Adventure',
      year: '2021',
      km: '10.000',
      basePrice: 35000.0,
      discountPercentage: 3,
      slug: 'honda-cb-500x-adventure',
      description: 'Moto ideal para aventuras.',
      gas: 'Gasolina',
      transmission: 'Manual',
      armored: false,
      categoryName: 'Moto',
      images: [
        'https://source.unsplash.com/random/800x600/?honda,cb500x',
        'https://source.unsplash.com/random/800x600/?motorcycle,adventure',
      ],
    },
    {
      name: 'Toyota Corolla',
      model: 'Corolla',
      version: 'Altis Hybrid',
      year: '2022',
      km: '12.000',
      basePrice: 150000.0,
      discountPercentage: 8,
      slug: 'toyota-corolla-altis-hybrid',
      description: 'Sedan moderno e eficiente.',
      gas: 'Híbrido',
      transmission: 'Automático',
      armored: false,
      categoryName: 'Sedan',
      images: [
        'https://source.unsplash.com/random/800x600/?toyota,corolla',
        'https://source.unsplash.com/random/800x600/?sedan,car',
      ],
    },
    {
      name: 'Jeep Compass',
      model: 'Compass',
      version: 'Limited 4x4',
      year: '2021',
      km: '20.000',
      basePrice: 180000.0,
      discountPercentage: 6,
      slug: 'jeep-compass-limited-4x4',
      description: 'SUV espaçoso e confortável.',
      gas: 'Flex',
      transmission: 'Automático',
      armored: false,
      categoryName: 'SUV',
      images: [
        'https://source.unsplash.com/random/800x600/?jeep,compass',
        'https://source.unsplash.com/random/800x600/?suv,car',
      ],
    },
  ];

  // Insere os veículos no banco de dados
  for (const vehicleData of vehicles) {
    const category = await prisma.category.findFirst({
      where: { name: vehicleData.categoryName },
    });

    if (category) {
      const vehicle = await prisma.vehicle.create({
        data: {
          name: vehicleData.name,
          model: vehicleData.model,
          version: vehicleData.version,
          year: vehicleData.year,
          km: vehicleData.km,
          basePrice: vehicleData.basePrice,
          discountPercentage: vehicleData.discountPercentage,
          slug: vehicleData.slug,
          description: vehicleData.description,
          gas: vehicleData.gas,
          transmission: vehicleData.transmission,
          armored: vehicleData.armored,
          categoryId: category.id,
          images: {
            create: vehicleData.images.map((url) => ({ url })),
          },
        },
      });

      console.log(`Veículo criado: ${vehicle.name}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });