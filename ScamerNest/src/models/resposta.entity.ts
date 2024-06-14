import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export function RespostaQuery<T>(classRef: Type<T>): any {

    @ObjectType({ isAbstract: true })
    abstract class RespostaQueryType {
        @Field({ nullable: true })
        status: boolean = true;

        @Field(type => [MotivoCritica], { nullable: true })
        motivos_Critica: MotivoCritica[] = [];

        @Field(type => classRef, { nullable: true })
        data: T;

        @Field({ nullable: true })
        statusCode: number = 200
    }

    return RespostaQueryType;
}

export function RespostaListagemQuery<T>(classRef: Type<T>): any {

    @ObjectType({ isAbstract: true })
    abstract class RespostaListagemType {
        @Field({ nullable: true })
        status: boolean = true;

        @Field(type => [MotivoCritica], { nullable: true })
        motivos_Critica: MotivoCritica[] = [];

        @Field(type => [classRef], { nullable: true })
        data: T;

        @Field(type => Int, { nullable: true })
        nr_Registros: number

        @Field({ nullable: true })
        statusCode: number = 200
    }

    return RespostaListagemType;
}

export function RespostaQueryArray<T>(classRef: Type<T>): any {

    @ObjectType({ isAbstract: true })
    abstract class RespostaQueryType {
        @Field({ nullable: true })
        status: boolean = true;

        @Field(type => [MotivoCritica], { nullable: true })
        motivos_Critica: MotivoCritica[] = [];

        @Field(type => [classRef], { nullable: true })
        data: T;

        @Field({ nullable: true })
        statusCode: number = 200
    }

    return RespostaQueryType;
}

@ObjectType()
export class MotivoCritica {
    @Field({ nullable: true })
    propriedade: string

    @Field(type => [String], { nullable: true })
    criticas: string[]
}

@ObjectType()
export class Resposta<T>{
    @Field({ nullable: true })
    status: boolean = true;

    @Field(type => [MotivoCritica], { nullable: true })
    motivos_Critica: MotivoCritica[] = [];

    @Field(type => [String], { nullable: true })
    data: T;

    @Field(type => String, { nullable: true })
    ds_Token?: string;

    @Field({ nullable: true })
    statusCode: number = 200

    Tratar_Erro(mensagem: string, statusCode: number = 500) {
        this.statusCode = statusCode

        this.motivos_Critica.push({ propriedade: "", criticas: [mensagem] })

        return this
    }
}

@ObjectType()
export class RespostaGeneric<T>{

    @Field({ nullable: true })
    status: boolean = true;

    @Field(type => [MotivoCritica], { nullable: true })
    motivos_Critica: MotivoCritica[] = [];

    @Field(type => String, { nullable: true })
    data: T;

    @Field(type => Int, { nullable: true })
    nr_Registros?: number;

    @Field({ nullable: true })
    statusCode: number = 200

    Tratar_Erro_Generic(mensagem: string, statusCode: number = 500) {
        this.statusCode = statusCode

        this.motivos_Critica.push({ propriedade: "", criticas: [mensagem] })

        return this
    }
}