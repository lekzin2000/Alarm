let timeHour = document.getElementById('timeHour');
let textBox = document.getElementById('reminder');
let setBtn = document.getElementById('setBtn');
let currentTime = document.getElementById('currentTime');
let alarms = document.getElementById('alarms')
let show = document.getElementById('show')
let showCard = document.getElementById('showCard')
let alarmArr = [];
let dataStorage = ''
let dataInput = localStorage.getItem('dataStorage') ? JSON.parse(localStorage.getItem('dataStorage')) : []
seen(dataInput)

function displayCurrentTime() {
    let currTime = new Date();
    // console.log(currTime);
    let hrs = currTime.getHours();
    let mint = String(currTime.getMinutes()).padStart(2, '0');
    let secs = String(currTime.getSeconds()).padStart(2, '0');
    let period = 'AM';

    if (hrs >= 12) {
        period = 'PM';
        if (hrs > 12) {
            hrs -= 12;
        }
    }

    hrs = String(hrs).padStart(2, '0');
    currentTime.innerHTML = `${hrs}:${mint}:${secs} ${period}`;
}

function setAlarmBtn() {
    let now = new Date();
    let hrs = now.getHours();
    let mint = now.getMinutes();


    const [hour, min] = timeHour.value.split(':');

    if (+hour < +hrs || (+hour === +hrs && +min <= +mint)) {
        alert("Please provide a future time.");
        return;
    } else {
        alert("alarm save successfully")
    }

    const newAlarm = {
        time: timeHour.value,
        reminder: textBox.value
    };

    alarmArr.push(newAlarm);
    localStorage.setItem('dataStorage', JSON.stringify(alarmArr))
    dataInput = JSON.parse(localStorage.getItem('dataStorage'))
    seen(dataInput)
    // console.log(alarmArr);
    // alarms.innerHTML += `<h1>${newAlarm} <button onclick="clearValue()">Delete</button></h1>`

    if (alarmArr.length === 1) {
        const alarmInt = setInterval(checkAlarms, 1000);
    }

    function checkAlarms() {
        let now = new Date();
        let hrs = now.getHours();
        let mint = now.getMinutes();
        const [currentHour, currentMin] = `${hrs}:${mint}`.split(':');

        for (let i = 0; i < alarmArr.length; i++) {
            const alarm = alarmArr[i];
            const [hour, min] = alarm.time.split(':');
            if (+hour === +currentHour && +min === +currentMin) {
                let audio = document.getElementById('audio').play()
                show.innerHTML = alarm.reminder
                showCard.style.display = 'block'
                alarmArr.splice(i, 1);
                // console.log('Alarm popped:', alarm);

            }
        }

        
    }
    timeHour.value = ''
    textBox.value = ''
}


setInterval(displayCurrentTime, 1000);
displayCurrentTime();
setBtn.addEventListener('click', setAlarmBtn);
function seen(alarmArr) {
    alarms.innerHTML = ''
    alarmArr.forEach(function (el, i) {
        alarms.innerHTML += `<h4>${el.time} : ${el.reminder} <button  onclick="deleteBtn(${i})" style="background-color: red; color: white">Delete</button></h4>`
    })
    // seen()

}

function snoozeAlarm() {
    let audio = document.getElementById('audio').pause();
    showCard.style.display = 'none'; // Hide the alarm modal
    const snoozeMinutes = 1;
    let now = new Date();
    let snoozeTime = new Date(now.getTime() + snoozeMinutes * 60000);
    let hrs = String(snoozeTime.getHours()).padStart(2, '0');
    let mint = String(snoozeTime.getMinutes()).padStart(2, '0');
    const snoozeTimeFormatted = `${hrs}:${mint}`;
    timeHour.value = snoozeTimeFormatted;
    textBox.value = `snooze reminder`;
    setAlarmBtn();
}


function stopAlarm() {
    let audio = document.getElementById('audio').pause()
    showCard.style.display = 'none'
}
function deleteBtn(index) {

    alarmArr.splice(index, 1)
    alarms.innerHTML = ""
    localStorage.setItem('dataStorage', JSON.stringify(alarmArr))
    dataInput = JSON.parse(localStorage.getItem('dataStorage'))
    seen(dataInput)

}
