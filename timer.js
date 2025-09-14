         const timeSpent = {};

            let currentSectionId = null;

            let timerInterval = null;

           

            const sections = document.querySelectorAll('section');

            const navLinks = document.querySelectorAll('.nav-link');

            const timerDisplay = document.getElementById('timer-display');

            const sectionNameSpan = document.getElementById('section-name');

            const timeSpentSpan = document.getElementById('time-spent');



            const formatTime = (seconds) => {

                const mins = Math.floor(seconds / 60).toString().padStart(2, '0');

                const secs = (seconds % 60).toString().padStart(2, '0');

                return `${mins}:${secs}`;

            };



            const startTimerForSection = (sectionId) => {

                if (!timeSpent[sectionId]) timeSpent[sectionId] = 0;



                const friendlyName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);

                sectionNameSpan.textContent = friendlyName;

                timerDisplay.style.display = 'block';



                timerInterval = setInterval(() => {

                    timeSpent[sectionId]++;

                    if (currentSectionId === sectionId) {

                        timeSpentSpan.textContent = formatTime(timeSpent[sectionId]);

                    }

                }, 1000);

            };



            const observerCallback = (entries) => {

                entries.forEach(entry => {

                    const id = entry.target.id;

                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {

                        if (id !== currentSectionId) {

                            clearInterval(timerInterval);

                            currentSectionId = id;

                            startTimerForSection(id);

                           

                            // Update active nav link

                            navLinks.forEach(link => {

                                link.classList.remove('active');

                                if(link.getAttribute('href') === `#${id}`) {

                                    link.classList.add('active');

                                }

                            });

                        }

                    }

                });

            };



            const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });

            sections.forEach(section => observer.observe(section));
    



//     <!-- Timer Display -->
//     <div id="timer-display"
//         class="hidden fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-2xl border border-indigo-500/50">

//         <p class="text-sm">Time on <strong id="section-name" class="text-indigo-400"></strong>: <span id="time-spent"
//         class="font-mono font-bold"></span></p>
//     </div>