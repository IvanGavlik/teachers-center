import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

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
export class TextAnalysisComponent {

  response: any = '';
  progress: any = '';
  showLoading: boolean = false;

  onSubmit(contactForm: any) {}

}
