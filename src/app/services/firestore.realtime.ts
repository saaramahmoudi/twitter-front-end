import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/firestore';



export class FirestoreRealTime<T>{

    private _snapShot: T = null;
    private subject: Subject<T> = new Subject<T>();
    private unsubscriber: ()=>void = null;
    private hasEnded = true;

    public get snapShot(): T {return this._snapShot};
    public get observable(): Observable<T> {return this.subject.asObservable()}; 
    db: firebase.firestore.Firestore;
    doc: firebase.firestore.DocumentReference;
    constructor(
        private collection: string,
        private documentGetter: () => string, 
        private httpClient: HttpClient 
    ){
        this.db =firebase.firestore(firebase.app());
    }
    start(){
        this.hasEnded = false;
        this.doc = this.db.collection(this.collection).doc(this.documentGetter())
        this.unsubscriber = this.doc.onSnapshot((doc) => {
            this._snapShot = doc.data() as T;
            this.subject.next(this._snapShot);
        });
    }
    end(){
        if (!this.hasEnded){
            this.unsubscriber();
            this.hasEnded = true;
        }
    }



}