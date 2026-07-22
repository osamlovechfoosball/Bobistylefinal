const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const phoneDisplay = "0878842147";
const phoneIntl = "+359878842147";
const addressBg = "ул. „Александър Стамболийски“ 23А, 5500 Ловеч, България";
const addressEn = "ul. Aleksandar Stamboliyski 23A, 5500 Lovech, Bulgaria";
const mapsQuery = encodeURIComponent(addressBg);
const googleMaps = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const googleMapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&t=k&z=18&output=embed`;
const whatsapp = "https://wa.me/359878842147";
const viber = "viber://chat?number=%2B359878842147";

function write(file, content) {
    fs.writeFileSync(path.join(root, file), content.replace(/\n{3,}/g, "\n\n"), "utf8");
}

function i18n(key, bg, tag = "span", attrs = "") {
    const extra = attrs ? ` ${attrs}` : "";
    return `<${tag}${extra} data-i18n="${key}">${bg}</${tag}>`;
}

function head(titleKey, titleBg, description) {
    return `<!doctype html>
<html class="no-js" lang="bg">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>${titleBg}</title>
    <meta name="description" content="${description}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="site.webmanifest">
    <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png">

    <!-- CSS here -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="assets/css/slicknav.css">
    <link rel="stylesheet" href="assets/css/flaticon.css">
    <link rel="stylesheet" href="assets/css/gijgo.css">
    <link rel="stylesheet" href="assets/css/animate.min.css">
    <link rel="stylesheet" href="assets/css/animated-headline.css">
    <link rel="stylesheet" href="assets/css/magnific-popup.css">
    <link rel="stylesheet" href="assets/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="assets/css/themify-icons.css">
    <link rel="stylesheet" href="assets/css/slick.css">
    <link rel="stylesheet" href="assets/css/nice-select.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/bobi-template-edits.css">
</head>
<body data-title-key="${titleKey}" data-title-bg="${titleBg}">`;
}

function preloader() {
    return `    <!-- ? Preloader Start -->
    <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="Bobi Style">
                </div>
            </div>
        </div>
    </div>
    <!-- Preloader Start -->`;
}

function header(active, home = false) {
    const items = [
        ["home", "index.html#home", "nav.home", "Начало"],
        ["about", "index.html#about", "nav.about", "За нас"],
        ["services", "index.html#services", "nav.services", "Услуги"],
        ["gallery", "index.html#gallery", "nav.gallery", "Галерия"],
        ["contact", "index.html#contact", "nav.contact", "Контакти"]
    ];
    const nav = items.map(([id, href, key, bg]) => {
        return `                                            <li${active === id ? " class=\"active\"" : ""}><a href="${href}"><span data-i18n="${key}">${bg}</span></a></li>`;
    }).join("\n");

    return `    <header>
        <!--? Header Start -->
        <div class="header-area header-transparent${home ? " pt-20" : ""}">
            <div class="main-header header-sticky">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <!-- Logo -->
                        <div class="col-xl-2 col-lg-2 col-md-1">
                            <div class="logo">
                                <a href="index.html#home"><img src="assets/img/logo/logo.png" alt="Bobi Style"></a>
                            </div>
                        </div>
                        <div class="col-xl-10 col-lg-10 col-md-10">
                            <div class="menu-main d-flex align-items-center justify-content-end">
                                <!-- Main-menu -->
                                <div class="main-menu f-right d-none d-lg-block">
                                    <nav>
                                        <ul id="navigation">
