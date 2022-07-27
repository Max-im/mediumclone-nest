import { InjectRepository } from "@nestjs/typeorm";
import { sign } from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateUserDto } from "@app/user/dto/createUser.dto";
import { UserEntity } from "@app/user/user.entity";
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from "@app/types/userResponse.interface";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
      ) {}

      async getUserByEmail(email: string) {
        return await this.userRepository.findOneBy({email});
      }

      async getUserByName(username: string) {
        return await this.userRepository.findOneBy({username});
      }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.getUserByEmail(createUserDto.email);
        const userByName = await this.getUserByName(createUserDto.username);
        if (userByEmail || userByName) {
            throw new HttpException('Email or Username are taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto)
        return await this.userRepository.save(newUser);
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            email: user.email,
            username: user.username
        }, JWT_SECRET)
    }
}