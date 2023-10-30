import {Component, Input} from '@angular/core';

/**
 * Message component for showing error or success messages for when the connection
 * state changes
 */
@Component({
  selector: 'guacamole-rd-ts-message',
  template: `
    <div class="guacamole-rd-ts-message">
      <div
        class="guacamole-rd-ts-message-title"
        [class.guacamole-rd-ts-message-title-success]="type === 'success'"
        [class.guacamole-rd-ts-message-title-error]="type === 'error'"
      >
        {{ title | uppercase }}
      </div>
      <div class="guacamole-rd-ts-message-body">
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