${nav}
                                        </ul>
                                    </nav>
                                </div>
                                <div class="header-right-btn f-right d-none d-lg-block ml-30">
                                    <a href="tel:${phoneIntl}" class="btn header-btn"><i class="fas fa-phone"></i><span data-i18n="nav.call">Обади се</span></a>
                                </div>
                                <div class="template-language-switch d-none d-lg-inline-flex" aria-label="Language">
                                    <button type="button" data-set-lang="bg">BG</button>
                                    <button type="button" data-set-lang="en">EN</button>
                                </div>
                            </div>
                        </div>
                        <!-- Mobile Menu -->
                        <div class="col-12">
                            <div class="template-language-switch d-flex d-lg-none">
                                <button type="button" data-set-lang="bg">BG</button>
                                <button type="button" data-set-lang="en">EN</button>
                            </div>
                            <div class="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Header End -->
    </header>`;
}

function footer() {
    return `    <footer>
        <!--? Footer Start-->
        <div class="footer-area section-bg" data-background="assets/img/gallery/footer_bg.png">
            <div class="container">
                <div class="footer-bottom">
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col-xl-10 col-lg-10 text-center">
                            <div class="footer-social footer-social--brand" aria-label="Bobi Style social media">
                                <a class="footer-social-icon footer-social-icon--facebook" href="https://www.facebook.com/share/1CgjhFEF8C/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <svg class="footer-brand-glyph" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.2 28V17.1h3.7l.6-4.3h-4.3V10c0-1.3.4-2.1 2.2-2.1h2.4V4c-.4-.1-1.8-.2-3.5-.2-3.5 0-5.9 2.1-5.9 6.1v2.9H9.5v4.3h3.9V28h4.8Z"/></svg>
                                </a>
                                <a class="footer-social-icon footer-social-icon--instagram" href="https://www.instagram.com/*b.a.s.k.a.t.a*?utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <svg class="footer-brand-glyph" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="5" y="5" width="22" height="22" rx="6.5" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="16" cy="16" r="5.2" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="23.1" cy="8.9" r="1.55" fill="currentColor"/></svg>
                                </a>
                                <a class="footer-social-icon footer-social-icon--tiktok" href="https://www.tiktok.com/@bobi_barbers.3?_r=1&amp;_t=ZN-986Ri7XaWX8" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                    <svg class="footer-brand-glyph" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M19.3 4c.5 3 2.3 5.1 5.4 6.1v4.3c-2 0-3.8-.6-5.4-1.6v8.1a7.7 7.7 0 1 1-6.7-7.6v4.4a3.4 3.4 0 1 0 2.3 3.3V4h4.4Z"/></svg>
                                </a>
                            </div>
                            <div class="footer-copy-right">
                                <p>&copy; <script>document.write(new Date().getFullYear());</script> Bobi Style. <span data-i18n="footer.rights">Всички права запазени.</span></p>
                                <div class="legal-footer-links">
                                    <a href="privacy-policy.html" data-i18n="footer.privacy">Политика за поверителност</a>
                                    <a href="cookies.html" data-i18n="footer.cookies">Политика за бисквитки</a>
                                    <a href="terms.html" data-i18n="footer.terms">Общи условия</a>
                                    <button type="button" class="secondary" data-cookie-reset data-i18n="cookie.manage">Настройки за бисквитки</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer End-->
    </footer>`;
}

function scripts() {
    return `    <!-- Scroll Up -->
    <div id="back-top">
        <a title="Go to Top" href="#"><i class="fas fa-level-up-alt"></i></a>
    </div>

    <div class="cookie-panel" data-cookie-panel hidden>
        ${i18n("cookie.title", "Настройки за бисквитки и поверителност", "h4")}
        ${i18n("cookie.text", "Този сайт използва нужни локални настройки за език и предпочитания за бисквитки. В контактите има вграден прозорец на Google Maps, който може да зареди външно съдържание от Google.", "p")}
        <div class="cookie-panel__actions">
            <button type="button" class="secondary" data-cookie-necessary data-i18n="cookie.necessary">Само нужните</button>
            <button type="button" data-cookie-accept data-i18n="cookie.accept">Приемам</button>
        </div>
    </div>

    <!-- JS here -->
    <script src="./assets/js/vendor/modernizr-3.5.0.min.js"></script>
    <!-- Jquery, Popper, Bootstrap -->
    <script src="./assets/js/vendor/jquery-1.12.4.min.js"></script>
    <script src="./assets/js/popper.min.js"></script>
    <script src="./assets/js/bootstrap.min.js"></script>
    <!-- Jquery Mobile Menu -->
    <script src="./assets/js/jquery.slicknav.min.js"></script>

    <!-- Jquery Slick , Owl-Carousel Plugins -->
    <script src="./assets/js/owl.carousel.min.js"></script>
    <script src="./assets/js/slick.min.js"></script>
    <!-- One Page, Animated-HeadLin -->
    <script src="./assets/js/wow.min.js"></script>
    <script src="./assets/js/animated.headline.js"></script>
    <script src="./assets/js/jquery.magnific-popup.js"></script>

    <!-- Date Picker -->
    <script src="./assets/js/gijgo.min.js"></script>
    <!-- Nice-select, sticky -->
    <script src="./assets/js/jquery.nice-select.min.js"></script>
    <script src="./assets/js/jquery.sticky.js"></script>

    <!-- counter , waypoint,Hover Direction -->
    <script src="./assets/js/jquery.counterup.min.js"></script>
    <script src="./assets/js/waypoints.min.js"></script>
    <script src="./assets/js/jquery.countdown.min.js"></script>
    <script src="./assets/js/hover-direction-snake.min.js"></script>

    <!-- contact js -->
    <script src="./assets/js/contact.js"></script>
    <script src="./assets/js/jquery.form.js"></script>
    <script src="./assets/js/jquery.validate.min.js"></script>
    <script src="./assets/js/mail-script.js"></script>
    <script src="./assets/js/jquery.ajaxchimp.min.js"></script>

    <!-- Jquery Plugins, main Jquery -->
    <script src="./assets/js/plugins.js"></script>
    <script src="./assets/js/main.js"></script>
    <script src="./assets/js/bobi-template-edits.js"></script>
</body>
</html>`;
}

function page(titleKey, titleBg, description, active, main, home = false) {
    return `${head(titleKey, titleBg, description)}
${preloader()}
${header(active, home)}
    <main>
${main}
    </main>
