import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AccessToken, AccessTokenDocument } from "./accessToken.chema";
import { Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class AccessTokenService {

    constructor(
        @InjectModel(AccessToken.name) private accessTokenModel : Model<AccessTokenDocument>,
        private readonly redisService : RedisService
    ) {}

    async createAccessToken(userId: string) {
        const expiresIn = dayjs();
        const accessToken = new this.accessTokenModel({
            userId: userId,
            expiresAt: expiresIn.add(30, 'minutes').toDate(),
            token: uuidv4()
        });
        await this.redisService.setCache(userId, accessToken, 30 * 60);
        return accessToken.save();
    }
    
}