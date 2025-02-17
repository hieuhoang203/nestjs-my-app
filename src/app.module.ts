import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://hieuhv203:08092003@localhost:27017/test-mongo', {

    }),
    AuthModule, 
    UserModule, 
    BookmarkModule
  ],
})
export class AppModule {}
