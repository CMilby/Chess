export interface Auth {
  is_authenticated: boolean;
  user: User | null;
}

export interface User {
  Username: string;
  FirstName: string | null;
  LastName: string | null;
  Email: string;
  Password: string | null;
}
