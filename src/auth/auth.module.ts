import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/strategy";
import { RedisModule } from "src/redis/redis.module";
import { RefreshTokenModule } from "src/refreshToken/refreshToken.module";
import { AccessTokenModule } from "src/accessToken/accessToken.module";
import { AccessTokenService } from "src/accessToken/accessToken.service";
import { RefreshTokenService } from "src/refreshToken/refreshToken.service";
import { AccessToken, AccessTokenSchema } from "src/accessToken/accessToken.chema";
import { RefreshToken, RefreshTokenSchema } from "src/refreshToken/refreshToken.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema},
            {name: AccessToken.name, schema: AccessTokenSchema},
            {name: RefreshToken.name, schema: RefreshTokenSchema}
        ]),
        JwtModule.register({}),
        RedisModule
    ],
    controllers: [AuthController],
    providers: [AccessTokenService, AuthService, JwtStrategy, RefreshTokenService]
})

export class AuthModule {};