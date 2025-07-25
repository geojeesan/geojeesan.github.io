'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
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

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

function sendEmail() {
  var params = {
    fullname: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  const service_id = "service_fn7tirr";
  const template_id = "template_ihs1e2p";

  emailjs.send(service_id, template_id, params)
    .then(
      res => {
        document.getElementById("fullname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Email sent successfully");
      }
    ).catch(
      err => {
        console.log(err);
        alert("Something went wrong");
      }
    );
}

document.addEventListener('DOMContentLoaded', () => {
  const projectItems = document.querySelectorAll('.project-item');
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <div class="popup-content">
      <h3 class="popup-title"></h3>
      <img class="popup-image" src="" alt="Project Image" style="max-width:100%; margin-right:16px; display:none; border-radius: 8px; margin: 16px 0 16px 0;">
      <p class="popup-description"></p>
      <div style="display: flex; align-items: center; justify-content: center;">
        <a href="#" class="popup-link" target="_blank" rel="noopener" style="display: none; margin-top: 12px; color: var(--orange-yellow-crayola); ">View Project</a>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  const popupOverlay = document.createElement('div');
  popupOverlay.classList.add('popup-overlay');
  document.body.appendChild(popupOverlay);

  projectItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const title = item.querySelector('.project-title').innerText;
      const description = item.getAttribute('data-description');
      const imageElem = item.querySelector('.project-image');
      const imageUrl = imageElem ? imageElem.src : null;
      const projectLink = item.querySelector('.project-link')?.getAttribute('href');
      

      popup.querySelector('.popup-title').innerText = title;
      popup.querySelector('.popup-description').innerText = description;

      const popupImage = popup.querySelector('.popup-image');
      if (imageUrl) {
        popupImage.src = imageUrl;
        popupImage.style.display = 'block';
      } else {
        popupImage.style.display = 'none';
      }

      popup.style.display = 'block';
      popupOverlay.style.display = 'block';

      const popupLink = popup.querySelector('.popup-link');
      if (projectLink && projectLink.length > 2) {
        popupLink.href = projectLink;
        popupLink.style.display = 'inline-block';
      } else {
        popupLink.style.display = 'none';
      }
    });
  });

  document.querySelector('.close-btn').addEventListener('click', () => {
    popup.style.display = 'none';
    popupOverlay.style.display = 'none';
  });

  popupOverlay.addEventListener('click', () => {
    popup.style.display = 'none';
    popupOverlay.style.display = 'none';
  });
});
