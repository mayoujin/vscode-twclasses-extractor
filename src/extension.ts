// eslint-disable-next-line @typescript-eslint/class-name-casing
import { ExtensionContext, commands } from 'vscode';
import { runTwClassesExtractor } from './commands';

export async function activate(context: ExtensionContext) {
  context.subscriptions.push(commands.registerCommand(
    'extension.twclassesextractor.run',
    async () => {
      await runTwClassesExtractor();
    },
  ));
}
