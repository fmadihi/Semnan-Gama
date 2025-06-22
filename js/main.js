$(function(){
  /*show menu in mobileSIze */
  $('.menuCellphone').on('click',function(e){
    e.stopPropagation();

    $('.nav').show()
    $('.grayBck').show()
  })
  $('.closeGreIcon').on('click',function(e){
    e.stopPropagation();
    $('.nav').hide()
    $('.grayBck').hide()
  })
 $(document).on('click', function (e) {
    // اگه کلیک داخل منو یا آیکن منو نبود
    if (!$(e.target).closest('.nav').length && !$(e.target).closest('.menuCellphone').length) {
      $('.nav').hide();
    $('.grayBck').hide()
      // $('.closeGre').hide();
    }
  });

  // جلوگیری از بسته شدن ناخواسته هنگام کلیک داخل منو
  $('.nav').on('click', function (e) {
    e.stopPropagation(); // کلیک داخل منو نباید bubble کنه
  });
})