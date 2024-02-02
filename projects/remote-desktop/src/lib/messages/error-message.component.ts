import {Component} from '@angular/core';

@Component({
    selector: 'guacamole-gateway-client-error-message',
    host: { class: 'guacamole-gateway-client-message'},
    template: `
        <ng-content></ng-content>
    `
})
export class ErrorMessageComponent {
}
