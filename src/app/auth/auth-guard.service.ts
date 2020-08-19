import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromRoot.State>,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.store.select(fromRoot.getIsAuth).pipe(
            take(1),
            tap(x => console.log(x)),
            );;
        // return this.authService.isAuth() || (this.router.navigate(['/login']) && false);
    }
    
    public canLoad(route: Route): Observable<boolean> {
        return this.store.select(fromRoot.getIsAuth).pipe(
            take(1),
            tap(x => console.log(x)),
        );
        // return this.authService.isAuth() || (this.router.navigate(['/login']) && false);
    }
}