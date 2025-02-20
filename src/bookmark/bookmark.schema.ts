import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BookmarkDocument = Bookmark & Document;

@Schema()
export class Bookmark {

    @Prop({ 
        required: true 
    })
    title: string;

    @Prop({ 
        required: true 
    })
    description: string;

    @Prop({ 
        required: true 
    })
    link: string;

    @Prop({ 
        required: true 
    })
    userId: string;

    @Prop({ 
        required: false,
        auto: true 
    })
    createdAt: Date;

    @Prop({ 
        required: false,
        auto: true
    })
    updatedAt: Date;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);