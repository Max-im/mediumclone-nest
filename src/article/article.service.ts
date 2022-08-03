import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponseInterface } from './type/articleResponse.interface';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { ArticlesResponseInterface } from './type/articlesResponse.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async getAll(userId: number | undefined, query: any): Promise<ArticlesResponseInterface> {
    const queryBuilder = getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');

    if (query.tag) queryBuilder.andWhere('articles.tagList LIKE :tag', { tag: `%${query.tag}` });

    if (query.author) {
      const author = await this.userRepository.findOneBy({ username: query.author })
      queryBuilder.andWhere('articles.authorId = :id', { id: author.id });
    }

    const articlesCount = await queryBuilder.getCount();

    if (query.limit) queryBuilder.limit = query.limit;
    if (query.offset) queryBuilder.offset = query.offset;

    const articles = await queryBuilder.getMany();

    return { articles, articlesCount }
  }

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
    const article = await this.articleRepository.findOneBy({ slug });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    return article;
  }

  async updateArticle(slug: string, updateArticleDto: UpdateArticleDto, userId: number) {
    const article = await this.getArticleBySlug(slug);

    if (article.author.id !== userId) {
      throw new HttpException('You have no permission', HttpStatus.FORBIDDEN);
    }

    Object.assign(article, updateArticleDto);

    console.log({ updateArticleDto })
    if (updateArticleDto.title) {
      article.slug = this.generateSlug(updateArticleDto.title);
    }

    return await this.articleRepository.save(article);
  }

  async deleteBySlug(slug: string, userId: number): Promise<DeleteResult> {
    const article = await this.getArticleBySlug(slug);

    if (article.author.id !== userId) {
      throw new HttpException('You have no permission', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete(article.id);
  }

  private generateSlug(title: string): string {
    return slugify(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
  }

  buildArticle(article: ArticleEntity): ArticleResponseInterface {
    return { article };
  }

  async addToFavorite(slug: string, userId: number): Promise<ArticleEntity> {
    const article = await this.getArticleBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { favorites: true }
    });

    const isNotFavorited = user.favorites.findIndex(item => item.id === article.id) === -1;

    if (isNotFavorited) {
      user.favorites.push(article);
      article.favoriteCount++;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }
}