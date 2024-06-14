import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GraphQLError } from 'graphql';
import { ApiGenericService } from './services/generic.service';
import { PesquisaRepository } from './repository/pesquisa.repository';
import { PesquisaService } from './services/pesquisa.service';
import { PesquisaResolver } from './resolvers/pesquisa.resolver';
import { AuthRepository } from './repository/auth.repository';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    HttpModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      debug: false,
      context: ({ req, res }) => ({ req, res }),
      rootValue: ({ req, res }) => ({ req, res }),
      formatError: (error) => {
        return new GraphQLError(
          error.extensions?.exception?.response?.motivos_Critica?.find(element => !element.propriedade)?.criticas?.join("\n") ?? error.message,
          undefined,
          undefined,
          undefined,
          error.path,
          undefined,
          { motivos_Critica: error.extensions?.exception?.response?.motivos_Critica, statusCode: error.extensions?.exception?.status }
        )
      }
    }),
    JwtModule.register({
      secret: process.env.jwtSecret,
      signOptions: {
        expiresIn: parseInt(process.env.jwtTime)
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),

  ],
  controllers: [
  ],
  providers: [
    ApiGenericService,
    JwtModule,

    PesquisaResolver,
    PesquisaService,
    PesquisaRepository,

    AuthService,
    AuthRepository,
    AuthResolver,

  ],
})
export class AppModule { }
