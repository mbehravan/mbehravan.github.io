'use strict';

/**
 * Simple script:
 * - Sidebar toggle
 * - Page navigation
 * - Portfolio filter
 * - Contact form validation
 */


/* ========== SIDEBAR ========== */

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
}



/* ========== PAGE NAVIGATION ========== */
/**
 * دکمه‌ها: [data-nav-link]
 * صفحات: [data-page]
 *
 * مقدار data-page باید برابر متن دکمه به حروف کوچک باشد:
 *  About         -> data-page="about"
 *  Resume        -> data-page="resume"
 *  Portfolio     -> data-page="portfolio"
 *  Publications  -> data-page="publications"
 *  Contact       -> data-page="contact"
 */

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) {
  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.textContent.trim().toLowerCase();

      // لینک‌های فعال
      navigationLinks.forEach((navLink) => {
        navLink.classList.remove("active");
      });
      link.classList.add("active");

      // صفحات فعال
      pages.forEach((page) => {
        if (page.dataset.page === target) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });

      window.scrollTo(0, 0);
    });
  });
}



/* ========== PORTFOLIO FILTER ========== */

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

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

// دراپ‌داون (برای صفحه‌نمایش کوچک)
if (select && selectValue && filterItems.length > 0) {

  select.addEventListener("click", function () {
    select.classList.toggle("active");
  });

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      select.classList.remove("active");
      filterFunc(selectedValue);
    });
  }
}

// دکمه‌های فیلتر (برای صفحه‌نمایش بزرگ)
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



/* ========== CONTACT FORM VALIDATION ========== */

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
