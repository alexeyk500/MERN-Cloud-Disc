
export enum FileTypeEnum {
  file = 'file',
  dir = 'dir',
}

export type FileType = {
  _id: string,
  name: string,
  type: FileTypeEnum,
  date: Date,
  accessLink: string,
  size: number,
  path: string,
  user:string,
  parent: string,
  childs: [{type: FileTypeEnum, ref: string}],
  ref: string,
}

export type UserType = {
  email: string,
  password: string,
  diskSpace: number,
  usedSpace: number,
  avatar?: string,
  files: FileType,
}

export enum InputTypeEnum {
  text = 'text',
  password = 'password',
}

export enum PopupTypeEnum {
  info = 'info',
  alarm = 'alarm',
}