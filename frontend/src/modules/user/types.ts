export type Profile = {
  firstName: string;
  lastName: string;
  avatar: string;
  photos: Array<{
    name: string;
    url: string;
  }>;
};
