




export class ImageEntity {
    private constructor(
        public readonly id:number,
        public readonly url:string
    ){}


    static objectImage(image:ImageEntity) {
        const{id, url} = image;

        return new ImageEntity(id, url);
    }
}