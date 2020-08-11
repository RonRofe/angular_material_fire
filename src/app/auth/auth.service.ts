import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, from } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

import { TrainingService } from '../training/traning.service';
import { UIService } from '../shared/ui.service';

import { AuthData } from '../models/auth-data.model';

@Injectable()
export class AuthService {
    private authChange: Subject<boolean> = new Subject<boolean>();
    private isAuthenticated: boolean = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<{ ui: fromApp.State }>,
    ) { }

    public initAuthListener(): void {
        this.afAuth.authState.subscribe(user => {
            if (!user) {
                this.trainingService.cancelSubscriptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
                return;
            }

            this.isAuthenticated = true;
            this.authChange.next(true);
            this.router.navigate(['/training']);
        });
    }

    public getAuthChangeListener(): Observable<boolean> {
        return this.authChange.asObservable();
    }

    public registerUser(authData: AuthData): void {
        // this.uiService.loadingState$.next(true);
        this.store.dispatch({ type: 'START_LOADING' });

        from(this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)).subscribe(
            // () => this.uiService.loadingState$.next(false),
            () => this.store.dispatch({ type: 'STOP_LOADING' }),
            (error) => {
                this.uiService.showSnackBar(error.message, null, 3000);
                // this.uiService.loadingState$.next(false);
                this.store.dispatch({ type: 'STOP_LOADING' });
            },
        );
    }

    public login(authData: AuthData): void {
        // this.uiService.loadingState$.next(true);
        this.store.dispatch({ type: 'START_LOADING' });

        from(this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)).subscribe(
            // () => this.uiService.loadingState$.next(false),
            () => this.store.dispatch({ type: 'STOP_LOADING' }),
            ({ message }: { message: string }) => {
                this.uiService.showSnackBar(message, null, 3000);
                // this.uiService.loadingState$.next(false);
                this.store.dispatch({ type: 'STOP_LOADING' });
            }
        );
    }

    public logout(): void {
        this.afAuth.auth.signOut();
    }

    public isAuth(): boolean {
        return this.isAuthenticated;
    }
}