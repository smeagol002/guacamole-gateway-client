import {Component} from '@angular/core';

/**
 * Toolbar item inside the toolbar
 */
@Component({
  selector: 'guacamole-gateway-client-toolbar-item',
  template: `<li class="guacamole-gateway-client-toolbar-item">
    <ng-content></ng-content>
  </li>`,
})
export class ToolbarItemComponent {}
