const baseUrl = window.baseUrl
$(function () {
  let textarea = document.getElementById("CommentID");
  let fullName = document.getElementById("FullName");
  let PhoneNum = document.getElementById("PhoneNum");
  $("#send").on("click", function () {
    if (
      (textarea.value == "" || textarea.value == undefined) &&
      (fullName.value == "" || fullName.value == undefined) &&
      (PhoneNum.value == "" || PhoneNum.value == undefined)
    ) {
      alert("لطفا فیلد ها را پر نمایید.");
    } else if (fullName.value == "" || fullName.value == undefined) {
      alert("لطفا نام خود را بنویسید.");
    } else if (PhoneNum.value == "" || PhoneNum.value == undefined) {
      alert("لطفا شماره تماس خود را بنویسید.");
    } else if (textarea.value == "" || textarea.value == undefined) {
      alert("لطفا نظر و پیشنهاد خود را بنویسید.");
    } else {
      const newComment = {
        full_name: fullName.value,
        phone_number: PhoneNum.value,
        comment_or_suggestion: textarea.value,
        course:null,
      };

      postComment(newComment);
    }
  });

  async function postComment(commentData) {
    try {
      const response = await fetch(`${baseUrl}/institute/comment_suggestion/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert("پیشنهاد شما با موفقیت ارسال شد.")
      // console.log("کامنت با موفقیت ارسال شد:", result);
      return result;
    } catch (error) {
      alert("متاسفانه خطایی رخ داده است، لطفا با آموزشگاه تماس بگیرید..")
      // console.error("خطا در ارسال کامنت:", error);
    }
  }
});
