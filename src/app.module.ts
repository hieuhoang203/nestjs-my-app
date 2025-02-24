import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenModule } from './accessToken/accessToken.module';
import { RefreshTokenModule } from './refreshToken/refreshToken.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/nest-js',{
      dbName: 'nest-js',
    }),
    // MongooseModule.forRoot('mongodb://devVnfite:Vnfite20250222@42.113.122.118:27017/CRM_vnfite_v2_test?authSource=CRM_vnfite_v2_test',
    //   {
    //     dbName: 'CRM_vnfite_v2_test',
    //     user: 'devVnfite',
    //     pass: 'Vnfite20250222',
    //     authSource: 'CRM_vnfite_v2_test',
    //   }
    // ),
    AuthModule,
    UserModule,
    AccessTokenModule,
    RefreshTokenModule,
    BookmarkModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule { }
