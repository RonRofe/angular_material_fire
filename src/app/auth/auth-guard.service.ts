import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        return this.authService.isAuth() || (this.router.navigate(['/login']) && false);
    }
}