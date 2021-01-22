import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { from, Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // convert promise to observable using 'from' operator
        
        return from(this.handle(req, next))
      }
    
    async handle(req: HttpRequest<any>, next: HttpHandler) {
        
        const token = await this.authService.getIdToken();
        if (token != null) {
            const authToken = "Bearer " + token;

            const authReq = req.clone({
                setHeaders: {
                    Authorization: authToken
                }
            })
            return next.handle(authReq).toPromise()
        }
        else {
            const authReq = req.clone({});
            return next.handle(authReq).toPromise();
        }        

    }

}