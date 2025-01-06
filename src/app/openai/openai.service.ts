import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

   private apiUrl = 'https://api.openai.com/v1/chat/completions';
   private apiKey = ''; // Replace with your OpenAI API key

   constructor(private http: HttpClient) {

     const httpOptions : Object = {
       headers: new HttpHeaders({
         'Accept': 'text/plain',
         'Content-Type': 'text/plain; charset=utf-8'
       }),
       responseType: 'text'
     };

     this.http.get<any>('https://thawing-cove-37000-15e18dd2b745.herokuapp.com/key', httpOptions)
      .subscribe((res: any) => {
        console.log('res ' + res);
        this.apiKey = res;
      });
   }

   getChatCompletionWithContext(systemPrompt: string, userPrompt: string): Observable<any> {
     console.log('key ' + this.apiKey);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
      temperature: 1,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

   getChatCompletion(userPrompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: userPrompt }],
      temperature: 1,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

}
