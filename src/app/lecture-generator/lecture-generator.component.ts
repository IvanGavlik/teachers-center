import { Component, ViewChild } from '@angular/core';
import { OpenaiService } from '../openai/openai.service';
import { MarkdownService } from 'ngx-markdown';
import { Lecture } from './lecture';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'app-lecture-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, CountdownModule],
  templateUrl: './lecture-generator.component.html',
  styleUrl: './lecture-generator.component.css'
})
export class LectureGeneratorComponent {

  response: any = '';
  showLoading: boolean = false;

 // @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  constructor(private openaiService: OpenaiService, private markdownService: MarkdownService) {}

  onSubmit(contactForm: any) {
      this.sendPrompt(new Lecture(
              !contactForm.value.language ?  'German' : contactForm.value.language,
              !contactForm.value.languageLevel ?  'A1' : contactForm.value.languageLevel,
              !contactForm.value.vocabularyTopic ? 'Family' : contactForm.value.vocabularyTopic,
              !contactForm.value.vocabularySize ? 0 : contactForm.value.vocabularySize,
              !contactForm.value.vocabularyQuestions ? 0 : contactForm.value.vocabularyQuestions,
              !contactForm.value.grammarTopic ? 'Prezent' : contactForm.value.grammarTopic,
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

    this.openaiService.getChatCompletion(lecture)
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
      );

//    this.countdown.stop();

    }

  handleEvent(event: any) {

  }

}
