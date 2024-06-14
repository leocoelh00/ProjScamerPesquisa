export class Resposta<T> {
    status: boolean = true;

    motivos_Critica: { propriedade: string, criticas: string[] }[] = [];

    data: T;

    nr_Registros?: number;

    statusCode: number = 200
}