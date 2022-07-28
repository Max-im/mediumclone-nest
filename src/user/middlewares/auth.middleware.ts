import {verify} from 'jsonwebtoken'
import { ExpressRequest } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { JWT_SECRET } from '@app/config';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    async use(req: ExpressRequest, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null;
            return next();
        }
        try {
            const token = req.headers.authorization.replace(/^Token /, '');
            const decoded = verify(token, JWT_SECRET);
            const user = await this.userService.getUserById(decoded.id);
            req.user = user;
        } catch (err) {
            req.user = null;
        }
        next();
    }
}