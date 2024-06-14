import { IsInt, Min } from 'class-validator';

export class SaveGameScoreDto {
  @IsInt()
  @Min(0)
  score: number;

  @IsInt()
  @Min(0)
  advancedSteps: number;
}
