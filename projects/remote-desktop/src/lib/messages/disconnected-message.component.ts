import {Component} from '@angular/core';

@Component({
    selector: 'guacamole-rd-ts-disconnected-message',
    host: { class: 'guacamole-rd-ts-message'},
    template: `
        <ng-content></ng-content>
    `
})
export class DisconnectedMessageComponent {
}