${footer()}
${scripts()}`;
}

function innerHero(key, bg) {
    return `        <!--? Hero Start -->
        <div class="slider-area2">
            <div class="slider-height2 d-flex align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap hero-cap2 pt-70 text-center">
                                ${i18n(key, bg, "h2")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Hero End -->`;
}

function serviceIcon(name) {
    const icons = {
        haircut: `<svg viewBox="0 0 96 96" role="img" focusable="false"><path d="M38 16l32 53"/><path d="M64 17L31 70"/><circle cx="27" cy="76" r="10"/><circle cx="73" cy="76" r="10"/><path d="M33 65l15-19"/><path d="M28 16l15 22"/><path d="M22 20l9 2"/><path d="M19 27l9 2"/><path d="M16 34l9 2"/><path d="M13 41l9 2"/></svg>`,
        fade: `<svg viewBox="0 0 64 64" role="img" focusable="false"><path d="M18 48c0-20 9-32 28-36"/><path d="M22 50h22"/><path d="M26 42h18"/><path d="M30 34h14"/><path d="M34 26h10"/><path d="M46 12v34"/></svg>`,
        beard: `<svg viewBox="0 0 96 96" role="img" focusable="false"><path d="M18 31c8 1 13-7 21-7 5 0 8 4 9 7 1-3 4-7 9-7 8 0 13 8 21 7"/><path d="M18 31c3 13 13 22 26 22 1 0 3 0 4-1 1 1 3 1 4 1 13 0 23-9 26-22"/><path d="M28 47c0 21 10 33 20 40 10-7 20-19 20-40"/><path d="M31 48c5 5 10 7 17 7s12-2 17-7"/><path d="M37 69c3 7 7 11 11 14 4-3 8-7 11-14"/></svg>`,
        beardShape: `<svg viewBox="0 0 64 64" role="img" focusable="false"><path d="M20 24c0 20 9 30 12 34 3-4 12-14 12-34"/><path d="M23 23c3-7 15-7 18 0"/><path d="M19 34c7 5 19 5 26 0"/><path d="M12 44l12-12"/><path d="M40 32l12 12"/></svg>`,
        finish: `<svg viewBox="0 0 64 64" role="img" focusable="false"><path d="M13 20h38"/><path d="M13 28h38"/><path d="M17 28v17"/><path d="M24 28v17"/><path d="M31 28v17"/><path d="M38 28v17"/><path d="M45 28v17"/><path d="M18 15c6-7 22-7 28 0"/></svg>`,
        contours: `<svg viewBox="0 0 64 64" role="img" focusable="false"><path d="M15 49l34-34"/><path d="M41 13l10 10"/><path d="M24 40l8 8"/><path d="M16 50h18"/><path d="M44 20l-8 8"/></svg>`,
        shave: `<svg viewBox="0 0 96 96" role="img" focusable="false"><path d="M28 15c-12 17-12 42 1 61"/><path d="M38 18c-8 16-7 35 5 51"/><path d="M40 25l28 28"/><path d="M34 24l12-12 31 31-13 18-30-30z"/><path d="M47 32l23 23"/><path d="M60 61l-10 11"/></svg>`,
        towel: `<svg viewBox="0 0 64 64" role="img" focusable="false"><path d="M18 14h28v36H18z"/><path d="M24 14v36"/><path d="M40 14v36"/><path d="M15 22h34"/><path d="M15 42h34"/></svg>`,
        kids: `<svg viewBox="0 0 96 96" role="img" focusable="false"><circle cx="48" cy="52" r="28"/><path d="M22 50c-8-1-12 5-9 11 2 5 7 6 12 4"/><path d="M74 50c8-1 12 5 9 11-2 5-7 6-12 4"/><path d="M35 50c3 3 6 3 9 0"/><path d="M52 50c3 3 6 3 9 0"/><path d="M38 66c6 6 14 6 20 0"/><path d="M36 29c5-12 21-15 30-5 4 4 5 10 5 16"/><path d="M45 28c4 5 10 5 14 0"/></svg>`,
        wash: `<svg viewBox="0 0 64 64" role="img" focusable="false"><path d="M12 38h40"/><path d="M18 38c2 10 8 16 14 16s12-6 14-16"/><path d="M22 22c6-8 14-8 20 0"/><path d="M24 10l4 6"/><path d="M36 10l4 6"/></svg>`,
        eyebrow: `<svg viewBox="0 0 64 64" role="img" focusable="false"><path d="M12 30c8-10 19-10 28 0"/><path d="M14 38c9 5 18 5 27 0"/><path d="M43 22l9-9"/><path d="M49 13l5 5"/></svg>`,
        color: `<svg viewBox="0 0 64 64" role="img" focusable="false"><path d="M18 16h28v18H18z"/><path d="M22 34v18"/><path d="M30 34v18"/><path d="M38 34v18"/><path d="M46 34v18"/><path d="M18 16c5-6 23-6 28 0"/></svg>`,
        family: `<svg viewBox="0 0 64 64" role="img" focusable="false"><circle cx="24" cy="22" r="8"/><circle cx="44" cy="28" r="6"/><path d="M10 56c3-12 10-18 20-18"/><path d="M35 56c2-8 7-12 15-12"/></svg>`,
        combo: `<svg viewBox="0 0 64 64" role="img" focusable="false"><path d="M18 14l18 18"/><path d="M36 14L18 32"/><circle cx="14" cy="10" r="5"/><circle cx="14" cy="36" r="5"/><path d="M39 31c0 14 7 22 9 25 2-3 9-11 9-25"/><path d="M41 31c2-5 12-5 14 0"/></svg>`,
        consult: `<svg viewBox="0 0 64 64" role="img" focusable="false"><circle cx="29" cy="20" r="9"/><path d="M13 54c3-12 12-18 25-15"/><path d="M40 44l6 6 12-14"/></svg>`
    };
    return icons[name] || icons.haircut;
}

function servicesAccordion(full = false) {
    const serviceDetails = {
        mensHaircut: ["services.mensHaircut", "Мъжко подстригване", "services.mensHaircutText", "Класическо или модерно подстригване."],
        skinFade: ["services.skinFade", "Skin fade", "services.skinFadeText", "Нисък, среден или висок фейд с чист преход."],
        haircutBeard: ["services.haircutBeard", "Подстригване и брада", "services.haircutBeardText", "Пълна комбинирана услуга."],
        beardTrim: ["services.beardTrim", "Подстригване на брада", "services.beardTrimText", "Скъсяване и оформяне на брадата."],
        beardShaping: ["services.beardShaping", "Оформяне на брада", "services.beardShapingText", "Дизайн на брада, симетрия и по-остра форма."],
        lineup: ["services.lineup", "Чисти контури / Line-up", "services.lineupText", "Линия на косата, врат, брада и линии на бузите."],
        hotTowel: ["services.hotTowel", "Бръснене с топла кърпа", "services.hotTowelText", "Традиционно бръснене с топла кърпа."],
        cleanShave: ["services.cleanShave", "Гладко бръснене", "services.cleanShaveText", "Пълно бръснене на брадата."],
        kidsHaircut: ["services.kidsHaircut", "Детско подстригване", "services.kidsHaircutText", "Подстригване за момчета и деца."],
        womensHaircut: ["services.womensHaircut", "Дамско подстригване", "services.womensHaircutText", "Подстригване според желаната дължина и форма."],
        hairWash: ["services.hairWash", "Измиване на коса", "services.hairWashText", "Измиване преди или след подстригване."],
        stylingFinish: ["services.stylingFinish", "Стайлинг и финал", "services.stylingFinishText", "Продукт, сушене със сешоар и финална визия."],
        eyebrowTrim: ["services.eyebrowTrim", "Оформяне на вежди", "services.eyebrowTrimText", "Леко почистване и оформяне на вежди."],
        hairColoring: ["services.hairColoring", "Боядисване на коса", "services.hairColoringText", "Цялостно или частично мъжко боядисване."],
        fatherSon: ["services.fatherSon", "Подстригване за баща и син", "services.fatherSonText", "Комбинирана услуга за баща и дете."]
    };
    const groups = [
        ["haircut", "services.categoryHaircut", "Подстригване", "services.categoryHaircutText", "Класическо подстригване, фейд, измиване, стайлинг и финал.", "haircut", ["mensHaircut", "skinFade", "hairWash", "stylingFinish", "hairColoring", "eyebrowTrim"]],
        ["shaving", "services.categoryShaving", "Бръснене", "services.categoryShavingText", "Чисто бръснене, топла кърпа и прецизни контури.", "shave", ["hotTowel", "cleanShave", "lineup"]],
        ["beard", "services.categoryBeard", "Брада", "services.categoryBeardText", "Скъсяване, форма, симетрия и комбинирана услуга с подстригване.", "beard", ["beardTrim", "beardShaping", "haircutBeard"]],
        ["kids", "services.categoryKids", "Детско подстригване", "services.categoryKidsText", "Подстригване за деца, дами и комбинирана услуга за баща и син.", "kids", ["kidsHaircut", "womensHaircut", "fatherSon"]]
    ];

    const cards = groups.map(([id, titleKey, titleBg, textKey, textBg, icon]) => `                            <div class="service-group" data-service-group="${id}">
                                <button class="service-group-toggle" type="button" data-service-toggle aria-expanded="false" aria-controls="service-panel-${id}">
                                    <span class="service-group-icon" aria-hidden="true">${serviceIcon(icon)}</span>
                                    <span class="service-group-copy">
                                        <strong data-i18n="${titleKey}">${titleBg}</strong>
                                        <span data-i18n="${textKey}">${textBg}</span>
                                    </span>
                                    <span class="service-group-cue" aria-hidden="true"></span>
                                </button>
                            </div>`).join("\n");
    const panels = groups.map(([id, , , , , , itemKeys], groupIndex) => {
        const side = groupIndex % 2 === 0 ? "left" : "right";
        return `                            <div class="service-group-panel service-group-panel--${side}" id="service-panel-${id}" data-service-panel data-service-panel-for="${id}" data-service-detail-count="${itemKeys.length}" hidden>
                                <div class="service-detail-grid">
${itemKeys.map((itemKey) => {
    const [titleKey, titleBg, textKey, textBg] = serviceDetails[itemKey];
    return `                                    <article class="service-detail-item">
                                        <h4 data-i18n="${titleKey}">${titleBg}</h4>
                                        <p data-i18n="${textKey}">${textBg}</p>
                                    </article>`;
}).join("\n")}
                                </div>
                            </div>`;
    }).join("\n");

    return `                    <div class="col-12">
                        <div class="service-showcase">
                            <div class="service-showcase-media" aria-hidden="true">
                                <img src="assets/img/bobi-real/wash-station.jpg" alt="Интериор и зона за измиване в Bobi Style">
                            </div>
                            <div class="service-showcase-actions">
                                <div class="service-accordion" data-service-accordion>
${cards}
${panels}
                                </div>
                            </div>
                        </div>
                    </div>`;
}

function servicesGrid(full = false) {
    const cards = [
        ["services.mensHaircut", "Мъжко подстригване", "services.mensHaircutText", "Класическо или модерно подстригване.", "haircut", ""],
        ["services.skinFade", "Skin fade", "services.skinFadeText", "Нисък, среден или висок фейд с чист преход.", "fade", " active"],
        ["services.haircutBeard", "Подстригване и брада", "services.haircutBeardText", "Пълна комбинирана услуга.", "combo", ""],
        ["services.beardTrim", "Подстригване на брада", "services.beardTrimText", "Скъсяване и оформяне на брадата.", "beard", " active"],
        ["services.beardShaping", "Оформяне на брада", "services.beardShapingText", "Дизайн на брада, симетрия и по-остра форма.", "beardShape", ""],
        ["services.lineup", "Чисти контури / Line-up", "services.lineupText", "Линия на косата, врат, брада и линии на бузите.", "contours", " active"],
        ["services.hotTowel", "Бръснене с топла кърпа", "services.hotTowelText", "Традиционно бръснене с топла кърпа.", "towel", ""],
        ["services.cleanShave", "Гладко бръснене", "services.cleanShaveText", "Пълно бръснене на брадата.", "shave", " active"],
        ["services.kidsHaircut", "Детско подстригване", "services.kidsHaircutText", "Подстригване за момчета и деца.", "kids", ""],
        ["services.womensHaircut", "Дамско подстригване", "services.womensHaircutText", "Подстригване според желаната дължина и форма.", "haircut", " active"],
        ["services.hairWash", "Измиване на коса", "services.hairWashText", "Измиване преди или след подстригване.", "wash", " active"],
        ["services.stylingFinish", "Стайлинг и финал", "services.stylingFinishText", "Продукт, сушене със сешоар и финална визия.", "finish", ""],
        ["services.eyebrowTrim", "Оформяне на вежди", "services.eyebrowTrimText", "Леко почистване и оформяне на вежди.", "eyebrow", " active"],
        ["services.hairColoring", "Боядисване на коса", "services.hairColoringText", "Цялостно или частично мъжко боядисване.", "color", ""],
        ["services.fatherSon", "Подстригване за баща и син", "services.fatherSonText", "Комбинирана услуга за баща и дете.", "family", " active"]
    ];
    return cards.slice(0, full ? cards.length : 3).map(([titleKey, titleBg, textKey, textBg, icon, activeClass]) => `                    <div class="col-xl-4 col-lg-4 col-md-6">
                        <div class="services-caption${activeClass} text-center mb-30">
                            <div class="service-icon">
                                <span class="service-svg service-svg--${icon}" aria-hidden="true">${serviceIcon(icon)}</span>
                            </div>
                            <div class="service-cap">
                                <h4><a href="index.html#services" data-i18n="${titleKey}">${titleBg}</a></h4>
                                ${i18n(textKey, textBg, "p")}
                            </div>
                        </div>
                    </div>`).join("\n");
}

function servicesSection(full = false) {
    return `        <!--? Services Area Start -->
        <section id="services" class="service-area ${full ? "section-padding30" : "pb-170"}">
            <div class="container">
                <!-- Section Tittle -->
                <div class="row d-flex justify-content-center">
                    <div class="col-xl-7 col-lg-8 col-md-11 col-sm-11">
                        <div class="section-tittle text-center mb-90">
                            ${i18n("services.kicker", "Услуги", "span")}
                            ${i18n("services.title", "Професионално подстригване, всичко за мъжката визия от начало до край", "h2")}
                        </div>
                    </div>
                </div>
                <!-- Section caption -->
                <div class="row">
${servicesAccordion(full)}
                </div>
            </div>
        </section>
        <!-- Services Area End -->`;
}

function galleryMedia() {
    return [
        { type: "video", src: "assets/media/real-cut-session.mp4", poster: "assets/img/gallery/real-cuts/real-barber-portrait.jpg", focus: "50% 42%" },
        { type: "image", src: "assets/img/gallery/real-cuts/real-barber-at-work.png", focus: "50% 38%" },
        { type: "image", src: "assets/img/gallery/real-cuts/real-fade-back.png", focus: "50% 42%" },
        { type: "image", src: "assets/img/gallery/real-cuts/real-barber-portrait.jpg", focus: "50% 42%" },
        { type: "video", src: "assets/media/real-barber-cut.mp4", poster: "assets/img/gallery/real-cuts/real-fade-back.png", focus: "50% 44%" },
        { type: "image", src: "assets/img/gallery/real-cuts/real-line-design.png", focus: "50% 40%" },
        { type: "image", src: "assets/img/gallery/real-cuts/real-textured-crop.png", focus: "50% 42%" },
        { type: "image", src: "assets/img/gallery/real-cuts/real-taper-detail.png", focus: "50% 42%" },
        { type: "image", src: "assets/img/gallery/real-cuts/real-buzz-cut.png", focus: "50% 43%" },
        { type: "image", src: "assets/img/gallery/real-cuts/real-fade-front.png", focus: "50% 36%" },
        { type: "image", src: "assets/img/gallery/real-cuts/real-buzz-back.png", focus: "50% 45%" }
    ];
}

function mobileGalleryMedia() {
    const media = galleryMedia();
    return {
        first: [media[4], media[2], media[5], media[7], media[9], media[10]],
        second: [media[3], media[0], media[1], media[6], media[8]]
    };
}

function galleryGrid(extra = false) {
    const media = galleryMedia();
    return media.slice(0, extra ? media.length : 4).map((item, index) => {
        const wide = index === 1 || index === 2 || index === 4;
        const visual = item.type === "video"
            ? `<video class="gallery-video" data-gallery-video autoplay muted loop playsinline preload="metadata" poster="${item.poster}" style="object-position: ${item.focus};"><source src="${item.src}" type="video/mp4"></video>`
            : `<div class="gallery-img" style="background-image: url(${item.src}); background-position: ${item.focus};"></div>`;
        return `                    <div class="${wide ? "col-lg-8" : "col-lg-4"} col-md-6 col-sm-6">
                        <div class="box snake mb-30">
                            ${visual}
                            <div class="overlay"></div>
                        </div>
                    </div>`;
    }).join("\n");
}

function gallerySection(extra = false) {
    const mobileMedia = encodeURIComponent(JSON.stringify(mobileGalleryMedia()));
    return `        <!--? Gallery Area Start -->
        <div id="gallery" class="gallery-area section-padding30">
            <div class="container">
                <!-- Section Tittle -->
                <div class="row justify-content-center">
                    <div class="col-xl-6 col-lg-7 col-md-9 col-sm-10">
                        <div class="section-tittle text-center mb-100">
                            ${i18n("gallery.kicker", "Галерия", "span")}
                            ${i18n("gallery.title", "Нашите прически", "h2")}
                        </div>
                    </div>
                </div>
                <div class="row bobi-gallery-row">
${galleryGrid(extra)}
                </div>
                <div class="bobi-mobile-gallery" data-mobile-gallery data-gallery-sets="${mobileMedia}">
                    <article class="bobi-mobile-gallery-card">
                        <div class="bobi-mobile-gallery-image" data-mobile-gallery-image hidden role="img" aria-label="Gallery media"></div>
                        <video class="bobi-mobile-gallery-video" data-mobile-gallery-video data-mobile-gallery-slot data-gallery-set="first" data-gallery-index="0" autoplay muted loop playsinline preload="metadata" poster="assets/img/gallery/real-cuts/real-fade-back.png" style="object-position: 50% 44%;"><source src="assets/media/real-barber-cut.mp4" type="video/mp4"></video>
                        <div class="bobi-mobile-gallery-controls" aria-label="Контроли на галерията">
                            <button type="button" data-mobile-gallery-prev aria-label="Предишни снимки"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>
                            <button type="button" data-mobile-gallery-next aria-label="Следващи снимки"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>
                        </div>
                    </article>
                    <article class="bobi-mobile-gallery-card">
                        <div class="bobi-mobile-gallery-image" data-mobile-gallery-image role="img" aria-label="Gallery media" style="background-image: url(assets/img/gallery/real-cuts/real-barber-portrait.jpg); background-position: 50% 42%;"></div>
                        <video class="bobi-mobile-gallery-video" data-mobile-gallery-video data-mobile-gallery-slot data-gallery-set="second" data-gallery-index="0" hidden autoplay muted loop playsinline preload="metadata" poster="assets/img/gallery/real-cuts/real-barber-portrait.jpg"></video>
                        <div class="bobi-mobile-gallery-controls" aria-label="Контроли на галерията">
                            <button type="button" data-mobile-gallery-prev aria-label="Предишни снимки"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>
                            <button type="button" data-mobile-gallery-next aria-label="Следващи снимки"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>
                        </div>
                    </article>
                </div>
                ${extra ? "" : `<div class="row justify-content-center"><div class="col-xl-4 text-center"><a href="index.html#gallery" class="btn hero-btn" data-i18n="gallery.open">Виж цялата галерия</a></div></div>`}
            </div>
        </div>
        <!-- Gallery Area End -->`;
}

function homeMain() {
    return `        <!--? slider Area Start-->
        <div id="home" class="slider-area position-relative fix">
            <div class="slider-active">
                <!-- Single Slider -->
                <div class="single-slider slider-height d-flex align-items-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-8 col-lg-9 col-md-11 col-sm-10">
                                <div class="hero__caption">
                                    <span data-animation="fadeInUp" data-delay="0.2s" data-i18n="hero.kicker">БОБИ СТИЛ - ФРИЗЬОР И БРЪСНАРНИЦА В ЛОВЕЧ</span>
                                    <h1 data-animation="fadeInUp" data-delay="0.5s" data-i18n="hero.title">Подстригване, брада и точна ръка</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Single Slider -->
                <div class="single-slider slider-height d-flex align-items-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-8 col-lg-9 col-md-11 col-sm-10">
                                <div class="hero__caption">
                                    <span data-animation="fadeInUp" data-delay="0.2s" data-i18n="hero.kicker2">БОБИ СТИЛ - ФРИЗЬОР И БРЪСНАРНИЦА В ЛОВЕЧ</span>
                                    <h1 data-animation="fadeInUp" data-delay="0.5s" data-i18n="hero.title2">За косата, брадата и мъжката визия</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- stroke Text removed for the Bobi Style one-page layout -->
            <!-- Arrow -->
            <div class="thumb-content-box">
                <a class="thumb-content" href="index.html#contact" aria-label="Запази час">
                    <h3 data-i18n="hero.appointment">Запази час</h3>
                    <span class="thumb-arrow"><i class="fas fa-long-arrow-alt-right"></i></span>
                </a>
            </div>
        </div>
        <!-- slider Area End-->
        <!--? About Area Start -->
        <section id="about" class="about-area section-padding30 position-relative">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-11">
                        <!-- about-img -->
                        <div class="about-img">
                            <img src="assets/img/bobi-real/barber-chair.png" alt="Бръснарският стол в Bobi Style">
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="about-caption">
                            <!-- Section Tittle -->
                            <div class="section-tittle section-tittle3 mb-35">
                                ${i18n("about.kicker", "За нас", "span")}
                                ${i18n("about.title", "Местна бръснарница с дългогодишен опит в мъжкото подстригване", "h2")}
                            </div>
                            ${i18n("about.p1", "Боби — бръснар с дългогодишен опит във фризьорството и мъжкото подстригване. За него занаятът е комбинация от майсторство, прецизност и постоянство — с фокус върху това всеки клиент да получи желаната визия.", "p", "class=\"mb-30 pera-bottom\"")}
                            ${i18n("about.p2", "Тук всяка прическа се прави с внимание и индивидуален подход, съобразен с желанието на клиента. Посетете ни и се уверете сами.", "p", "class=\"pera-top mb-50\"")}
                        </div>
                    </div>
                </div>
            </div>
            <!-- About Shape -->
            <div class="about-shape">
                <img src="assets/img/gallery/about-shape.png" alt="">
            </div>
        </section>
        <!-- About-2 Area End -->
${servicesSection(true)}
${gallerySection(true)}
${contactMain(false)}`;
}

function aboutMain() {
    return `${innerHero("page.aboutHero", "За нас")}
        <!--? About Area Start -->
        <section id="about" class="about-area section-padding30 position-relative">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-11">
                        <div class="about-img"><img src="assets/img/bobi-real/barber-chair.png" alt="Бръснарският стол в Bobi Style"></div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="about-caption">
                            <div class="section-tittle section-tittle3 mb-35">
                                ${i18n("about.kicker", "За нас", "span")}
                                ${i18n("about.title", "Местна бръснарница с дългогодишен опит в мъжкото подстригване", "h2")}
                            </div>
                            ${i18n("about.p1", "Боби — бръснар с дългогодишен опит във фризьорството и мъжкото подстригване. За него занаятът е комбинация от майсторство, прецизност и постоянство — с фокус върху това всеки клиент да получи желаната визия.", "p", "class=\"mb-30 pera-bottom\"")}
                            ${i18n("about.p2", "Тук всяка прическа се прави с внимание и индивидуален подход, съобразен с желанието на клиента. Посетете ни и се уверете сами.", "p", "class=\"pera-top mb-50\"")}
                            <div class="bobi-contact-actions">
                                <a class="btn" href="tel:${phoneIntl}"><i class="fas fa-phone"></i><span data-i18n="about.cta">Обади се за час</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="about-shape"><img src="assets/img/gallery/about-shape.png" alt=""></div>
        </section>
        <!-- About-2 Area End -->
${servicesSection(false)}`;
}

function contactMain(includeHero = true) {
    return `${includeHero ? innerHero("page.contactHero", "Контакти") : ""}
        <!--? Contact Area start -->
        <section id="contact" class="contact-section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        ${i18n("contact.title", "Свържете се", "h2", "class=\"contact-title\"")}
                    </div>
                    <div class="col-lg-8">
                        <div class="form-contact contact_form">
                            <div class="bobi-map-window bobi-contact-map">
                                <iframe title="Bobi Style Google Maps" src="${googleMapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 offset-lg-1">
                        <div class="media contact-info">
                            <span class="contact-info__icon"><i class="ti-home"></i></span>
                            <div class="media-body">
                                ${i18n("contact.addressTitle", "Адрес", "h3")}
                                ${i18n("contact.addressText", addressBg, "p")}
                            </div>
                        </div>
                        <div class="media contact-info">
                            <span class="contact-info__icon"><i class="ti-tablet"></i></span>
                            <div class="media-body">
                                <h3><a href="tel:${phoneIntl}">${phoneDisplay}</a></h3>
                                <p data-i18n="contact.phoneText">Телефон за връзка</p>
                            </div>
                        </div>
                        <div class="media contact-info">
                            <span class="contact-info__icon"><i class="ti-time"></i></span>
                            <div class="media-body">
                                ${i18n("contact.hours", "Работно време", "h3")}
                                <p data-i18n="contact.hoursText">Пон-съб 10:00-19:00; неделя с предварително записване</p>
                            </div>
                        </div>
                        <div class="contact-social-links">
                            <a href="${whatsapp}" aria-label="WhatsApp" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i></a>
                            <a href="${viber}" aria-label="Viber"><i class="fab fa-viber"></i></a>
                            <a href="tel:${phoneIntl}" aria-label="Phone"><i class="fas fa-phone"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Contact Area End -->`;
}

function legalMain(heroKey, heroBg, introKey, introBg, blocks) {
    const body = blocks.map(([titleKey, titleBg, textKey, textBg]) => `                        ${i18n(titleKey, titleBg, "h3")}
                        ${i18n(textKey, textBg, "p")}`).join("\n");
    return `${innerHero(heroKey, heroBg)}
        <section class="sample-text-area legal-content">
            <div class="container box_1170">
                <div class="row">
                    <div class="col-lg-10">
                        ${i18n("legal.updated", "Последна актуализация: 8 юли 2026 г.", "p", "class=\"sample-text\"")}
                        ${i18n(introKey, introBg, "p", "class=\"sample-text\"")}
