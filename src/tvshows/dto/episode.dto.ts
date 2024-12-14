import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class EpisodeDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  episodeNumber: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  seasonNumber: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  releaseDate: Date;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  director: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  actors: string[];
}
