import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as requestIp from 'request-ip';

export const CurrentIP = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {

    const ctx = GqlExecutionContext.create(context);
    let req = ctx.getContext().req;
    // if(req){
    //   return req.connection.remoteAddress;
    // }

    //const request = ctx.switchToHttp().getRequest();
    return requestIp.getClientIp(req);
  },
);
