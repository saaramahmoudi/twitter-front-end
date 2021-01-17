import { Subject } from 'rxjs';








export class SnapObservable <T>{
    snap: T = null;
    subject = new Subject<T>();
}






