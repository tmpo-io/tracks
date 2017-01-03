import { TracksPage } from './app.po';

describe('tracks App', function() {
  let page: TracksPage;

  beforeEach(() => {
    page = new TracksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
