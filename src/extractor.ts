// @ts-ignore
import { Parser as HtmlParser, parseDOM, DomHandler } from 'htmlparser2';
import { md5, separateTwClasses, loadTwCss } from './utils/utils';
import cheerio = require('cheerio');

export type SelectorsList = {
  [p: string]: string
};

export class Extractor {
  async extractClasses(content: string) {
    await loadTwCss();

    const selectors: SelectorsList = {};
    const $ = cheerio.load(
      parseDOM(content, { decodeEntities: true })
    );

    $("[class]").each((_: number, element: any): any => {
      const { attribs: attrs, tagName } = element;
      const [twClasses, restClasses] = separateTwClasses(attrs.class);
      if (twClasses.length === 0) {
        return;
      }
      const twClassesString = twClasses.join(' ');
      const twClassesHash = md5(twClassesString).substr(0, 8);

      $(element).attr('class', restClasses.concat(`tw-${twClassesHash}`).join(' '));

      const matcher = [tagName].concat(`tw-${twClassesHash}`).join('.');
      selectors[matcher] = twClassesString;
    });

    $("*").each((_: number, element: any): any => {
       element['x-attribsNamespace'] = {};
       element['x-attribsPrefix'] = {};
    });

    return { selectors, html: $.root().html() };
  }
}

