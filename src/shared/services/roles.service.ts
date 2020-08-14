import { Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core'
import { Role } from 'src/shared/models/role';

@Injectable({
    providedIn: 'root'
})

export class RolesService {
    public url = 'http://localhost:3000/roles/';
    constructor(private http: HttpClient) { }

    getRoles() : Observable<Role[]> {
        return this.http.get<Role[]>(this.url)
    }


}