import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private _http: HttpClient) { }

  // load all the groups
  public groups(){
    return this._http.get(`http://localhost:8080/group/all`);
  }
}
