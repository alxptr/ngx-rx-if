import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { RxIfConfig, IRxIfFallbackMessageComponent } from './rx-if.interface';

@Directive({
  selector: '[rxIf]'
})
export class RxIfDirective implements OnDestroy {

  private subscription: Subscription;
  private config: RxIfConfig;

  @Input()
  set rxIf(config: RxIfConfig) {
    this.config = config;
    this.ngOnDestroy();

    this.subscription = this.store
      .select(state => this.extractStatePoint(state))
      .map(Boolean)
      .distinctUntilChanged()
      .subscribe((result: boolean) => this.updateView(result));
  }

  constructor(
    private _viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private store: Store<any>,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateView(result: boolean): void {
    if (typeof result === 'undefined' || result === null) {
      return;
    }
    this._viewContainer.clear();
    if (result) {
      this._viewContainer.createEmbeddedView(this.templateRef);
    } else {
      const component = this._viewContainer.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(this.config.fallbackMessageCmp)
      );
      (component.instance as IRxIfFallbackMessageComponent).ctx = this.config.fallbackMessageCmpCtx;
    }
  }

  private extractStatePoint(state: any): any {
    return this.config.storePath
      .split('.')
      .reduce(
        (acc, key) => typeof acc === 'string' ? (state && state[acc] ? state[acc][key] : null) : (acc ? acc[key] : null)
      );
  }
}
