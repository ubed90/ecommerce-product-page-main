// ALL CONSTANTS

// MOBILE HAMBURGER
const navLinksContainer = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__links--link");
const hamburger = document.querySelector(".nav__hamburger");
const closeBtn = document.querySelector(".nav__links--closeBtn");

// SLIDER (MOBILE)
const sliderDisplay = document.querySelector(".slider__display");
const allImgs = Array.from(
  document.querySelectorAll(".slider__display--slide")
);
const prevBtn = document.querySelector(".slider__prevBtn");
const nextBtn = document.querySelector(".slider__nextBtn");

// SLIDER (DESKTOP)
const thumbsDisplay = document.querySelector(".slider__thumbs");
const thumbnailImgs = Array.from(thumbsDisplay.children);

// EMPTY CART
const cartIcon = document.querySelector(".nav__cart--img");
const cart = document.querySelector(".nav__cart");

// FILLED CART
const decreaseBtn = document.querySelector(".content__atc--quantity__minus");
const increaseBtn = document.querySelector(".content__atc--quantity__plus");
const quantity = document.querySelector(".content__atc--quantity__count");
const navCount = document.querySelector(".nav__cart--noi");
const cartMultiply = document.querySelector(
  ".upper__left--text__price--quantity"
);
const total = document.querySelector(".upper__left--text__price--total");
const deleteBtn = document.querySelector(".upper__right");
const submitBtn = document.querySelector(".content__atc--submitBtn");
let [MAX, MIN] = [99, 0];

// LIGHTBOX (DESKTOP)
const lightBox = document.querySelector(".lightbox");
const lightBoxContent = document.querySelector(".lightbox__content");
const lightBoxCloseBtn = document.querySelector(".lightbox__content--closeBtn");
const lightBoxSlider = document.querySelector(
  ".lightbox__content--slider__display"
);
const lightBoxThumbDisplay = document.querySelector(
  ".lightbox__content--slider__thumbs"
);
const lightBoxImages = Array.from(
  document.querySelectorAll(".lightbox__content--slider__display--slide")
);
const lightBoxThumbImages = Array.from(
  document.querySelectorAll(".lightbox__content--slider__thumbs--thumb")
);
const lightBoxPrevBtn = document.querySelector(
  ".lightbox__content--slider__display--prevBtn"
);
const lightBoxNextBtn = document.querySelector(
  ".lightbox__content--slider__display--nextBtn"
);

/*
---------------------------------------NAV----------------------------------
*/

// EVENT LISTENERS

hamburger.addEventListener("click", function () {
  navLinksContainer.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", function () {
  navLinksContainer.classList.remove("active");
  document.body.style.overflow = "initial";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    document.body.style.overflow = "initial";
  });
});

/* 
--------------------------------SLIDER (MOBILE)-------------------------------
*/

// EVENT LISTENERS
window.addEventListener("resize", resizeImages);

nextBtn.addEventListener("click", function () {
  const currentImg = sliderDisplay.querySelector(".current--img");
  const targetImg = currentImg.nextElementSibling;
  const nextIndex = allImgs.findIndex((img) => img === targetImg);

  moveToImg(currentImg, targetImg);
  hideShowArrows(nextIndex, prevBtn, nextBtn);
});

prevBtn.addEventListener("click", function () {
  const currentImg = sliderDisplay.querySelector(".current--img");
  const targetImg = currentImg.previousElementSibling;
  const prevIndex = allImgs.findIndex((img) => img === targetImg);

  moveToImg(currentImg, targetImg);
  hideShowArrows(prevIndex, prevBtn, nextBtn);
});

// FUNCTIONS
function resizeImages() {
  allImgs.forEach(function (image, index) {
    to_left = image.getBoundingClientRect().width;
    image.style.left = to_left * index + "px";
  });
}

const moveToImg = function (
  currentImg,
  targetImg,
  currentThumb = null,
  targetThumb = null,
  lightBox = false
) {
  if (!lightBox) {
    currentImg.classList.remove("current--img");

    sliderDisplay.style.transform = "translateX(-" + targetImg.style.left + ")";
    targetImg.classList.add("current--img");

    if (!currentThumb && !targetThumb) return;

    currentThumb.classList.remove("active");
    targetThumb.classList.add("active");
  } else {
    currentImg.classList.remove("current--img");
    targetImg.classList.add("current--img");

    if (!currentThumb && !targetThumb) return;

    currentThumb.classList.remove("active");
    targetThumb.classList.add("active");
  }
};

const hideShowArrows = function (targetIndex, prevBtn, nextBtn) {
  if (targetIndex === 0) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else if (targetIndex === allImgs.length - 1) {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  }
};

// FUNCTION CALLS
resizeImages();

/* 
--------------------------------SLIDER DESKTOP-------------------------------
*/

