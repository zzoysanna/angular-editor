import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input, OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {AngularEditorService, UploadResponse} from './angular-editor.service';
import {HttpResponse, HttpEvent} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {CustomClass} from './config';
import {SelectOption} from './ae-select/ae-select.component';
import { Observable } from 'rxjs';
import {ButtonConfig, Commands, Tags} from "./types";

@Component({
  selector: 'angular-editor-toolbar',
  templateUrl: './angular-editor-toolbar.component.html',
  styleUrls: ['./angular-editor-toolbar.component.scss']
})

export class AngularEditorToolbarComponent implements OnInit{
  htmlMode = false;
  heading = 'default';
  fontName = 'Times New Roman';
  fontSize = '3';
  foreColour: string;
  backColor: string;

  headings: SelectOption[] = [
    {
      label: 'Heading 1',
      value: 'h1',
    },
    {
      label: 'Heading 2',
      value: 'h2',
    },
    {
      label: 'Heading 3',
      value: 'h3',
    },
    {
      label: 'Heading 4',
      value: 'h4',
    },
    {
      label: 'Heading 5',
      value: 'h5',
    },
    {
      label: 'Heading 6',
      value: 'h6',
    },
    {
      label: 'Heading 7',
      value: 'h7',
    },
    {
      label: 'Paragraph',
      value: 'p',
    },
    {
      label: 'Predefined',
      value: 'pre'
    },
    {
      label: 'Standard',
      value: 'div'
    },
    {
      label: 'default',
      value: 'default'
    }
  ];

