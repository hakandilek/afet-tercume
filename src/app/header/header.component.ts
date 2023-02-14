import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LanguageState } from '../language/language-state';

import { HeaderService, HeaderState, HeaderTemplate } from '../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  public header$: Observable<HeaderState>;
  public HeaderTeamplate = HeaderTemplate;
  constructor(
    private store: Store<LanguageState>,
    private headerService: HeaderService
  ) {
    this.header$ = this.headerService.getHeaderState();
  }

}
