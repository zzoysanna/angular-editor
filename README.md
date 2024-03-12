# AngularEditor

[//]: # ([![npm version]&#40;https://badge.fury.io/js/%40kolkov%2Fangular-editor.svg&#41;]&#40;https://badge.fury.io/js/%40kolkov%2Fangular-editor&#41;)

[//]: # ([![demo]&#40;https://img.shields.io/badge/demo-StackBlitz-blueviolet.svg&#41;]&#40;https://stackblitz.com/edit/angular-editor-wysiwyg&#41;)

[//]: # ([![Build Status]&#40;https://travis-ci.com/kolkov/angular-editor.svg?branch=master&#41;]&#40;https://travis-ci.com/kolkov/angular-editor&#41;)

[//]: # ([![npm]&#40;https://img.shields.io/npm/dm/@kolkov/angular-editor.svg&#41;]&#40;https://www.npmjs.com/package/@kolkov/angular-editor&#41;)

[//]: # ([![]&#40;https://data.jsdelivr.com/v1/package/npm/@kolkov/angular-editor/badge?style=rounded&#41;]&#40;https://www.jsdelivr.com/package/npm/@kolkov/angular-editor&#41;)

[//]: # ([![Coverage Status]&#40;https://coveralls.io/repos/github/kolkov/angular-editor/badge.svg?branch=master&#41;]&#40;https://coveralls.io/github/kolkov/angular-editor?branch=master&#41;)

[//]: # ([![codecov]&#40;https://codecov.io/gh/kolkov/angular-editor/branch/master/graph/badge.svg&#41;]&#40;https://codecov.io/gh/kolkov/angular-editor&#41;)

[//]: # ([![Donate]&#40;https://img.shields.io/badge/Donate-PayPal-green.svg&#41;]&#40;https://paypal.me/AndreyKolkov&#41;)

A simple native WYSIWYG/Rich Text editor for Angular 6-14+. 
Forked from @kolkov/angular-editor

[//]: # (![Nov-27-2019 17-26-29]&#40;https://user-images.githubusercontent.com/216412/69763434-259cd800-113b-11ea-918f-0565ebce0e48.gif&#41;)


[//]: # (## Demo)

[//]: # ([demo]&#40;https://angular-editor-wysiwyg.stackblitz.io/&#41; | [See the code in StackBlitz]&#40;https://stackblitz.com/edit/angular-editor-wysiwyg&#41;.)

## Getting Started

### Installation

Install via [npm] package manager 

```bash
npm install @zoysanna/angular-editor --save
```
### Versions

2.0.0 and above - for Angular v13.0.0 and above

1.0.0 and above - for Angular v8.x.x and above

0.18.4 and above - for Angular v7.x.x

0.15.x - for Angular v6.x.x 

### Usage

Import `angular-editor` module

```js
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@zoysanna/angular-editor';

@NgModule({
  imports: [ HttpClientModule, AngularEditorModule ]
})
```

Then in HTML

```html
<angular-editor [placeholder]="'Enter text here...'" [(ngModel)]="htmlContent"></angular-editor>
```

or for usage with reactive forms

```html
<angular-editor formControlName="htmlContent" [config]="editorConfig"></angular-editor>
```

if you using more than one editor on same page set `id` property

```html
<angular-editor id="editor1" formControlName="htmlContent1" [config]="editorConfig"></angular-editor>
<angular-editor id="editor2" formControlName="htmlContent2" [config]="editorConfig"></angular-editor>
```

where

```js
import { AngularEditorConfig } from '@zoysanna/angular-editor';


editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      'bold', 'italic',
      'fontSize'
    ],
    buttonTitles: {
      undo: 'Custom undo',
      redo: 'Custom redo',
    }
};
```
For `ngModel` to work, you must import `FormsModule` from `@angular/forms`, or for `formControlName`, you must import `ReactiveFormsModule` from `@angular/forms`


### Custom buttons

You can define your custom buttons with custom actions using executeCommandFn. It accepts commands from [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand).
The first argument of this method is aCommandName and the second argument is aValueArgument. Example shows a button that adds Angular editor logo into the editor.
```html
<angular-editor id="editor1" formControlName="htmlContent1" [config]="editorConfig">
  <ng-template #customButtons let-executeCommandFn="executeCommandFn">
    <ae-toolbar-set>
      <ae-button iconClass="fa fa-html5" title="Angular editor logo"
                 (buttonClick)="executeCommandFn('insertHtml', angularEditorLogo)">
      </ae-button>
    </ae-toolbar-set>
  </ng-template>
</angular-editor>
```

## API
### Inputs
| Input  | Type | Default | Required | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| id | `string` | `-` | no | Id property when multiple editor used on same page |
| [config] | `AngularEditorConfig` | `default config` | no | config for the editor |
| placeholder | `string` | `-` | no | Set custom placeholder for input area |
| tabIndex | `number` | `-` | no | Set Set tabindex on angular-editor |

### Outputs

| Output  | Description |
| ------------- | ------------- |
| (html)  | Output html |
| (viewMode)  | Fired when switched visual and html source mode |
| (blur)  | Fired when editor blur |
| (focus)  | Fired when editor focus |

### Methods
 Name  | Description |
| ------------- | ------------- |
| focus  | Focuses the editor element |

### Other
 Name  | Type | Description |
| ------------- | ------------- | ------------- |
| AngularEditorConfig | configuration | Configuration for the AngularEditor component.|

### Configuration

| Input  | Type            | Default | Required | Description                                                                                                                     |
| ------------- |-----------------| ------------- | ------------- |---------------------------------------------------------------------------------------------------------------------------------|
| editable  | `boolean`        | `true` | no | Set editing enabled or not                                                                                                      |
| spellcheck  | `boolean`        | `true` | no | Set spellchecking enabled or not                                                                                                |
| translate  | `string`        | `yes` | no | Set translating enabled or not                                                                                                  |
| sanitize  | `boolean`        | `true` | no | Set DOM sanitizing enabled or not                                                                                               |
| height  | `string`        | `auto` | no | Set height of the editor                                                                                                        |
| minHeight  | `string`        | `0` | no | Set minimum height of the editor                                                                                                |
| maxHeight  | `string`        | `auto` | no | Set maximum height of the editor                                                                                                |
| width  | `string`        | `auto` | no | Set width of the editor                                                                                                         |
| minWidth  | `string`        | `0` | no | Set minimum width of the editor                                                                                                 |
| enableToolbar  | `boolean`        | `true` | no | Set toolbar enabled or not                                                                                                      |
| showToolbar  | `boolean`        | `true` | no | Set toolbar visible or not                                                                                                      |
| toolbarPosition  | `string`        | `top` | no | Set toolbar position top or bottom                                                                                              |
| placeholder  | `string`        | `-` | no | Set placeholder text                                                                                                            |
| defaultParagraphSeparator  | `string`        | `-` | no | Set default paragraph separator such as `p`                                                                                     |
| defaultFontName  | `string`        | `-` | no | Set default font such as `Comic Sans MS`                                                                                        |
| defaultFontSize  | `string`        | `-` | no | Set default font size such as `1` - `7`                                                                                         |
| uploadUrl  | `string`        | `-` | no | Set image upload endpoint `https://api.exapple.com/v1/image/upload` and return response with imageUrl key. {"imageUrl" : <url>} |
| upload  | `function`      | `-` | no | Set image upload function                                                                                                       |
| uploadWithCredentials | `boolean`        | `false` | no | Set passing or not credentials in the image upload call                                                                         |
| fonts  | `Font[]`        | `-` | no | Set array of available fonts  `[{name, class},...]`                                                                             |
| customClasses  | `CustomClass[]` | `-` | no | Set array of available fonts  `[{name, class, tag},...]`                                                                        |
| outline  | `boolean`        | `true` | no | Set outline of the editor if in focus                                                                                           |
| toolbarHiddenButtons  | `string[][]`    | `-` | no | Array of button names or elements to hide                                                                                       |
| buttonTitles  | `object`        | `-` | no | Object of custom titles for buttons                                                                                             |

```js
toolbarHiddenButtons: [
    'undo',
    'redo',
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'subscript',
    'superscript',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'justifyFull',
    'indent',
    'outdent',
    'insertUnorderedList',
    'insertOrderedList',
    'heading',
    'fontName',
    'fontSize',
    'textColor',
    'backgroundColor',
    'customClasses',
    'link',
    'unlink',
    'insertImage',
    'insertVideo',
    'insertHorizontalRule',
    'removeFormat',
    'toggleEditorMode'
]
```

## What's included

Within the download you'll find the following directories and files. You'll see something like this:

```
angular-editor/
└── projects/
    ├── angular-editor/
    └── angular-editor-app/
```
`angular-editor/` - library

`angular-editor-app/` - demo application

[//]: # (## Documentation)

[//]: # (The documentation for the AngularEditor is hosted at our website [AngularEditor]&#40;https://angular-editor.kolkov.ru/&#41;)

[//]: # (## Contributing)

[//]: # ()
[//]: # (Please read through our [contributing guidelines]&#40;https://github.com/kolkov/angular-editor/blob/master/CONTRIBUTING.md&#41;. Included are directions for opening issues, coding standards, and notes on development.)

[//]: # ()
[//]: # (Editor preferences are available in the [editor config]&#40;https://github.com/kolkov/angular-editor/blob/master/.editorconfig&#41; for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.)

[//]: # ()
[//]: # (## Versioning)

[//]: # ()
[//]: # (For a transparency into our release cycle and in striving to maintain backward compatibility, AngularEditor is maintained under [the Semantic Versioning guidelines]&#40;http://semver.org/&#41;.)

[//]: # ()
[//]: # (See [the Releases section of our project]&#40;https://github.com/kolkov/angular-editor/releases&#41; for changelogs for each release version.)

[//]: # ()
[//]: # (## Creators)

[//]: # ()
[//]: # (**Andrey Kolkov**)

[//]: # ()
[//]: # (* <https://github.com/kolkov>)

[//]: # ()
[//]: # (## Donate)

[//]: # ()
[//]: # (If you like my work and I save your time you can buy me a :beer: or :pizza: [![Donate]&#40;https://img.shields.io/badge/Donate-PayPal-green.svg&#41;]&#40;https://paypal.me/AndreyKolkov&#41;)

[//]: # ()
[//]: # ([npm]: https://www.npmjs.com/package/@kolkov/angular-editor)

[//]: # ([demo]: https://angular-editor-wysiwyg.stackblitz.io/)

[//]: # ([example]: https://stackblitz.com/edit/angular-editor-wysiwyg)
