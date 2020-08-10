import { Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core'
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public url = 'http://localhost:3000/users/';
    constructor(private http: HttpClient) { }

    getUsers() : Observable<User[]> {
        return this.http.get<User[]>(this.url)
    }

    getUser(id: string) : Observable<User> {
        return this.http.get<User>(this.url+`?id=${id}`)
    }

    addUser(user: User) : Observable<User> {
        return this.http.post<User>(this.url, user);
    }

    updateUser(id: string, user: User) : Observable<User> {
        return this.http.patch<User>(this.url+`?id=${id}`, user);
    }

    deleteUser(id: string) : Observable<User> {
        return this.http.delete<User>(this.url+`?id=${id}`);
    }

}