import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LocaleService, UiLocale } from '../shared/i18n';
import { HeaderService, HeaderTemplate } from './header.service';
import { HeaderState } from "./header-state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  public header$: Observable<HeaderState>;
  public HeaderTeamplate = HeaderTemplate;
  public locale: UiLocale;
  constructor(
    private headerService: HeaderService,
    private localeService: LocaleService
  ) {
    this.locale = this.localeService.currentUiLocale();
    this.header$ = this.headerService.getHeaderState();
  }

}
