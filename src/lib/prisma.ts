import { PrismaClient } from "@prisma/client";

const global = globalThis as typeof globalThis & { prisma: PrismaClient };

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
