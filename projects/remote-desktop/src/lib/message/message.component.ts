import {Component, Input} from '@angular/core';

/**
 * Message component for showing error or success messages for when the connection
 * state changes
 */
@Component({
  selector: 'guacamole-gateway-client-message',
  template: `
    <div class="guacamole-gateway-client-message">
      <div
        class="guacamole-gateway-client-message-title"
        [class.guacamole-gateway-client-message-title-success]="type === 'success'"
        [class.guacamole-gateway-client-message-title-error]="type === 'error'"
      >
        {{ title | uppercase }}
      </div>
      <div class="guacamole-gateway-client-message-body">
        <p>{{ message }}</p>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class MessageComponent {
  /**
   * Title of the message to display
   */
  @Input()
  public title: string = '';

  /**
   * Content of the message to display
   */
  @Input()
  public message: string = '';

  /**
   * Message type. Can be 'success' or 'error'
   */
  @Input()
  public type = 'success';
}
