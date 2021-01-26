import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router"
import { Observable } from "rxjs";




@Injectable({providedIn: 'root'})
export class LoginGaurd  implements CanActivate  {
    constructor(
        private authService: AuthService, 
        private router: Router
    ){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
        if (this.authService.hasEverBeenInit){
            if(!this.authService.isLogedinSnapShot){
                this.router.navigate(["/", "home", "tabs", "user", "authenticate"]);
            }
            return this.authService.isLogedinSnapShot;
        }else {
            this.authService.isLogedin.subscribe(
                state => {
                    if (!state){
                        this.router.navigate(["/", "home", "tabs", "user", "authenticate"]);
                    }
                }
            );
            return this.authService.isLogedin;
        }
    }
}



