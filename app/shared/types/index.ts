export type TArtWork = {
  id: number;
  imageUrls: string[];
  createdAt: Date;
  updatedAt?: Date;
  categoryId: number;
  description: string;
  name: string;
  year?: number;
};

export enum EUserRole {
  user = 'USER',
  admin = 'ADMIN',
}

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: EUserRole;
  verified?: Date;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl?: string;
  Comments?: unknown;
  Likes?: unknown;
  VerificationCodes?: unknown;
};
