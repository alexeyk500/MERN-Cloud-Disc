
export type FileType = {
  type: string,
  ref: 'File' | 'Dir',
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