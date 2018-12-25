# ngx-scrollbar-indicator
![npm package](https://badge.fury.io/js/ngx-scrollbar-indicator.svg "npm package")
![Travis CI Build](https://travis-ci.com/shhdharmen/ngx-scrollbar-indicator.svg?branch=master "Travis-CI Build")
[![online demo](https://img.shields.io/badge/github--pages-online-blue.svg)](https://shhdharmen.github.io/ngx-scrollbar-indicator/ "online demo")
[![online demo](https://img.shields.io/badge/stackblitz-online-blue.svg)](https://stackblitz.com/edit/ngx-scrollbar-indicator-basic?file=src/app/app.component.html "online demo")
![Downloads](https://img.shields.io/npm/dt/ngx-scrollbar-indicator.svg "Total Downloads")
![MIT License](https://img.shields.io/npm/l/ngx-scrollbar-indicator.svg "MIT License")
[![codecov](https://codecov.io/gh/shhdharmen/ngx-scrollbar-indicator/branch/master/graph/badge.svg)](https://codecov.io/gh/shhdharmen/ngx-scrollbar-indicator)
![npms score](https://badges.npms.io/ngx-scrollbar-indicator.svg "NPMS Score")
![dependencies](https://img.shields.io/david/shhdharmen/ngx-scrollbar-indicator.svg "Dependencies")

## What it does?
![what it does gif](./chrome-capture.gif)

## Basic Usage
1.  `npm i ngx-scrollbar-indicator`
2.  import in `app.module.ts` file
```
...
import { NgxScrollbarIndicatorModule } from 'ngx-scrollbar-indicator';
...
@NgModule({
  ...
  imports: [
    BrowserModule,
    ...,
    NgxScrollbarIndicatorModule
  ]
})
...
```
3.  import in style.scss `@import "~ngx-scrollbar-indicator/assets/theme.scss";`
4.  In `app.component.html`, wrap you element, in which you want indicator, like below :
```
<ngx-scrollbar-indicator #indicatorRef>
  <!-- Your element with *ngFor goes here. Do not forget to add attrribute 'indicatorItem', which takes string from which first character will be visible in indicator. -->
</ngx-scrollbar-indicator>
```
5.  You can see the live example here : [Stackblitz](https://stackblitz.com/edit/ngx-scrollbar-indicator-basic?file=src/app/app.component.html)

## API

### Options *ScrollbarIndicatorOptions*
You can give options according to you need and modify the behavior. All options are optional. Below is full list of options :

| Option  | Type  | Description |
| ------  | ----  | ----------- |
| enable  | boolean | Enable or disable indicator. *Default : true* |
| changeWhen  | EChangeWhen (top/visible) | When the indicator should change the character? When character has reach top of container or as soon as it becomes visible in container. *Default : EChangeWhen.top*  |
| containerHeight | number  | height of the container, without this, scrolling won't work. *Default : 500*  |
| theme | ETheme (circular/waterDrop/squareLike)  | Visual theme of indicator, totally based on scss. *Default : ETheme.waterDrop*  |
| position  | EPosition (auto/top)  | Position of indicator, whether to show on top or auto. *Default : EPosition.auto* |
| showWhen  | EShowWhen (always/scroll) | When to show the indicator, always or onscroll/onhover. *Default : EShowWhen.scroll*  |

### Public Properties

| Name  | Type  | Description |
| ----  | ----  | ----------- |
| all | ScrollbarIndicatorItemDirective[] | All Items Array |
| firsts  | { [x: string]: ScrollbarIndicatorItemDirective }  | JSON Object with first item of each character |
| lasts | { [x: string]: ScrollbarIndicatorItemDirective }  | JSON Object with last item of each character  |
| view  | HTMLElement | Viewport Element, on which scrolling event is handled |

### Methods

| Name  | Parameters  | Returns | Description |
| ----  | ----------  | ------- | ----------- |
| showIndicator | - timer, this will help to maintain frequent calls to this function<br> - duration (default 500), after which indicator will be hidden | Timer, which can be cleared if you are calling this function again within duration. | Ideally, you shouldn't call this. This will show the indicator. This will add 'show' class to the indicator. And After duration(default 500), if will remove the same. Calling this won't make any sense if showWhen is set to EShowWhen.always |
| goToLetter  | - letter, Character to which viewport should be scrolled<br>- position (default 'first') Element of that character group, first or last | offsetTop of element or -1 if error | Scroll to a specific letter, positioned first of last. Returns the offsetTop if element found, else -1.

### Observers

| Name  | Type  | Description |
| ----  | ----  | ----------- |
| currentCharacterObserver  | Observable<string>  | Stream that emits current character in indicator
