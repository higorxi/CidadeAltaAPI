import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { GameService } from 'src/service/game.service';
import { SaveGameScoreDto } from 'src/DTO/gameScore/save-gameScore.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post(':userId/score')
  async saveScore(@Param('userId') userId: string, @Body() saveGameScoreDto: SaveGameScoreDto) {
    const { score, advancedSteps } = saveGameScoreDto;
    const savedGameScore = await this.gameService.saveGameScore(userId, score, advancedSteps);
    return savedGameScore;
  }

  @Get(':userId/details')
  async getGameDetails(@Param('userId') userId: string) {
    const gameDetails = await this.gameService.getGameDetails(userId);
    return gameDetails;
  }
}
