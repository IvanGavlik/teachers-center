import { Component } from '@angular/core';
import { LectureGeneratorComponent } from '../lecture-generator/lecture-generator.component';
import {TextAnalysisComponent} from '../text-analysis/text-analysis.component';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [LectureGeneratorComponent, TextAnalysisComponent],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent {

}
