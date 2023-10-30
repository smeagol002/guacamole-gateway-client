import {Component} from '@angular/core';

/**
 * Status bar item component
 */
@Component({
  selector: 'guacamole-rd-ts-status-bar-item',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'guacamole-rd-ts-status-bar-item',
  },
})
export class StatusBarItemComponent {}
