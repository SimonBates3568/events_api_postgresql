import { PrismaClient } from "@prisma/client";

const getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user =  await prisma.user.findUnique({
    where: { id },
  })
  console.log("getUserById", user);
  return user;
  
}

export default getUserById;
