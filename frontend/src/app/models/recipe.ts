export interface Recipe  {
    title:string
    author:string
    content: string[]
    categories?:string[]
    ingerdients: string[]
    time?:number
    image?: string
    creationDate: string
    editDate?: string
  }