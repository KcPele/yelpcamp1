const inpFile = document.getElementById('inpFile')
const imagePreview = document.getElementById('image_preview')
const imagePreviewImage = imagePreview.querySelector('.image_preview__default')


inpFile.addEventListener("change", () => {
    const file = inpFile.files[0]
    if(file){
   
        const reader = new FileReader()

        reader.addEventListener("load", () => {
            imagePreviewImage.setAttribute("src", reader.result)
        })
        reader.readAsDataURL(file)
    } else {
       
        imagePreviewImage.setAttribute('src', '')
    }
})