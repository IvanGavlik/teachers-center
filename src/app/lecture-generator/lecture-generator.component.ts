import { Component } from '@angular/core';
import { OpenaiService } from '../openai/openai.service';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-lecture-generator',
  standalone: true,
  imports: [],
  templateUrl: './lecture-generator.component.html',
  styleUrl: './lecture-generator.component.css'
})
export class LectureGeneratorComponent {

  response: any = '## test';

  constructor(private openaiService: OpenaiService, private markdownService: MarkdownService) {
       this.sendPrompt();
    }

    sendPrompt() {
      let language = 'German'
      let languageLevel = 'A2';

      let vocabularyTopic = 'Football';
      let vocabularySize = '150';
      let vocabularyQuestions = 7;

      let grammarTopic = 'Present';
      let grammarExamples = '5';
      let grammarExercises = 7;


      let system = 'You are foreign language teacher and you have to prepare materials for you next class. You will be provided with points, and your task is to used them to create lecture. Lecture is for ' + language + ' language ' + languageLevel + ' level.';
      this.openaiService.getChatCompletionWithContext(system,
        ' Generate text on topic ' + vocabularyTopic + ' Size of the text around ' + vocabularySize + ' words and algo generate  ' + vocabularyQuestions + ' on this text, Grammar topic for this lecture is ' + grammarTopic +
         ' Explain it on  requested level create '+ grammarExamples +'examples and '+ grammarExercises + ' taskf for excercises.'
        )
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
