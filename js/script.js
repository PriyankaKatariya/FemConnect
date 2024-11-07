


$(function() {
    "use strict";

    /*-----------------------------------
     * FIXED  MENU - HEADER
     *-----------------------------------*/
    function menuscroll() {
        var $navmenu = $('.nav-menu');
        if ($(window).scrollTop() > 50) {
            $navmenu.addClass('is-scrolling');
        } else {
            $navmenu.removeClass("is-scrolling");
        }
    }
    menuscroll();
    $(window).on('scroll', function() {
        menuscroll();
    });

    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/
    $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    /* 
     * NAVBAR TOGGLE BG
     *-----------------*/
    var siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function(e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    })
    siteNav.on('hide.bs.collapse', function(e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    });

    /*-----------------------------------
     * ONE PAGE SCROLLING
     *-----------------------------------*/
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    }
                });
            }
        }
    });

    /*-----------------------------------
     * OWL CAROUSEL
     *-----------------------------------*/
    var $testimonialsDiv = $('.testimonials');
    if ($testimonialsDiv.length && $.fn.owlCarousel) {
        $testimonialsDiv.owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
        });
    }

    var $galleryDiv = $('.img-gallery');
    if ($galleryDiv.length && $.fn.owlCarousel) {
        $galleryDiv.owlCarousel({
            nav: false,
            center: true,
            loop: true,
            autoplay: true,
            dots: true,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    }

    /*-----------------------------------
     * MENTOR-MENTEE MATCHING LOGIC
     *-----------------------------------*/
    const mentors = {
        'Alice': ['Python', 'Data Science', 'Machine Learning'],
        'Lisa': ['JavaScript', 'React', 'Frontend Development'],
        'Grace': ['Java', 'Spring Boot', 'Backend Development'],
        'Sophia': ['Cloud Computing', 'AWS', 'Docker', 'Kubernetes'],
        'Emily': ['C++', 'Algorithm Design', 'Competitive Programming'],
        'Olivia': ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
        'Emma': ['SQL', 'Database Management', 'MySQL', 'PostgreSQL'],
        'Ava': ['Artificial Intelligence', 'Deep Learning', 'NLP'],
        'Mia': ['iOS Development', 'Swift', 'Mobile App Development'],
        'Sophia': ['Android Development', 'Kotlin', 'Mobile App Development'],
        'Isabella': ['DevOps', 'CI/CD', 'Jenkins', 'GitLab'],
        'Charlotte': ['UI/UX Design', 'Figma', 'Adobe XD', 'Wireframing'],
        'Amelia': ['Blockchain', 'Cryptography', 'Smart Contracts', 'Ethereum'],
        'Evelyn': ['Project Management', 'Agile', 'Scrum', 'Kanban'],
        'Harper': ['Robotics', 'ROS', 'Arduino', 'Embedded Systems'],
        'Lily': ['Data Analytics', 'Power BI', 'Tableau', 'Excel'],
        'Ella': ['SEO', 'Digital Marketing', 'Content Strategy'],
        'Chloe': ['Machine Learning', 'Natural Language Processing', 'TensorFlow'],
        'Aria': ['Web Development', 'HTML', 'CSS', 'JavaScript'],
        'Avery': ['Big Data', 'Hadoop', 'Spark', 'Data Warehousing']
    };
    
    const mentees = {
        'Clara': ['Python', 'Machine Learning'],
        'Sophie': ['JavaScript', 'Frontend Development'],
        'Ella': ['Java', 'Backend Development'],
        'Violet': ['Cloud Computing', 'AWS'],
        'Stella': ['C++', 'Competitive Programming'],
        'Ruby': ['Cybersecurity', 'Ethical Hacking'],
        'Luna': ['SQL', 'Database Management'],
        'Zoe': ['Artificial Intelligence', 'NLP'],
        'Hannah': ['iOS Development', 'Swift'],
        'Leah': ['Android Development', 'Kotlin'],
        'Maya': ['DevOps', 'Jenkins'],
        'Scarlett': ['UI/UX Design', 'Wireframing'],
        'Nora': ['Blockchain', 'Cryptography'],
        'Hazel': ['Project Management', 'Agile'],
        'Aurora': ['Robotics', 'Arduino'],
        'Elena': ['Data Analytics', 'Power BI'],
        'Penelope': ['SEO', 'Digital Marketing'],
        'Layla': ['Machine Learning', 'TensorFlow'],
        'Lucy': ['Web Development', 'HTML', 'CSS'],
        'Savannah': ['Big Data', 'Hadoop']
    };

    // Function to create a hashmap based on skills
    function createSkillMap(people) {
        let skillMap = {};
        for (let person in people) {
            people[person].forEach(skill => {
                if (!skillMap[skill]) {
                    skillMap[skill] = [];
                }
                skillMap[skill].push(person);
            });
        }
        return skillMap;
    }

    // Create skill maps for mentors and mentees
    const mentorSkillMap = createSkillMap(mentors);
    const menteeSkillMap = createSkillMap(mentees);

    // Function to find the best match based on skills (collaborative filtering)
    function findBestMatch(userSkills, skillMap) {
        let scoreMap = {};
        
        // Assign a weight for every skill match
        userSkills.forEach(skill => {
            if (skillMap[skill]) {
                skillMap[skill].forEach(person => {
                    if (!scoreMap[person]) {
                        scoreMap[person] = 0;
                    }
                    scoreMap[person] += 1; // Increment score for every skill match
                });
            }
        });

        // Sort based on highest score (best match)
        let sortedMatches = Object.keys(scoreMap).sort((a, b) => scoreMap[b] - scoreMap[a]);
        return sortedMatches.length ? sortedMatches[0] : 'No match found';
    }

    // Event listener for mentor-mentee form submission
    $('#skills-form').on('submit', function(event) {
        event.preventDefault();
        const userSkills = $('#skills').val().split(', ');

        // Assuming user is a mentee for this example
        const bestMentorMatch = findBestMatch(userSkills, mentorSkillMap);
        alert(`Best Mentor Match: ${bestMentorMatch}`);
    });

}); /* End Fn */
