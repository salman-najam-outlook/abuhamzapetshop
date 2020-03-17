import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})

export class LoginService {
    constructor(private httpClient: HttpClient) { }

    onSignIn(email: string, password: string): Observable<any> {
        const reqheaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        // tslint:disable-next-line: max-line-length
        // tslint:disable-next-line: prefer-const
        let data = 'username=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password) + '&grant_type=password';
        return this.httpClient.post<any>('https://abuhamzaapi.sizzlingmart.com/token', data, { headers: reqheaders });
    }

    getLoggedInUserClaims(): Observable<User> {
        return this.httpClient.get<User>('https://abuhamzaapi.sizzlingmart.com/api/users/GetUsersClaims'
            , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
    }

}

