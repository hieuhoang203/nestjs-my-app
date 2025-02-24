import { InjectModel } from "@nestjs/mongoose";
import { RefreshToken, RefreshTokenDocument } from './refreshToken.schema';
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class RefreshTokenService {

    constructor(
        @InjectModel(RefreshToken.name) private refreshTokenModel : Model<RefreshTokenDocument>,
        private readonly redisService : RedisService
    ) {}

    async createRefreshToken(userId: string) {
        const expiresIn = dayjs();
        const refreshToken = new this.refreshTokenModel({
            userId: userId,
            expiresAt: expiresIn.add(7, 'days').toDate(),
            token: uuidv4()
        });
        await this.redisService.setCache(userId, refreshToken, 7 * 24 * 30 * 60);
        return refreshToken.save();
    }

}