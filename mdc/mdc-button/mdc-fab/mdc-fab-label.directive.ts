import { Directive } from '@angular/core';

@Directive({
  selector: '[mdc-fab-label]',
  host: {
      'class': 'label'
  }
})
export class MdcFabLabelDirective {
}
