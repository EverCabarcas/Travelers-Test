import { IsString, MinLength, MaxLength} from 'class-validator';

export class CustomerDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  telephone: string;
}
