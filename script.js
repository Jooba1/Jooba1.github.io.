"use strict";

const date = document.querySelector(".date");
const date2 = document.querySelector(".date-first");
const Get_Month = document.getElementById("Month-choice");
const Get_Day = document.getElementById("number");
const BUTTON = document.querySelector("button");
const dis1 = document.querySelector(".dis1");
const dis2 = document.querySelector(".dis2");
const dis3 = document.querySelector(".dis3");
const diss1 = document.getElementById("diss1");
const diss2 = document.getElementById("diss2");
let now, hour, minutes, seconds, RemHour, RemMin, RemSec, TimeStep;
let Month, Day, TimeStep2, Year, UI, M1, M2, D1, D2;

const DaysInMonths = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
};

const MonthinDays = {
  იანვარი: 0,
  თებერვალი: 1,
  მარტი: 2,
  აპრილი: 3,
  მაისი: 4,
  ივნისი: 5,
  ივლისი: 6,
  აგვისტო: 7,
  სექტემბერი: 8,
  ოქტომბერი: 9,
  ნოემბერი: 10,
  დეკემბერი: 11,
};

const UIMONTH = [];

// იუზერმა უნდა შემოიტანოს თავისი დაბადების რიცხვი და დღე

BUTTON.addEventListener("click", function () {
  if (Get_Month.value != "" && Get_Day.value != "") {
    const YEAR = 2021;
    const MM = MonthinDays[Get_Month.value];
    const DD = Number(Get_Day.value);
    console.log(MM, DD);
    UI = new Date(YEAR, MM, DD);
    console.log(UI);
    M2 = UI.getMonth();
    D2 = UI.getDate();
    dis1.style.display = "none";
    dis2.style.display = "none";
    dis3.style.display = "none";
    diss1.style.display = "flex";
    diss2.style.display = "flex";
    Working_First();
  }
});

const DATE_OUTPUT = function () {
  // რამდენი დღეა რემაინდერებით
  let DAY = DaysInMonths[M1] - D1 + D2;
  // ვადგენ თუ დღეების რაოდენობა მოცემულ თვეზე ნაკლებია მაშინ ვტოვებ დღეების რაოდენობას თუარადა ერთ თვეს ვუმატებ
  if (DaysInMonths[M1] - DAY < 0) {
    Day = Math.abs(DaysInMonths[M1] - DAY);
    Month = UIMONTH.length + 1;
  } else {
    Day = DAY;
    Month = UIMONTH.length;
  }
  Day = String(Day).padStart(2, 0);
  Month = String(Month).padStart(2, 0);

  console.log(Day);
  console.log(Month);
  date2.textContent = `თვე: ${Month} / დღე: ${Day}`;
};

const Final_OUTPUT = function () {
  Day--;
  let DAY = DaysInMonths[UIMONTH[0]] - D1 + D2;
  if (Day == 0) {
    Month--;
    UIMONTH.shift();
    UIMONTH.length == 0 ? (Day = 0) : (Day = UIMONTH[0]);
  } else if (DaysInMonths[UIMONTH[0]] - DAY < 0) {
    Day = Math.abs(DaysInMonths[UIMONTH[0]] - DAY);
    Month = UIMONTH.length + 1;
  } else {
    Day = DAY;
    Month = UIMONTH.length;
  }
  Day = String(Day).padStart(2, 0);
  Month = String(Month).padStart(2, 0);
  date2.textContent = `თვე: ${Month} / დღე: ${Day}`;
};

const Working_First = function () {
  //ვითვლი სულ რამდენი დღეა დღევანდელ დღესა და იუზერის დაბადების დღეს შორის
  const calcdaypasses = (date1, date2) =>
    Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

  //დღევანდელი დღე
  const today = new Date();
  M1 = today.getMonth();
  D1 = today.getDate();

  //ამ ცვლადშია სულ რამდენი დღეა დარცენილი დღესა და უიზერის დაბადებისდღეს შორის
  TimeStep2 = calcdaypasses(new Date(2021, M1, D1), UI);

  // რამდენი თვეა

  if (M1 > M2) {
    for (let i = M1 + 1; i <= 11; i++) {
      UIMONTH.push(i);
    }
    for (let i = 0; i < M2; i++) {
      UIMONTH.push(i);
    }
  } else {
    for (let i = M1 + 1; i < M2; i++) {
      UIMONTH.push(i);
    }
  }

  //გამობეჭდვა გამზადებული თვისა და დღის
  DATE_OUTPUT();
};

//როცა უკვე ახალ თვეზე გადავდივართ ანუ უნდა დავადგინოტ ახლა რამდენი დღე უნდა დავწეროთ დრეების გრაფაში
const Go_Month = function () {};

//აქითკენ ვითვლი რამდენი ხანი დარჩა ამ დღის დასრულებამდე
const Working = function (Date) {
  //ერთხელ შემოვა დრო, როდესაც უსერი გახსნის ჩემ ვებს და დავიჭერ იმ წამს
  now = Date;
  hour = now.getHours();
  minutes = now.getUTCMinutes();
  seconds = now.getSeconds();
  //გამოვიანგაროშოთ რამდენი საათი, წუთი და წამი დარჩა დღის დასრულებამდე
  RemHour = 12 - (hour - 12);
  RemMin = 60 - minutes;
  RemSec = 60 - seconds;
  //გადავიყვანოთ მოცემული პარამეტრები წამებში რადგან შევძლოთ დროის უკუთვლა
  TimeStep = RemHour * 3600 + RemMin * 60 + RemSec;
};

const CalcRemOfDay = function () {
  const timer = setInterval(function () {
    //ვამზადებ თამფლეთ ლითერალში ჩასასმელად მონაცემემბს
    let HOUR = String(Math.trunc(TimeStep / 3600)).padStart(2, 0);
    let MIN = String(Math.trunc((TimeStep - HOUR * 3600) / 60)).padStart(2, 0);
    let SEC = String((TimeStep - HOUR * 3600 - MIN * 60) % 60).padStart(2, 0);
    date.textContent = `საათი: ${HOUR} / წუთი: ${MIN} / წამი: ${SEC}`;
    if (TimeStep == 0) {
      //რესტარტი ყოველი დღის
      Working(new Date());
      //გამობეჭდვა გამზადებული თვისა და დღის
      Final_OUTPUT();
    }
    TimeStep--;
  }, 1000);
};
// Working_First();
Working(new Date());
CalcRemOfDay();

// ***********************************************************************************
