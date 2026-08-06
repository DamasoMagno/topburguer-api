export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface UpdateUserInput {
  name: string;
  email: string;
  password: string;
}