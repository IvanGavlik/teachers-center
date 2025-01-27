import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-audio-analysis',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './audio-analysis.component.html',
  styleUrl: './audio-analysis.component.css'
})
export class AudioAnalysisComponent implements OnInit {
  response: any = '';
  progress: any = '';
  showLoading: boolean = false;

  selectedFile: File | null = null;

  ngOnInit(): void {
    this.showLoading = false;
    this.response = '';
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(contactForm: any) {

  }

}
