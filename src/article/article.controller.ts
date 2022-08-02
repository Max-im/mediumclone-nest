import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticleService } from '@app/article/article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponseInterface } from './type/articleResponse.interface';
import { DeleteResult } from 'typeorm';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { ArticlesResponseInterface } from './type/articlesResponse.interface';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async getAll(
        @User('id') userId: number,
        @Query() query: any
    ): Promise<ArticlesResponseInterface> {
        return await this.articleService.getAll(userId, query);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createArticle(
        @User() userId: UserEntity,
        @Body('article') createArticleDto: CreateArticleDto
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.createArticle(userId, createArticleDto);
        return this.articleService.buildArticle(article);
    }

    @Get('/:slug')
    async getArticleBySlug(@Param('slug') slug: string): Promise<ArticleResponseInterface> {
        const article = await this.articleService.getArticleBySlug(slug);
        return this.articleService.buildArticle(article);
    }
    
    @Put('/:slug')
    @UseGuards(AuthGuard)
    async updateArticle(
        @Param('slug') slug: string, 
        @Body('article') updateArticleDto: UpdateArticleDto,
        @User('id') userId: number
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.updateArticle(slug, updateArticleDto, userId);
        return this.articleService.buildArticle(article);
    }

    @Delete('/:slug')
    @UseGuards(AuthGuard)
    async deleteArticle(
        @Param('slug') slug: string, 
        @User('id') userId: number
    ): Promise<DeleteResult> {
        return await this.articleService.deleteBySlug(slug, userId);
    }
}