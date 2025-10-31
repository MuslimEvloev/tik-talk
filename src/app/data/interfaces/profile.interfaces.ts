export interface Profile {
  id: number;
  username: string | null;
  description: string | null;
  avatarUrl: string | null;
  subscribersAmount: number;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  stack: string[];
  city: string;
}
