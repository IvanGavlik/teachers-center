import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../lecture-generator/lecture';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

   private apiUrl = 'https://thawing-cove-37000-15e18dd2b745.herokuapp.com';
   private apiKey = ''; // Replace with your OpenAI API key

   constructor(private http: HttpClient) {}

   getChatCompletion(lecture: Lecture): Observable<any> {
    return this.http.get(this.apiUrl + lecture.url(),  { responseType: 'text' });
  }

}
