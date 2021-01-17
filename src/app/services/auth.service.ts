import { Injectable } from "@angular/core";
import  firebase  from 'firebase/app';
import 'firebase/auth';
import { Observable, Subject } from "rxjs";




@Injectable({providedIn: 'root'})
export class AuthService{

    private authSubject: Subject<boolean> = new Subject();
    public get isLogedinSnapShot(): boolean {return firebase.auth().currentUser != null}
    public get isLogedin(): Observable<boolean> {return this.authSubject.asObservable()}

    constructor(){
        firebase.auth().onAuthStateChanged(
            (user) => {
                this.authSubject.next(user ? true : false);
            }
        );
    }

    singInOrCreateAccount(){
    // fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
    }

    async signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    }

    async logout(){
        await firebase.auth().signOut();
    }

    getEmail(): string {
        return this.isLogedinSnapShot ? firebase.auth().currentUser.email: "";
    }
  

}






















