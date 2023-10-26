import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdat" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string;
};
