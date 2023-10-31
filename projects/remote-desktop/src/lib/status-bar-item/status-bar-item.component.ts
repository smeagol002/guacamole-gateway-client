import {Component} from '@angular/core';

/**
 * Status bar item component
 */
@Component({
  selector: 'guacamole-gateway-client-status-bar-item',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'guacamole-gateway-client-status-bar-item',
  },
})
export class StatusBarItemComponent {}
