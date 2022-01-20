const showModule = id => document.getElementById(id).style.visibility = "visible";
const hideModule = id => document.getElementById(id).style.visibility = "hidden";


const LastOffers = (date, id) => {
    var countDownDate = new Date(date).getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById(id).innerHTML = days + "d " + hours + "h " +
            minutes + "m " + seconds + "s ";
        if (distance < 0) {
            clearInterval(x);
            document.getElementById(id).innerHTML = "EXPIRED";
            document.getElementById(id).style.color = "red";
        }
    }, 1000);
}

const allCounters = () => {
    LastOffers("Jan 22, 2022 21:47:55", "lastOffers1");
    LastOffers("Jan 21, 2022 00:47:55", "lastOffers2");
    LastOffers("Jan 19, 2022 23:47:55", "lastOffers3");
    LastOffers("Jan 20, 2022 00:00:00", "lastOffers4");
    LastOffers("Jan 25, 2022 08:20:00", "lastOffers5");

}


// Search Code
function search_books() {
    let input = document.getElementById('search').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('BoookTitle');


    if (input.length > 0)
        hide_Show_Others('none');
    else
        hide_Show_Others('initial');

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

const AddProduct = () => {

    if (noProducts > 0) {
        document.getElementById('BagCounter').style.visibility = "visible";
        document.getElementById('BagCounter').innerText = noProducts;
        document.getElementById('BagCounter').style.visibility = "visible";
        document.getElementById('BagImage').src = "assets/icons/BagFull.svg";
    } else {
        document.getElementById('BagCounter').style.visibility = "hidden";
        document.getElementById('BagImage').src = "assets/icons/svgexport-51.svg";
    }
}

var btns = document.getElementsByClassName('origin');
for (const btn of btns) {

    btn.addEventListener("click", function() {
        noProducts++;
        AddProduct();
        localStorage.setItem('noProducts', noProducts);
    });
}

var noProducts = (localStorage.length > 0 ? Number(localStorage.getItem('noProducts')) : 0);
AddProduct();