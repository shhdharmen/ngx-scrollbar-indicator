/** @description Interface of supported options for ng-scrollbar-indicator
 * @default {
    changeWhen: EChangeWhen.top,
    containerHeight: 500,
    position: EPosition.top,
    showWhen: EShowWhen.scroll,
    theme: ETheme.waterDrop,
    showCharacterPanel: false
  }
*/
export interface ScrollbarIndicatorOptions {
    /** @description Enable or disable indicator
     * @default true
     */
    enable?: boolean;
    /** @description When the indicator should change the character?
     * When character has reach top of container or as soon as it becomes visible in container
     * @default EChangeWhen.top
     */
    changeWhen?: EChangeWhen;
    /** @description height of the container, without this, scrolling won't work
     * @default 500
     */
    containerHeight?: number;
    /** @description Visual theme of indicator, totally based on scss
     * @default ETheme.waterDrop
     */
    theme?: ETheme;
    /** @description Position of indicator, whether to show on top or auto
     * @default EPosition.auto
     */
    position?: EPosition;
    /** @description When to show the indicator, always or onscroll/onhover
     * @default EShowWhen.scroll
     */
    showWhen?: EShowWhen;
    /** @description [Not Yet Implemented] Whether to show character panel or not
     * @default false
     */
    showCharacterPanel?: boolean;
}

/**
 * @description Enum for 'when' values of changing the characters
 * @readonly
 * @enum {string}
 */
export enum EChangeWhen {
    // The element has reached top of view
    top = 'TOP',
    // The element is visible in view
    visible = 'VISIBLE'
}

/**
 * @description Enum for 'when' values of showing the indicator
 * @readonly
 * @enum {string}
 */
export enum EShowWhen {
    /**Show always */
    always = 'ALWAYS',
    /**Show when scrolled or hovered */
    scroll = 'SCROLL'
}

/**
 * @description Enum for 'theme' values of indicator
 * @readonly
 * @enum {string}
 */
export enum ETheme {
    circular = 'circular',
    waterDrop = 'water-drop',
    squareLike = 'square-like'
}

/**
 * @description Enum for 'position' values of indicator
 * @readonly
 * @enum {string}
 */
export enum EPosition {
    /**Change the position with scroll */
    auto = 'AUTO',
    /**Keep it on top */
    top = 'TOP'
}
