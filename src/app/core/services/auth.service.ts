import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from '../interfaces/user';
import { NotificationService } from './notification.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  token: string;
}

const UserStorageKey = 'user';
const TokenStorageKey = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  get user(): User {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(
        sessionStorage.getItem(UserStorageKey) as string
      );
    }
    return this.currentUser as User;
  }

  private currentToken: string | null = null;

  get token(): string {
    if (!this.currentToken) {
      this.currentToken = sessionStorage.getItem(TokenStorageKey) as string;
    }
    return this.currentToken as string;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get isAdmin(): boolean {
    return this.user.role === Role.ADMIN;
  }

  constructor(
    private httpClient: HttpClient,
    private ns: NotificationService,
    private router: Router
  ) { }

  async login(loginRequest: LoginRequest): Promise<void> {
    const user = await this.httpClient
      .post<LoginResponse>('/api/auth/login', loginRequest)
      .toPromise()
      .catch((error: any) => {

        if (error.status == 401) {
          console.log(error);
          this.ns.showNotification(1, "Sikertelen bejelentkezés", 1200);
          this.router.navigate(['auth']);
        }
      });
    this.setUser(user!);
  }

  async register(user: User): Promise<void> {
    await this.httpClient
      .post<User>('/api/auth/register', user)
      .toPromise()
      .catch((error: any) => {

        if (error.status == 409) {
          console.log(error);
          this.ns.showNotification(1, "Foglalt felhasználónév", 1200);
          this.router.navigate(['auth']);
        } else {
          this.ns.showNotification(0, "Sikeres regisztráció", 1200);
          this.router.navigate(['auth']);
        }
      },
      );
  }

  logout(): void {
    this.setUser(null);
  }

  private setUser(user: LoginResponse | null): void {
    if (user) {
      sessionStorage.setItem(TokenStorageKey, user.token);
      sessionStorage.setItem(UserStorageKey, JSON.stringify(user));
      document.cookie = `${TokenStorageKey}=${user.token}`;
      document.cookie = `${UserStorageKey}=${JSON.stringify(user)}`;

      this.ns.showNotification(0, "Sikeres bejelentkezés", 1200);
      this.router.navigate(['']);
    } else {
      sessionStorage.removeItem(TokenStorageKey);
      sessionStorage.removeItem(UserStorageKey);
    }
    this.currentUser = user;
    this.currentToken = user?.token || null;
  }
}