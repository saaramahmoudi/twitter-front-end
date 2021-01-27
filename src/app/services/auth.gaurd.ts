import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router"
import { Observable } from "rxjs";




@Injectable({providedIn: 'root'})
export class AuthGaurd  implements CanActivate  {
    constructor(
        private authService: AuthService, 
        private router: Router
    ){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
        if(this.authService.isLogedinSnapShot){
            this.router.navigate(["/", "home", "tabs", "user", "personal-page"]);
        }
        return !this.authService.isLogedinSnapShot;
    }
}



