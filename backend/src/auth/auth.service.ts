import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { S3Service } from '../s3/s3.service';

const LOGIN_ERROR_MSG = 'Incorrect email or password';
const MIN_PHOTOS_COUNT = 4;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private s3Service: S3Service,
  ) {}

  async register(registerDto: RegisterDto, photos: Array<Express.Multer.File>) {
    if (photos.length < MIN_PHOTOS_COUNT) {
      throw new BadRequestException(
        'At least 4 photos should be uploaded during registration',
      );
    }

    // Hash the password before saving it in the DB
    const passwordHash = await bcrypt.hash(
      registerDto.password,
      await bcrypt.genSalt(),
    );

    // Upload photos to S3
    const photosData = await this.s3Service.uploadFiles(photos);

    // Create client and photos records in the DB
    await this.usersService.create({
      ...registerDto,
      password: passwordHash,
      photosData,
    });

    // Return Login access_token after registration is completed
    return this.login({
      email: registerDto.email,
      password: registerDto.password,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(
      loginDto.email,
    );

    if (!user) throw new UnauthorizedException(LOGIN_ERROR_MSG);

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(LOGIN_ERROR_MSG);
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
