import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {switchMap, take, tap} from 'rxjs/operators';
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {
	headers:any;
	user: any;

  constructor(private http: HttpHeaders, private auth: AuthService) { }

 getHeaders(){
	this.auth.token.pipe(take(1)).subscribe(results => this.user = results);
	
    return this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.user}`,
    });
  }

}
