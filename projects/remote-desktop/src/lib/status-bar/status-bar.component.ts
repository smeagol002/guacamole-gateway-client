import {Component} from '@angular/core';

@Component({
  selector: 'guacamole-gateway-client-status-bar',
  template: `<ng-content
    select="guacamole-gateway-client-status-bar-item"
  ></ng-content>`,
  host: {
    class: 'guacamole-gateway-client-status-bar',
  },
})
export class StatusBarComponent {}
