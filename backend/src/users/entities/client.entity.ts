import { ChildEntity, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Photo } from './photo.entity';

@ChildEntity()
export class Client extends User {
  @Column()
  avatar: string;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];
}
