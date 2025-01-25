import { Component, ViewChild, OnInit } from '@angular/core';
import { OpenaiService } from '../openai/openai.service';
import { MarkdownService } from 'ngx-markdown';
import { Lecture } from './lecture';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import {KeyService} from '../key.service';
import {HttpParams} from '@angular/common/http';

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


    let allTemp = "";

    this.openaiService.generateLectureText(queryParams).subscribe((text: any) => {
      allTemp = allTemp + this.markdownService.parse(text);

      this.openaiService.generateTextQuestions(text,queryParams).subscribe((textQuestions) => {
        allTemp = allTemp + this.markdownService.parse(textQuestions);

        this.openaiService.generateGrammarExplanation(text,queryParams).subscribe((grammarExplanation) => {
          allTemp = allTemp + this.markdownService.parse(grammarExplanation);

          this.openaiService.generateGrammarExercises(text,queryParams).subscribe((grammarExercises) => {
            allTemp = allTemp + this.markdownService.parse(grammarExercises);

            this.openaiService.generateHomework(text,queryParams).subscribe((homework) => {
              allTemp = allTemp + this.markdownService.parse(homework);

              this.openaiService.generateDiscussion(text,queryParams).subscribe((discussion) => {
                allTemp = allTemp + this.markdownService.parse(discussion)

                this.openaiService.generateDictionary(text,queryParams).subscribe((dictionary) => {
                  allTemp = allTemp + this.markdownService.parse(dictionary);

                  this.openaiService.generatePhrases(text,queryParams)
                    .subscribe(
                    (res) => {
                      allTemp = allTemp + this.markdownService.parse(res) ;
                      console.log(allTemp);
                      this.response =  allTemp;

                    },
                    (err) => {
                      this.showLoading = false;
                      this.response = err;
                      console.error('Error:', err);
                    },
                    () =>  {
                      this.showLoading = false;
                    }
                  );
                });
              });
            });
          });
        });
      });
    });



    // TODO create list of the tools for the recording
    // todo reponse how to make line break and do I need title
    // TODO MODEL FOR GRAMMAR TASK NO NEED TO CREATE EXPLANATION
    // todo model no need to give instructions and conclusions
    /*

    Dear Students,

For your homework this week, we will practice greetings and the Present Simple tense. Please complete all tasks.

Conclusion:

Remember to practice using greetings and the present simple verb tense when speaking. This will help you communicate effectively and confidently in English. Don’t forget to smile when you greet others; it makes a big difference! Keep practicing, and let's say "hello" to new learning opportunities!\

     */


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
