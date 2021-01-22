import { SnapObservable } from './snap.observable';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/firestore';



export class FirestoreRealTime<T>{


    public instance = new SnapObservable<T>();


    private unsubscriber: ()=>void = null;
    private hasEnded = true;


    db: firebase.firestore.Firestore;
    doc: firebase.firestore.DocumentReference;
    constructor(
        private collection: string,
        private documentGetter: () => string, 
    ){
        this.db =firebase.firestore(firebase.app());
    }
    start(){
        this.hasEnded = false;
        this.doc = this.db.collection(this.collection).doc(this.documentGetter())
        this.unsubscriber = this.doc.onSnapshot((doc) => {
            this.instance.snap = doc.data() as T;
            this.instance.subject.next(this.instance.snap);
        });
    }
    end(){
        if (!this.hasEnded){
            this.unsubscriber();
            this.hasEnded = true;
        }
    }



}