thumbnailImgs.forEach(function (thumbnail, index) {
  thumbnail.addEventListener("click", function () {
    currentThumb = thumbsDisplay.querySelector(".active");
    targetThumb = this;

    currentImg =
      allImgs[thumbnailImgs.findIndex((thumb) => thumb === currentThumb)];

    targetIndex = thumbnailImgs.findIndex((thumb) => thumb === targetThumb);
    targetImg = allImgs[targetIndex];

    moveToImg(currentImg, targetImg, currentThumb, targetThumb);
    hideShowArrows(targetIndex, prevBtn, nextBtn);
  });
});

/* 
--------------------------------EMPTY CART-------------------------------
*/

cartIcon.addEventListener("click", function () {
  cart.classList.toggle("active");
});

/* 
--------------------------------FILLED CART-------------------------------
CLASS = not-empty
*/

decreaseBtn.addEventListener("click", function () {
  cart.classList.remove("active");
  currentValue = parseInt(quantity.innerText);
  if (currentValue === MIN) return;
  quantity.innerText = currentValue - 1;
});

increaseBtn.addEventListener("click", function () {
  `q222`;
  cart.classList.remove("active");
  currentValue = parseInt(quantity.innerText);
  if (currentValue === MAX) return;
  quantity.innerText = currentValue + 1;
});

submitBtn.addEventListener("click", function () {
  if (parseInt(quantity.innerText) === 0) return;

  navCount.innerText = quantity.innerText;
  cartMultiply.innerText = ` x ${quantity.innerText}`;
  total.innerText = `$${(parseInt(quantity.innerText) * 125).toFixed(2)}`;
  cart.classList.add("not-empty");
});

deleteBtn.addEventListener("click", function () {
  cart.classList.remove("not-empty");
});

/* 
--------------------------------LIGHTBOX DESKTOP-------------------------------
*/

lightBoxThumbImages.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    currentThumb = lightBoxThumbDisplay.querySelector(".active");
    targetThumb = this;

    currentImg =
      lightBoxImages[
        lightBoxThumbImages.findIndex((thumb) => thumb === currentThumb)
      ];

    targetIndex = lightBoxThumbImages.findIndex(
      (thumb) => thumb === targetThumb
    );
    targetImg = lightBoxImages[targetIndex];

    moveToImg(currentImg, targetImg, currentThumb, targetThumb, true);
    hideShowArrows(targetIndex, lightBoxPrevBtn, lightBoxNextBtn);
  });
});

lightBoxPrevBtn.addEventListener("click", function () {
  currentImg = lightBoxSlider.querySelector(".current--img");
  targetImg = currentImg.previousElementSibling;
  prevIndex = lightBoxImages.findIndex((img) => img === targetImg);

  currentThumb = lightBoxThumbDisplay.querySelector(".active");
  targetThumb = lightBoxThumbImages[prevIndex];

  moveToImg(currentImg, targetImg, currentThumb, targetThumb, true);
  hideShowArrows(prevIndex, lightBoxPrevBtn, lightBoxNextBtn);
});

lightBoxNextBtn.addEventListener("click", function () {
  currentImg = lightBoxSlider.querySelector(".current--img");
  targetImg = currentImg.nextElementSibling;
  nextIndex = lightBoxImages.findIndex((img) => img === targetImg);

  currentThumb = lightBoxThumbDisplay.querySelector(".active");
  targetThumb = lightBoxThumbImages[nextIndex];

  moveToImg(currentImg, targetImg, currentThumb, targetThumb, true);
  hideShowArrows(nextIndex, lightBoxPrevBtn, lightBoxNextBtn);
});

allImgs.forEach((image) => {
  image.addEventListener("click", () => {
    if (!(window.innerWidth > 860)) return;

    lightBox.classList.add("active");

    currentLightBoxThumb = lightBoxThumbDisplay.querySelector(".active");
    currentLightBoxImg = lightBoxSlider.querySelector(".current--img");

    targetLightBoxIndex = allImgs.findIndex((img) => img === image);
    targetLightBoxImage = lightBoxImages[targetLightBoxIndex];
    targetLightBoxThumb = lightBoxThumbImages[targetLightBoxIndex];

    moveToImg(
      currentLightBoxImg,
      targetLightBoxImage,
      currentLightBoxThumb,
      targetLightBoxThumb,
      true
    );

    hideShowArrows(targetLightBoxIndex, lightBoxPrevBtn, lightBoxNextBtn);

    setTimeout(() => {
      lightBoxContent.classList.add("active");
    }, 400);
  });
});

lightBoxCloseBtn.addEventListener("click", () => {
  lightBoxContent.classList.remove("active");

  setTimeout(() => {
    lightBox.classList.remove("active");
  }, 400);
});
