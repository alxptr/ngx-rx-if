import { NgxRxIfDemoPage } from './app.po';

describe('ngx-rx-if-demo App', () => {
  let page: NgxRxIfDemoPage;

  beforeEach(() => {
    page = new NgxRxIfDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
