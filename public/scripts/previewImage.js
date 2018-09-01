const inpFile = document.getElementById('inpFile')
const imagePreview = document.getElementById('image_preview')
const imagePreviewImage = imagePreview.querySelector('.image_preview__default')
const spanText = imagePreview.querySelector('.image_preview__text')


inpFile.addEventListener("change", () => {
    const file = inpFile.files[0]

    if(file) {
        const reader = new FileReader()
       spanText.style.display = "none"
       imagePreviewImage.style.display = "block"

        reader.addEventListener("load", () => {
          imagePreviewImage.setAttribute("src", reader.result)
        })
        reader.readAsDataURL(file)
    } else {
        imagePreviewImage.style.display = null
        spanText.style.display = null
    }
})