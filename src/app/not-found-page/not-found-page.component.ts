import { Component } from '@angular/core';

import { ToolbarService } from '../layout/toolbar/toolbar.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent {

  constructor(toolbarService: ToolbarService) {
    toolbarService.title = 'Fehler 404';
  }
}
