// @ts-check
import { format as sourceFormat } from 'prettier';
import { SelectorsList } from './extractor';
export class Formatter {
  removeDuplicatesClasses(selectors: SelectorsList): SelectorsList {
    return selectors;
  }

  convertClassesToTailwindApplyAtRule(selectors: SelectorsList): string {
    return Object.entries(selectors).map(([selector, data]) => {
      return `${selector} {
        @apply ${data};
      }`;
    }).join("\n");
  }

  format(source: string): string {
    return sourceFormat(source, { parser: 'css' });
  }

  formatCss(source: string) {
    return sourceFormat(source, { parser: 'css' });
  }
}
