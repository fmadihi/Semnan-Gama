$(function () {
  setTimeout(() => {

    //hover category
    const imgs = document.querySelectorAll(".itemCategory>div>img");

    imgs.forEach((img) => {
      const originalSrc = img.src;
      const hoverSrc = originalSrc.replace(".svg", "_hover.svg");

      img.addEventListener("mouseenter", () => {
        const width = window.innerWidth;
        img.src = hoverSrc;
        if (width >= 990) {
          img.style.width = "86px"; // موبایل
        } else if (width >= 700 && width<990) {
          img.style.width = "86px"; // تبلت
        } 
        else if (width >= 560 && width<700) {
          img.style.width = "86px"; // تبلت
        } 
      });

      img.addEventListener("mouseleave", () => {
        img.src = originalSrc;
      });
    });
  }, 1000);

  /*put color img in mobile size */
  // async function updateImagesForMobile() {
  //   const isMobile = window.innerWidth < 560;
  //   const imgs = document.querySelectorAll(".itemCategory img");

  //   imgs.forEach((img) => {
  //     const originalSrc = img.src;
  //     const hoverSrc = originalSrc.replace(".svg", "_hover.svg");

  //     if (isMobile) {
  //       img.src = hoverSrc;
  //     } else {
  //       img.src = originalSrc;
  //     }

  //     // افکت هاور فقط برای دسکتاپ فعال باشه
  //     img.addEventListener("mouseenter", () => {
  //       if (!isMobile) img.src = hoverSrc;
  //     });

  //     img.addEventListener("mouseleave", () => {
  //       if (!isMobile) img.src = originalSrc;
  //     });
  //   });
  // }
  // const container = document.querySelector(".itemCategory");
  // container.scrollLeft = container.scrollWidth;
  // window.addEventListener("resize", updateImagesForMobile);
  // window.addEventListener("load", updateImagesForMobile);
});
