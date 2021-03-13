// @ts-ignore
import htmlTags = require('html-tags');
import { createHash } from 'crypto';
import path = require('path');
import fs = require('fs');

const { parseTailwindCss: _parseTailwindCss} = require('css-to-tailwind/lib/parsers');
const _normalizer = require('css-to-tailwind/lib/normalizer');
const memoizeOne = require('memoize-one/dist/memoize-one.cjs.js');

const parseTailwindCss = memoizeOne(_parseTailwindCss);
const normalizer = memoizeOne(_normalizer);
const { getOptions, setOptions } = require('css-to-tailwind/lib/options');

const htmlTagList = new Set(htmlTags);
let twClassList = new Set();

/**
 * Checks for custom tag name
 * @param tag
 */
export const isCustomTag = (tag: string): boolean => {
  return !htmlTagList.has(tag);
};

/**
 * Checks if className belongs to Tailwind classes
 *
 * @param {string} className
 * @return {boolean}
 */
const isTwClass = (className: string): boolean => {
  return className.split(':').some((cn: string) => twClassList.has(cn));
};

/**
 * Loads Tailwind classes list
 */
export const loadTwCss = async (): Promise<void> => {
  if (twClassList.size > 0) {
    return;
  }

  const twCssContent = fs.readFileSync(
    path.resolve(__dirname, '../../node_modules/tailwindcss/dist/tailwind.min.css'),
    'utf8'
  );
  const config = require('tailwindcss/resolveConfig')({});
  setOptions({ TAILWIND_CONFIG: config });

  const parsed = normalizer(await parseTailwindCss(twCssContent), getOptions());

  twClassList = new Set(Object.keys(parsed.base)
    .map((key) => key.replace('.', ''))
  );
};

/**
 * Separates tw classes from specified class list string into 2 arrays
 *
 * @param classNames
 * @return {Array<string[]>}
 */
export const separateTwClasses = (classNames: string): [string[], string[]] => {
  const classNamesArray = classNames.split(' ');
  const [twClassesArray, nonTwClassesArray] = classNamesArray
    .reduce<[string[], string[]]>((result, current: string) => {
      const add = isTwClass(current)
        ? [[current], []]
        : [[], [current]];
      return [
        [...result[0], ...add[0]],
        [...result[1], ...add[1]]
      ];
    }, [[], []]);

  return [twClassesArray, nonTwClassesArray];
};

/**
 * Calcs md5 hash string
 *
 * @param {string} str
 * @return {string}
 */
export const md5 = (str: string): string => createHash('md5').update(str).digest('hex');



