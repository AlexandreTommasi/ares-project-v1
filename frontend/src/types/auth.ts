export enum UserRole {
  Player = 'PLAYER',
  Admin = 'ADMIN',
}

export type User = {
  id: string;
  name: string;
  role: UserRole;
};
