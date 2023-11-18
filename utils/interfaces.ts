interface iUser {
  userName: string;
  email: string;
  image: string;
  googleID: string;
  verified: Boolean;
}

export interface iUserData extends iUser, Document {}
