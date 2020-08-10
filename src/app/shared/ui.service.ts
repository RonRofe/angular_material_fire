import { Subject } from 'rxjs';

export class UIService {
    public loadingState$: Subject<boolean> = new Subject<boolean>();
}