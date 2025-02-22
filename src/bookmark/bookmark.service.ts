import { Injectable } from "@nestjs/common";
import { Bookmark, BookmarkDocument } from "./bookmark.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookmarkDto } from "./bookmark.dto";
import { RedisService } from "src/redis/redis.service";

@Injectable()

export class BookmarkService {
    constructor(
        @InjectModel(Bookmark.name) private bookmarkModel:Model<BookmarkDocument>,
        private readonly redisService : RedisService
    ) {}

    async createBookmark(dto : Partial<BookmarkDto>) : Promise<Bookmark> {
        const bookmark = new this.bookmarkModel(dto);
        await this.redisService.setCache(bookmark.id, bookmark, 120);
        return bookmark.save();
    }

    async getBookmark(id: string) : Promise<Bookmark> {
        const cache = await this.redisService.getCache(id);
        if(cache) {
            return cache;
        }
        const bookmark = await this.bookmarkModel.findById(id).exec();
        if(!bookmark) {
            throw new Error('User not found');
        }
        return bookmark;
    }

    async getAllBookmarks() : Promise<Bookmark[]> {
        const bookmarks = await this.bookmarkModel.find().exec();
        if(!bookmarks) {
            throw new Error('No bookmarks found');
        }
        return bookmarks;
    }

    async updateBookmark(id: string, dto: Partial<BookmarkDto>) : Promise<Bookmark> {
        const bookmark = await this.bookmarkModel.findByIdAndUpdate(id, dto, {new:true}).exec();
        if(!bookmark) {
            throw new Error('Bookmark not found');
        }
        await this.redisService.setCache(bookmark.id, bookmark, 120);
        return bookmark;
    }

    async deleteBookmark(id: string) : Promise<Bookmark> {
        const bookmark = await this.bookmarkModel.findByIdAndDelete(id).exec();
        if(!bookmark) {
            throw new Error('Bookmark not found');
        }
        await this.redisService.delCache(bookmark.id);
        return bookmark;
    }

    async getBookmarksByUser(userId: string) : Promise<Bookmark[]> {
        const bookmarks = await this.bookmarkModel.find({userId}).exec();
        if(!bookmarks) {
            throw new Error('No bookmarks found');
        }
        return bookmarks;
    }

}