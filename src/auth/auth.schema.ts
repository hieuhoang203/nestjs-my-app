import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
    @Prop({
        required: fail,
        unique: true,
        auto: true
    })
    id: string;

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
        required: true
    })
    hash: string;

    @Prop({
        required: fail,
        type: 'timestamp'
    })
    createdAt: Date;

    @Prop({
        required: fail,
        type: 'timestamp'
    })
    updatedAt: Date;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);