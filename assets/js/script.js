'use strict';

// ===== Utility: toggle "active" class =====
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};



// ===== SIDEBAR =====

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}



// ===== CUSTOM SELECT + PORTFOLIO FILTER =====

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// فیلتر کردن پروژه‌ها براساس data-category
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// اگر المنت‌های سِلکت وجود داشته باشند
if (select && selectValue && filterItems.length > 0) {

  // باز و بسته شدن دراپ‌داون
  select.addEventListener("click", function () {
    elementToggleFunc(select);
  });

  // انتخاب آیتم از دراپ‌داون
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// دکمه‌های فیلتر برای صفحه‌های بزرگ
if (filterBtn.length > 0 && selectValue && filterItems.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}



// ===== CONTACT FORM =====

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn && formInputs.length > 0) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}



// ===== PAGE NAVIGATION (About / Resume / Portfolio / Publications / Contact) =====

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) {
  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.textContent.trim().toLowerCase(); // about, resume, portfolio, publications, contact

      // فعال/غیرفعال کردن لینک‌ها
      navigationLinks.forEach((navLink) => navLink.classList.remove("active"));
      link.classList.add("active");

      // فعال/غیرفعال کردن صفحات
      pages.forEach((page) => {
        if (page.dataset.page === target) {
          page.classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
        }
      });
    });
  });
}
