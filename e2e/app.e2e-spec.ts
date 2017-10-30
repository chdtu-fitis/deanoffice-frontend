import { DeanofficeFrontendPage } from './app.po';

describe('deanoffice-frontend App', () => {
  let page: DeanofficeFrontendPage;

  beforeEach(() => {
    page = new DeanofficeFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
