import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddToMyList {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentType: string;
}
