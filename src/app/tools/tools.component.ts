import { Component } from '@angular/core';
import { LectureGeneratorComponent } from '../lecture-generator/lecture-generator.component';
import {TextAnalysisComponent} from '../text-analysis/text-analysis.component';
import {AudioAnalysisComponent} from '../audio-analysis/audio-analysis.component';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [LectureGeneratorComponent, TextAnalysisComponent, AudioAnalysisComponent],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent {

}
