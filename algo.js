 // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Sidebar navigation logic
        const sidebarNav = document.getElementById('sidebar-nav');
        const contentSections = document.querySelectorAll('.content-section');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        const mainContent = document.getElementById('main-content');

        sidebarNav.addEventListener('click', (e) => {
            e.preventDefault();
            const clickedLink = e.target.closest('.sidebar-link');

            if (clickedLink) {
                const targetId = clickedLink.dataset.target;
                
                contentSections.forEach(section => section.classList.add('hidden'));
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.remove('hidden');
                    // Smooth scroll into view on mobile
                    if (window.innerWidth < 768) {
                        mainContent.scrollIntoView({ behavior: 'smooth' });
                    }
                }

                sidebarLinks.forEach(link => link.classList.remove('active'));
                clickedLink.classList.add('active');
            }
        });