// Typing Animation
const typingElement = document.querySelector(".typing");
const typingWords = [
  "Prekshitha",
  "Information Science Student"
];

let wordIndex = 0;
let charIndex = 0;
let typingDelay = 100;
let erasingDelay = 50;
let nextWordDelay = 1200;

function type() {
  if (!typingElement) return;

  if (charIndex < typingWords[wordIndex].length) {
    typingElement.textContent += typingWords[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, nextWordDelay);
  }
}

function erase() {
  if (!typingElement) return;

  if (charIndex > 0) {
    typingElement.textContent = typingWords[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    wordIndex++;
    if (wordIndex >= typingWords.length) wordIndex = 0;
    setTimeout(type, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 500);
  applySavedTheme();
  reveal();
  highlightNav();
});

// Scroll Reveal
window.addEventListener("scroll", reveal);

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });

  highlightNav();
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");

  try {
    localStorage.setItem("dark-mode", isDark ? "enabled" : "disabled");
  } catch (e) {}

  document.querySelector(".darkmode-btn").textContent = isDark ? "☀" : "🌙";
}

function applySavedTheme() {
  const savedMode = localStorage.getItem("dark-mode");

  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    document.querySelector(".darkmode-btn").textContent = "☀";
  }
}

// Resume Popup
const resumeBtn = document.querySelector(".resume-btn");

if (resumeBtn) {
  resumeBtn.addEventListener("click", () => {
    const popup = document.getElementById("resume-popup");
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 2000);
  });
}

// Highlight Nav Links
const navLinks = document.querySelectorAll(".navbar nav a");

function highlightNav() {
  let fromTop = window.scrollY + 120;

  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);

    if (!section) return;

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}

// Smooth Scroll
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    if (!link.hash.startsWith("#")) return;
    e.preventDefault();

    const target = document.querySelector(link.hash);

    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: "smooth"
    });
  });
});

console.log("✨ Portfolio JS Loaded!");