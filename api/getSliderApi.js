// const baseUrl = window.baseUrl
$(function () {
  let departemanData = [];
  //get departeman
  async function getFetchSlider() {
    try {
      const response = await fetch(`${baseUrl}/institute/slider/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      data.map((elem)=>{
        $(`.slidImg0${elem.id}`).attr('src',elem.slider_picture)
      })
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
      let div_partOne = document.getElementsByClassName("partOne");
      departemanData.map((e) => {
        data.map((elem) => {
          if (elem.course_department == e) {
            //get main div
            let div_dep = document.getElementsByClassName(`dep_${e}`);
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
            span.innerHTML = elem.course_age + " ";
            div_nameCourses.append(b);
            div_nameCourses.append(span);
            div_info.append(div_nameCourses);
            div_startCourses = document.createElement("div");
            div_startCourses.className = "startCourses";

            //chanjge date to fasi
            const isoDate = elem.course_start_date;
            const date = new Date(isoDate);

            const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            const formattedDate = formatter.format(date);
            div_startCourses.innerHTML = "شروع دوره: " + formattedDate;

            div_nameCourses.append(div_startCourses);

            //create btn
            let div_btnCourses = document.createElement('div')
            div_btnCourses.className="btnCoueses"
            let div = document.createElement('div')
            let a = document.createElement('a')
            a.innerHTML="مشاهده اطلاعات"
            let btn_img = document.createElement('img')
            btn_img.setAttribute('src','../image/courses/arrow-left 1.svg')


            div.append(a)
            div.append(btn_img)
            div_btnCourses.append(div)
            div_info.append(div_btnCourses)

            div_Box.append(div_info);

            div_dep[0].append(div_Box);

            div_btnCourses.addEventListener('click',function(){
              alert(elem.course_name)
            })
          }
        });
      });
    } catch (error) {
      // console.log(error.message);
    }
  }

  //fetchCourses();

  async function getdata() {
    await getFetchSlider();
  //  await fetchCourses();
  }
  getdata()
});
