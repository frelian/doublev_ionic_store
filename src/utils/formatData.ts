
export const cleanImageUrls = (images: any) => {
    return images.map((image: string) => {

        const urlRegex = /https?:\/\/[^\s\"$$\]]+/;
        const match = image.match(urlRegex);
        return match ? match[0] : "";
    }).filter((url: string) => url !== "");
};

export const extractUrl = (str: any) => {

    const urlRegex = /https?:\/\/[^\s\"\[\]]+/;
    const match = str.match(urlRegex);
    return match ? match[0] : null;
};