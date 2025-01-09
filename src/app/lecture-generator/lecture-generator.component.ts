import { Component, ViewChild, OnInit } from '@angular/core';
import { OpenaiService } from '../openai/openai.service';
import { MarkdownService } from 'ngx-markdown';
import { Lecture } from './lecture';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import {KeyService} from '../key.service';
import {HttpParams} from '@angular/common/http';
import {forkJoin, scan} from 'rxjs';

@Component({
  selector: 'app-lecture-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, CountdownModule],
  templateUrl: './lecture-generator.component.html',
  styleUrl: './lecture-generator.component.css'
})
export class LectureGeneratorComponent  implements OnInit {

  // TODO improve instractions how to deploy to production

  response: any = '';
  progress: any = '';
  showLoading: boolean = false;

 // @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  constructor(private key: KeyService, private openaiService: OpenaiService, private markdownService: MarkdownService) {}

  ngOnInit(): void {
     this.showLoading = false;
     this.response = '';

     this.key.fetchKey().subscribe({
      next: (data) => console.info(' key:', data),
      error: (err) => console.error('Error fetching key:', err),
    });;
  }

  onSubmit(contactForm: any) {
      this.sendPrompt(new Lecture(
              !contactForm.value.language ?  'German' : contactForm.value.language.trim(),
              !contactForm.value.languageLevel ?  'A1' : contactForm.value.languageLevel.trim(),
              !contactForm.value.vocabularyTopic ? 'Family' : contactForm.value.vocabularyTopic.trim(),
              !contactForm.value.vocabularySize ? 0 : contactForm.value.vocabularySize,
              !contactForm.value.vocabularyQuestions ? 0 : contactForm.value.vocabularyQuestions,
              !contactForm.value.grammarTopic ? 'Prezent' : contactForm.value.grammarTopic.trim(),
              !contactForm.value.grammarExamples ? 0 : contactForm.value.grammarExamples,
              !contactForm.value.grammarExercises ? 0 : contactForm.value.grammarExercises,
              !contactForm.value.homework  ? false : contactForm.value.homework,
              !contactForm.value.discussion   ? false : contactForm.value.discussion,
              !contactForm.value.dictionary   ? false : contactForm.value.dictionary,
             !contactForm.value.commonPhrases   ? false : contactForm.value.commonPhrases
        ));
  }

  sendPrompt(lecture: Lecture) {

  //  this.countdown.begin();

    this.showLoading = true;
    this.response = '';

//    this.openaiService.getChatCompletion(lecture);

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

    let resultTemp = '';
    this.openaiService.generateLectureText(queryParams).subscribe((text: any) => {
      // TODO MAKE INTO TO fe THAT  THAT i HAVE WORK IN PROGRESS AND ONE PART IS ONE this.progress is not working
      console.log("T is generated " + text );
      resultTemp = text;
      forkJoin(
        [
          this.openaiService.generateTextQuestions(text,queryParams).pipe(scan((el) => {  console.log("Q is generated"); this.progress += "Text is generated" })),
          this.openaiService.generateGrammarExplanation(text, queryParams).pipe(scan((el) => { this.progress += "Grammar Ex is generated" })),
          this.openaiService.generateGrammarExercises(text, queryParams).pipe(scan((el) => { this.progress += "Text is generated" })),
          // TODO here decided should I call endpoint
          this.openaiService.generateHomework(text, queryParams).pipe(scan((el) => { this.progress += "Text is generated" })),
          this.openaiService.generateDiscussion(text, queryParams).pipe(scan((el) => { this.progress += "Text is generated" })),
          this.openaiService.generateDictionary(text, queryParams).pipe(scan((el) => { this.progress += "Text is generated" })),
          this.openaiService.generatePhrases(text, queryParams).pipe(scan((el) => { this.progress += "Text is generated" })),
        ])
        .subscribe((result : [any, any, any, any, any, any, any]) => {
          resultTemp += result[0];
          resultTemp += result[1];
          resultTemp += result[2];
          resultTemp += result[3];
          resultTemp += result[4];
          resultTemp += result[5];
          resultTemp += result[6];
          this.response =  this.markdownService.parse(resultTemp)  as string;
          this.showLoading = false;
        });
    });


/*    this.openaiService.getChatCompletion(lecture)
      .subscribe(
        (res) => {
           this.response =  this.markdownService.parse(res)  as string;
        },
        (err) => {
              this.showLoading = false;
          console.error('Error:', err);
        },
        () =>  {
                        this.showLoading = false;
          }
      );*/

//    this.countdown.stop();

    }

  handleEvent(event: any) {

  }

}