${body}
                    </div>
                </div>
            </div>
        </section>`;
}

write("index.html", page("title.home", "Начало | Bobi Style", "Bobi Style - бръснарница в Ловеч за мъжко подстригване, брада и стайлинг.", "home", homeMain(), true));
write("about.html", page("title.about", "За нас | Bobi Style", "Научете повече за Bobi Style в Ловеч.", "about", aboutMain()));
write("services.html", page("title.services", "Услуги | Bobi Style", "Услуги в Bobi Style: мъжко подстригване, брада, контури и стайлинг.", "services", `${innerHero("page.servicesHero", "Услуги")}\n${servicesSection(true)}`));
write("gallery.html", page("title.gallery", "Галерия | Bobi Style", "Галерия от барбершоп стила на Bobi Style.", "gallery", `${innerHero("page.galleryHero", "Галерия")}\n${gallerySection(true)}`));
write("contact.html", page("title.contact", "Контакти | Bobi Style", `Контакти на Bobi Style: ${phoneDisplay}, ${addressBg}.`, "contact", contactMain()));

write("privacy-policy.html", page("title.privacy", "Политика за поверителност | Bobi Style", "Политика за поверителност на Bobi Style.", "", legalMain("page.privacyHero", "Политика за поверителност", "legal.privacyIntro", "Тази политика за поверителност обяснява как сайтът на Bobi Style обработва лични данни, когато се свързвате с бръснарницата или използвате сайта.", [
    ["legal.controllerTitle", "Администратор", "legal.controllerText", `Сайт/бизнес: Bobi Style. Телефон за контакт: ${phoneDisplay}. Адрес: ${addressBg}.`],
    ["legal.dataTitle", "Данни, които обработваме", "legal.dataText", "Сайтът не използва регистрация на профили. Ако се обадите, изпратите Viber/WhatsApp съобщение или отворите Google Maps, съответният доставчик може да обработва данни според собствените си условия."],
    ["legal.purposeTitle", "Цел и правно основание", "legal.purposeText", "Контактните данни се използват за отговор на заявки за час и клиентски въпроси. Нужните локални настройки се използват за запомняне на езика и избора за съгласие."],
    ["legal.cookiesTitle", "Бисквитки и локално съхранение", "legal.cookiesText", "Сайтът съхранява избора на език и избора за бисквитки локално в браузъра. В секцията за контакти има вграден прозорец на Google Maps, който може да зареди външно съдържание от Google."],
    ["legal.rightsTitle", "Вашите права", "legal.rightsText", "Съгласно GDPR можете да поискате достъп, корекция, изтриване, ограничаване, възражение и преносимост, когато е приложимо. Можете също да се свържете с Комисията за защита на личните данни."],
    ["legal.retentionTitle", "Срок на съхранение", "legal.retentionText", "Съобщенията и данните от обаждания се пазят само докато са нужни за организиране и управление на часове, освен ако законът не изисква по-дълъг срок."]
])));

write("cookies.html", page("title.cookies", "Политика за бисквитки | Bobi Style", "Политика за бисквитки на Bobi Style.", "", `${legalMain("page.cookiesHero", "Политика за бисквитки", "legal.cookiesIntro", "Тази политика за бисквитки обяснява браузърното съхранение и външното съдържание за карта, използвани от сайта.", [
    ["legal.cookieNecessaryTitle", "Нужно съхранение", "legal.cookieNecessaryText", "Сайтът може да съхрани избрания език и избора за бисквитки. Тези настройки поддържат сайта удобен и не следят рекламно поведение."],
    ["legal.cookieOptionalTitle", "Външно съдържание от карта", "legal.cookieOptionalText", "В секцията за контакти е вграден Google Maps прозорец. Google може да получи техническа информация като IP адрес, данни за устройство и взаимодействия с картата според собствените си условия."],
    ["legal.cookieManageTitle", "Управление на избора", "legal.cookieManageText", "Можете да промените избора си, като изчистите данните за сайта в браузъра или използвате бутона по-долу."]
])}
        <section class="mb-100">
            <div class="container box_1170">
                <button type="button" class="btn" data-cookie-reset data-i18n="cookie.manage">Настройки за бисквитки</button>
            </div>
        </section>`));

write("terms.html", page("title.terms", "Общи условия | Bobi Style", "Общи условия на Bobi Style.", "", legalMain("page.termsHero", "Общи условия", "legal.termsIntro", "Тези условия описват основното използване на сайта на Bobi Style.", [
    ["legal.termsInfoTitle", "Информация в сайта", "legal.termsInfoText", "Сайтът представя услуги, контакти и локация на Bobi Style. Свободните часове и цените трябва да се потвърждават директно с бръснарницата."],
    ["legal.termsBookingTitle", "Записване на час", "legal.termsBookingText", "Часове се уговарят по телефон, Viber, WhatsApp или на място. Ако не можете да дойдете, уведомете салона възможно най-рано."],
    ["legal.termsExternalTitle", "Външни услуги", "legal.termsExternalText", "Линковете към Viber, WhatsApp и Google Maps отварят външни услуги, които се управляват от техните собствени условия и политики за поверителност."],
    ["legal.termsReviewTitle", "Правен преглед", "legal.termsReviewText", "Тези страници са подготвени като практичен уебсайт шаблон за България/ЕС GDPR нужди и трябва да се прегледат от квалифициран специалист преди публикуване."]
])));

write("404.html", page("title.home", "Bobi Style", "Bobi Style", "home", `${innerHero("nav.home", "Bobi Style")}\n        <section class="sample-text-area"><div class="container box_1170"><p><a href="index.html">Bobi Style</a></p></div></section>`));

write("site.webmanifest", JSON.stringify({
    name: "Bobi Style",
    short_name: "Bobi Style",
    start_url: "index.html",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d19f68",
    icons: [{ src: "assets/img/favicon.png", sizes: "192x192", type: "image/png" }]
}, null, 2));

write("README.md", `# Bobi Style

