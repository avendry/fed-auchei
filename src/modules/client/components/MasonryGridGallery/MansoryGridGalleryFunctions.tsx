export const MansoryGridGalleryFunction = () => {

    const divideImages = (images: string[], columns: number): string[][] => {
        const result: string[][] = Array.from({ length: columns }, () => []);
        images.forEach((image, index) => {
            result[index % columns].push(image);
        });
        return result;
    };

    return {
        divideImages
    }
}