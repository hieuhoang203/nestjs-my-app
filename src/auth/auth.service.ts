import { Body, Injectable } from "@nestjs/common";
import { AuthDto } from "src/auth/auth.dto";
import * as argon from 'argon2';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/user/user.schema";
import { Model } from "mongoose";
import { UserDto } from "src/user/user.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RedisService } from "src/redis/redis.service";
import { AccessTokenService } from "src/accessToken/accessToken.service";
import { RefreshTokenService } from "src/refreshToken/refreshToken.service";

@Injectable()

export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>, 
        private jwt : JwtService,
        private config : ConfigService,
        private readonly redisService : RedisService,
        private readonly accessTokenService: AccessTokenService,
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    async login(dto : AuthDto, rememberPass : boolean) : Promise<{value: User, accessToken: string, refreshToken?: string}> {
        const user = await this.userModel.findOne({email: dto.email}).exec();
        if(!user) {
            throw new Error('User not found');
        }
        const checkVerify = argon.verify(user.hash, dto.password);
        if(!checkVerify) {
            throw new Error('Invalid password');
        }
        if (!rememberPass) {
            const accessToken = await this.accessTokenService.createAccessToken(user.id);
            const refreshToken = await this.refreshTokenService.createRefreshToken(user.id);
            this.redisService.setCache(`accessToken: ${user?.id}`, accessToken, 30 * 60);
            this.redisService.setCache(`refreshToken: ${user?.id}`, refreshToken, 7 * 24 * 30 * 60);
            return {
                value: user,
                accessToken: accessToken.token,
                refreshToken: refreshToken.token
            };
        } else {
            return {
                value: user,
                accessToken: (await this.accessTokenService.createAccessToken(user.id)).token
            };
        }
    }


    async signup(@Body() dto: UserDto) : Promise<User> {
        const hash = await argon.hash(dto.password);
        const user = await this.userModel.findOne({email: dto.email}).exec();
        if(user) {
            throw new Error('User already exists');
        }
        const newUser = new this.userModel({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            hash: hash
        });
        return await newUser.save();
    }

    async signToken(user:User) : Promise<string> {
        return this.jwt.sign(
            {user: user},
            {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: this.config.get('JWT_EXPIRES')
            }
        );
    }

};