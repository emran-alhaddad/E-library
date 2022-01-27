document.body.setAttribute("onload", "init();");

const showModule = id => document.getElementById(id).style = "transform: scale(1)";
const hideModule = id => document.getElementById(id).style = "transform: scale(0)";



const LastOffers = (date, id) => {
    var countDownDate = new Date(date).getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById(id).innerHTML = "الوقت المتبقي للخصم: " + days + "d " + hours + ":" +
            minutes + ":" + seconds + " ";
        document.getElementById(id).style = "color:green; display:block; text-decoration: none;";
        if (distance < 0) {
            clearInterval(x);
            document.getElementById(id).innerHTML = "إنتهت مدة الخصم";
            document.getElementById(id).style = "color:red; display:block; text-decoration: line-through;";
        }
    }, 1000);
}

const allCounters = () => {
    LastOffers("Jan 29, 2022 21:47:55", "lastOffers1");
    LastOffers("Jan 21, 2022 00:47:55", "lastOffers2");
    LastOffers("Jan 19, 2022 23:47:55", "lastOffers3");
    LastOffers("Jan 20, 2022 00:00:00", "lastOffers4");
    LastOffers("Jan 30, 2022 08:20:00", "lastOffers5");

}


// Search Code
function search_books() {
    let input = document.getElementById('search').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('BoookTitle');


    if (input.length > 0)
        hide_Show_Others('none');
    else
        hide_Show_Others('inherit');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            document.getElementsByClassName('card')[i].style = "flex: 1;";
            x[i].parentNode.parentNode.style.display = "none";

        } else {
            document.getElementsByClassName('card')[i].style = "flex: none;";
            x[i].parentNode.parentNode.style.display = "initial";

        }
    }
}

const hide_Show_Others = (state) => {
    let divs = document.getElementsByClassName('hide');
    for (const div of divs) {
        div.style.display = state;
    }
}


// Bag Counter 

function init() {
    var btns = document.getElementsByClassName('origin');
    for (const btn of btns) {

        btn.addEventListener("click", function() {
            let image = this.parentNode.parentNode.children[0].children[0].src;
            let title = this.parentNode.parentNode.children[1].children[2].innerHTML;
            let price = this.parentNode.parentNode.children[1].children[3].innerHTML;
            localStorage.setItem('Product' + (localStorage.length + 1), [image, title, price]);
            alert("تم إضافة المنتج إلى السلة");
            AddProduct();

        });
    }
    AddProduct();

    if (location.href.includes('shopBag')) {
        showCardProducts();
    }
    if (location.href.includes('index')) {
        allCounters();
    }

}

const AddProduct = () => {

    if (localStorage.length > 0) {
        document.getElementById('BagCounter').style.visibility = "visible";
        document.getElementById('BagCounter').innerText = localStorage.length;
        document.getElementById('BagCounter').style.visibility = "visible";
        document.getElementById('BagImage').src = "assets/icons/BagFull.svg";
    } else {
        document.getElementById('BagCounter').style.visibility = "hidden";
        document.getElementById('BagImage').src = "assets/icons/svgexport-51.svg";
    }
}


// Show Shopping Items in Shopping Bag

