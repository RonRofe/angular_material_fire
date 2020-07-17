import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';

export class AuthService {
    private user: User;

    public registerUser(authData: AuthData): void {
         this.user = {
            email: authData.email,
            id: Math.round(Math.random() * 1000000).toString(),
         };
    }

    public login(authData: AuthData): void {
        this.user = {
            email: authData.email,
            id: Math.round(Math.random() * 1000000).toString(),
         };   
    }

    public logout(): void {
        this.user = null;
    }
    
    public getUser(): User {
        return { ...this.user };
    }

    public isAuth(): boolean {
        return !!this.user;
    }
}