import { Nullable, isNull } from 'option-t/lib/Nullable';
import { isUndefined } from 'option-t/lib/Undefinable/Undefinable';
import { Extractor } from './extractor';
import { Formatter } from './formatter';

import {
  Range,
  Position,
  Selection,
  TextEditor,
  window as vscodeWindow,
  workspace as vscodeWorkspace
} from 'vscode';

let extractor: Nullable<Extractor> = new Extractor();
let formatter: Nullable<Formatter> = new Formatter();

/**
 * 
 * @param editor 
 */
const createSelectionReplacer = (editor: TextEditor) => (selection: Position | Range | Selection, content: string) => {
  editor.edit((builder) => {
    builder.replace(selection, content);
  });
};

/**
 * 
 */
export async function runTwClassesExtractor(): Promise<{ dispose: () => void }> {
  const editor = vscodeWindow.activeTextEditor;
  if (isUndefined(editor) || isNull(extractor) || isNull(formatter)) {
    return { dispose };
  }

  const { document, selection } = editor;
  const htmlOriginal = document.getText(selection);

  const {
    selectors: selectorsToTwClassesMap,
    html: htmlTwClassesFree
  } = await extractor.extractClasses(htmlOriginal);
  const extractedCssRules = formatter.convertClassesToTailwindApplyAtRule(selectorsToTwClassesMap);

  vscodeWindow.showTextDocument(
    await vscodeWorkspace.openTextDocument({
      content: formatter.format(extractedCssRules),
      language: 'pcss',
    }),
  );

  if (typeof htmlTwClassesFree === "string") {
    const replacer = createSelectionReplacer(editor);
    replacer(selection, htmlTwClassesFree);
  }

  return {
    dispose,
  };
}

function dispose(): void {
  extractor = null;
  formatter = null;
}
