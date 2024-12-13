import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

   private apiUrl = 'https://api.openai.com/v1/chat/completions';
   private apiKey = 'some key'; // Replace with your OpenAI API key

   constructor(private http: HttpClient) { }

   getChatCompletionWithContext(systemPrompt: string, userPrompt: string): Observable<any> {
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
