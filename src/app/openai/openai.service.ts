import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { OnInit } from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import { Lecture } from '../lecture-generator/lecture';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

   private baseUrl = 'https://teachers-center-be.onrender.com:3000';
//  private baseUrl = 'http://teachers-center-be.onrender.com/';


   constructor(private http: HttpClient) {}

   getChatCompletion(lecture: Lecture): Observable<any> {
//    return this.http.get(this.apiUrl + lecture.url(),  { responseType: 'text' });

     const queryParams = new HttpParams()
       .set('language', lecture.language)
       .set('language-level', lecture.languageLevel)
       .set('topic', lecture.vocabularyTopic)
       .set('topic-size', lecture.vocabularySize.toString())
       .set('topic-questions', lecture.vocabularyQuestions.toString())
       .set('grammar', lecture.grammarTopic)
       .set('grammar-examples', lecture.grammarExamples.toString())
       .set('grammar-exercises', lecture.grammarExercises.toString())
       .set('homework', lecture.homework.toString())
       .set('discussion', lecture.discussion.toString())
       .set('dictionary', lecture.dictionary.toString())
       .set('common-phrases', lecture.commonPhrases.toString());

     return this.generateLectureText(queryParams).pipe(
       switchMap((lectureTextResponse) =>
         this.generateTextQuestions(lectureTextResponse, queryParams).pipe(
           switchMap(() =>
             this.generateGrammarExplanation(lectureTextResponse, queryParams)
           )
         )
       )
     );

  }

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

}
