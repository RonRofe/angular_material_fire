import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from '../models/auth-data.model';
import { TrainingService } from '../training/traning.service';

@Injectable()
export class AuthService {
    private authChange: Subject<boolean> = new Subject<boolean>();
    private isAuthenticated: boolean = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private snackbar: MatSnackBar,
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
        from(this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password))
            .subscribe(null, (error) => this.snackbar.open(error.message, null, { duration: 3000 }));
    }

    public login(authData: AuthData): void {
        from(this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password))
            .subscribe(null, (error) => this.snackbar.open(error.message, null, { duration: 3000 }));
    }

    public logout(): void {
        this.afAuth.auth.signOut();
    }

    public isAuth(): boolean {
        return this.isAuthenticated;
    }
}