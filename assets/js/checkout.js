let isValidTab1 = false;
let isValidTab2 = false;
let isValidTab3 = false;


const disapleAll = () => {
    var elements = document.getElementsByClassName("input");
    for (const item of elements) {
        item.disabled = true;
    }

    document.getElementById("nextBtn").style.visibility = "hidden";
}

const disapleAllExcept = name => {
    var elements = document.getElementsByClassName("input");
    for (const item of elements) {
        if (item.id != name.id)
            item.disabled = true;
    }

    document.getElementById("nextBtn").style.visibility = "hidden";

}

const enableItem = id => document.getElementById(id).disabled = false;

const enableItems = ids => {
    for (const id of ids) {
        enableItem(id);
    }
}

const validateName = name => {
    if (name.value.length > 3 && name.value.length < 30) {
        name.classList.add('inputSuccessLightThem');
        if (name.id != "lastName")
            document.getElementById('lastName').disabled = false;
        else
            document.getElementById('email').disabled = false;
    } else {
        name.classList.remove('inputSuccessLightThem');
        disapleAllExcept(name);
        isValidTab1 = false;

    }
}


const validateEmail = (email) => {
    if (String(email.value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
        email.classList.add('inputSuccessLightThem');
        document.getElementById('Phone').disabled = false;
    } else {
        email.classList.remove('inputSuccessLightThem');
        disapleAllExcept(email);
        enableItems(['firstName', 'lastName']);
        isValidTab1 = false;
    }
}


const validatePhone = phone => {
    if (phone.value.startsWith('777') && phone.value.length == 9) {
        phone.classList.add('inputSuccessLightThem');
        document.getElementById('cardName').disabled = false;
        document.getElementById("nextBtn").style.visibility = "visible";
        document.getElementsByClassName("step")[currentTab].className += " finish";
        isValidTab1 = true;
    } else {
        phone.classList.remove('inputSuccessLightThem');
        disapleAllExcept(phone);
        enableItems(['firstName', 'lastName', 'email']);
        isValidTab1 = false;
    }
}

const validateCardName = name => {
    if (name.value.length > 3 && name.value.length < 10) {
        name.classList.add('inputSuccessLightThem');
        document.getElementById('cardNumber').disabled = false;
    } else {
        name.classList.remove('inputSuccessLightThem');
        disapleAllExcept(name);
        enableItems(['firstName', 'lastName', 'email', 'Phone']);
        isValidTab2 = false;
    }
}


const validateCardNumber = number => {
    if (number.value.match(/[0-9]{5,10}/)) {
        number.classList.add('inputSuccessLightThem');
        document.getElementById('Address').disabled = false;
        document.getElementById("nextBtn").style.visibility = "visible";
        document.getElementsByClassName("step")[currentTab].className += " finish";
        isValidTab2 = true;
    } else {
        number.classList.remove('inputSuccessLightThem');
        disapleAllExcept(number);
        enableItems(['firstName', 'lastName', 'email', 'Phone', 'cardName']);
        isValidTab2 = false;
    }
}


const validateAddress = address => {
    if (address.value.length > 5) {
        address.classList.add('inputSuccessLightThem');
        document.getElementById('City').disabled = false;
    } else {
        address.classList.remove('inputSuccessLightThem');
        disapleAllExcept(address);
        enableItems(['firstName', 'lastName', 'email', 'Phone', 'cardName', 'cardNumber']);
        isValidTab3 = false;
    }
}

const validateCity = city => {
    if (city.value.length > 3) {
        city.classList.add('inputSuccessLightThem');
        document.getElementById("nextBtn").style.visibility = "visible";
        document.getElementsByClassName("step")[currentTab].className += " finish";
        isValidTab3 = true;
    } else {
        city.classList.remove('inputSuccessLightThem');
        disapleAllExcept(city);
        enableItems(['firstName', 'lastName', 'email', 'Phone', 'cardName', 'cardNumber', 'Address']);
        isValidTab3 = false;
    }
}


var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    if (n == 0) {
        document.getElementById("prevBtn").style.visibility = "hidden";
    } else {
        document.getElementById("prevBtn").style.visibility = "visible";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "تأكيد الدفع";
        document.getElementById("nextBtn").style.visibility = "visible";
        document.getElementById("lastTab").style.display = "flex";
    } else {
        document.getElementById("nextBtn").innerHTML = "التالي";
    }
    fixStepIndicator(n)
}

function nextPrevCheckout(n) {

    var x = document.getElementsByClassName("tab");
    if (n == -1) {
        document.getElementsByClassName('containerForm')[0].style.transform = "rotate(" + (currentTab - 1) * 360 + "deg)";
        document.getElementById("nextBtn").style.visibility = "visible";
    } else {
        document.getElementsByClassName('containerForm')[0].style.transform = "rotate(" + (currentTab + 1) * 360 + "deg)";
        document.getElementById("nextBtn").style.visibility = "hidden";
    }
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        localStorage.clear();
        document.getElementById("checkoutForm").submit();
        return false;
    }

    switch (currentTab) {
        case 0:
            if (isValidTab1)
                document.getElementById("nextBtn").style.visibility = "visible";
            else
                document.getElementById("nextBtn").style.visibility = "hidden";
            break;

        case 1:
            if (isValidTab2)
                document.getElementById("nextBtn").style.visibility = "visible";
            else
                document.getElementById("nextBtn").style.visibility = "hidden";
            break;

        case 2:
            if (isValidTab3)
                document.getElementById("nextBtn").style.visibility = "visible";
            else
                document.getElementById("nextBtn").style.visibility = "hidden";
            break;
    }

    showTab(currentTab);
}


function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}


disapleAll();