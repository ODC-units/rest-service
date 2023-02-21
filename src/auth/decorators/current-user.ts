import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthorizedRequest } from '../../auth/types';

export const MyId = createParamDecorator<string>((_, ctx: ExecutionContext) => {
  const request: AuthorizedRequest = ctx.switchToHttp().getRequest();

  return request.auth.user_id;
});