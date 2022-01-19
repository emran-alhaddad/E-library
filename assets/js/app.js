const showModule = id => document.getElementById(id).style.visibility = "visible";
const hideModule = id => document.getElementById(id).style.visibility = "hidden";

const LastOffers = () => {
    var countDownDate = new Date("Jan 22, 2022 21:47:55").getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("lastOffers").innerHTML = days + "d " + hours + "h " +
            minutes + "m " + seconds + "s ";
        document.getElementById("lastOffers").style.color = "blue";
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("lastOffers").innerHTML = "EXPIRED";
            document.getElementById("lastOffers").style.color = "red";
        }
    }, 1000);
}