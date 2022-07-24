import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  getTags(): string[] {
    return ['js', 'ts', 'c#'];
  }
}