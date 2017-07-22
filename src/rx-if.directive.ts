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

import { RxIfConfig, IElseMessageComponent } from './rx-if.interface';

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
      // We cannot use the ".select(...this.config.bindTo.split('.'))"
      .select(state => this.extractBindingFromState(state))
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
        this.componentFactoryResolver.resolveComponentFactory(this.config.elseMsgCmp)
      );
      (component.instance as IElseMessageComponent).ctx = this.config.elseMsgCmpCtx;
    }
  }

  private extractBindingFromState(state: any): any {
    return this.config.bindTo
      .split('.')
      .reduce(
        (acc, key) => typeof acc === 'string' ? (state && state[acc] ? state[acc][key] : null) : (acc ? acc[key] : null)
      );
  }
}
