import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export default function AppHttpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // add header to each request
  // handle error
  return next(req);
}
