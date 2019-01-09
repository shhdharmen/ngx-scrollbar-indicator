import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display \'Current Options\'', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Current Options');
  });
});
