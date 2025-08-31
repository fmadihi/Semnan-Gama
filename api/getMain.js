// const baseUrl = window.baseUrl
$(function () {
  let depart = [];
  //get departeman
  async function getFetchDeparteman() {
    try {
      const response = await fetch(`${baseUrl}/staff/department/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      depart = data;
    } catch (error) {
      //console.log(error.message);
    }
  }
  async function fetchCourses() {
    try {
      const response = await fetch(`${baseUrl}/institute/course/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let div_currentCourses =
        document.getElementsByClassName("currentCourses");
      let slider_wrapper =
        div_currentCourses[0].getElementsByClassName("sliderWrapper");
      let slider_container =
        slider_wrapper[0].getElementsByClassName("slider-container");
      let slider_track =
        slider_container[0].getElementsByClassName("slider-track");
      depart.map((e) => {
        data.map((elem) => {
          if (elem.is_registering == true) {
            if (elem.course_department == e.id) {
              let div_Box = document.createElement("div");
              div_Box.className = "Box slide";
              let div_pic = document.createElement("div");
              //create pic div
              div_pic.className = "pic";
              let img = document.createElement("img");
              img.setAttribute("src", elem.course_picture);
              div_pic.append(img);
              div_Box.append(div_pic);
              //create info div
              let div_info = document.createElement("div");
              div_info.className = "info";
              let div_nameCourses = document.createElement("div");
              div_nameCourses.className = "nameCourses";
              let b = document.createElement("b");
              b.innerHTML = elem.course_name + " ";
              // let span = document.createElement("span");
              // span.innerHTML = e.department_name + " ";
              div_nameCourses.append(b);
              // div_nameCourses.append(span);
              div_info.append(div_nameCourses);
              div_startCourses = document.createElement("div");
              div_startCourses.className = "startCourses";

              //chanjge date to fasi
              function getPersianMonthName(dateStringSend) {
                let dateStringSolit = dateStringSend.split("T");
                let dateString = dateStringSolit[0];

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
              const courseStartDate = elem.course_start_date; // تاریخ شمسی

              const formattedDate = getPersianMonthName(courseStartDate);

              div_startCourses.innerHTML = "شروع دوره: " + formattedDate;

              div_nameCourses.append(div_startCourses);

              //create btn
              let div_btnCourses = document.createElement("div");
              div_btnCourses.className = "btnCoueses";
              let div = document.createElement("div");
              let a = document.createElement("a");
              a.innerHTML = "مشاهده اطلاعات";
              let btn_img = document.createElement("img");
              btn_img.setAttribute("src", "../image/courses/arrow-left 1.svg");

              div.append(a);
              div.append(btn_img);
              div_btnCourses.append(div);
              // div_info.append(div_btnCourses);
            div_Box.append(div_info);

              div_Box.append(div_btnCourses);

              slider_track[0].append(div_Box);

              div_btnCourses.addEventListener("click", function () {
                localStorage.setItem("selectedCourse", JSON.stringify(elem)); // ذخیره اطلاعات کامل دوره
                window.location.href = "./htm/lessen.html"; // رفتن به صفحه درس
              });
            }
          }
        });
      });

      let isregister = document.getElementById("isregister");
      let div_slider = isregister.getElementsByClassName("slider");
      let sliderWrap = div_slider[0].getElementsByClassName("sliderWrap");
      let swiWrap = sliderWrap[0].getElementsByClassName("swiWrap");

      data.map((elem) => {
        if (elem.is_active == true) {
          let swiper_slide = document.createElement("div");
          swiper_slide.className = "swiper-slide";

          let div_sliderTxt = document.createElement("div");
          div_sliderTxt.className = "sliderTXT";
          let divtxt01 = document.createElement("div");
          divtxt01.innerHTML = elem.course_name;
          let divtxt02 = document.createElement("div");
          divtxt02.innerHTML = getnamedepa(elem.course_department);
          div_sliderTxt.append(divtxt01);
          div_sliderTxt.append(divtxt02);

          let div_sliderBtn = document.createElement("div");
          div_sliderBtn.className = "sliderPcBtn";

          let divIMG = document.createElement("div");
          let imgIcon = document.createElement("img");
          imgIcon.setAttribute("src", "");
          divIMG.append(imgIcon);
          div_sliderBtn.append(divIMG);

          let divin = document.createElement("div");
          let span = document.createElement("span");
          span.innerHTML = "مشاهده دوره";
          let img = document.createElement("img");
          img.setAttribute("src", "../image/CourseSlider/Vector.svg");
          divin.append(span);
          divin.append(img);
          div_sliderBtn.append(divin);

          swiper_slide.append(div_sliderTxt);
          swiper_slide.append(div_sliderBtn);
          swiWrap[0].append(swiper_slide);

          divin.addEventListener("click", function () {
            localStorage.setItem("selectedCourse", JSON.stringify(elem)); // ذخیره اطلاعات کامل دوره
            window.location.href = "./htm/lessen.html"; // رفتن به صفحه درس
          });
        }
      });

      let isCompleted = document.getElementById("isCompleted");
      let div_slider02 = isCompleted.getElementsByClassName("slider");
      let sliderWrap02 = div_slider02[0].getElementsByClassName("sliderWrap02");
      let swiWrap02 = sliderWrap02[0].getElementsByClassName("swiWrap02");

      data.map((elem) => {
        if (elem.is_completing_registering == true) {
          let swiper_slide = document.createElement("div");
          swiper_slide.className = "swiper-slide swiper-slide02";

          let div_sliderTxt = document.createElement("div");
          div_sliderTxt.className = "sliderTXT";
          let divtxt01 = document.createElement("div");
          divtxt01.innerHTML = elem.course_name;
          let divtxt02 = document.createElement("div");
          divtxt02.innerHTML = getnamedepa(elem.course_department);
          div_sliderTxt.append(divtxt01);
          div_sliderTxt.append(divtxt02);

          swiper_slide.append(div_sliderTxt);
          swiWrap02[0].append(swiper_slide);
        }
      });
    } catch (error) {
      // console.log(error.message);
    }
  }

  function getnamedepa(id) {
    const e = depart.find((d) => d.id === id);
    return e ? e.department_name : "نامشخص";
  }
  async function getdata() {
    await getFetchDeparteman();
    await fetchCourses();
  }
  getdata();
});