Static website for the Bobi Style barbershop in Lovech, Bulgaria. The site is ready for GitHub Pages and does not require a build step or server-side code.

## Publish to GitHub Pages

1. Create a new GitHub repository and upload every file in this folder.
2. In GitHub, open Settings > Pages.
3. Under Build and deployment, choose Deploy from a branch.
4. Select the main branch and the /(root) folder, then save.

GitHub publishes index.html as the home page. The .nojekyll file keeps the static assets and files unchanged during deployment.

## Included

- Bulgarian default language with an English switcher
- One-page Home, About, Services, Gallery, and Contact navigation
- Phone, WhatsApp, Viber, and Google Maps contact routes
- Embedded Google Maps satellite view
- Privacy Policy, Cookie Policy, and Terms pages
- Responsive desktop and mobile layouts

## Business Details

- Phone: ${phoneDisplay}
- Address: ${addressEn}
- Working hours: Monday-Saturday, 10:00-19:00; Sunday by appointment

## Legal Note

The privacy, cookie, and GDPR text is a practical template for a small Bulgarian business website. Have the final published version reviewed by a qualified Bulgarian lawyer or data-protection specialist.
`);

write(".nojekyll", "");

["portfolio.html", "contact_process.php"].forEach((file) => {
    const target = path.join(root, file);
    if (fs.existsSync(target)) {
        fs.unlinkSync(target);
    }
});

console.log(`Bobi Style static site rebuilt in ${root}`);
