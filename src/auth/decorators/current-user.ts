import { createParamDecorator } from '@nestjs/common';

export const MyId = createParamDecorator<string>(
  () =>
    // const request: AuthorizedRequest = ctx.switchToHttp().getRequest();

    'carlos',
);
