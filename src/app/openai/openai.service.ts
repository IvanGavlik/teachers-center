import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { OnInit } from '@angular/core';
import {Observable, forkJoin, mergeMap} from 'rxjs';
import { Lecture } from '../lecture-generator/lecture';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private baseUrl = 'https://teachers-center-be.onrender.com';
//  private baseUrl = 'http://localhost:3000';


   constructor(private http: HttpClient) {}

   getChatCompletion(lecture: Lecture) {
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
/*
     return this.generateLectureText(queryParams)
                                        .pipe(
         switchMap((lectureTextResponse) =>
             this.generateTextQuestions(lectureTextResponse, queryParams)
       .pipe(switchMap(() => this.generateGrammarExplanation(lectureTextResponse, queryParams)))
       )
     );
*/
     var obs = new Observable((observer: any) => {
       observer.next("get text");
       observer.complete();
     })



     let obsVocabulary = new Observable((observer: any) => {
       observer.next("get vocabulary");
       observer.complete();
     });

     let obsGrammar = new Observable((observer: any) => {
       observer.next("get grammar explanation");
       observer.complete();
     });

     obs.subscribe((text: any) => {
       console.log("I have " + text);
       forkJoin(
         [obsVocabulary, obsGrammar]
       )
         .subscribe((result : [any, any]) => {
           console.log(result);
         });
     });

     let result = '';
     this.generateLectureText(queryParams).subscribe((text: any) => {
       result = text;
       forkJoin(
         [
           this.generateTextQuestions(text,queryParams),
           this.generateGrammarExplanation(text, queryParams)
         ])
         .subscribe((response : [any, any]) => {
           result += response[0];
           result += response[1];
            console.log("final " + result);
         });
     });


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
