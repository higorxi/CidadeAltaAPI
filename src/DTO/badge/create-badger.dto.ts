export class CreateBadgeDto {
    slug: string;
    name: string;
    image: string;
    type: 'bronze' | 'prata' | 'ouro';
  }
  