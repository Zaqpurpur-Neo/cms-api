export type Post = {
  _id: string;
  title: string;
  slug: string;
  author: string;
  contents: {
    type: "text" | "image";
    body?: string;
    url?: string;
    caption?: string;
    order: number;
  }[];
  instagramUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

