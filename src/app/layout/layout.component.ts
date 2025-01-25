import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import {KeyService} from '../key.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private key: KeyService) {
    this.key.fetchKey().subscribe({
      next: (data) => console.info(' key:'),
      error: (err) => { console.error('Error ping on BE:', err)},
      // TODO alert("App not working please try latter");
    });
  }
}
