import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Tournament } from '../_models';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    private tournamentSubject: BehaviorSubject<Tournament>;
    public tournament: Observable<Tournament>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.tournamentSubject = new BehaviorSubject<Tournament>(JSON.parse(localStorage.getItem('tournament')));
        this.tournament = this.tournamentSubject.asObservable();
    }

    public get tournamentValue(): Tournament {
        return this.tournamentSubject.value;
    }

    // login(username, password) {
    //     return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('user', JSON.stringify(user));
    //             this.userSubject.next(user);
    //             return user;
    //         }));
    // }

    // logout() {
    //     // remove user from local storage and set current user to null
    //     localStorage.removeItem('user');
    //     this.userSubject.next(null);
    //     this.router.navigate(['/account/login']);
    // }

    create(tournament: Tournament) {
        return this.http.post(`${environment.apiUrl}/tournament/add`, tournament);
    }

    getAll() {
        return this.http.get<Tournament[]>(`${environment.apiUrl}/tournament`);
    }

    getById(id: string) {
        return this.http.get<Tournament>(`${environment.apiUrl}/tournament/${id}`);
    }

    // update(id, params) {
    //     return this.http.put(`${environment.apiUrl}/tournament/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue.id) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('user', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/tournament/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                // if (id == this.userValue.id) {
                //     this.logout();
                // }
                return x;
            }));
    }
}