  fontSizes: SelectOption[] = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    }
  ];

  customClassId = '-1';
  defaultLink = 'https://';

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _customClasses: CustomClass[];
  customClassList: SelectOption[] = [{label: '', value: ''}];

  selectHeadings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'PRE', 'DIV'];

  buttons = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter',
    'justifyRight', 'justifyFull', 'indent', 'insertUnorderedList', 'insertOrderedList', 'link'];

  set1 = ['undo', 'redo'];
  set2 = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'];
  set3 = ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
  set4 = ['indent', 'outdent'];
  set5 = ['insertUnorderedList', 'insertOrderedList'];

  buttonsConfig: {[key: string]: ButtonConfig} = {
    undo: {
      title: 'Undo',
      isHidden: false,
      icon: 'fa-undo'
    },
    redo: {
      title: 'Redo',
      isHidden: false,
      icon: 'fa-repeat'
    },
    bold: {
      title: 'Bold',
      isHidden: false,
      isActive: false,
      icon: 'fa-bold',
    },
    italic: {
      title: 'Italic',
      isHidden: false,
      isActive: false,
      icon: 'fa-italic',
    },
    underline: {
      title: 'Underline',
      isHidden: false,
      isActive: false,
      icon: 'fa-underline',
    },
    strikeThrough: {
      title: 'StrikeThrough',
      isHidden: false,
      isActive: false,
      icon: 'fa-strikethrough',
    },
    subscript: {
      title: 'Subscript',
      isHidden: false,
      isActive: false,
      icon: 'fa-subscript',
    },
    superscript: {
      title: 'Superscript',
      isHidden: false,
      isActive: false,
      icon: 'fa-superscript',
    },
    justifyLeft: {
      title: 'Justify Left',
      isHidden: false,
      isActive: false,
      icon: 'fa-align-left',
    },
    justifyCenter: {
      title: 'Justify Center',
      isHidden: false,
      isActive: false,
      icon: 'fa-align-center',
    },
    justifyRight: {
      title: 'Justify Right',
      isHidden: false,
      isActive: false,
      icon: 'fa-align-right',
    },
    justifyFull: {
      title: 'Justify Full',
      isHidden: false,
      isActive: false,
      icon: 'fa-align-justify',
    },
    indent: {
      title: 'Indent',
      isHidden: false,
      isActive: false,
      icon: 'fa-indent',
      tag: Tags.INDENT
    },
    outdent: {
      title: 'Outdent',
      isActive: false,
      isHidden: false,
      icon: 'fa-outdent'
    },
    insertUnorderedList: {
      title: 'Unordered List',
      isHidden: false,
      isActive: false,
      icon: 'fa-list-ul',
    },
    insertOrderedList: {
      title: 'Ordered List',
      isHidden: false,
      isActive: false,
      icon: 'fa-list-ol',
    },
    fontName: {
      isHidden: false,
    },
    fontSize: {
      isHidden: false,
    },
    removeFormat: {
      title: 'Clear Formatting',
      isHidden: false,
      icon: 'fa-remove'
    },
    toggleEditorMode: {
      title: 'HTML Code',
      isHidden: false,
      icon: 'fa-code'
    },
    insertImage: {
      title: 'Insert Image',
      isHidden: false,
      icon: 'fa-image'
    },
    insertVideo: {
      title: 'Insert Video',
      isHidden: false,
      icon: 'fa-video-camera'
    },
    insertHorizontalRule: {
      title: 'Horizontal Line',
      isHidden: false,
      icon: 'fa-minus'
    },
    link: {
      title: 'Insert Link',
      isHidden: false,
      isActive: false,
      icon: 'fa-link',
      tag: Tags.LINK
    },
    unlink: {
      title: 'Unlink',
      isHidden: false,
      icon: 'fa-chain-broken'
    },
    customClasses: {
      isHidden: false,
    },
    backgroundColor: {
      title: 'Background Color',
      isHidden: false,
    },
    textColor: {
      title: 'Text Color',
      isHidden: false,
    },
    heading: {
      isHidden: false,
    }
  }

  @Input() id: string;
  @Input() uploadUrl: string;
  @Input() upload: (file: File) => Observable<HttpEvent<UploadResponse>>;
  @Input() showToolbar: boolean;
  @Input() fonts: SelectOption[] = [{label: '', value: ''}];

  @Input()
  set customClasses(classes: CustomClass[]) {
    if (classes) {
      this._customClasses = classes;
      this.customClassList = this._customClasses.map((x, i) => ({label: x.name, value: i.toString()}));
      this.customClassList.unshift({label: 'Clear Class', value: '-1'});
    }
  }

  @Input()
  set defaultFontName(value: string) {
    if (value) {
      this.fontName = value;
    }
  }

  @Input()
  set defaultFontSize(value: string) {
    if (value) {
      this.fontSize = value;
    }
  }

  @Input() hiddenButtons: string[];
  @Input() buttonTitles: { [key: string]: string };

  @Output() execute: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('fileInput', {static: true}) myInputFile: ElementRef;

  public get isLinkButtonDisabled(): boolean {
    return this.htmlMode || !Boolean(this.editorService.selectedText);
  }

  constructor(
    private r: Renderer2,
    private editorService: AngularEditorService,
    private er: ElementRef,
    @Inject(DOCUMENT) private doc: any
  ) {}

  ngOnInit(): void {
    this.initButtonsConfig();
  }

  initButtonsConfig(): void {
    const hasCustomTitles = this.buttonTitles && Object.keys(this.buttonTitles).length;
    for (const [key, value] of Object.entries(this.buttonsConfig)) {
      value.isHidden = this.isButtonHidden(key);
      if(hasCustomTitles && key in this.buttonTitles) {
        value.title = this.buttonTitles[key];
      }
    }
  }

  /**
   * Trigger command from editor header buttons
   * @param command string from toolbar buttons
   */
  triggerCommand(command: string) {
    this.execute.emit(command);
  }

  /**
   * highlight editor buttons when cursor moved or positioning
   */
  triggerButtons() {
    if (!this.showToolbar) {
      return;
    }
    this.buttons.forEach(e => {
      const button = this.buttonsConfig[e];
      button.isActive = this.doc.queryCommandState(e);
      if(e === Commands.LINK || e === Commands.INDENT) {
        button.isActive = this.isSelectionInTag(button.tag)
      }
    });
  }

  /**
   * trigger highlight editor buttons when cursor moved or positioning in block
   */
  triggerBlocks(nodes: Node[]) {
    if (!this.showToolbar || !nodes.length) {
      return;
    }

    const currentHeadingNode = nodes.find(el => this.selectHeadings.includes(el.nodeName.toUpperCase()))
    this.heading = currentHeadingNode?.nodeName?.toLowerCase() || 'default';

    let found = false;
    if (this._customClasses) {
      this._customClasses.forEach((y, index) => {
        const node = nodes.find(x => {
          if (x instanceof Element) {
            return x.className === y.class;
          }
        });
        if (node !== undefined) {
          if (found === false) {
            this.customClassId = index.toString();
            found = true;
          }
        } else if (found === false) {
          this.customClassId = '-1';
        }
      });
    }

    this.foreColour = this.doc.queryCommandValue('ForeColor');
    this.fontSize = this.doc.queryCommandValue('FontSize');
    this.fontName = this.doc.queryCommandValue('FontName').replace(/"/g, '');
    this.backColor = this.doc.queryCommandValue('backColor');
  }

  /**
   * insert URL link
   */
  insertUrl() {
    let url = 'https:\/\/';
    const selection = this.editorService.savedSelection;
    if (selection && selection.commonAncestorContainer.parentElement.nodeName === 'A') {
      const parent = selection.commonAncestorContainer.parentElement as HTMLAnchorElement;
      if (parent.href !== '') {
        url = parent.href;
      }
    }
    url = prompt('Insert URL link', url);
    if (url && url !== '' && url !== this.defaultLink) {
      this.editorService.createLink(url);
    }
  }

  /**
   * insert Video link
   */
  insertVideo() {
    this.execute.emit('');
    const url = prompt('Insert Video link', this.defaultLink);
    if (url && url !== '' && url !== this.defaultLink) {
      this.editorService.insertVideo(url);
    }
  }

  /** insert color */
  insertColor(color: string, where: string) {
    this.editorService.insertColor(color, where);
    this.execute.emit('');
  }

  /**
   * set font Name/family
   * @param foreColor string
   */
  setFontName(foreColor: string): void {
    this.editorService.setFontName(foreColor);
    this.execute.emit('');
  }

  /**
   * set font Size
   * @param fontSize string
   */
  setFontSize(fontSize: string): void {
    this.editorService.setFontSize(fontSize);
    this.execute.emit('');
  }

  /**
   * toggle editor mode (WYSIWYG or SOURCE)
   * @param m boolean
   */
  setEditorMode(m: boolean) {
    const toggleEditorModeButton = this.doc.getElementById('toggleEditorMode' + '-' + this.id);
    if (m) {
      this.r.addClass(toggleEditorModeButton, 'active');
    } else {
      this.r.removeClass(toggleEditorModeButton, 'active');
    }
    this.htmlMode = m;
  }

  /**
   * Upload image when file is selected.
   */
  onFileChanged(event) {
    const file = event.target.files[0];
    if (file.type.includes('image/')) {
        if (this.upload) {
          this.upload(file).subscribe((response: HttpResponse<UploadResponse>) => this.watchUploadImage(response, event));
        } else if (this.uploadUrl) {
            this.editorService.uploadImage(file).subscribe((response: HttpResponse<UploadResponse>) => this.watchUploadImage(response, event));
        } else {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent) => {
            const fr = e.currentTarget as FileReader;
            this.editorService.insertImage(fr.result.toString());
          };
          reader.readAsDataURL(file);
        }
      }
  }

  watchUploadImage(response: HttpResponse<{imageUrl: string}>, event) {
    const { imageUrl } = response.body;
    this.editorService.insertImage(imageUrl);
    event.srcElement.value = null;
  }

  /**
   * Set custom class
   */
  setCustomClass(classId: string) {
    if (classId === '-1') {
      this.execute.emit('clear');
    } else {
      this.editorService.createCustomClass(this._customClasses[+classId]);
    }
  }

  isButtonHidden(name: string): boolean {
    if (!name || !this.hiddenButtons) {
      return false;
    }
    return this.hiddenButtons.includes(name);
  }

  focus() {
    this.execute.emit('focus');
  }

  /**
   * Check if the current selection inside some tag
   */
  isSelectionInTag(tag, textAlign?: string): boolean {
    let currentNode = window.getSelection().focusNode as HTMLElement;
    while (currentNode.id !== 'editor') {
      if (currentNode.tagName === tag) {
        return true;
      }
      currentNode = currentNode.parentNode as HTMLElement;
    }
    return false;
  }
}
