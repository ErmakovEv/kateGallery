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

export type TModifyArtWorks = {
  likesCount?: number;
  commentsCount?: number;
  categoryName?: string;
};

export type TFullArtWork = TArtWork & TModifyArtWorks;

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

export type TComment = {
  id: string;
  text: string;
  authorId: string;
  workId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TFullComment = TComment &
  Pick<TUser, 'fullName' | 'avatarUrl'> &
  Pick<TArtWork, 'id'>;

export type TFullCommentWithArtWork = TComment &
  Pick<TUser, 'fullName' | 'avatarUrl'> &
  Pick<TArtWork, 'name'>;

export type TLike = {
  id: string;
  authorId: string;
  workId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TLikeWithUserArtWork = TLike &
  Pick<TUser, 'fullName' | 'avatarUrl'> &
  Pick<TArtWork, 'name'>;
