const baseUrl = window.baseUrl;
$(function () {
  let departemanData = [];
  let coursesOb;
  //get departeman
  async function getFetchDeparteman() {
    try {
      const response = await fetch(`${baseUrl}/staff/department/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let main = document.getElementsByTagName("main");
      data.map((elem) => {
        let div_partOne = document.createElement("div");
        div_partOne.className = `partOne dep_${elem.id}`;
        main[0].append(div_partOne);
        let div_partOneTitle = document.createElement("div");
        div_partOneTitle.className = "partOneTitle";
        div_partOneTitle.innerHTML = elem.department_name;
        div_partOne.append(div_partOneTitle);

        departemanData.push(elem);
      });
    } catch (error) {
      document.getElementById(
        "courseList"
      ).textContent = `خطا در دریافت اطلاعات: ${error.message}`;
    }
  }

  //get course data  from back

  async function fetchCourses() {
    try {
      const response = await fetch(`${baseUrl}/institute/course/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      coursesOb = data;
      let div_partOne = document.getElementsByClassName("partOne");
      departemanData.map((e) => {
        data.map((elem) => {
          if (elem.course_department == e.id) {
            //get main div
            let div_dep = document.getElementsByClassName(`dep_${e.id}`);
            let div_Box = document.createElement("div");
            //create box course
            div_Box.className = "Box";
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
            let span = document.createElement("span");
            span.innerHTML = e.department_name + " ";
            div_nameCourses.append(b);
            div_nameCourses.append(span);
            div_info.append(div_nameCourses);
            let div_startCourses = document.createElement("div");
            div_startCourses.className = "startCourses";

            //chanjge date to date and time

            function getPersianMonthName(dateStringSend) {
    let dateStringSolit = dateStringSend.split('T')
    let dateString = dateStringSolit[0]

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
            div_info.append(div_btnCourses);

            div_Box.append(div_info);

            div_dep[0].append(div_Box);

            div_btnCourses.addEventListener("click", function () {
              localStorage.setItem("selectedCourse", JSON.stringify(elem)); // ذخیره اطلاعات کامل دوره
              window.location.href = "./lessen.html"; // رفتن به صفحه درس
            });
          }
        });
      });
    } catch (error) {
      // console.log(error.message);
    }
  }
  let searchTxt;
  async function serachData() {
    //search code
    setTimeout(() => {
      const searchInput = document.getElementById("searchInput");
      const courseBoxes = document.querySelectorAll(".Box");
      const partOneTitles = document.querySelectorAll(".partOneTitle");

      let getTXt = JSON.parse(localStorage.getItem("SearchText"));
      if (getTXt) {
        searchTxt = getTXt.toLowerCase();
      }
      if (searchTxt) {
        if (searchTxt.trim() !== "") {
          partOneTitles.forEach((title) => {
            title.style.display = "none";
          });
        } else {
          partOneTitles.forEach((title) => {
            title.style.display = "block";
          });
        }
        const offsetTop =
          searchInput.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: offsetTop - 50, // فاصله 100px از بالا
          behavior: "smooth",
        });
        courseBoxes.forEach((box) => {
          const courseTitle = box
            .querySelector(".nameCourses b")
            .innerText.toLowerCase();
          const courseCategory = box
            .querySelector(".nameCourses span")
            .innerText.toLowerCase();

          if (
            courseTitle.includes(searchTxt) ||
            courseCategory.includes(searchTxt)
          ) {
            box.style.display = "flex";
          } else {
            box.style.display = "none";
          }
        });
      }

      localStorage.removeItem("SearchText");
      getTXt = JSON.parse(localStorage.getItem("SearchText"));

      searchTxt = "";
    }, 500);
  }

  $("#searchInput").on("click", function () {
    // location.reload()
  });

  searchInput.addEventListener("keyup", function () {
    const courseBoxes01 = document.querySelectorAll(".Box");
    const partOneTitles01 = document.querySelectorAll(".partOneTitle");
    const offsetTop =
      searchInput.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: offsetTop - 50, // فاصله 100px از بالا
      behavior: "smooth",
    });

    const searchValue = this.value.toLowerCase();
    // اگر چیزی توی سرچ وارد شده بود، عنوان‌ها مخفی بشن
    if (searchInput.value.trim() !== "") {
      partOneTitles01.forEach((title) => {
        title.style.display = "none";
      });
    } else {
      partOneTitles01.forEach((title) => {
        title.style.display = "block";
      });
    }

    courseBoxes01.forEach((box) => {
      const courseTitle = box
        .querySelector(".nameCourses b")
        .innerText.toLowerCase();
      const courseCategory = box
        .querySelector(".nameCourses span")
        .innerText.toLowerCase();

      if (
        courseTitle.includes(searchValue) ||
        courseCategory.includes(searchValue)
      ) {
        box.style.display = "flex";
      } else {
        box.style.display = "none";
      }
    });
  });

  //hover category
  const imgs = document.querySelectorAll(".itemCategory img");

  imgs.forEach((img) => {
    // مسیر عکس اصلی
    const originalSrc = img.src;
    // مسیر عکس هاور: فرض می‌کنیم فقط آخر فایل '_hover' اضافه می‌کنیم
    const hoverSrc = originalSrc.replace(".svg", "_hover.svg");

    img.addEventListener("mouseenter", () => {
      img.src = hoverSrc;
    });

    img.addEventListener("mouseleave", () => {
      img.src = originalSrc;
    });
  });

  async function getdata() {
    await getFetchDeparteman();
    await fetchCourses();
    await serachData();
  }
  getdata();
});
