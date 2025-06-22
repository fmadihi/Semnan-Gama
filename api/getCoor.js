const baseUrl = window.baseUrl;
$(function () {
  let textarea = document.getElementById("ExtraText");
  let fullName = document.getElementById("FullName");
  let PhoneNum = document.getElementById("PhoneNum");
  let EmailAddresss = document.getElementById("EmailAddresss");

  let departementSelect;
  //get departeman btn
  async function getFetchDeparteman() {
    try {
      const response = await fetch(`${baseUrl}/staff/department/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("depart", data);

      const container = document.getElementById("departmentCheckboxes");
      if (!container)
        throw new Error("Element with id 'departmentCheckboxes' not found.");

      // خالی کردن محتوای قبلی
      container.innerHTML = "";

      data.forEach((elem) => {
        // فقط دپارتمان‌های فعال را اضافه کنیم
        if (elem.is_active) {
          // ساخت label
          const label = document.createElement("label");

          // ساخت input چک‌باکس
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.value = `department${elem.id}`;

          // هنگام تغییر وضعیت چک‌باکس، آرایه بروزرسانی می‌شود
          checkbox.addEventListener("change", (e) => {
            const allCheckboxes = document.querySelectorAll(
              '#departmentCheckboxes input[type="checkbox"]'
            );

            if (e.target.checked) {
              // وقتی یکی تیک خورد، بقیه رو پاک کن
              allCheckboxes.forEach((cb) => {
                if (cb !== e.target) {
                  cb.checked = false;
                }
              });

              // مقدار انتخابی رو ذخیره کن
              departementSelect = elem.id;
            } else {
              // اگر تیک برداشته شد (هیچ گزینه‌ای انتخاب نیست)
              departementSelect = 0; // یا 0
            }
          });

          // متن دپارتمان
          const textNode = document.createTextNode(elem.department_name);

          label.appendChild(textNode);
          label.appendChild(checkbox);

          container.appendChild(label);
        }
      });
    } catch (error) {
      const courseListEl = document.getElementById("courseList");
      if (courseListEl) {
        courseListEl.textContent = `خطا در دریافت اطلاعات: ${error.message}`;
      } else {
        // console.error(error.message);
      }
    }
  }

  const selectedOptions = document.querySelector(".selected-options");
  const checkboxes = document.querySelectorAll(
    '.dropdown-content input[type="checkbox"]'
  );

  let flag = 0;

  $(".selected-options").on("click", function () {
    checkFlag();
  });
  function checkFlag() {
    if (flag === 0) {
      $(".dropdown-content").css({ display: "block" });
      flag = 1;
    } else {
      $(".dropdown-content").css({ display: "none" });
      flag = 0;
    }
  }
  //close dropdown after click out
  $(document).on("click", function (event) {
    const $target = $(event.target);
    if (!$target.closest(".dropdown").length) {
      $(".dropdown-content").hide();
      flag = 0;
    }
  });
  //uplaod resume
  const resumeBtn = document.getElementById("resume");
  const fileInput = document.getElementById("fileInput");
  const fileNameDisplay = document.getElementById("fileName");

  let formData;

  resumeBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      fileNameDisplay.textContent = "فایل انتخاب شده: " + file.name;

      formData = new FormData();
      formData.append("resume_file", file);
    }
  });
  //send click btn
  $(".gamaBox #send").on("click", function (e) {
    e.preventDefault(); // جلوگیری از رفرش
    if (
      (textarea.value == "" || textarea.value == undefined) &&
      (fullName.value == "" || fullName.value == undefined) &&
      (PhoneNum.value == "" || PhoneNum.value == undefined) &&
      (EmailAddresss.value == "" || EmailAddresss.value == undefined) &&
      departementSelect.length == 0
    ) {
      alert("لطفا فیلد ها را پر نمایید.");
    } else if (fullName.value == "" || fullName.value == undefined) {
      alert("لطفا نام خود را بنویسید.");
    } else if (PhoneNum.value == "" || PhoneNum.value == undefined) {
      alert("لطفا شماره تماس خود را بنویسید.");
    } else if (departementSelect.length == 0) {
      alert("لطفا دپارتمان را انتخاب نمایید.");
    } else if(!formData){
      alert('لطفا رزومه خود را بارگذاری نمایید.')
    }
    else {
      formData.append("full_name", fullName.value);
      formData.append("phone_number", PhoneNum.value);
      formData.append("email", EmailAddresss.value);
      formData.append("explanation", textarea.value);
      formData.append("department", departementSelect);
      postComment(formData, e);
      return false;
    }
  });

  async function postComment(formData, e) {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/staff/collabrations/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // window.location.href = "./cooperateUsS.html";
      if (response.ok) {
        setTimeout(() => {
          // window.location.href = "./cooperateUsS.html";
          // window.location.assign("./cooperateUsS.html");
      window.location.replace("./cooperateUsS.html");

        }, 2000);
      } else {
        alert("مشکلی پیش آمده است!");
      }
// window.location.href = "./cooperateUsS.html";
//           window.location.assign("./cooperateUsS.html");
      window.location.replace("./cooperateUsS.html");
      
      setTimeout(() => {
        $(".showseccessbox").css({
          display: "block",
        });
      }, 2000);
      // alert(
      //   "اطلاعات شما در سامانه ثبت شد. پس از بررسی نهایی تا 72 ساعت دیگر با شما تماس خواهیم گرفت. نام شما با موفقیت انجام شد."
      // );
      // console.log("کامنت با موفقیت ارسال شد:", result);
      return false;

      // return result;
    } catch (error) {
      alert('لطفا تمامی موارد را چک کنید. اطلاعاتی که وارد کرده اید نادرست است. اگر از صحت اطلاعات خود مطمئن هستید لطفا چند دقیقه دیگر مجددا امتحان کنید.')

      // console.error("خطا در ارسال کامنت:", error);
      return false;
    }
    return false;
  }

  let ComanyName = document.getElementById("ComanyName01");
  let jobTitle = document.getElementById("TitleName01");
  let phoneNum01 = document.getElementById("PhoneNum01");
  let EmailAddresss01 = document.getElementById("EmailAddresss01");
  let ExtraText = document.getElementById("ExtraText01");

   //uplaod resume
  const resumeBtn02 = document.getElementById("resume02");
  const fileInput02 = document.getElementById("fileInput02");
  const fileNameDisplay02 = document.getElementById("fileName02");

  let formData02;

  resumeBtn02.addEventListener("click", () => {
    fileInput02.click();
  });

  fileInput02.addEventListener("change", () => {
    if (fileInput02.files.length > 0) {
      const file = fileInput02.files[0];
      fileNameDisplay02.textContent = "فایل انتخاب شده: " + file.name;

      formData02 = new FormData();
      formData02.append("resume_file", file);
    }
  });

  $(".humanBox #send01").on("click", function (e) {
    e.preventDefault();
    if (
      (ComanyName.value == "" || ComanyName.value == undefined) &&
      (jobTitle.value == "" || jobTitle.value == undefined) &&
      (PhoneNum01.value == "" || PhoneNum01.value == undefined) &&
      (EmailAddresss01.value == "" || EmailAddresss01.value == undefined)
    ) {
      alert("لطفا فیلد ها را پر نمایید.");
    } else if (ComanyName.value == "" || ComanyName.value == undefined) {
      alert("لطفا نام خود یا نام شرکت خود را بنویسید.");
    } else if (jobTitle.value == "" || jobTitle.value == undefined) {
      alert("لطفا عنوان شغلی شرکت خود را بنویسید.");
    }
    else if (phoneNum01.value == "" || phoneNum01.value == undefined) {
      alert("لطفا شماره تماس خود را بنویسید.");
    } else {
      let newCoor = {
        company_name: ComanyName.value,
        phone_number: phoneNum01.value,
        email: EmailAddresss01.value,
        explanation: ExtraText.value,
        job_title: jobTitle.value,
      };
      postCommentCoor(newCoor);
    }
  });

  async function postCommentCoor(newCoor) {
    try {
      const response = await fetch(`${baseUrl}/staff/HR_need/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCoor),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // window.location.href = "./cooperateUsS.html";
      if (response.ok) {
        setTimeout(() => {
          // window.location.href = "./cooperateUsS.html";
          // window.location.assign("./cooperateUsS.html");
      window.location.replace("./cooperateUsS.html");

        }, 2000);
      } else {
        alert("مشکلی پیش آمده است!");
      }
// window.location.href = "./cooperateUsS.html";
//           window.location.assign("./cooperateUsS.html");
      window.location.replace("./cooperateUsS.html");
      
      //     setTimeout(() => {
      //   $(".showseccessbox").css({
      //     display: "block",
      //   });
      // }, 2000);
      // alert(
      //   "اطلاعات شما در سامانه ثبت شد. پس از بررسی نهایی تا 72 ساعت دیگر با شما تماس خواهیم گرفت. نام شما با موفقیت انجام شد."
      // );
      // console.log("کامنت با موفقیت ارسال شد:", result);
      return false;

      // return result;
    } catch (error) {
      alert('لطفا تمامی موارد را چک کنید. اطلاعاتی که وارد کرده اید نادرست است. اگر از صحت اطلاعات خود مطمئن هستید لطفا چند دقیقه دیگر مجددا امتحان کنید.')
      // console.error("خطا در ارسال کامنت:", error);
    }
  }
  async function getdata() {
    await getFetchDeparteman();
  }
  getdata();
});
