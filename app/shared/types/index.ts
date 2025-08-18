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
