import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Lecture} from '../lecture-generator/lecture';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OpenaiService} from '../openai/openai.service';
import {MarkdownService} from 'ngx-markdown';

@Component({
  selector: 'app-text-analysis',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './text-analysis.component.html',
  styleUrl: './text-analysis.component.css'
})
export class TextAnalysisComponent implements OnInit {

  response: any = '';
  progress: any = '';
  showLoading: boolean = false;

  input: any = 'TEXT';
  selectedFile: File | null = null;

  // TODO if text does not math language level simplfly if and vice versa - make text compatible with language level
  // should this be new tool
  constructor(private openaiService: OpenaiService, private markdownService: MarkdownService) {
  }

  ngOnInit(): void {
    this.showLoading = false;
    this.response = '';
    this.input = 'TEXT';
  }

  setinput(text: string) {
    this.input = text;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(contactForm: any) {

    if (!this.selectedFile && !contactForm.value.textFromForm) {
      alert('Please put text or image or text.');
      return;
    }

    if (this.input  == 'TEXT' && contactForm.value.textFromForm) {

      this.showLoading = true;
      this.response = '';

      this.openaiService.determineTextMetadata(contactForm.value.textFromForm).subscribe(response => {

        // response Expected example English,Hi, I’m Jake,91,Present Simple
        var responseMetadata = response.split(",");
        this.sendPrompt(new Lecture(
            responseMetadata[0], // language
            !contactForm.value.languageLevel ?  'A1' : contactForm.value.languageLevel.trim(),
            responseMetadata[1], // topic
            parseInt(responseMetadata[2]), // topic size
            !contactForm.value.vocabularyQuestions ? 0 : contactForm.value.vocabularyQuestions,
            responseMetadata[3], // grammar topic
            3, // grammar examples
            !contactForm.value.grammarExercises ? 0 : contactForm.value.grammarExercises,
            !contactForm.value.homework  ? false : contactForm.value.homework,
            !contactForm.value.discussion   ? false : contactForm.value.discussion,
            !contactForm.value.dictionary   ? false : contactForm.value.dictionary,
            !contactForm.value.commonPhrases   ? false : contactForm.value.commonPhrases
          ),
          contactForm.value.textFromForm
        );

      });

      return;

    }

    if(this.input  == 'IMAGE' && this.selectedFile) {

      this.showLoading = true;
      this.response = '';

      // Send file to backend
      this.openaiService.imageToText(this.selectedFile) // Assuming the backend returns plain text
        .subscribe({
          next: (textFromImage) => {

            this.openaiService.determineTextMetadata(textFromImage).subscribe(response => {

              // response Expected example English,Hi, I’m Jake,91,Present Simple
              var responseMetadata = response.split(",");
              this.sendPrompt(new Lecture(
                  responseMetadata[0], // language
                  !contactForm.value.languageLevel ?  'A1' : contactForm.value.languageLevel.trim(),
                  responseMetadata[1], // topic
                  parseInt(responseMetadata[2]), // topic size
                  !contactForm.value.vocabularyQuestions ? 0 : contactForm.value.vocabularyQuestions,
                  responseMetadata[3], // grammar topic
                  3, // grammar examples
                  !contactForm.value.grammarExercises ? 0 : contactForm.value.grammarExercises,
                  !contactForm.value.homework  ? false : contactForm.value.homework,
                  !contactForm.value.discussion   ? false : contactForm.value.discussion,
                  !contactForm.value.dictionary   ? false : contactForm.value.dictionary,
                  !contactForm.value.commonPhrases   ? false : contactForm.value.commonPhrases
                ),
                textFromImage
              );

            });

          },
          error: (error) => {
            console.error('Error uploading file:', error);
            alert('Failed to process the file. Please try again.');
          }
        });

      return;

    }

    // case image selected but I am on tab with text and vice versa
    alert('Please put text or image or text.');

  }

  sendPrompt(lecture: Lecture, text: any) {

    //  this.countdown.begin();

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


    allTemp = allTemp + this.markdownService.parse("## " +  text); // add ## to have title

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

  }

}
