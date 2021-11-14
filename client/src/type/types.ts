
export type FileType = {
  _id: string,
  name: string,
  type: string,
  date: Date,
  accessLink: string,
  size: number,
  path: string,
  user:string,
  parent: string,
  childs: [{type: string, ref: string}],
  ref: string,
}

export type UserType = {
  email: string,
  password?: string,
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

export type UploadFileType = {
  id: number,
  name: string,
  progress: number,
}

export enum SortTypeEnum {
  name = 'name',
  type = 'type',
  size = 'size',
  date = 'date',
}

export enum FileListViewEnum {
  list = 'list',
  plates = 'plates'
}