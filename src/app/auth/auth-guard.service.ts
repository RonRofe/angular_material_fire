import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanLoad, Route } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        return this.authService.isAuth() || (this.router.navigate(['/login']) && false);
    }
    
    public canLoad(route: Route): boolean {
        return this.authService.isAuth() || (this.router.navigate(['/login']) && false);
    }
}