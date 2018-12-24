/**Interface of supported options for ng-scrollbar-indicator
*/
export interface ScrollbarIndicatorOptions {
  /**Enable or disable indicator. Default : true
   */
  enable?: boolean;
  /**When the indicator should change the character?
   * When character has reach top of container or as soon as it becomes visible in container.
   * Default : EChangeWhen.top
   */
  changeWhen?: EChangeWhen;
  /**height of the container, without this, scrolling won't work. Default : 500
   */
  containerHeight?: number;
  /**Visual theme of indicator, totally based on scss. Default : ETheme.waterDrop
   */
  theme?: ETheme;
  /**Position of indicator, whether to show on top or auto. Default : EPosition.auto
   */
  position?: EPosition;
  /**When to show the indicator, always or onscroll/onhover. Default : EShowWhen.scroll
   */
  showWhen?: EShowWhen;
  /**[Not Yet Implemented] Whether to show character panel or not
   */
  showCharacterPanel?: boolean;
}

/**
 *Enum for 'when' values of changing the characters
 */
export enum EChangeWhen {
  // The element has reached top of view
  top = 'TOP',
  // The element is visible in view
  visible = 'VISIBLE'
}

/**
 *Enum for 'when' values of showing the indicator
 */
export enum EShowWhen {
  /**Show always */
  always = 'ALWAYS',
  /**Show when scrolled or hovered */
  scroll = 'SCROLL'
}

/**
 *Enum for 'theme' values of indicator
 */
export enum ETheme {
  circular = 'circular',
  waterDrop = 'water-drop',
  squareLike = 'square-like'
}

/**
 *Enum for 'position' values of indicator
 */
export enum EPosition {
  /**Change the position with scroll */
  auto = 'AUTO',
  /**Keep it on top */
  top = 'TOP'
}
