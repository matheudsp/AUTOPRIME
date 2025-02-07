export enum Tags {
  EMPTY = 'EMPTY',
  USED = 'USED',
  NEW = 'NEW',
}

export const tagTranslation = (tag: Tags): string => {
  switch(tag) {
    case Tags.NEW:
      return 'Novo'
    case Tags.USED:
      return 'Usado'
    case Tags.EMPTY:
      return 'Vazio'
    default:
      return 'Vazio';
  }
}

  
