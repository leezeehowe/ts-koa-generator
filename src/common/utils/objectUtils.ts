export const transObjectToStr = (obj: object): string => {
    let str = "";
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            let element;
            element = obj[key];
            str += `${key} = ${JSON.stringify(element)}\n`;              
        }
    }
    return str;
}