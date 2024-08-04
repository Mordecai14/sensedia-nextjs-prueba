export interface Users {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUser {
  email: string;
  name: string;
  password: string;
}
