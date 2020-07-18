import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';

@Injectable()
export class AuthService {
    private authChange: Subject<boolean> = new Subject<boolean>();
    private user: User;

    constructor(
        private router: Router,
    ) { }

    public getAuthChangeListener(): Observable<boolean> {
        return this.authChange.asObservable();
    }

    public registerUser(authData: AuthData): void {
        this.user = {
            email: authData.email,
            id: Math.round(Math.random() * 1000000).toString(),
        };
        this.authSuccess();
    }
    
    public login(authData: AuthData): void {
        this.user = {
            email: authData.email,
            id: Math.round(Math.random() * 1000000).toString(),
        };
        this.authSuccess();
    }

    public logout(): void {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    public getUser(): User {
        return { ...this.user };
    }

    public isAuth(): boolean {
        return !!this.user;
    }

    private authSuccess(): void {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}