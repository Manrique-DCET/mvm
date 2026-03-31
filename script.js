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
    const themeIcon = themeToggleBtn.querySelector("i");
    const logoImg = document.querySelector(".logo img");
    
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeIcon.className = "fa-regular fa-moon";
        logoImg.src = "img/logoblack.svg";
    }

    themeToggleBtn.addEventListener("click", function() {
        document.body.classList.toggle("light-mode");
        
        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeIcon.className = "fa-regular fa-moon";
            logoImg.src = "img/logoblack.svg";
        } else {
            localStorage.setItem("theme", "dark");
            themeIcon.className = "fa-regular fa-sun";
            logoImg.src = "img/logowhite.svg";
        }
    });

    const hamburger = document.querySelector(".hamburger");
    const navContent = document.querySelector(".nav-content");

    hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("active");
        navContent.classList.toggle("active");
    });

    function prepareTextAnimation(elementId, initialDelay = 0) {
        const el = document.getElementById(elementId);
        if (!el) return 0;
        const lines = el.innerHTML.split("<br>");
        el.innerHTML = "";
        let delayCounter = initialDelay;
        const delayIncrement = 40;
        
        lines.forEach((line, lineIdx) => {
            const words = line.split(" ");
            words.forEach((word, wordIdx) => {
                const wordSpan = document.createElement("span");
                wordSpan.className = "word-wrapper";
                
                word.split("").forEach(char => {
                    const charSpan = document.createElement("span");
                    charSpan.className = "letter";
                    charSpan.innerText = char;
                    charSpan.style.animationDelay = `${delayCounter}ms`;
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

    const heroAnimTime = prepareTextAnimation("hero-title", 300);
    document.getElementById("hero-title").classList.add("animate-text");

    prepareTextAnimation("approach-title-text", 0);
    const approachTitleWords = document.querySelectorAll('#approach-title-text .word-wrapper');
    approachTitleWords.forEach((word, index) => {
        if (index >= 3) {
            word.classList.add('highlight');
        }
    });
    
    prepareTextAnimation("sr-title-text", 0);

    const navbar = document.querySelector(".navbar");
    const bottomElements = document.querySelectorAll(".hero .hidden-bottom, .trusted-brands.hidden-bottom, .scroll-text-section.hidden-bottom, .theme-btn.hidden-bottom");
    
    setTimeout(() => {
        navbar.classList.add("show-nav");
        navbar.classList.remove("hidden-top");
        
        setTimeout(() => {
            bottomElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("show-element");
                    el.classList.remove("hidden-bottom");
                }, index * 200);
            });
        }, 400);
        
    }, heroAnimTime + 600);

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled-nav");
        } else {
            navbar.classList.remove("scrolled-nav");
        }
    });

    const brandNames = ['amazon', 'coach', 'credit', 'crocs', 'disney', 'elf', 'loreal', 'meta', 'pacsun', 'sephora', 'sol', 'sony', 'steve'];
    const marqueeContainer = document.getElementById('brand-marquee');
    
    if (marqueeContainer) {
        const track = document.createElement('div');
        track.className = 'marquee-track';
        
        const createMarqueeContent = () => {
            const content = document.createElement('div');
            content.className = 'marquee-content';
            
            brandNames.forEach(brand => {
                const item = document.createElement('div');
                item.className = 'brand-item';
                
                const img = document.createElement('img');
                img.src = `img/partnerships/${brand}.svg`;
                img.alt = brand;
                
                item.appendChild(img);
                content.appendChild(item);
            });
            
            return content;
        };

        track.appendChild(createMarqueeContent());
        track.appendChild(createMarqueeContent());
        marqueeContainer.appendChild(track);

        let progress = 0;
        const speed = 0.5; 
        
        function animateMarquee() {
            progress -= speed;
            const firstContentBlock = track.children[0];
            
            if (firstContentBlock && Math.abs(progress) >= firstContentBlock.offsetWidth) {
                progress += firstContentBlock.offsetWidth;
            }
            
            track.style.transform = `translateX(${progress}px)`;
            requestAnimationFrame(animateMarquee);
        }
        
        setTimeout(() => {
            requestAnimationFrame(animateMarquee);
        }, 100);
    }

    const aboutBrandNames = ['afterpay', 'champion', 'ikea', 'shein', 'teen', 'temu', 'toyota', 'tylenol', 'walmart'];
    const aboutMarqueeContainer = document.getElementById('about-brand-marquee');
    
    if (aboutMarqueeContainer) {
        const aboutTrack = document.createElement('div');
        aboutTrack.className = 'marquee-track';
        
        const createAboutMarqueeContent = () => {
            const content = document.createElement('div');
            content.className = 'marquee-content';
            
            aboutBrandNames.forEach(brand => {
                const item = document.createElement('div');
                item.className = 'brand-item';
                
                const img = document.createElement('img');
                img.src = `img/aboutuspartnerships/${brand}.svg`;
                img.alt = brand;
                
                item.appendChild(img);
                content.appendChild(item);
            });
            
            return content;
        };

        aboutTrack.appendChild(createAboutMarqueeContent());
        aboutTrack.appendChild(createAboutMarqueeContent());
        aboutMarqueeContainer.appendChild(aboutTrack);

        let aboutProgress = 0;
        const aboutSpeed = 0.5; 
        
        function animateAboutMarquee() {
            aboutProgress += aboutSpeed;
            const firstContentBlock = aboutTrack.children[0];
            
            if (firstContentBlock && aboutProgress >= 0) {
                aboutProgress -= firstContentBlock.offsetWidth;
            }
            
            aboutTrack.style.transform = `translateX(${aboutProgress}px)`;
            requestAnimationFrame(animateAboutMarquee);
        }
        
        setTimeout(() => {
            const firstContentBlock = aboutTrack.children[0];
            if(firstContentBlock) {
                aboutProgress = -firstContentBlock.offsetWidth;
            }
            requestAnimationFrame(animateAboutMarquee);
        }, 100);
    }

    const scrollLines = document.querySelectorAll('.scroll-line');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        scrollLines.forEach((line, index) => {
            const direction = index % 2 === 0 ? -1 : 1;
            const scrollSpeed = 0.5;
            const offset = index % 2 !== 0 ? -800 : 0; 
            
            line.style.transform = `translateX(${offset + (scrollPos * scrollSpeed * direction)}px)`;
        });
    });

    prepareTextAnimation("wws-title", 0);
    prepareTextAnimation("stat-desc-1", 0);
    prepareTextAnimation("stat-desc-2", 0);
    prepareTextAnimation("stat-desc-3", 0);
    prepareTextAnimation("challenges-title", 0);

    const wwsSection = document.querySelector('.who-we-serve-section');
    if (wwsSection) {
        const animateValue = (obj, start, end, duration, prefix, suffix) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = prefix + Math.floor(progress * (end - start) + start) + suffix;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    obj.innerHTML = prefix + end + suffix;
                }
            };
            window.requestAnimationFrame(step);
        };

        const wwsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                wwsObserver.unobserve(wwsSection);
                
                const wwsTitle = document.getElementById('wws-title');
                wwsTitle.classList.add('animate-text');
                
                setTimeout(() => {
                    const listItems = document.querySelectorAll('.wws-list-item');
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('slide-in');
                        }, index * 100);
                    });
                    
                    const listDuration = listItems.length * 100 + 400;
                    
                    setTimeout(() => {
                        const statBoxes = document.querySelectorAll('.stat-box');
                        statBoxes.forEach((box, index) => {
                            setTimeout(() => {
                                box.classList.add('pop-in');
                            }, index * 150);
                        });
                        
                        setTimeout(() => {
                            const numbers = document.querySelectorAll('.stat-number');
                            numbers.forEach(num => {
                                const target = parseInt(num.getAttribute('data-target'));
                                const prefix = num.getAttribute('data-prefix') || "";
                                const suffix = num.getAttribute('data-suffix') || "";
                                animateValue(num, 0, target, 1500, prefix, suffix);
                            });
                            
                            const statDescs = document.querySelectorAll('.stat-desc');
                            statDescs.forEach(desc => desc.classList.add('animate-text'));
                            
                        }, statBoxes.length * 150 + 200);
                    }, listDuration);
                }, 800);
            }
        }, { threshold: 0.3 });
        wwsObserver.observe(wwsSection);
    }

    const scheduleTrack = document.getElementById('schedule-marquee');
    
    if (scheduleTrack) {
        let schedProgress = 0;
        const schedSpeed = 1.5; 
        
        function animateSchedMarquee() {
            schedProgress -= schedSpeed;
            const firstContent = scheduleTrack.children[0];
            
            if (firstContent && Math.abs(schedProgress) >= firstContent.offsetWidth) {
                schedProgress += firstContent.offsetWidth;
            }
            
            scheduleTrack.style.transform = `translateX(${schedProgress}px)`;
            requestAnimationFrame(animateSchedMarquee);
        }
        
        requestAnimationFrame(animateSchedMarquee);
    }

    const approachSection = document.getElementById('approach-section');
    if (approachSection) {
        const approachObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const appTitle = document.getElementById('approach-title-text');
                if (entry.isIntersecting) {
                    approachObserver.unobserve(entry.target);
                    
                    entry.target.classList.add('show-element');
                    entry.target.classList.remove('hidden-bottom');
                    if (appTitle) {
                        appTitle.classList.add('animate-text');
                        const letters = appTitle.querySelectorAll('.letter');
                        letters.forEach(l => {
                            l.style.animation = 'none';
                            void l.offsetWidth;
                            l.style.animation = null;
                        });
                    }
                }
            });
        }, { threshold: 0.3 });
        approachObserver.observe(approachSection);

        const nextBtn = document.getElementById('approach-next-btn');
        const bgSlides = document.querySelectorAll('.bg-slide');
        const textSlides = document.querySelectorAll('.approach-details');
        let currentSlide = 0;

        if (nextBtn && bgSlides.length > 0) {
            nextBtn.addEventListener('click', () => {
                const prevSlide = currentSlide;
                currentSlide = (currentSlide + 1) % bgSlides.length;

                bgSlides[currentSlide].style.transition = 'none';
                textSlides[currentSlide].style.transition = 'none';

                bgSlides[currentSlide].classList.remove('prev', 'active');
                textSlides[currentSlide].classList.remove('prev', 'active');

                void bgSlides[currentSlide].offsetWidth;
                void textSlides[currentSlide].offsetWidth;

                bgSlides[currentSlide].style.transition = '';
                textSlides[currentSlide].style.transition = '';

                bgSlides[prevSlide].classList.remove('active');
                bgSlides[prevSlide].classList.add('prev');
                textSlides[prevSlide].classList.remove('active');
                textSlides[prevSlide].classList.add('prev');

                bgSlides[currentSlide].classList.add('active');
                textSlides[currentSlide].classList.add('active');
            });
        }
    }
    
    const srSection = document.getElementById('social-reality-section');
    if (srSection) {
        const srObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const title = document.getElementById('sr-title-text');
                if (entry.isIntersecting) {
                    srObserver.unobserve(entry.target);
                    entry.target.classList.add('show-element');
                    entry.target.classList.remove('hidden-bottom');
                    if (title) {
                        title.classList.add('animate-text');
                    }
                }
            });
        }, { threshold: 0.3 });
        srObserver.observe(srSection);
    }

    const srContainer = document.getElementById('sr-stats-container');
    const srItems = document.querySelectorAll('.sr-stat-item');
    const hoverLineTop = document.querySelector('.sr-hover-line.top');
    const hoverLineBottom = document.querySelector('.sr-hover-line.bottom');

    if (srContainer && srItems.length > 0 && hoverLineTop && hoverLineBottom) {
        const updateLinePosition = (item) => {
            hoverLineTop.style.width = `${item.offsetWidth}px`;
            hoverLineTop.style.transform = `translateX(${item.offsetLeft}px)`;
            hoverLineBottom.style.width = `${item.offsetWidth}px`;
            hoverLineBottom.style.transform = `translateX(${item.offsetLeft}px)`;
        };

        let activeItem = document.querySelector('.sr-stat-item.highlight') || srItems[0];
        
        setTimeout(() => updateLinePosition(activeItem), 100);
        window.addEventListener('resize', () => updateLinePosition(activeItem));

        srItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                srItems.forEach(i => i.classList.remove('highlight'));
                item.classList.add('highlight');
                activeItem = item;
                updateLinePosition(item);
            });
        });
    }

