function preview(dataUrl, callback){
    callback && callback(dataUrl);
}

function compress(img, fileType, maxWidth) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    const proportion = img.width / img.height;
    const width = maxWidth,
        height = maxWidth / proportion;
    
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height);

    const base64Data = canvas.toDataURL(fileType, 0.75);
    canvas = ctx = null;

    return base64Data;
}

function chooseImage(e, callback, maxSize=200 * 1024) {
    const file = e.target.files[0];

    if (!file || !/\/(?:jpeg|jpg|png)/i.test(file.type)) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(){
        const result = this.result;
        let img = new Image();

        if (result.length <= maxSize) {
            preview(result, callback);
            return;
        }

        img.onload = function(){
            const compressedDataUrl = compress(img, file.type, maxSize / 1024);
            preview(compressedDataUrl, callback);
            img = null;
        }

        img.src = result;
    }

    reader.readAsDataURL(file);
}

export default chooseImage