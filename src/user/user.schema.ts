import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({
        required: true
    })
    firstName: string;

    @Prop({
        required: true
    })
    lastName: string;

    @Prop({
        required: true
    })
    email: string;

    @Prop({
        required: false
    })
    hash: string;

    @Prop({
        required: false,
        auto: true
    })
    createdAt: Date;

    @Prop({
        required: false,
    })
    updatedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);