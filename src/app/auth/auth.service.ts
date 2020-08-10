import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from 'angularfire2/auth';

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
        private snackbar: MatSnackBar,
        private uiService: UIService,
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
        this.uiService.loadingState$.next(true);

        from(this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)).subscribe(
            () => this.uiService.loadingState$.next(false),
            (error) => {
                this.uiService.showSnackBar(error.message, null, 3000);
                this.uiService.loadingState$.next(false);
            },
        );
    }

    public login(authData: AuthData): void {
        this.uiService.loadingState$.next(true);

        from(this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)).subscribe(
                () => this.uiService.loadingState$.next(false),
                ({ message }: { message: string }) => {
                    this.uiService.showSnackBar(message, null, 3000);
                    this.uiService.loadingState$.next(false);
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