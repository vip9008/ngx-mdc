import { Directive } from '@angular/core';

@Directive({
  standalone: false,
  selector: '[mdc-fab-label]',
  host: {
      'class': 'label'
  }
})
export class MdcFabLabelDirective {
}
