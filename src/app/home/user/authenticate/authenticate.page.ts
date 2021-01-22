import { AuthService } from './../../../services/auth.service';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit, AfterContentInit {

  email: string = '';
  password: string = '';
  emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  isEmailVaid(): boolean {
    return this.email.length >= 0 && this.emailRegex.test(this.email);
  }
  
  isUserInfoValid(){
    return this.isEmailVaid() && this.password.length >= 0;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signInWithGoogle(){
    this.authService.signInWithGoogle();
  }

  checkLogin(status: boolean){
    if (status){
      this.router.navigate(['/', 'home', 'tabs', 'user', 'personal-page']);
    }
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.checkLogin(this.authService.isLogedinSnapShot);
    this.authService.isLogedin.subscribe(
      res => {
        this.checkLogin(res);
      }
    );
  }

}
