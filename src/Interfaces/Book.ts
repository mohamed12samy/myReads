type IndustryIdentifiers ={
    type:string,
    identifier:string
}
type PanelizationSummary = {
    containsEpubBubbles:boolean,
    containsImageBubbles:boolean,
}

export interface Book {
    title:string,
    subtitle?:string,
    authors?:string[],
    shelf?:string,
    publisher:string,
    readingModes:any,
    publishedDate?:string,
    description:string,
    pageCount?:number,
    printType?:string,
    averageRating?:number,
    ratingsCount?:number,
    maturityRating?:string,
    allowAnonLogging?:boolean,
    contentVersion?:string,
    language?:string,
    id:string,
    previewLink?:string,
    infoLink?:string,
    categories?:string[],
    panelizationSummary?:PanelizationSummary,
    industryIdentifiers?:IndustryIdentifiers[],
    imageLinks?:{
        smallThumbnail:string,
        thumbnail:string
    }
}