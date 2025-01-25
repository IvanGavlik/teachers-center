import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, forkJoin, mergeMap} from 'rxjs';
import { Lecture } from '../lecture-generator/lecture';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  // private baseUrl = 'https://teachers-center-be.onrender.com';
private baseUrl = 'http://localhost:3000';


   constructor(private http: HttpClient) {}

  // Method to call /generate-lecture/lecture-text
  generateLectureText(queryParams: HttpParams): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-lecture/lecture-text`, {}, {
      params: queryParams,
      responseType: 'text'
    });
  }

  // Method to call /generate-lecture/text-questions
  generateTextQuestions(lectureTextResponse: string, queryParams: HttpParams): Observable<any> {
     return this.http.post(`${this.baseUrl}/generate-lecture/text-questions`,
      { text: lectureTextResponse }, // Body includes the lectureTextResponse
      { params: queryParams, responseType: 'text' }
      );
  }

  // Method to call /generate-lecture/grammar-explanation
  generateGrammarExplanation(
    lectureTextResponse: string, queryParams: HttpParams
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-lecture/grammar-explanation`,
      { text: lectureTextResponse }, // Body includes the lectureTextResponse
      { params: queryParams, responseType: 'text' }
      );
  }

  generateGrammarExercises(
    lectureTextResponse: string, queryParams: HttpParams
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-lecture/grammar-exercises`,
      { text: lectureTextResponse }, // Body includes the lectureTextResponse
      { params: queryParams, responseType: 'text' }
    );
  }

  generateHomework(
    lectureTextResponse: string, queryParams: HttpParams
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-lecture/homework`,
      { text: lectureTextResponse }, // Body includes the lectureTextResponse
      { params: queryParams, responseType: 'text' }
    );
  }

  generateDiscussion(
    lectureTextResponse: string, queryParams: HttpParams
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-lecture/discussion`,
      { text: lectureTextResponse }, // Body includes the lectureTextResponse
      { params: queryParams, responseType: 'text' }
    );
  }

  generateDictionary(
    lectureTextResponse: string, queryParams: HttpParams
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-lecture/dictionary`,
      { text: lectureTextResponse }, // Body includes the lectureTextResponse
      { params: queryParams, responseType: 'text' }
    );
  }

  generatePhrases(
    lectureTextResponse: string, queryParams: HttpParams
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-lecture/phrases`,
      { text: lectureTextResponse }, // Body includes the lectureTextResponse
      { params: queryParams, responseType: 'text' }
    );
  }

}
