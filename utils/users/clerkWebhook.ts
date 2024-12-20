import { db } from "@/utils/database/db";
import { users } from "@/utils/database/schema";
import { eq } from "drizzle-orm";

export const createUserWithClerk = async (
  userId: string,
  email: string,
  username: string
) => {
  try {
    const response = await db.insert(users).values({
      id: userId.toString(),
      email: email,
      name: username,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateUserWithClerk = async (
  userId: string,
  email: string,
  username: string
) => {
  const response = await db
    .update(users)
    .set({
      email: email,
      name: username,
    })
    .where(eq(users.id, userId));
  return response;
};
