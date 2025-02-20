import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {

    @Prop({
        required: true
    })
    email: string;

    @Prop({
        required: true
    })

    hash: string;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);