import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';
import { Subject, Observable } from 'rxjs';

export class AuthService {
    private authChange: Subject<boolean> = new Subject<boolean>();
    private user: User;

    public getAuthChangeListener(): Observable<boolean> {
        return this.authChange.asObservable();
    }

    public registerUser(authData: AuthData): void {
         this.user = {
            email: authData.email,
            id: Math.round(Math.random() * 1000000).toString(),
         };
         this.authChange.next(true);
        }
        
        public login(authData: AuthData): void {
            this.user = {
                email: authData.email,
                id: Math.round(Math.random() * 1000000).toString(),
            };   
            this.authChange.next(true);
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