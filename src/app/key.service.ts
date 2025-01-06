import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private endpointUrl = 'https://teachers-center-be.onrender.com/key';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the key from the backend.
   * @returns Observable with the response.
   */
  fetchKey(): Observable<any> {
    return this.http.get(this.endpointUrl, { responseType: 'text' });
  }
}
