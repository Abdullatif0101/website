document.addEventListener('DOMContentLoaded', () => {

    /* --- Custom Cursor --- */
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    const interactables = document.querySelectorAll('a, button, input, textarea, .interactable');

    // Make sure we have the cursor elements (won't run on mobile if hidden)
    if (cursor && follower && matchMedia('(pointer:fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Move inner dot instantly
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });

        // Smooth follower movement animation loop
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Hover states
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    /* --- Header Scroll State --- */
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu Toggle --- */
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            header.classList.toggle('menu-open');
            document.body.style.overflow = header.classList.contains('menu-open') ? 'hidden' : '';
        });
    }

    /* --- Close mobile menu on clicking a link --- */
    const navLinks = document.querySelectorAll('.header__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (header.classList.contains('menu-open')) {
                header.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        });
    });

});
