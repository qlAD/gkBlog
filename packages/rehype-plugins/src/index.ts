import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";

import withCodeAttributes from "./withCodeAttributes";
import withInlineHighlights from "./withInlineHighlights";

import type { PluggableList } from "unified";

const plugins: PluggableList = [
  rehypePrismPlus,
  rehypeKatex,
  withInlineHighlights,
  withCodeAttributes,
];

export default plugins;
