import { BaseTheme, ResolvedTheme } from "./theme/types";
import { CSSDefault } from "./defaults";

export type ResolvedCSSConfig = {
  theme: ResolvedTheme;
  corePlugins: Partial<Record<CorePlugin, boolean>>;
  plugins: Rule[];
};

export type CSSConfig = Partial<{
  theme: Partial<BaseTheme & { extend: Partial<BaseTheme> }>;
  corePlugins: Partial<Record<CorePlugin, boolean>>;
  plugins: Rule[] | ((theme: ResolvedTheme) => Rule[]);
}>;

export type Rule = StaticRule | ThemeRule<any> | DirectionThemeRule;
export type StaticRule = [string, CSSEntries, RuleMeta?];
export type ThemeRule<T> = [
  string,
  Record<string, T>,
  (value: T) => CSSEntries,
  ThemeRuleMeta?,
];
export type DirectionThemeRule = [
  string,
  string[],
  Record<string, string>,
  (direction: string, value: string) => CSSEntries,
  (ThemeRuleMeta & { omitHyphen?: boolean; mandatory?: boolean })?,
];
export type RuleMeta = {
  selectorRewrite?: SelectorRewrite;
  addDefault?: CSSDefault;
  addContainer?: boolean;
  addKeyframes?: boolean;
  components?: boolean; // For user plugins
};
export type ThemeRuleMeta = RuleMeta & {
  supportsNegativeValues?: boolean;
  filterDefault?: boolean;
};
export type SelectorRewrite = (value: string) => string;
export type CSSEntries = CSSEntry[];
export type CSSEntry = [string, string];

export type CorePlugin =
  | "container"
  | "accessibility"
  | "pointerEvents"
  | "visibility"
  | "position"
  | "inset"
  | "isolation"
  | "zIndex"
  | "order"
  | "gridColumn"
  | "gridColumnStart"
  | "gridColumnEnd"
  | "gridRow"
  | "gridRowStart"
  | "gridRowEnd"
  | "float"
  | "clear"
  | "boxSizing"
  | "display"
  | "aspectRatio"
  | "height"
  | "maxHeight"
  | "minHeight"
  | "width"
  | "minWidth"
  | "maxWidth"
  | "flex"
  | "flexShrink"
  | "flexGrow"
  | "flexBasis"
  | "tableLayout"
  | "borderCollapse"
  | "transformOrigin"
  | "translate"
  | "rotate"
  | "skew"
  | "scale"
  | "transform"
  | "animation"
  | "cursor"
  | "touchAction"
  | "userSelect"
  | "resize"
  | "scrollSnapType"
  | "scrollSnapAlign"
  | "scrollSnapStop"
  | "scrollMargin"
  | "scrollPadding"
  | "listStylePosition"
  | "listStyleType"
  | "appearance"
  | "columns"
  | "breakBefore"
  | "breakInside"
  | "breakAfter"
  | "gridAutoColumns"
  | "gridAutoFlow"
  | "gridAutoRows"
  | "gridTemplateColumns"
  | "gridTemplateRows"
  | "flexDirection"
  | "flexWrap"
  | "placeContent"
  | "placeItems"
  | "alignContent"
  | "alignItems"
  | "justifyContent"
  | "justifyItems"
  | "gap"
  | "space"
  | "margin"
  | "divideWidth"
  | "divideStyle"
  | "divideColor"
  | "divideOpacity"
  | "placeSelf"
  | "alignSelf"
  | "justifySelf"
  | "overflow"
  | "overscrollBehavior"
  | "scrollBehavior"
  | "textOverflow"
  | "whitespace"
  | "wordBreak"
  | "borderRadius"
  | "borderWidth"
  | "borderStyle"
  | "borderColor"
  | "borderOpacity"
  | "backgroundColor"
  | "backgroundOpacity"
  | "backgroundImage"
  | "gradientColorStops"
  | "boxDecorationBreak"
  | "backgroundSize"
  | "backgroundAttachment"
  | "backgroundClip"
  | "backgroundPosition"
  | "backgroundRepeat"
  | "backgroundOrigin"
  | "fill"
  | "stroke"
  | "strokeWidth"
  | "objectFit"
  | "objectPosition"
  | "padding"
  | "textAlign"
  | "textIndent"
  | "verticalAlign"
  | "fontFamily"
  | "fontSize"
  | "fontWeight"
  | "textTransform"
  | "fontStyle"
  | "fontVariantNumeric"
  | "lineHeight"
  | "letterSpacing"
  | "textColor"
  | "textOpacity"
  | "textDecoration"
  | "textDecorationColor"
  | "textDecorationStyle"
  | "textDecorationThickness"
  | "textUnderlineOffset"
  | "fontSmoothing"
  | "placeholderColor"
  | "placeholderOpacity"
  | "caretColor"
  | "accentColor"
  | "opacity"
  | "backgroundBlendMode"
  | "mixBlendMode"
  | "boxShadow"
  | "outlineStyle"
  | "outlineWidth"
  | "outlineOffset"
  | "outlineColor"
  | "ringWidth"
  | "ringColor"
  | "ringOpacity"
  | "ringOffsetWidth"
  | "ringOffsetColor"
  | "blur"
  | "brightness"
  | "contrast"
  | "dropShadow"
  | "grayscale"
  | "hueRotate"
  | "invert"
  | "saturate"
  | "sepia"
  | "filter"
  | "backdropBlur"
  | "backdropBrightness"
  | "backdropContrast"
  | "backdropGrayscale"
  | "backdropHueRotate"
  | "backdropInvert"
  | "backdropOpacity"
  | "backdropSaturate"
  | "backdropSepia"
  | "backdropFilter"
  | "transitionProperty"
  | "transitionDelay"
  | "transitionDuration"
  | "transitionTimingFunction"
  | "willChange"
  | "content"
  | "lineClamp";
