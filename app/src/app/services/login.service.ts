import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private httpClient: HttpClient) { }

    onSignIn(email: string, password: string): Observable<any> {
        let reqheaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var data = "username=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password) + "&grant_type=password";
        return this.httpClient.post<any>('http://localhost:51110/token', data, { headers: reqheaders });
    }

    // getDonorDetails(): Observable<User> {
    //     return this.httpClient.get<User>('http://api.electricianpk.com/api/Misc/GetDonorClaims'
    //         , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
    // }

}

