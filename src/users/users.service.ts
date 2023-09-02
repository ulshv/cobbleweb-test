import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateClientPayload } from './interfaces/createClient.interface';
import { Photo } from '../users/entities/photo.entity';
import { Client } from './entities/client.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private clientRepository: Repository<Client>,
    private dataSource: DataSource,
  ) {}

  async findByEmailWithPassword(email: string): Promise<Client | undefined> {
    return this.clientRepository.findOne({
      where: { email },
      select: { password: true },
    });
  }

  async findByIdWithRelations(userId: number): Promise<Client | undefined> {
    return this.clientRepository.findOne({
      where: { id: userId },
      relations: { photos: true },
    });
  }

  async create(createClientPayload: CreateClientPayload) {
    await this.dataSource.transaction(async (manager) => {
      const { photosData, ...payload } = createClientPayload;
      const clientRepository = manager.getRepository(Client);
      const photoRepository = manager.getRepository(Photo);

      try {
        await clientRepository.insert({
          email: payload.email,
          password: payload.password,
          firstName: payload.firstName,
          lastName: payload.lastName,
          // Generate random avatar based on full name
          avatar: `https://robohash.org/${payload.firstName}-${payload.lastName}`,
        });
      } catch (err) {
        if (/duplicate key/.test(err.message))
          throw new BadRequestException('User with this email already exists');
      }

      const client = await clientRepository.findOne({
        where: { email: payload.email },
      });

      const photos = photosData.map((p) => {
        const photo = new Photo();
        photo.name = p.name;
        photo.url = p.url;
        photo.user = client;
        return photo;
      });

      await photoRepository.save(photos);
    });
  }
}
