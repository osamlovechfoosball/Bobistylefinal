(function () {
    "use strict";

    var translations = {
        en: {
            "title.home": "Home | Bobi Style",
            "title.about": "About | Bobi Style",
            "title.services": "Services | Bobi Style",
            "title.gallery": "Gallery | Bobi Style",
            "title.contact": "Contact | Bobi Style",
            "title.privacy": "Privacy Policy | Bobi Style",
            "title.cookies": "Cookie Policy | Bobi Style",
            "title.terms": "Terms | Bobi Style",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.services": "Services",
            "nav.gallery": "Gallery",
            "nav.contact": "Contact",
            "nav.call": "Call",
            "hero.kicker": "BOBI STYLE - HAIRDRESSER AND BARBERSHOP IN LOVECH",
            "hero.title": "Haircuts, beard and a precise hand",
            "hero.kicker2": "BOBI STYLE - HAIRDRESSER AND BARBERSHOP IN LOVECH",
            "hero.title2": "For hair, beard and the men's look",
            "hero.appointment": "Book an appointment",
            "about.kicker": "About",
            "about.title": "A local barbershop with many years of experience in men's haircuts",
            "about.p1": "Bobi is a barber with many years of experience in hairdressing and men's haircuts. For him, the craft is a combination of skill, precision and consistency, focused on giving every client the look they want.",
            "about.p2": "Here, every haircut is done with care and an individual approach, based on the client's preferences. Visit us and see for yourself.",
            "about.cta": "Call for an appointment",
            "services.kicker": "Services",
            "services.title": "Professional haircuts and everything for a complete men's look, from start to finish",
            "services.categoryHaircut": "Hair Cut",
            "services.categoryHaircutText": "Classic cuts, skin fade, wash, styling and final finish.",
            "services.categoryShaving": "Shaving",
            "services.categoryShavingText": "Clean shave, hot towel shave and precise contours.",
            "services.categoryBeard": "Beard Trim",
            "services.categoryBeardText": "Trimming, shaping, symmetry and haircut-and-beard combo.",
            "services.categoryKids": "Kids Haircut",
            "services.categoryKidsText": "Haircuts for children and women, plus a father-and-son combo service.",
            "services.mensHaircut": "Men's haircut",
            "services.mensHaircutText": "Classic or modern haircut.",
            "services.skinFade": "Skin fade",
            "services.skinFadeText": "Low, mid or high fade with a clean transition.",
            "services.haircutBeard": "Haircut & beard",
            "services.haircutBeardText": "Full combo service.",
            "services.beardTrim": "Beard trim",
            "services.beardTrimText": "Shortening and shaping the beard.",
            "services.beardShaping": "Beard shaping",
            "services.beardShapingText": "Beard design, symmetry and a sharper shape.",
            "services.lineup": "Clean contours / Line-up",
            "services.lineupText": "Hairline, neck, beard and cheek lines.",
            "services.hotTowel": "Hot towel shave",
            "services.hotTowelText": "Traditional shave with a warm towel.",
            "services.cleanShave": "Clean shave",
            "services.cleanShaveText": "Full beard shave.",
            "services.kidsHaircut": "Kids' haircut",
            "services.kidsHaircutText": "Haircut for boys and children.",
            "services.womensHaircut": "Women's haircut",
            "services.womensHaircutText": "A haircut tailored to the desired length and shape.",
            "services.hairWash": "Hair wash",
            "services.hairWashText": "Wash before or after the haircut.",
            "services.stylingFinish": "Styling and finish",
            "services.stylingFinishText": "Product, blow-dry and final look.",
            "services.eyebrowTrim": "Eyebrow trim",
            "services.eyebrowTrimText": "Light eyebrow cleaning and shaping.",
            "services.hairColoring": "Hair coloring",
            "services.hairColoringText": "Full or partial men's hair color.",
            "services.fatherSon": "Father & son haircut",
            "services.fatherSonText": "Combo service for father and child.",
            "pricing.kicker": "Service guide",
            "pricing.title": "Ask directly for current availability and price",
            "pricing.note": "Prices and available times can change, so the fastest way is to call or message the shop.",
            "pricing.item1": "Men's haircut",
            "pricing.item2": "Skin fade",
            "pricing.item3": "Haircut & beard",
            "pricing.item4": "Beard shaping",
            "pricing.item5": "Hot towel shave",
            "pricing.item6": "Kids' haircut",
            "pricing.ask": "ask",
            "gallery.kicker": "Gallery",
            "gallery.title": "Our haircuts",
            "gallery.open": "Open full gallery",
            "page.aboutHero": "About",
            "page.servicesHero": "Services",
            "page.galleryHero": "Gallery",
            "page.contactHero": "Contact",
            "page.privacyHero": "Privacy Policy",
            "page.cookiesHero": "Cookie Policy",
            "page.termsHero": "Terms",
            "contact.title": "Get in touch",
            "contact.phone": "Phone",
            "contact.hours": "Working time",
            "contact.phoneText": "Contact phone",
            "contact.hoursText": "Mon-Sat 10:00-19:00; Sunday by appointment",
            "contact.addressTitle": "Address",
            "contact.addressText": "ul. Aleksandar Stamboliyski 23A, 5500 Lovech, Bulgaria",
            "contact.mapTitle": "Map to Bobi Style",
            "contact.mapText": "The contact section includes a Google Maps window for the exact location.",
            "contact.openMaps": "Open in Google Maps",
            "contact.viber": "Viber",
            "contact.whatsapp": "WhatsApp",
            "footer.intro": "Bobi Style barbershop in Lovech for men's haircuts, beard shaping and a clean finish. Appointments are arranged in advance.",
            "footer.locationTitle": "Location",
            "footer.menuTitle": "Menu",
            "footer.contactTitle": "Contact",
            "footer.legalTitle": "Legal",
            "footer.privacy": "Privacy Policy",
            "footer.cookies": "Cookie Policy",
            "footer.terms": "Terms",
            "footer.rights": "All rights reserved.",
            "cookie.title": "Cookie and privacy settings",
            "cookie.text": "This website uses necessary local settings for language and cookie preferences. The contact section includes an embedded Google Maps window that may load external content from Google.",
            "cookie.necessary": "Only necessary",
            "cookie.accept": "Accept",
            "cookie.manage": "Manage cookie settings",
            "legal.updated": "Last updated: 8 July 2026",
            "legal.privacyIntro": "This privacy policy explains how the Bobi Style website handles personal data when you contact the barbershop or use the website.",
            "legal.controllerTitle": "Controller",
            "legal.controllerText": "Website/business: Bobi Style. Contact phone: 0878842147. Address: ul. Aleksandar Stamboliyski 23A, 5500 Lovech, Bulgaria.",
            "legal.dataTitle": "Data we process",
            "legal.dataText": "The site does not use account registration. If you call, send a Viber/WhatsApp message or open Google Maps, the relevant provider may process data according to its own terms.",
            "legal.purposeTitle": "Purpose and legal basis",
            "legal.purposeText": "Contact details are used to answer appointment requests and customer questions. Necessary local settings are used to remember language and consent choices.",
            "legal.cookiesTitle": "Cookies and local storage",
            "legal.cookiesText": "The site stores language and cookie choices locally in the browser. The contact section includes an embedded Google Maps window that may load external content from Google.",
            "legal.rightsTitle": "Your rights",
            "legal.rightsText": "Under GDPR you may request access, correction, erasure, restriction, objection and portability where applicable. You may also contact the Bulgarian Commission for Personal Data Protection.",
            "legal.retentionTitle": "Retention",
            "legal.retentionText": "Messages and call details are kept only as long as needed to arrange and manage appointments, unless a longer period is required by law.",
            "legal.cookiesIntro": "This cookie policy explains the browser storage and embedded third-party map content used by the site.",
            "legal.cookieNecessaryTitle": "Necessary storage",
            "legal.cookieNecessaryText": "The site may store the selected language and cookie choice. These settings keep the website usable and do not track advertising behavior.",
            "legal.cookieOptionalTitle": "External map content",
            "legal.cookieOptionalText": "The contact section includes an embedded Google Maps window. Google may receive technical information such as IP address, device information and map interaction data under its own terms.",
            "legal.cookieManageTitle": "Managing your choice",
            "legal.cookieManageText": "You can change your choice by clearing the site data in your browser or by using the button below.",
            "legal.termsIntro": "These terms describe the basic use of the Bobi Style website.",
            "legal.termsInfoTitle": "Information on the website",
            "legal.termsInfoText": "The website presents services, contact details and location information for Bobi Style. Availability and prices should be confirmed directly with the barbershop.",
            "legal.termsBookingTitle": "Appointments",
            "legal.termsBookingText": "Appointments are arranged by phone, Viber, WhatsApp or in person. If you cannot attend, please notify the shop as early as possible.",
            "legal.termsExternalTitle": "External services",
            "legal.termsExternalText": "Links to Viber, WhatsApp and Google Maps open external services governed by their own terms and privacy policies.",
            "legal.termsReviewTitle": "Legal review",
            "legal.termsReviewText": "These pages are prepared as a practical website template for Bulgaria/EU GDPR needs and should be reviewed by a qualified professional before publishing."
        }
    };

    var languageKey = "bobi-style-language";
    var consentKey = "bobi-style-cookie-consent";

    function getSavedLanguage() {
        return localStorage.getItem(languageKey) || "bg";
    }

    function setSavedLanguage(lang) {
        localStorage.setItem(languageKey, lang);
    }

    function applyLanguage(lang) {
        var english = translations.en;
        document.documentElement.setAttribute("lang", lang);
        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            if (!el.dataset.i18nBg) {
                el.dataset.i18nBg = el.textContent.trim();
            }
            var key = el.dataset.i18n;
            el.textContent = lang === "en" && english[key] ? english[key] : el.dataset.i18nBg;
        });

        var titleKey = document.body ? document.body.dataset.titleKey : "";
        var bgTitle = document.body ? document.body.dataset.titleBg : "";
        if (titleKey) {
            document.title = lang === "en" && english[titleKey] ? english[titleKey] : bgTitle;
        }

        document.querySelectorAll("[data-set-lang]").forEach(function (button) {
            button.classList.toggle("is-active", button.dataset.setLang === lang);
            button.setAttribute("aria-pressed", button.dataset.setLang === lang ? "true" : "false");
        });

        translateMobileMenu(lang);
    }

    function translateMobileMenu(lang) {
        var labels = [
            ["index.html#home", lang === "en" ? "Home" : "Начало"],
            ["index.html#about", lang === "en" ? "About" : "За нас"],
            ["index.html#services", lang === "en" ? "Services" : "Услуги"],
            ["index.html#gallery", lang === "en" ? "Gallery" : "Галерия"],
            ["index.html#contact", lang === "en" ? "Contact" : "Контакти"],
            ["about.html", lang === "en" ? "About" : "За нас"],
            ["services.html", lang === "en" ? "Services" : "Услуги"],
            ["gallery.html", lang === "en" ? "Gallery" : "Галерия"],
            ["contact.html", lang === "en" ? "Contact" : "Контакти"],
            ["index.html", lang === "en" ? "Home" : "Начало"]
        ];
        document.querySelectorAll(".slicknav_nav a").forEach(function (link) {
            var href = link.getAttribute("href") || "";
            labels.some(function (item) {
                var target = item[0];
                if (href === target || href.indexOf(target) !== -1) {
                    link.textContent = item[1];
                    return true;
                }
                return false;
            });
        });
    }

    function initMobileMenuFixes() {
        document.addEventListener("click", function (event) {
            var link = event.target.closest ? event.target.closest(".slicknav_nav a") : null;
            var toggle = document.querySelector(".slicknav_btn.slicknav_open");
            if (link && toggle) {
                window.setTimeout(function () {
                    toggle.click();
                }, 80);
            }
        });
    }

    function initServiceAccordion() {
        var accordions = Array.prototype.slice.call(document.querySelectorAll("[data-service-accordion]"));
        accordions.forEach(function (accordion) {
            var groups = Array.prototype.slice.call(accordion.querySelectorAll(".service-group"));
            var toggles = Array.prototype.slice.call(accordion.querySelectorAll("[data-service-toggle]"));
            var panels = Array.prototype.slice.call(accordion.querySelectorAll("[data-service-panel]"));

            function setOpen(targetGroup) {
                var activeIndex = groups.indexOf(targetGroup);
                var activeRow = activeIndex === -1 ? -1 : Math.floor(activeIndex / 2);
                groups.forEach(function (group) {
                    var open = group === targetGroup;
                    var toggle = group.querySelector("[data-service-toggle]");
                    group.classList.toggle("is-open", open);
                    group.style.gridRow = activeRow !== -1 && groups.indexOf(group) > activeRow * 2 + 1
                        ? String(Math.floor(groups.indexOf(group) / 2) + 2)
                        : String(Math.floor(groups.indexOf(group) / 2) + 1);
                    if (toggle) {
                        toggle.setAttribute("aria-expanded", open ? "true" : "false");
                    }
                });
                panels.forEach(function (panel) {
                    var open = targetGroup && panel.id === "service-panel-" + targetGroup.dataset.serviceGroup;
                    panel.hidden = !open;
                    panel.style.gridRow = activeRow === -1 ? "" : String(activeRow + 2);
                });
            }

            toggles.forEach(function (toggle) {
                toggle.addEventListener("click", function () {
                    var group = toggle.closest ? toggle.closest(".service-group") : null;
                    if (group) {
                        setOpen(group.classList.contains("is-open") ? null : group);
                    }
                });
            });
        });
    }

    function playGalleryVideo(video) {
        if (!video) {
            return;
        }

        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        video.playbackRate = 0.85;
        var playback = video.play();
        if (playback && typeof playback.catch === "function") {
            playback.catch(function () {});
        }
    }

    function initGalleryVideoPlayback() {
        var videos = Array.prototype.slice.call(document.querySelectorAll(".bobi-gallery-row [data-gallery-video]"));
        if (!videos.length) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            videos.forEach(playGalleryVideo);
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var video = entry.target;
                if (entry.isIntersecting) {
                    playGalleryVideo(video);
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.35 });

        videos.forEach(function (video) {
            video.muted = true;
            video.defaultMuted = true;
            video.volume = 0;
            video.playbackRate = 0.85;
            observer.observe(video);
        });
    }

    function initMobileGallery() {
        document.querySelectorAll("[data-mobile-gallery]").forEach(function (gallery) {
            var mediaSets = {};
            try {
                mediaSets = JSON.parse(decodeURIComponent(gallery.dataset.gallerySets || ""));
            } catch (error) {
                mediaSets = {};
            }

            var slots = Array.prototype.slice.call(gallery.querySelectorAll("[data-mobile-gallery-slot]"));
            if (!slots.length) {
                return;
            }

            slots.forEach(function (slot) {
                var media = mediaSets[slot.dataset.gallerySet || "first"];
                if (!Array.isArray(media) || !media.length) {
                    return;
                }
                var card = slot.closest ? slot.closest(".bobi-mobile-gallery-card") : null;
                if (!card) {
                    return;
                }

                var image = card.querySelector("[data-mobile-gallery-image]");
                var video = card.querySelector("[data-mobile-gallery-video]");
                var current = Number(slot.dataset.galleryIndex || 0) % media.length;
                var isVisible = true;

                function update() {
                    var item = media[current];
                    slot.dataset.galleryIndex = String(current);

                    if (item.type === "video") {
                        if (image) {
                            image.hidden = true;
                        }
                        if (video) {
                            video.hidden = false;
                            video.style.objectPosition = item.focus || "50% 42%";
                            if (video.dataset.source !== item.src) {
                                video.src = item.src;
                                video.dataset.source = item.src;
                            }
                            video.poster = item.poster || "";
                            if (isVisible) {
                                playGalleryVideo(video);
                            }
                        }
                        return;
                    }

                    if (video) {
                        video.pause();
                        video.hidden = true;
                    }
                    if (image) {
                        image.hidden = false;
                        image.style.backgroundImage = "url('" + item.src + "')";
                        image.style.backgroundPosition = item.focus || "50% 42%";
                        image.setAttribute("aria-label", "Gallery image " + (current + 1));
                    }
                }

                update();

                if ("IntersectionObserver" in window) {
                    var observer = new IntersectionObserver(function (entries) {
                        entries.forEach(function (entry) {
                            if (entry.target !== card) {
                                return;
                            }
                            isVisible = entry.isIntersecting;
                            if (video && !video.hidden) {
                                if (isVisible) {
                                    playGalleryVideo(video);
                                } else {
                                    video.pause();
                                }
                            }
                        });
                    }, { threshold: 0.35 });
                    observer.observe(card);
                }

                card.querySelectorAll("[data-mobile-gallery-prev]").forEach(function (button) {
                    button.addEventListener("click", function () {
                        current = (current - 1 + media.length) % media.length;
                        update();
                    });
                });

                card.querySelectorAll("[data-mobile-gallery-next]").forEach(function (button) {
                    button.addEventListener("click", function () {
                        current = (current + 1) % media.length;
                        update();
                    });
                });
            });
        });
    }

    function getConsent() {
        try {
            return JSON.parse(localStorage.getItem(consentKey) || "null");
        } catch (error) {
            return null;
        }
    }

    function saveConsent(value) {
        localStorage.setItem(consentKey, JSON.stringify({
            value: value,
            savedAt: new Date().toISOString()
        }));
    }

    function showCookiePanel() {
        var panel = document.querySelector("[data-cookie-panel]");
        if (panel) {
            panel.hidden = false;
        }
    }

    function hideCookiePanel() {
        var panel = document.querySelector("[data-cookie-panel]");
        if (panel) {
            panel.hidden = true;
        }
    }

    function initConsent() {
        var consent = getConsent();
        if (!consent) {
            showCookiePanel();
        }

        document.querySelectorAll("[data-cookie-necessary]").forEach(function (button) {
            button.addEventListener("click", function () {
                saveConsent("necessary");
                hideCookiePanel();
            });
        });

        document.querySelectorAll("[data-cookie-accept]").forEach(function (button) {
            button.addEventListener("click", function () {
                saveConsent("accepted");
                hideCookiePanel();
            });
        });

        document.querySelectorAll("[data-cookie-reset]").forEach(function (button) {
            button.addEventListener("click", function () {
                localStorage.removeItem(consentKey);
                showCookiePanel();
            });
        });
    }

    function initMenuCutState() {
        var links = Array.prototype.slice.call(document.querySelectorAll(".main-menu #navigation a"));
        if (!links.length) {
            return;
        }

        function targetIdFromLink(link) {
            var href = link.getAttribute("href") || "";
            var hashIndex = href.indexOf("#");
            return hashIndex === -1 ? "" : href.slice(hashIndex + 1);
        }

        var sectionIds = links.map(function (link) {
            return targetIdFromLink(link);
        }).filter(function (id, index, ids) {
            return id && ids.indexOf(id) === index && document.getElementById(id);
        });

        function setActive(id) {
            links.forEach(function (link) {
                var active = targetIdFromLink(link) === id;
                var item = link.closest("li");
                if (item) {
                    item.classList.toggle("active", active);
                }
                if (active) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                var id = targetIdFromLink(link);
                if (id && document.getElementById(id)) {
                    setActive(id);
                }
            });
        });

        function updateActiveFromScroll() {
            if (!sectionIds.length) {
                return;
            }
            var current = sectionIds[0];
            var triggerPoint = 170;
            sectionIds.forEach(function (id) {
                var section = document.getElementById(id);
                if (section && section.getBoundingClientRect().top <= triggerPoint) {
                    current = id;
                }
            });
            setActive(current);
        }

        var initialHash = window.location.hash ? window.location.hash.slice(1) : "";
        if (initialHash && document.getElementById(initialHash)) {
            setActive(initialHash);
        } else {
            updateActiveFromScroll();
        }

        var ticking = false;
        window.addEventListener("scroll", function () {
            if (ticking) {
                return;
            }
            ticking = true;
            window.requestAnimationFrame(function () {
                updateActiveFromScroll();
                ticking = false;
            });
        }, { passive: true });
    }

    document.addEventListener("DOMContentLoaded", function () {
        var lang = getSavedLanguage();
        applyLanguage(lang);
        setTimeout(function () {
            applyLanguage(getSavedLanguage());
        }, 300);

        document.querySelectorAll("[data-set-lang]").forEach(function (button) {
            button.addEventListener("click", function () {
                var nextLang = button.dataset.setLang === "en" ? "en" : "bg";
                setSavedLanguage(nextLang);
                applyLanguage(nextLang);
            });
        });

        initMenuCutState();
        initMobileMenuFixes();
        initServiceAccordion();
        initGalleryVideoPlayback();
        initMobileGallery();
        initConsent();
    });
}());
