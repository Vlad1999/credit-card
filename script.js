const m = document.getElementById("month");
const y = document.getElementById("year");

let cardForm = document.getElementById("cc-form");

let numberInput = document.getElementById("number");
let numberLabel = document.getElementById("cardNumber");
let cardType = document.querySelector(".cc-item-typeImg");
let holdersInput = document.getElementById("holders");
let fullName = document.getElementById("fullName");
let monthLabel = document.getElementById("m");
let yearLabel = document.getElementById("y");
let card = document.querySelector('.cc');
let cvvBand = document.getElementById("cvvBand");
let cvv = document.getElementById("cvv");

for(let i = 1; i <= 12; i++){
    const month = document.createElement("option");
    month.textContent = i;
    m.appendChild(month);
}
for(let i = 2022; i >= 1900; i--){
    const year = document.createElement("option");
    year.textContent = i;
    y.appendChild(year);
}

cvv.addEventListener('focus', function() {
    card.classList.toggle('is-flipped');
});
cvv.addEventListener('blur', function() {
    card.classList.toggle('is-flipped');
});
cvv.addEventListener("input", e=>{
    cvvBand.textContent =e.target.value.replace(/[0-9]/gi, "*");
});

let prev = 0;
let curr = 0;

numberInput.addEventListener("input", e => {
    numberInput.value =  cc_format(e.target.value);

    prev = curr;
    curr = e.target.value.length;
        
    if(prev > curr){
        curr++;
        if(curr === 5 || curr === 10 || curr === 15) {
            effect(numberLabel.children[curr], "#")
            effect(numberLabel.children[curr-1]," ")
        } else{ 
            effect(numberLabel.children[curr-1],"#")
        }
    }else{
        if (curr > 4 && curr < 15){
            effect(numberLabel.children[curr-1],'*')
        }else{
            effect(numberLabel.children[curr-1],numberInput.value[curr-1])
        }
    }
    
    if(curr > 2){
        if(e.target.value.slice(0,1) === "3"){
            cardType.src = "images/amex.png";
        } else if(e.target.value.slice(0,1) === "4"){
            cardType.src = "images/visa.png";
        }else if(e.target.value.slice(0,1) === "5"){
            cardType.src = "images/mastercard.png";
        }else if(e.target.value.slice(0,1) === "6"){
            cardType.src = "images/discover.png";
        } else{
            cardType.src = "images/visa.png";
        }
    }
});

holdersInput.addEventListener("input", e => {
    if (e.target.value.length === 0) {
        effect(fullName, "FULL NAME")
    } else {
        fullName.textContent = e.target.value;
    }
});

m.addEventListener("change", e => {
    if (e.target.value.length === 0) {
        effect(monthLabel, "MM")
    } else {
        if (e.target.value.length === 1){
            effect(monthLabel, "0"+e.target.value)
        }else {
            effect(monthLabel, e.target.value)
        }
    }
});
y.addEventListener("change", e => {
    if (e.target.value.length === 0) {
        effect(yearLabel, "YY")
    } else {
        effect(yearLabel, e.target.value.slice(-2))
    }
});


function cc_format(value) {
    var val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = val.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }
    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
}

function checkDigit(event) {
    var code = (event.which) ? event.which : event.keyCode;
    if ((code < 48 || code > 57) && (code > 31)) {
        return false;
    }
    return true;
}

function effect(el, val) {
    el.style.transform = "translateY(-30%)";
    el.style.opacity = "0";
    el.style.visibility = "hidden";
    window.setTimeout(() => {
        el.textContent = val;
        el.style.transform = "translateY(30%)";
        window.setTimeout(() => {
            el.style.opacity = "1";
            el.style.visibility = "visible";
            el.style.transform = "translateY(0)";
        }, 70);
    }, 70);
}