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

    const parallaxEls = document.querySelectorAll('.hero-bg');

    const handleParallax =() =>{
        const scrollY = window.scrollY;
        parallaxEls.forEach(el =>{
            const speed = 0.35;
            el.style.transform = `translateY(${scrollY * speed}px) scale (1.05)`;
        });
    };

    if(parallaxEls.length){
        window.addEventListener('scroll', handleParallax, {passive: true});
    }

    /**
     * Gallery filters
     */

    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');

    filterBtns.forEach(btn =>{
        btn.addEventListener('click', () =>{
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            masonryItems.forEach(item =>{
                const category = item.dataset.category;
                const show = filter === 'all' || category === filter;

                item.style.transition = 'opacity 0.4s ease, transform ease';

                if(show){
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.pointerEvents = 'auto';
                }else{
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.96)';
                    item.style.pointerEvents = 'none';
                }
            });
        });
    });

    /**
     * Lightbox 
     */

    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if(lightBox && lightboxImg){
        document.querySelectorAll('.masonry-item img').forEach(img =>{
            img.addEventListener('click', () =>{
                lightboxImg.src = img.src;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLighbox = () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        };

        lightboxClose?.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => {
            if(e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', e => {
            if(e.key === 'Escape') closeLightbox();
        });
    }

    /**
     * Page Transitions
     */
    const overlay = document.querySelector('.page-transtion');

    if(overlay){
        //slide in on arrival

    overlay.classList.add('exiting');
    setTimeout(() => overlay.classList.remove('exiting'), 700);
    
    document.querySelectorAll('a[href]').forEach(link =>{
        const href = link.getAttribute('href');
        const isInternal = href && !href.startsWith('#') && !href.startsWith('mailto');

        if(isInternal){
            link.addEventListener('click', e =>{
                e.preventDefault();
                overlay.classList.add('entering');
                setTimeout(() =>{
                    window.location.href = href;
                }, 600);
            });
        }
    });
  }

  /**
   * Smooth Scroll for Anchor Links
   */

    document.querySelectorAll('a[href^="#"]').forEach(anchor =>{
        anchor.addEventListener('click', e=>{
            const target = document.querySelector(anchor.getAttribute('href'));
            if(target){
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start'});
            }
        });
    });

    /**
     * Contact Form
     */


    const form = document.querySelector('.contact-form');
    const submitBtn = form?.querySelector('.submit-btn');

    form?.addEventListener('submit', e =>{
        e.preventDefault();

        if(submitBtn){
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;

            //Hookup backend here soon
            setTimeout(()=> {
                submitBtn.querySelector('span').textContent = 'Sent';
                submitBtn.style.background - 'var(--taupe)';

                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = 'Send Message';
                    submitBtn.disabled = false;
                    submitBtn.style.background ='';
                    form.requestFullscreen();
                }, 3000);
            },1500);
        }
    });
});