import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService  implements OnInit {

   private apiUrl = 'https://api.openai.com/v1/chat/completions';
   private apiKey = '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'; // Replace with your OpenAI API key

   constructor(private http: HttpClient, private cs: ConfigService) {}

    ngOnInit(): void {
        this.cs.getConfig().subscribe(
          (response: any) => {
            console.log('Config File Data:', response);
             this.apiKey = response;
          },
          (error: any) => {
            console.error('Error fetching file:', error);
          }
        );
      }

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
