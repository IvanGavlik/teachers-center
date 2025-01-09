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

    let resultTemp0 = '';
    let resultTemp1 = '';
    let resultTemp2 = '';
    let resultTemp3 = '';
    let resultTemp4 = '';
    let resultTemp5 = '';
    let resultTemp6 = '';
    let allTemp = '';

    this.openaiService.generateLectureText(queryParams).subscribe((text: any) => {
      console.log("text " + text);
      allTemp = text;

      this.openaiService.generateTextQuestions(text,queryParams).subscribe((textQuestions) => {
        console.log("textQuestions " + textQuestions);
        allTemp = allTemp + textQuestions;
        this.openaiService.generateGrammarExplanation(text,queryParams).subscribe((grammarExplanation) => {
          console.log("grammarExplanation " + grammarExplanation);
          allTemp = allTemp + grammarExplanation;

          this.openaiService.generateGrammarExercises(text,queryParams).subscribe((grammarExercises) => {
            console.log("grammarExercises " + grammarExercises);
            allTemp = allTemp + grammarExercises;

            this.openaiService.generateHomework(text,queryParams).subscribe((homework) => {
              console.log("homework " + homework);
              allTemp = allTemp + homework;

              this.openaiService.generateDiscussion(text,queryParams).subscribe((discussion) => {
                console.log("discussion " + discussion);
                allTemp = allTemp + discussion;

                this.openaiService.generateDictionary(text,queryParams).subscribe((dictionary) => {
                  console.log("dictionary " + dictionary);
                  allTemp = allTemp + dictionary;

                  this.openaiService.generatePhrases(text,queryParams)
                    .subscribe(
                    (res) => {
                      console.log("Phrases " + res);
                      allTemp = allTemp + res;
                      this.response =  this.markdownService.parse(allTemp)  as string;
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

    /*
    this.openaiService.generateLectureText(queryParams).subscribe((text: any) => {
      // TODO MAKE INTO TO fe THAT  THAT i HAVE WORK IN PROGRESS AND ONE PART IS ONE this.progress is not working
      console.log("T is generated " + text );
       forkJoin(
        [
          this.openaiService.generateTextQuestions(text,queryParams),
          this.openaiService.generateGrammarExplanation(text, queryParams),
          this.openaiService.generateGrammarExercises(text, queryParams),
          // TODO here decided should I call endpoint
          this.openaiService.generateHomework(text, queryParams),
          this.openaiService.generateDiscussion(text, queryParams),
          this.openaiService.generateDictionary(text, queryParams),
          this.openaiService.generatePhrases(text, queryParams),
        ])
        .subscribe(
          (result : [any, any, any, any, any, any, any]) => {
            resultTemp0 = result[0];
            console.log('resultTemp0 ' + resultTemp0);
            resultTemp1 = result[1];
            console.log('resultTemp1 ' + resultTemp1);
            resultTemp2 = result[2];
            console.log('resultTemp2 ' + resultTemp2);
            resultTemp3 = '\\ ### Homework' + result[3];
            console.log('resultTemp3 ' + resultTemp3);
            resultTemp4 = result[4];
            console.log('resultTemp4 ' + resultTemp4);
            resultTemp5 = result[5];
            console.log('resultTemp5 ' + resultTemp5);
            resultTemp6 = result[6];
            console.log('resultTemp6 ' + resultTemp6);
        }
          ,

          (err) => {        this.response = err;  this.showLoading = false;},

          () => {
            let resultTemp =
              text +
              resultTemp0 +
              resultTemp1 +
              resultTemp2 +
              resultTemp3 +
              resultTemp4 +
              resultTemp5 +
              resultTemp6;
            this.response =  this.markdownService.parse(resultTemp)  as string;
            this.showLoading = false;

          });
    });
    */

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
