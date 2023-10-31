import {Component} from '@angular/core';

@Component({
    selector: 'guacamole-gateway-client-connecting-message',
    host: { class: 'guacamole-gateway-client-message'},
    template: `
        <ng-content></ng-content>
    `
})
export class ConnectingMessageComponent {
}
