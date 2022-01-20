const disapleAll = () => {
    var elements = document.getElementsByClassName("input");
    for (const item of elements) {
        item.disabled = true;
    }

    document.getElementById("nextBtn").style.display = "none";
}

const disapleAllExcept = name => {
    var elements = document.getElementsByClassName("input");
    for (const item of elements) {
        if (item.id != name.id)
            item.disabled = true;
    }

    document.getElementById("nextBtn").style.display = "none";
}

const enableItem = id => document.getElementById(id).disabled = false;

const enableItems = ids => {
    for (const id of ids) {
        enableItem(id);
    }
}

const validateName = name => {
    if (name.value.length > 3 && name.value.length < 10) {
        name.classList.add('inputSuccessLightThem');
        if (name.id != "lastName")
            document.getElementById('lastName').disabled = false;
        else
            document.getElementById('email').disabled = false;
    } else {
        name.classList.remove('inputSuccessLightThem');
        disapleAllExcept(name);
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
    }
}


const validatePhone = phone => {
    if (phone.value.startsWith('777') && phone.value.length == 9) {
        phone.classList.add('inputSuccessLightThem');
        document.getElementById('cardName').disabled = false;
        document.getElementById("nextBtn").style.display = "block";
        document.getElementsByClassName("step")[currentTab].className += " finish";
    } else {
        phone.classList.remove('inputSuccessLightThem');
        disapleAllExcept(phone);
        enableItems(['firstName', 'lastName', 'email']);
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
    }
}


const validateCardNumber = number => {
    if (number.value.length > 5) {
        number.classList.add('inputSuccessLightThem');
        document.getElementById('Address').disabled = false;
        document.getElementById("nextBtn").style.display = "block";
        document.getElementsByClassName("step")[currentTab].className += " finish";
    } else {
        number.classList.remove('inputSuccessLightThem');
        disapleAllExcept(number);
        enableItems(['firstName', 'lastName', 'email', 'Phone', 'cardName']);
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
    }
}

const validateCity = city => {
    if (city.value.length > 3) {
        city.classList.add('inputSuccessLightThem');
        document.getElementById("nextBtn").style.display = "block";
        document.getElementsByClassName("step")[currentTab].className += " finish";
    } else {
        city.classList.remove('inputSuccessLightThem');
        disapleAllExcept(city);
        enableItems(['firstName', 'lastName', 'email', 'Phone', 'cardName', 'cardNumber', 'Address']);
    }
}


var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
        document.getElementById("nextBtn").style.display = "block";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    fixStepIndicator(n)
}

function nextPrev(n) {

    var x = document.getElementsByClassName("tab");
    if (n == -1) {
        document.getElementsByClassName('containerForm')[0].style.transform = "rotate(" + (currentTab - 1) * 360 + "deg)";
        document.getElementById("nextBtn").style.display = "block";
        document.getElementById("myControls").classList.add("both");
    } else {
        document.getElementsByClassName('containerForm')[0].style.transform = "rotate(" + (currentTab + 1) * 360 + "deg)";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("myControls").classList.remove("both");
    }
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById("checkoutForm").submit();
        return false;
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