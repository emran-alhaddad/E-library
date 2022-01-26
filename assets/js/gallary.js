var currentImage = 0;

const nextPrevImage = direction => {
    if (direction == 1) currentImage++;
    else if (direction == -1) currentImage--;

    let images = document.getElementsByClassName('switch__1');
    let boxImage = document.querySelector('#boxImage2');
    console.log(boxImage.children);

    for (const img of images) {
        img.style = "margin: 0;";
    }
    currentImage =
        currentImage > (images.length - 1) ? 0 :
        currentImage < 0 ? images.length - 1 : currentImage;

    boxImage.setAttribute("src", images[currentImage].getAttribute("src"));
    images[currentImage].style = "margin: 5px 0; outline:2px solid red;";


}

// Gallary Show Section 

const callImage = image => {

    document.getElementById("Gallary").innerHTML = "<div class='card'>" +
        image.parentNode.parentNode.innerHTML.replaceAll("boxImage", "boxImage2").replaceAll("switch__", "switch__1") +
        '<a class="slideLeftBtn" onclick="nextPrevImage(1)">❯</a>' +
        '<a class="slideRightBtn" onclick="nextPrevImage(-1)">❮</a>'
    "</div>";
    showModule('popUP');
}

const switchImage = (image, id) => {
    document.getElementById(id).setAttribute("src", image.getAttribute("src"));
}