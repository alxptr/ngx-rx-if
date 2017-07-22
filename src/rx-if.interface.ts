import { Type } from '@angular/core';

export interface IElseMessageComponent {
  ctx: any;
}

export interface IElseMessageComponentCtor extends Type<any>, IElseMessageComponent {
}

export interface RxIfConfig {
  bindTo: string;
  elseMsg: string;
  elseMsgCmp: IElseMessageComponentCtor;
  elseMsgCmpCtx: any;
}
