import { VigenerePage } from './app.po';

describe('vigenere App', () => {
  let page: VigenerePage;

  beforeEach(() => {
    page = new VigenerePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
