import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from '@app/article/article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
    @UseGuards(AuthGuard)
    async createArticle(
        @User() userId: UserEntity,
        @Body('article') createArticleDto: CreateArticleDto
    ): Promise<any> {
        return await this.articleService.createArticle(userId, createArticleDto);
    }
    
}