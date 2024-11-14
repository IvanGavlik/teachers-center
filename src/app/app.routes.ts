import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LayoutComponent } from './layout/layout.component';
import { ToolsComponent } from './tools/tools.component';


export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'tools', component: LayoutComponent,
    children: [
      { path: '', component: ToolsComponent },
    ],
  },
  ];
