import { ResolvedTheme } from "./theme/types";

export type ResolvedCSSConfig = {
  theme: ResolvedTheme;
};

export type Rule = DynamicRule | StaticRule;
export type DynamicRule = [
  RegExp,
  DynamicValidator,
  DynamicMatcher,
  SelectorRewrite?,
];
export type StaticRule = [string, CSSObject];
export type DynamicValidator = (
  groups: (string | undefined)[],
  context: DynamicContext,
) => boolean;
export type DynamicMatcher = (
  groups: (string | undefined)[],
  context: DynamicContext,
) => CSSObject;
export type SelectorRewrite = (value: string) => string;
type DynamicContext = Readonly<{
  config: ResolvedCSSConfig;
  theme: ResolvedCSSConfig["theme"];
}>;
export type CSSObject = Record<string, string | number>;
export type CSSEntries = [string, string | number][];
