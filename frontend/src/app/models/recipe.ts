export interface Recipe  {
    title:string
    author:string
    categories?:string[]
    time:number
    content: string[]
    image?: string
    creationDate?: string
    editDate?: string
  }