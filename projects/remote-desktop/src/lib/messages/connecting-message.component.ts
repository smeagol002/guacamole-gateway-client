import {Component} from '@angular/core';

@Component({
    selector: 'guacamole-rd-ts-connecting-message',
    host: { class: 'guacamole-rd-ts-message'},
    template: `
        <ng-content></ng-content>
    `
})
export class ConnectingMessageComponent {
}