const showCardProducts = () => {
    document.getElementById('noBagItems').innerText = "(" + localStorage.length + " منتجات)";
    var totalPrice = 0;
    document.getElementById('itemsCards').innerHTML = "";
    if (localStorage.length > 0) {
        document.getElementById('noBagItems').innerText = "(" + localStorage.length + " منتجات)";

        for (let index = 0; index < localStorage.length; index++) {
            let Product = localStorage.getItem(localStorage.key(index)).split(',');
            totalPrice += Number(Product[2].slice(0, Product[2].indexOf("<sub>")));
            let item = '<div class="shoppingItem" id="Product' + (index + 1) + '">' +
                '<div class="itemBody">' +
                '<div>' +
                '<img src="' + Product[0] + '" class="icon">' +
                '</div>' +
                '<div class="content">' +
                '<h1>' + Product[1] + '</h1>' +
                '<p>منتج قابل للخصم لحاملي بطاقة خصم جرير</p>' +
                '<div class="note">' +
                '<p> <b>ملاحظة: </b> هذا المنتج رقمي وسيتم توصيلة من خلال البريد الإلكتروني </p>' +
                '<a href="#">كيفية الحصول على المنتج ؟</a>' +
                '</div>' +
                '</div>' +
                '<div class="price">' +
                '<h1 >' + Product[2] + '</h1>' +
                '<select name="" id="">' +
                '<option value="1">1</option>' +
                '<option value="2">2</option>' +
                '<option value="3">3</option>' +
                '<option value="4">4</option>' +
                '<option value="5">5</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<hr>' +
                '<div class="itemFooter">' +
                '<ul>' +
                '<li onclick="deleteProduct(\'Product' + (index + 1) + '\')" style="cursor:pointer;">احذف</li>' +
                '</ul>' +
                '</div>' +
                '</div>';
            document.getElementById('itemsCards').innerHTML =
                document.getElementById('itemsCards').innerHTML + item;

        }
    } else
        document.getElementById('itemsCards').innerHTML = "<h1 style='color:red'>السلة فارغة</h1>";

    document.getElementById('totalPrice').innerHTML = totalPrice + "<sub>ر.س.</sub>";
    document.getElementById('allTotalPrices').innerHTML = totalPrice + "<sub class='red'>ر.س.</sub>";
}

const deleteProduct = id => {
    document.getElementById(id).remove();
    localStorage.removeItem(id);
    location.reload();
}



// Change Language Section 

const changeLanguage = () => {
    var btn = document.getElementById("languageBtn");
    var page = document.getElementById('pageStyle');

    if (btn.innerText.toUpperCase().includes("English".toUpperCase())) {

        page.setAttribute("href", "assets/css/englishStyle.css");
        btn.innerHTML = '<img src="assets/icons/Arabic.svg" alt=""> Arabic';

    } else if (btn.innerText.toUpperCase().includes("Arabic".toUpperCase())) {

        page.setAttribute("href", "assets/css/arabicStyle.css");
        btn.innerHTML = '<img src="assets/icons/English.svg" alt=""> English';

    }
}


// Toggle Navbar Menu

const toggleMenue = () => {

    var menue = document.getElementById('menueList');
    var menuNav = document.getElementById('menuNav');
    if (menue.classList.contains("naving")) {
        menue.classList.remove("naving");
        document.getElementById('menueBtn').style.position = "sticky";
    } else {
        menue.classList.add("naving");
        document.getElementById('menueBtn').style.position = "fixed";
    }

    if (menuNav.classList.contains("naving2"))
        menuNav.classList.remove("naving2");
    else
        menuNav.classList.add("naving2");
}


// Carousel Section

var currentSlide = 0;

const nextPrev = direction => {
    if (direction == 1) currentSlide++;
    else if (direction == -1) currentSlide--;

    let slides = document.getElementsByClassName('carouselSlider');
    let icons = document.getElementsByClassName('carouselIcon');

    for (const slide of slides) slide.style = "flex:0";
    for (const icon of icons) icon.classList.remove("activeCarousel");

    currentSlide =
        currentSlide > (slides.length - 1) ? 0 :
        currentSlide < 0 ? slides.length - 1 : currentSlide;

    slides[currentSlide].style = "flex:1";
    icons[currentSlide].classList.add("activeCarousel");


}

const showSlides = () => {

    let slides = document.getElementsByClassName('carouselSlider');
    let icons = document.getElementsByClassName('carouselIcon');

    for (const slide of slides) slide.style = "flex:0";
    for (const icon of icons) icon.classList.remove("activeCarousel");

    slides[currentSlide].style = "flex:1";
    icons[currentSlide].classList.add("activeCarousel");

    currentSlide = currentSlide >= (slides.length - 1) ? 0 : currentSlide + 1;
    setTimeout(showSlides, 5000);

}

showSlides(0);