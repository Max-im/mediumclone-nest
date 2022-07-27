import { InjectRepository } from "@nestjs/typeorm";
import { sign } from 'jsonwebtoken';
import { Injectable } from "@nestjs/common";
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

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
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