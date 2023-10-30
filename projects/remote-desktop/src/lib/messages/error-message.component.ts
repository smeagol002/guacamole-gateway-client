import {Component} from '@angular/core';

@Component({
    selector: 'guacamole-rd-ts-error-message',
    host: { class: 'guacamole-rd-ts-message'},
    template: `
        <ng-content></ng-content>
    `
})
export class ErrorMessageComponent {
}
