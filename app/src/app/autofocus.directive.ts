import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngxAutofocus]'
})
export class AutofocusDirective {

  constructor(private el: ElementRef) {
  }
 
  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

}
