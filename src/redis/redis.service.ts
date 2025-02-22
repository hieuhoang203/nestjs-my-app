import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import Redis from "ioredis";

export class RedisService implements OnModuleInit, OnModuleDestroy {

    private client: Redis;

    onModuleInit() {
        this.client = new Redis({
            host: 'localhost',
            port: 6379,
        });

        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });
        this.client.on('error', (error) => {
            console.error('Error connecting to Redis', error);
        });
    }

    async setCache(key: string, value: any, ttl: number = 60) {
        await this.client.set(key, JSON.stringify(value), 'EX', ttl);
    }

    async getCache(key: string) {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async delCache(key: string) {
        await this.client.del(key);
    }

    onModuleDestroy() {
        this.client.quit();
    }

}