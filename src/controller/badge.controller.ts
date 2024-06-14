import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { BadgeService } from 'src/service/badge.service';
import { CreateBadgeDto } from 'src/DTO/badge/create-badger.dto';

@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Post()
  createBadge(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.createBadge(createBadgeDto);
  }

  @Post('assign-random/:userId')
  assignRandomBadge(@Param('userId') userId: string) {
    return this.badgeService.assignRandomBadge(userId);
  }

  @Get()
  findAllBadges() {
    return this.badgeService.findAllBadges();
  }

  @Get('user/:userId')
  findBadgesByUserId(@Param('userId') userId: string) {
    return this.badgeService.findBadgesByUserId(userId);
  }
}
