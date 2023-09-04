export class CreateClientPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photosData: Array<{
    name: string;
    url: string;
  }>;
}
