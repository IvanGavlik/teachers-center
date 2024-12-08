import { Component, ViewChild } from '@angular/core';
import { OpenaiService } from '../openai/openai.service';
import { MarkdownService } from 'ngx-markdown';
import { Lecture } from './lecture';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lecture-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lecture-generator.component.html',
  styleUrl: './lecture-generator.component.css'
})
export class LectureGeneratorComponent {

  response: any = 'Placeholder for generated lecture content';

  constructor(private openaiService: OpenaiService, private markdownService: MarkdownService) {}

  onSubmit(contactForm: any) {
      this.sendPrompt(new Lecture(
              contactForm.value.language,
              contactForm.value.languageLevel,
              contactForm.value.vocabularyTopic,
              contactForm.value.vocabularySize,
              contactForm.value.vocabularyQuestions,
              contactForm.value.grammarTopic,
              contactForm.value.grammarExamples,
              contactForm.value.grammarExercises,
              contactForm.value.homework,
              contactForm.value.discussion,
              contactForm.value.dictionary,
             contactForm.value.commonPhrases
        ));
  }

  sendPrompt(lecture: Lecture) {

     console.log(lecture.system());
     console.warn(lecture.lecture());

    this.openaiService.getChatCompletionWithContext(lecture.system(),lecture.lecture())
      .subscribe(
        (res) => {
          let newStr = res.choices[0].message.content;
           this.response = this.markdownService.parse(newStr)  as string;
        },
        (err) => {
          console.error('Error:', err);
        },
        () =>  {}
      );


    }

}
