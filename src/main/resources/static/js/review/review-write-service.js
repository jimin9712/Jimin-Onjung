const reviewWriteService = (() => {
    // 파일 업로드
    const upload = async (formData) => {
        const response =
        await fetch("/attachment/upload", {
            method: "post",
            body: formData
        });
        const attachmentFile = await response.json();
        return attachmentFile;
    }

    return {upload: upload};
})();