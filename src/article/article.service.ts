import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponseInterface } from './type/articleResponse.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

    async createArticle(user: UserEntity, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
      const article = new ArticleEntity();
      Object.assign(article, createArticleDto);
      
      if (!article.tagList) {
        article.tagList = [];
      }

      article.slug = this.generateSlug(createArticleDto.title);
      
      article.author = user;

      return await this.articleRepository.save(article);
    }

    async getArticleBySlug(slug: string): Promise<ArticleEntity> {
      const article = await this.articleRepository.findOneBy({slug});

      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }

      return article;
    }

    async deleteBySlug(slug: string, userId: number): Promise<DeleteResult> {
      const article = await this.getArticleBySlug(slug);

      if (article.author.id !== userId) {
        throw new HttpException('You have no permission', HttpStatus.FORBIDDEN);
      }

      return await this.articleRepository.delete(article.id);
    }

    private generateSlug(title: string): string {
      return slugify(title, {lower: true}) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    }

    buildArticle(article: ArticleEntity): ArticleResponseInterface {
      return {article};
    }
}