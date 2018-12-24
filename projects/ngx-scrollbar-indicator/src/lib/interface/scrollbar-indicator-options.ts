/**Interface of supported options for ng-scrollbar-indicator
*/
export interface ScrollbarIndicatorOptions {
    /**Enable or disable indicator
     * @default true
     */
    enable?: boolean;
    /**When the indicator should change the character?
     * When character has reach top of container or as soon as it becomes visible in container
     * @default EChangeWhen.top
     */
    changeWhen?: EChangeWhen;
    /**height of the container, without this, scrolling won't work
     * @default 500
     */
    containerHeight?: number;
    /**Visual theme of indicator, totally based on scss
     * @default ETheme.waterDrop
     */
    theme?: ETheme;
    /**Position of indicator, whether to show on top or auto
     * @default EPosition.auto
     */
    position?: EPosition;
    /**When to show the indicator, always or onscroll/onhover
     * @default EShowWhen.scroll
     */
    showWhen?: EShowWhen;
    /**[Not Yet Implemented] Whether to show character panel or not
     * @default false
     */
    showCharacterPanel?: boolean;
}

/**
 *Enum for 'when' values of changing the characters
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
 *Enum for 'when' values of showing the indicator
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
 *Enum for 'theme' values of indicator
 * @readonly
 * @enum {string}
 */
export enum ETheme {
    circular = 'circular',
    waterDrop = 'water-drop',
    squareLike = 'square-like'
}

/**
 *Enum for 'position' values of indicator
 * @readonly
 * @enum {string}
 */
export enum EPosition {
    /**Change the position with scroll */
    auto = 'AUTO',
    /**Keep it on top */
    top = 'TOP'
}
