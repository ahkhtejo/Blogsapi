import prisma from "../DB/DB";
export async function GetUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function AddUser(email: string, name: string) {
  const NewUser = await prisma.user.create({
    data: { email, name },
  });

  return NewUser;
}

export async function GetUserByID(UserID: number) {
  const User = await prisma.user.findUnique({
    where: {
      id: UserID,
    },
    select: {
      email: true,
      name: true,
      id: true,
    },
  });

  return User;
}

export async function DeleteUser(UserID: number) {
  const User = await prisma.user.delete({
    where: {
      id: UserID,
    },
  });
  return User;
}
