<?php
/**
 * Faakhir Memon | Portfolio
 * High-end, Cinematic, Interactive Experience
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faakhir Memon | Creative Developer</title>
    <meta name="description" content="Personal portfolio of Faakhir Memon - A cinematic interactive experience showcasing creative development and design.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Outfit:wght@300;400;700;900&display=swap" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/style.css">

    <!-- CDNs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"></script>
</head>
<body>
    
    <!-- Custom Cursor -->
    <div class="cursor"></div>
    <div class="cursor-follower"></div>

    <!-- Loader -->
    <div class="loader">
        <div class="loader-content">
            <span class="loader-text">FAAKHIR MEMON</span>
            <div class="loader-bar"></div>
        </div>
    </div>

    <!-- Background Canvas for Three.js -->
    <canvas id="hero-canvas"></canvas>

    <main id="main">
        <!-- HERO SECTION -->
        <section id="hero" class="section hero-section">
            <div class="container">
                <div class="hero-content">
                    <h1 class="reveal-text">FAAKHIR <span class="accent">MEMON</span></h1>
                    <p class="hero-sub reveal-text-sub">Creative Developer & Designer</p>
                    <div class="scroll-hint">
                        <span>SCROLL TO EXPLORE</span>
                        <div class="arrow"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ABOUT SECTION -->
        <section id="about" class="section about-section">
            <div class="container">
                <div class="about-grid">
                    <div class="about-text">
                        <h2 class="section-title">STORY</h2>
                        <p class="story-para">I craft digital experiences that blend <span class="glow">art</span> with <span class="glow">code</span>. My mission is to push the boundaries of what's possible on the web, creating immersive journeys that captivate and inspire.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- PROJECTS SECTION (Horizontal) -->
        <section id="projects" class="section projects-section">
            <div class="horizontal-scroll-wrapper">
                <div class="projects-container">
                    <div class="project-header">
                        <h2 class="section-title">PROJECTS</h2>
                    </div>
                    
                    <!-- Projects will be injected here via PHP/JS -->
                    <?php
                    // Fetch GitHub repos (Placeholder for now, logic in github-api.php)
                    include 'includes/github-api.php';
                    $repos = get_github_repos('FaakhirMemon03');
                    
                    if (!empty($repos)) {
                        foreach ($repos as $repo) {
                            if ($repo['name'] === 'My-Portfolio') continue; // Skip current
                            echo '<div class="project-card">';
                            echo '  <div class="project-inner">';
                            echo '    <div class="project-media">';
                            echo '      <img src="https://opengraph.githubassets.com/1/' . $repo['full_name'] . '" alt="' . $repo['name'] . '">';
                            echo '    </div>';
                            echo '    <div class="project-info">';
                            echo '      <h3>' . htmlspecialchars($repo['name']) . '</h3>';
                            echo '      <p>' . htmlspecialchars($repo['description'] ?? 'Innovative project built with ' . ($repo['language'] ?? 'various technologies')) . '</p>';
                            echo '      <div class="project-tags">';
                            echo '        <span class="tag">' . ($repo['language'] ?? 'GitHub') . '</span>';
                            echo '      </div>';
                            echo '      <a href="' . $repo['html_url'] . '" target="_blank" class="btn-project">View Repo</a>';
                            echo '    </div>';
                            echo '  </div>';
                            echo '</div>';
                        }
                    } else {
                        echo '<p>Loading cinematic projects...</p>';
                    }
                    ?>
                </div>
            </div>
        </section>

        <!-- SKILLS SECTION -->
        <section id="skills" class="section skills-section">
            <div class="container">
                <h2 class="section-title">EXPERTISE</h2>
                <div class="skills-grid">
                    <div class="skill-item">
                        <div class="skill-info">
                            <span>Three.js</span>
                            <span>90%</span>
                        </div>
                        <div class="skill-bar"><div class="bar-fill" data-progress="90%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-info">
                            <span>GSAP</span>
                            <span>95%</span>
                        </div>
                        <div class="skill-bar"><div class="bar-fill" data-progress="95%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-info">
                            <span>PHP / Backend</span>
                            <span>85%</span>
                        </div>
                        <div class="skill-bar"><div class="bar-fill" data-progress="85%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-info">
                            <span>UI/UX Design</span>
                            <span>80%</span>
                        </div>
                        <div class="skill-bar"><div class="bar-fill" data-progress="80%"></div></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CONTACT SECTION -->
        <section id="contact" class="section contact-section">
            <div class="container">
                <div class="contact-wrap">
                    <h2 class="section-title">LET'S CONNECT</h2>
                    <form class="contact-form">
                        <div class="input-group">
                            <input type="text" placeholder="Your Name" required>
                        </div>
                        <div class="input-group">
                            <input type="email" placeholder="Your Email" required>
                        </div>
                        <div class="input-group">
                            <textarea placeholder="Your Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn-submit">SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </section>

    </main>

    <!-- Scripts -->
    <script src="assets/js/three-scene.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
