import {Component} from '@angular/core';

@Component({
  selector: 'guacamole-rd-ts-status-bar',
  template: `<ng-content
    select="guacamole-rd-ts-status-bar-item"
  ></ng-content>`,
  host: {
    class: 'guacamole-rd-ts-status-bar',
  },
})
export class StatusBarComponent {}
