
const count = 20;
const apiKey = 'qKovnUHg7q0EpYP7lZnbOaHJpCdpAMVDU5Lc-mLmaCM';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageDiv = document.getElementById('imageDiv');
const loading = document.getElementById('loading');

let isDownloadAllImages = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

async function GetImages(){
    try {
        const response = await fetch(apiURL);
        imagesArray = await response.json();
        DisplayImages();
    } catch (error) {
        console.log(error);
    }
}

GetImages();

function DisplayImages(){
    imagesLoaded = 0;
    totalImages = imagesArray.length;

    imagesArray.forEach((image) => {
        const item = document.createElement('a');

        //item.setAttribute('href', image.urls.regular);
        SetAttributes(item, {href: image.urls.regular});

        const img = document.createElement('img');
        // img.setAttribute('src', image.urls.regular);
        // img.setAttribute('alt', image.alt_description);

        img.addEventListener('load', LoadIcon);

        SetAttributes(img, 
            {
                src: image.urls.regular, 
                alt: image.alt_description
            });

        item.appendChild(img);
        imageDiv.appendChild(item);
    });
}

function SetAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isDownloadAllImages){
        GetImages();
    }
})

function LoadIcon(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        isDownloadAllImages = true;
        loading.hidden = true;
    }
}