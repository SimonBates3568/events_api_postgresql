import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deleteEventById(id) {
  return prisma.event.delete({
    where: { id: Number(id) }, // Convert id to number here
  });
}
