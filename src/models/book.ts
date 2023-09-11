export default class Book {
    id:number;
    title:string;
    content:string;
    image:string;
    lastPage:number;
    constructor(id:number,title:string,content:string,image:string,lastPage=0){
        this.id = id;
        this.title=title;
        this.content=content;
        this.image=image;
        this.lastPage=lastPage;
    }
}