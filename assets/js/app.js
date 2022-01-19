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