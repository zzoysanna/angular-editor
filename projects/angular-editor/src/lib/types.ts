export enum Tags {
  BOLD = 'B',
  ITALIC = 'I',
  STRIKE = 'STRIKE',
  UNDERLINE = 'U',
  SUBSCRIPT = 'SUB',
  SUPERSCRIPT = 'SUP',
  INDENT = 'BLOCKQUOTE',
  LINK = 'A',
  UNORDEREDLIST = 'UL',
  ORDEREDLIST = 'OL',
}

export interface ButtonConfig {
  title?: string,
  isHidden: boolean,
  isActive?: boolean,
  icon?: string,
  tag?: Tags
}

export enum Commands {
  LINK = 'link',
  INDENT = 'indent',
  CLEAR = 'clear'
}
