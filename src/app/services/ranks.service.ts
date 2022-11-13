import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRanks} from "../models/ranks";

@Injectable({
  providedIn: 'root'
})
export class RanksService {


  constructor(private http: HttpClient) {
  }

  getRanks(): Observable<IRanks[]> {
    return this.http.get<IRanks[]>('http://127.0.0.1:8000/api/v1/ranks')
  }

  getRank(rankID: number): Observable<IRanks> {
    return this.http.get<IRanks>(`http://127.0.0.1:8000/api/v1/ranks/${rankID}`)
  }

  changeName(rankID: number, name: string, queue: number) {
    const body = {"rank_name": name, "queue": queue}
    return this.http.put(`http://127.0.0.1:8000/api/v1/ranks/${rankID}`, body).subscribe(data => console.log(data))
  }

}
