export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  phone_number?: string;
}
