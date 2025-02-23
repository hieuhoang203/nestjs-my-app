import { InjectModel } from "@nestjs/mongoose";
import { RefreshToken, RefreshTokenDocument } from './refreshToken.schema';
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RefreshTokenService {

    constructor(@InjectModel(RefreshToken.name) private refreshTokenModel : Model<RefreshTokenDocument> ) {}

    async createRefreshToken(userId: string) {
        const expiresIn = dayjs();
        const refreshToken = new this.refreshTokenModel({
            userId: userId,
            expiresAt: expiresIn.add(30, 'minutes').toDate(),
            token: uuidv4()
        });
        return refreshToken.save();
    }

}