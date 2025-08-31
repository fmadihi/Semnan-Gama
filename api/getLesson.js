const baseUrl = window.baseUrl;
let timer;
$(function () {
  let depart = {};
  let lessons = {};
  let fullName = document.getElementById("FullName");
  let PhoneNum = document.getElementById("PhoneNum");
  $("#send").on("click", function () {
    if (
      (fullName.value == "" || fullName.value == undefined) &&
      (PhoneNum.value == "" || PhoneNum.value == undefined)
    ) {
      alert("لطفا فیلد ها را پر نمایید.");
    } else if (fullName.value == "" || fullName.value == undefined) {
      alert("لطفا نام خود را بنویسید.");
    } else if (PhoneNum.value == "" || PhoneNum.value == undefined) {
      alert("لطفا شماره تماس خود را بنویسید.");
    } else {
      const newComment = {
        full_name: fullName.value,
        phone_number: PhoneNum.value,
        course: courseData.id,
      };

      postComment(newComment);
    }
  });

  async function postComment(commentData) {
    try {
      const response = await fetch(`${baseUrl}/institute/registeration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
        // اگر کوکی لازمه اضافه کنید:
        // credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert("ثبت نام شما با موفقیت انجام شد.");
      return result;
    } catch (error) {
      alert("مشکلی پیش آمده است، لطفا با پشتیبانی تماس بگیرید.");
    }
  }

  const courseData = JSON.parse(localStorage.getItem("selectedCourse"));
  // نمایش اطلاعات دوره در صفحه
  $(".info_title").text(courseData.course_name);
  $(".courses_data_time>div>span.hours").text(courseData.course_time_hour);
  $(".courses_data_time>div>span.sessions").text(
    courseData.course_session_number
  );

  async function showDepartmentName() {
    const depName = await getnamedepa(courseData.course_department);
    $(".info_title02").text(depName || "بدون دسته‌بندی");
  }

  // showDepartmentName();

  //سر فصل ها
  let courseId = courseData.id;

  async function getFetchHead() {
    try {
      const response = await fetch(`${baseUrl}/institute/headline_course/`);
      if (!response.ok) {
        //console.log(response.status);
      }

      const data = await response.json();
      let courses_season = document.getElementsByClassName("courses_season");

      data.map((elem, index) => {
        if (elem.course == courseId) {
          let seasonPartOne = document.createElement("div");
          seasonPartOne.classList = "partOne";

          let sessonOne = document.createElement("div");
          sessonOne.classList = "seseanOne";

          let divSeseanN = document.createElement("div");
          divSeseanN.classList = "one";

          let sessonName = document.createElement("div");
          sessonName.innerHTML = elem.headline_name;

          divSeseanN.append(sessonName);
          sessonOne.append(divSeseanN);

          let divTwo = document.createElement("div");
          divTwo.className = "two";
          if (lessons.length > 0) {
            lessons.map((e) => {
              if (e.headline == elem.id) {
                let divLesson = document.createElement("div");
                divLesson.innerHTML = e.lesson_name;

                divTwo.append(divLesson);
                sessonOne.append(divTwo);
              }
            });
          }
          seasonPartOne.append(sessonOne);

          let seseanOneExam = document.createElement("div");
          seseanOneExam.classList = "seseanOneExam";
          seseanOneExam.innerHTML = `آزمون فصل ${index + 1}`;
          seseanOneExam.style.visibility="hidden"
          seasonPartOne.append(seseanOneExam);

          courses_season[0].append(seasonPartOne);
        }
      });
    } catch (error) {
      //console.log(error.message);
    }
  }

  // درس ها
  async function getFetchLessen() {
    try {
      const response = await fetch(`${baseUrl}/institute/lessons_headline/`);
      if (!response.ok) {
        //console.log(response.status);
      }

      const data = await response.json();
      lessons = data;

      data.map((elem) => {});
    } catch (error) {
      //console.log(error.message);
    }
  }

  // تبدیل تاریخ به شمسی
  // const date = new Date(courseData.course_start_date);
  // const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  // });
  // const formattedDate = formatter.format(date);
  
function getPersianMonthName(dateStringSend) {
    let dateStringSolit = dateStringSend.split('T')
    let dateString = dateStringSolit[0]

    // تاریخ ورودی به فرمت "yyyy-mm-dd" (مثال: "1404-04-03")
    const [year, month, day] = dateString.split("-");

    const months = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    // تبدیل شماره ماه به نام ماه
    const monthName = months[parseInt(month) - 1]; // ماه‌ها از 1 شروع می‌شوند
    const valDate = day + " " + monthName + " " + year;
    return valDate;
  }
  // استفاده از تابع
  const courseStartDate = courseData.course_start_date; // تاریخ شمسی
  const formattedDate = getPersianMonthName(courseStartDate);

  $(".start_lessen").text("شروع دوره: " + formattedDate);
  $(".star_rate").text(courseData.rank);

  $(".course_img .pic img").attr("src", courseData.course_picture);
  $(".course_description_txt").text(
    courseData.about_course || "توضیحی ثبت نشده"
  );
  $(".age").text(`مناسب برای گروه سنی ${courseData.course_age}`);

  async function getFetchDeparteman() {
    try {
      const response = await fetch(`${baseUrl}/staff/department/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      depart = data;
    } catch (error) {
      document.getElementById(
        "courseList"
      ).textContent = `خطا در دریافت اطلاعات: ${error.message}`;
    }
  }
  async function getnamedepa(id) {
    await getFetchDeparteman();
    const e = depart.find((d) => d.id === id);
    return e ? e.department_name : "نامشخص";
  }


 async function startCountdown(startDate) {
    const countdownElement = $(".start_time_show");

    function updateTimer() {
      const now = new Date();

      // تبدیل تاریخ به شمسی
      // const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      //   day: "numeric",
      //   month: "long",
      //   year: "numeric",
      //   numberingSystem: "latn",
      // });
      const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        day: "2-digit", // نمایش روز به صورت عددی (دو رقمی)
        month: "2-digit", // نمایش ماه به صورت عددی (دو رقمی)
        year: "numeric", // نمایش سال به صورت عددی
        hour: "2-digit", // نمایش ساعت
        minute: "2-digit", // نمایش دقیقه
        second: "2-digit", // نمایش ثانیه
        numberingSystem: "latn", // اعداد به صورت لاتین (انگلیسی)
        hour12: false, // ساعت 24 ساعته
      });
      const formattedDate = formatter.format(now);

      const d = formattedDate.split("/");

      const d2 = d[2].split(",");
      var maind = d[0] + "-" + d[1] + "-" + d2[0] + "T" + d2[1] + "+0000";
      let x = maind.split(" ");
      let maindata = x[0] + x[1];

      const diff = new Date(startDate) - new Date(maindata); // میلی‌ثانیه
      if (diff <= 0) {
        countdownElement.text("شروع شده");
        clearInterval(timer);
        return;
      }

      // محاسبه ساعت، دقیقه و ثانیه باقی‌مانده
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      countdownElement.text(`${hours}:${minutes}:${seconds}`);
    }

    updateTimer(); // برای بار اول بدون تأخیر نمایش بده
    timer = setInterval(updateTimer, 1000);
  }
    async function getdata() {
    await showDepartmentName();
    await getFetchDeparteman();
    await getFetchLessen();
    await getFetchHead();
    await startCountdown(courseData.course_start_date);
  }
  getdata();
});
