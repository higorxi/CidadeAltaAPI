import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import { Badge } from 'src/entity/badge.entity';
import { User } from 'src/entity/user.entity';
import { CreateBadgeDto } from 'src/DTO/badge/create-badger.dto';


@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBadge(createBadgeDto: CreateBadgeDto): Promise<Badge> {
    const badge = this.badgeRepository.create(createBadgeDto);
    return this.badgeRepository.save(badge);
  }

  async assignRandomBadge(userId: string, type?: 'bronze' | 'prata' | 'ouro'): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['badges'],
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Prepara a consulta para buscar emblemas que o usuário ainda não possui
    const whereClause: any = {
      id: Not(In(user.badges.map(badge => badge.id))),
    };

    // Se um tipo específico foi especificado (bronze, prata, ouro), adiciona ao filtro
    if (type) {
      whereClause.type = type;
    }

    // Busca emblemas disponíveis com base no tipo (se especificado) e nos que o usuário ainda não possui
    const availableBadges = await this.badgeRepository.find({
      where: whereClause,
    });

    // Verifica se há emblemas disponíveis para resgate
    if (availableBadges.length === 0) {
      throw new Error('Todos os emblemas desse tipo já foram resgatados');
    }

    // Seleciona um emblema aleatório entre os disponíveis
    const randomIndex = Math.floor(Math.random() * availableBadges.length);
    const badgeToAssign = availableBadges[randomIndex];

    // Adiciona o emblema ao usuário e salva
    user.badges.push(badgeToAssign);
    return this.userRepository.save(user);
  }

  async findAllBadges(): Promise<Badge[]> {
    return this.badgeRepository.find();
  }

  async findBadgesByUserId(userId: string): Promise<Badge[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['badges'],
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user.badges;
  }
}