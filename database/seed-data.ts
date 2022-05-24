interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  createdAt: number;
  description: string;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      createdAt: Date.now(),
      description:
        'Pendiente: Pariatur incididunt mollit et consequat Lorem in tempor cillum consectetur occaecat et sit dolore.',
      status: 'pending',
    },
    {
      createdAt: Date.now() - 1000000,
      description:
        'En Progreso: Ut tempor consequat dolor aliquip quis aliquip nulla enim ex eiusmod cillum aliquip ut ullamco.',
      status: 'in-progress',
    },
    {
      createdAt: Date.now() - 100000,
      description:
        'Completada: Adipisicing qui exercitation reprehenderit nulla.Qui velit magna consectetur minim sint sunt do aute fugiat magna.',
      status: 'finished',
    },
  ],
};
