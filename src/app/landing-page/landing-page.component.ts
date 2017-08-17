import { Component } from '@angular/core';

import { ToolbarService } from '../layout/toolbar/toolbar.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(toolbarService: ToolbarService) {
    toolbarService.title = 'Deine News';
  }
}
