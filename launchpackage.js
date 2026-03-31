document.addEventListener("DOMContentLoaded", function() {
    const lenis = new Lenis({
        lerp: 0.07,
        wheelMultiplier: 1.2,
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    function prepareTextAnimation(elementId, initialDelay = 0) {
        const el = document.getElementById(elementId);
        if (!el) return 0;
        const lines = el.innerHTML.split("<br>");
        el.innerHTML = "";
        let delayCounter = initialDelay;
        const delayIncrement = 30;
        
        lines.forEach((line, lineIdx) => {
            const words = line.split(" ");
            words.forEach((word, wordIdx) => {
                const wordSpan = document.createElement("span");
                wordSpan.className = "word-wrapper";
                
                word.split("").forEach(char => {
                    const charSpan = document.createElement("span");
                    charSpan.className = "letter";
                    charSpan.innerText = char;
                    charSpan.style.transitionDelay = `${delayCounter}ms`;
                    wordSpan.appendChild(charSpan);
                    delayCounter += delayIncrement;
                });
                
                el.appendChild(wordSpan);
                
                if (wordIdx < words.length - 1) {
                    const space = document.createElement("span");
                    space.innerHTML = "&nbsp;";
                    el.appendChild(space);
                }
            });
            
            if (lineIdx < lines.length - 1) {
                el.appendChild(document.createElement("br"));
            }
        });
        
        return delayCounter;
    }

    const heroAnimTime = prepareTextAnimation("launch-hero-title", 200);
    setTimeout(() => {
        const titleEl = document.getElementById("launch-hero-title");
        if (titleEl) titleEl.classList.add("animate-text");
    }, 400);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    offset: -120
                });
                
                const hamburger = document.querySelector(".hamburger");
                const navContent = document.querySelector(".nav-content");
                if (hamburger && hamburger.classList.contains("active")) {
                    hamburger.classList.remove("active");
                    navContent.classList.remove("active");
                }
            }
        });
    });

    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector("i");
        const logoImg = document.querySelector(".logo img");
        
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            if (themeIcon) themeIcon.className = "fa-regular fa-moon";
            if (logoImg) logoImg.src = "img/logoblack.svg";
        }

        themeToggleBtn.addEventListener("click", function() {
            document.body.classList.toggle("light-mode");
            
            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
                if (themeIcon) themeIcon.className = "fa-regular fa-moon";
                if (logoImg) logoImg.src = "img/logoblack.svg";
            } else {
                localStorage.setItem("theme", "dark");
                if (themeIcon) themeIcon.className = "fa-regular fa-sun";
                if (logoImg) logoImg.src = "img/logowhite.svg";
            }
        });

        setTimeout(() => {
            themeToggleBtn.classList.add("show-element");
            themeToggleBtn.classList.remove("hidden-bottom");
        }, 800);
    }

    const hamburger = document.querySelector(".hamburger");
    const navContent = document.querySelector(".nav-content");

    if (hamburger && navContent) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            navContent.classList.toggle("active");
        });
    }

    const navbar = document.querySelector(".navbar");
    if (navbar) {
        setTimeout(() => {
            navbar.classList.add("show-nav");
            navbar.classList.remove("hidden-top");
        }, 100);

        window.addEventListener("scroll", function() {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled-nav");
            } else {
                navbar.classList.remove("scrolled-nav");
            }
        });
    }

    // Marquee Animations
    function initMarquee(trackId, speed) {
        const track = document.getElementById(trackId);
        if (!track) return;
        
        let progress = 0;
        function animate() {
            progress -= speed;
            const firstContent = track.children[0];
            
            if (firstContent && Math.abs(progress) >= firstContent.offsetWidth) {
                progress += firstContent.offsetWidth;
            }
            
            track.style.transform = `translateX(${progress}px)`;
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }

    initMarquee('schedule-marquee', 1.0);
    initMarquee('launch-banner-track', 1.0);

    // Scroll Animations
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const elementsToAnimate = document.querySelectorAll('.hidden-bottom');
    
    if (elementsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-element');
                    entry.target.classList.remove('hidden-bottom');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        elementsToAnimate.forEach(el => observer.observe(el));
    }
});
