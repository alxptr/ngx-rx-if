import { Type } from '@angular/core';

export interface IRxIfFallbackMessageComponent {
  ctx: any;
}

export interface IRxIfFallbackMessageComponentCtor extends Type<any>, IRxIfFallbackMessageComponent {
}

export interface RxIfConfig {
  storePath: string;
  fallbackMessageCmp: IRxIfFallbackMessageComponentCtor;
  fallbackMessageCmpCtx: any;
}
