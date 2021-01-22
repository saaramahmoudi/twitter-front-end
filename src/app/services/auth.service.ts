import { Injectable } from "@angular/core";
import  firebase  from 'firebase/app';
import 'firebase/auth';
import { Observable, Subject } from "rxjs";
import  {HttpClient} from '@angular/common/http'



@Injectable({providedIn: 'root'})
export class AuthService{

    private authSubject: Subject<boolean> = new Subject();
    public get isLogedinSnapShot(): boolean {return firebase.auth().currentUser != null}
    public get isLogedin(): Observable<boolean> {return this.authSubject.asObservable()}

    constructor(
        private httpClient: HttpClient
    ){
        firebase.auth().onAuthStateChanged(
            async (user) => {
                if (user){
                    this.checkAccount();
                }
                this.authSubject.next(user ? true : false);
            }
        );
    }

    checkAccount(){
        this.httpClient.get("http://localhost:8080/check").subscribe(
            (res: {exists: boolean}) => {
                if (!res.exists){
                    this.reqForUserCreation();
                }
            } 
        )
    }
    reqForUserCreation(){
        this.httpClient.get("http://localhost:8080/create").subscribe(
            (res: any) => {
                console.log(res);
            } 
        )
    }

    async getIdToken(): Promise<string | null> {
        const curr = firebase.auth().currentUser;
        if (curr == null) {
            return null;
        }
        return await curr.getIdToken();
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






















