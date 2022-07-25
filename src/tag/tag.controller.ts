import { Controller, Get } from '@nestjs/common';
import { TagService } from '@app/tag/tag.service';
import { TagEntity } from '@app/tag/tag.entity';

@Controller('tags')
export class TagController {
    constructor(private readonly tagservice: TagService) {}

    @Get()
    async getTags(): Promise<TagEntity[]> {
        return await this.tagservice.getTags();
    }
}