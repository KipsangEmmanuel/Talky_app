export interface Post {
  id: string;
  username: string;
  profileImage: string;
  timeAgo: string;
  images: string[];
  likes: number;
  description: string;
  comments: string[];
  isLiked: boolean;
  isBookmarked: boolean;
  verified: boolean;
}

export interface PostDetails {
  postImage: string;
  created_by_user_id: string;
  caption: string;
  postType: string;
  created_at: string;
}
