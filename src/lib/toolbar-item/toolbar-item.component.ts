import {Component} from '@angular/core';

/**
 * Toolbar item inside the toolbar
 */
@Component({
  selector: 'guacamole-rd-ts-toolbar-item',
  template: `<li class="guacamole-rd-ts-toolbar-item">
    <ng-content></ng-content>
  </li>`,
})
export class ToolbarItemComponent {}
