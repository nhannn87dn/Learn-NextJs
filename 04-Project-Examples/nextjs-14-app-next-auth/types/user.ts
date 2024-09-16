interface UserType {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
    refreshToken: string,
    accessToken: string,
  }
  
  type UserResponseType = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string,
    refreshToken?: string,
    accessToken?: string,
  };
  
  export type { UserType, UserResponseType };