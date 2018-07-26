import {Directive, EventEmitter, OnInit, Output, Input, SimpleChange} from '@angular/core';

@Directive({
  selector: '[nsOncreate]'
})
export class OncreateDirective implements OnInit {

  @Output() nsOncreate: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.nsOncreate.emit('dummy');
  }

}
