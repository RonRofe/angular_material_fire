import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../models/user.model';
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
        from(this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)).subscribe();
    }

    public login(authData: AuthData): void {
        from(this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)).subscribe();
    }

    public logout(): void {
        this.afAuth.auth.signOut();
    }

    public isAuth(): boolean {
        return this.isAuthenticated;
    }
}