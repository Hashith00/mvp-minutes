// Define the blog post type
export interface BlogPostCard {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  comments: number;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: string;
  image: string;
}
