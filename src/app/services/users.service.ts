import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../models/users";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) {
  }

  getUsers(sort_type: string): Observable<IUser[]> {

    return this.http.get<IUser[]>(`http://127.0.0.1:8000/api/v1/users/?sort_rank=${sort_type}`);
  }

  createUser(name: string, rankID: number) {
    const body = {"name": name, "rank": rankID}
    return this.http.post<any>('http://127.0.0.1:8000/api/v1/users/', body).subscribe(data => console.log(data))
  }

  getUser(pk: number): Observable<IUser> {
    return this.http.get<IUser>(`http://127.0.0.1:8000/api/v1/users/${pk}`)
  }

  deleteUser(pk: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/v1/users/${pk}`)
  }

  changeRank(pk: number, rankID: number, name: string) {

    const body = {"name": name, "rank": rankID}
    this.http.put(`http://127.0.0.1:8000/api/v1/users/${pk}`, body).subscribe(data => console.log(data))
  }
}