const demoSection = document.getElementById('demo-video-section');
    if (demoSection) {
        const demoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    demoObserver.unobserve(entry.target);
                    entry.target.classList.add('show-element');
                    entry.target.classList.remove('hidden-bottom');
                }
            });
        }, { threshold: 0.2 });
        demoObserver.observe(demoSection);
    }

const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutObserver.unobserve(entry.target);
                    entry.target.classList.add('show-element');
                    entry.target.classList.remove('hidden-bottom');
                }
            });
        }, { threshold: 0.2 });
        aboutObserver.observe(aboutSection);
    }

    const challengeSection = document.getElementById('challenges');
    if (challengeSection) {
        const challengeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    challengeObserver.unobserve(entry.target);
                    entry.target.classList.add('show-element');
                    entry.target.classList.remove('hidden-bottom');
                    
                    const cTitle = document.getElementById('challenges-title');
                    if (cTitle) {
                        cTitle.classList.add('animate-text');
                    }
                }
            });
        }, { threshold: 0.2 });
        challengeObserver.observe(challengeSection);

        const challengeBtns = document.querySelectorAll('.challenge-btn');
        const challengeContents = document.querySelectorAll('.challenge-content');
        
        let currentChallengeIndex = 0;
        let challengeAutoPlayInterval;
        let challengePauseTimeout;

        function updateChallenge(index) {
            challengeBtns.forEach(b => b.classList.remove('active'));
            challengeContents.forEach(c => c.classList.remove('active'));

            challengeBtns[index].classList.add('active');
            challengeContents[index].classList.add('active');
            currentChallengeIndex = parseInt(index);
        }

        function startChallengeAutoPlay() {
            clearInterval(challengeAutoPlayInterval);
            challengeAutoPlayInterval = setInterval(() => {
                let nextIndex = (currentChallengeIndex + 1) % challengeBtns.length;
                updateChallenge(nextIndex);
            }, 5000);
        }

        
        startChallengeAutoPlay();

        challengeBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
               
                clearInterval(challengeAutoPlayInterval);
                clearTimeout(challengePauseTimeout);
                
               
                updateChallenge(idx);

              
                challengePauseTimeout = setTimeout(() => {
                    startChallengeAutoPlay();
                }, 10000);
            });
        });
    }

    const bridgeSection = document.getElementById('bridge-section');
    if (bridgeSection) {
        const bridgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bridgeObserver.unobserve(entry.target);
                    entry.target.classList.add('show-element');
                    entry.target.classList.remove('hidden-bottom');
                }
            });
        }, { threshold: 0.2 });
        bridgeObserver.observe(bridgeSection);
    }

});