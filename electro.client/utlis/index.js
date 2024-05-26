

export default {
	convertFileToBase64Async,
	convertFilesToBase64Async
};

function convertFileToBase64Async(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

async function convertFilesToBase64Async(files) {
    const base64Files = await Promise.all(
        files.map(file => {
            if (file instanceof File) {
                return convertFileToBase64Async(file);
            } else {
                return Promise.resolve(file);
            }
        })
    );
    return base64Files;
}
