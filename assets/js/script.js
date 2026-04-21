document.addEventListener('DOMContentLoaded', () =>{
    /**
     * Page Loader
     */

    const loader = document.querySelector('.loader');
    if(loader){
        window.addEventListener('load', () =>{
            setTimeout(() =>{
                loader.classList.add('hidden');
                document.querySelector('.hero')?.classList.add('loaded');
            }, 600);
        });
    }

    /**
     * Custom Cursor
     */

    const curser = document.querySelector('.cursor');
    if(cursor && window.innerWidth > 600){
         let mouseX = 0, mouseY =0;
         let curX = 0, curY=0;

         window.addEventListener('mousemove', e =>{
            mouseX = e.clientX;
            mouseY = e.clientY;
         });

         const lerp = (a,b,t) => a + (b-a) * t;

         const animateCursor = () =>{
            curX = lerp(curX, mouseX, 0.12);
            curY = lerp(curY, mouseY, 0.12);
            cursor.style.left = curX + 'px';
            cursor.style.top = curY + 'px';

            requestAnimationFrame(animateCursor);
         };
         animateCursor();

         const hoverables = 'a, button, .g-item, .masonry-item, .service-item, .filter-btn, .submit-btn';
         document.querySelectorAll(hoverables).forEach(el=> {
            el.addEventListener('mouseenter',()=>cursor.classList.add('expanded'));
            el.addEventListener('mouseremove',()=>cursor.classList.remove('expanded'));
         });
    }

    /**
     * NAV - Scroll State + Active Link
     */

    const nav = document.querySelector('nav');

    const setNavScrolled = () =>{
        if(window.scrollY > 60){
            nav?.classList.add('scrolled');
        }else{
            nav?.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', setNavScrolled, {passive:true});
    setNavScrolled(); //run on init

    //mark active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link =>{
        const href = link.getAttribute('href');
        if(href === currentPage || (currentPage === '' && href === 'index.html')){
            link.classList.add('active');
        }
    });

    /**
     * Scroll Reveal - IntersectionObserver
     */

    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); //fire once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));


    /**
     * Parallax - Hero bg + select elements
     */

    const parallaxEls
})