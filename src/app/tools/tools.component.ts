import { Component } from '@angular/core';
import { LectureGeneratorComponent } from '../lecture-generator/lecture-generator.component';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [LectureGeneratorComponent],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent {

}
