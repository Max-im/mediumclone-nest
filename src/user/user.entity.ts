import {hash} from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column({default: ''})
    bio: string;

    @Column({default: ''})
    image: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}