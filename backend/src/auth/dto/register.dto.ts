import { IsEmail, Length, Matches } from 'class-validator';

export class RegisterDto {
  @Length(2, 25)
  firstName: string;

  @Length(2, 25)
  lastName: string;

  @IsEmail()
  email: string;

  @Length(6, 50)
  @Matches(/\d/, { message: 'password must contain at least one digit' })
  password: string;
}
