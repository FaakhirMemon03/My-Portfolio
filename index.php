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

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="assets/images/tabicon.png">

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
        <canvas id="loader-canvas"></canvas>
        <div class="loader-content">
            <div class="loader-title">
                <span class="letter">F</span>
                <span class="letter">A</span>
                <span class="letter">A</span>
                <span class="letter">K</span>
                <span class="letter">H</span>
                <span class="letter">I</span>
                <span class="letter">R</span>
                <span class="space">&nbsp;</span>
                <span class="letter">M</span>
                <span class="letter">E</span>
                <span class="letter">M</span>
                <span class="letter">O</span>
                <span class="letter">N</span>
            </div>
            <div class="loader-percent">00%</div>
            <div class="loader-sub">INITIALIZING CYBERSPACE...</div>
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
                    <div class="about-image">
                        <div class="image-wrapper">
                            <img src="assets/images/pic1.png" alt="Faakhir Memon">
                        </div>
                    </div>
                    <div class="about-text">
                        <h2 class="section-title">STORY</h2>
                        <p class="story-para">I craft digital experiences that blend <span class="glow">art</span> with <span class="glow">code</span>. My mission is to push the boundaries of what's possible on the web, creating immersive journeys that captivate and inspire.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- VISUAL GALLERY SECTION -->
        <section id="gallery" class="section gallery-section">
            <div class="container">
                <h2 class="section-title">VISUALS</h2>
                <div class="gallery-grid">
                    <div class="gallery-item" data-speed="0.1">
                        <img src="assets/images/pic2.JPG" alt="Faakhir Memon Work">
                        <div class="gallery-overlay"><span>INNOVATION</span></div>
                    </div>
                    <div class="gallery-item" data-speed="0.2">
                        <img src="assets/images/pic3.JPG" alt="Faakhir Memon Style">
                        <div class="gallery-overlay"><span>CREATIVITY</span></div>
                    </div>
                    <div class="gallery-item" data-speed="0.15">
                        <img src="assets/images/pic4.JPG" alt="Faakhir Memon Vision">
                        <div class="gallery-overlay"><span>DEDICATION</span></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PROJECTS SECTION (TWO PHASES) -->
        <section id="projects" class="projects-master">
            
            <!-- PHASE 1: Horizontal Scroll (First 5 Cards) -->
            <div class="phase-1-horizontal">
                <div class="horizontal-trigger">
                    <div class="horizontal-header container">
                        <h2 class="section-title">FEATURED</h2>
                    </div>
                    <div class="horizontal-wrap">
                        <?php
                        include_once 'includes/github-api.php';
                        $all_repos = get_github_repos('FaakhirMemon03');
                         
                         // Exclude all repositories related to "my portfolio"
                         $all_repos = array_filter($all_repos, function($repo) {
                             return stripos($repo['name'], 'portfolio') === false;
                         });
                         $all_repos = array_values($all_repos); // Re-index array
                        $phase1_repos = array_slice($all_repos, 0, 5);
                        $phase2_repos = array_slice($all_repos, 5);
                        
                        $global_image_counter = 1;
                        $max_images = 42;
                        
                        function getNextImage(&$counter, $max) {
                            $img = "assets/images/{$counter}.png";
                            $counter++;
                            if ($counter > $max) {
                                $counter = 1;
                            }
                            return $img;
                        }

                        foreach ($phase1_repos as $index => $repo) {
                            echo '<div class="h-card" data-repo="' . htmlspecialchars($repo['name']) . '">';
                            echo '  <div class="h-card-inner">';
                            echo '    <div class="h-card-media">';
                            echo '      <img class="project-img" src="" alt="' . htmlspecialchars($repo['name']) . '" loading="lazy">';
                            echo '    </div>';
                            echo '    <div class="h-card-content">';
                            echo '      <h3>' . htmlspecialchars($repo['name']) . '</h3>';
                            echo '      <p>' . htmlspecialchars($repo['language'] ?? 'Creative Code') . '</p>';
                            echo '    </div>';
                            echo '  </div>';
                            echo '</div>';
                        }
                        ?>
                    </div>
                </div>
            </div>

            <!-- PHASE 2: Vertical Tree/Timeline Layout -->
            <div class="phase-2-vertical container">
                <div class="timeline-line"></div>
                <?php
                foreach ($phase2_repos as $index => $repo) {
                    $side = ($index % 2 == 0) ? 'left' : 'right';
                    
                    echo '<div class="timeline-row ' . $side . '" data-repo="' . htmlspecialchars($repo['name']) . '">';
                    
                    // Image Card Part
                    echo '  <div class="t-image-part">';
                    echo '    <div class="t-image-card">';
                    echo '      <img src="" alt="Project Visual" class="parallax-img project-img" loading="lazy">';
                    echo '      <div class="t-image-overlay"></div>';
                    echo '    </div>';
                    echo '  </div>';

                    // Text Content Part
                    echo '  <div class="t-text-part">';
                    echo '    <div class="t-text-content">';
                    echo '      <h3 class="t-title">' . htmlspecialchars($repo['name']) . '</h3>';
                    echo '      <p class="t-desc">' . htmlspecialchars($repo['description'] ?? 'An innovative solution pushing digital boundaries with ' . ($repo['language'] ?? 'modern tech')) . '</p>';
                    echo '    </div>';
                    echo '  </div>';
                    
                    echo '</div>';
                }
                ?>
            </div>

        </section>

        <!-- SKILLS SECTION -->
        <section id="skills" class="section skills-section">
            <div class="container">
                <h2 class="section-title">EXPERTISE</h2>
                <div class="skills-grid">
                    <!-- Skills categories as previously defined -->
                    <div class="skill-card">
                        <div class="card-header">🌐 Frontend Development</div>
                        <div class="skill-list">
                            <div class="skill-item-mini"><span>HTML5 / CSS3</span><div class="bar-fill" data-progress="95%"></div></div>
                            <div class="skill-item-mini"><span>JavaScript (ES6+)</span><div class="bar-fill" data-progress="92%"></div></div>
                            <div class="skill-item-mini"><span>TypeScript</span><div class="bar-fill" data-progress="85%"></div></div>
                            <div class="skill-item-mini"><span>Responsive Design</span><div class="bar-fill" data-progress="95%"></div></div>
                        </div>
                    </div>
                    <div class="skill-card">
                        <div class="card-header">🎨 Frameworks & Libs</div>
                        <div class="skill-list">
                            <div class="skill-item-mini"><span>React / Next.js</span><div class="bar-fill" data-progress="90%"></div></div>
                            <div class="skill-item-mini"><span>Vue.js</span><div class="bar-fill" data-progress="75%"></div></div>
                            <div class="skill-item-mini"><span>Tailwind / Bootstrap</span><div class="bar-fill" data-progress="95%"></div></div>
                            <div class="skill-item-mini"><span>GSAP / Framer</span><div class="bar-fill" data-progress="90%"></div></div>
                        </div>
                    </div>
                    <div class="skill-card">
                        <div class="card-header">🧠 Backend Development</div>
                        <div class="skill-list">
                            <div class="skill-item-mini"><span>Node.js / Express</span><div class="bar-fill" data-progress="88%"></div></div>
                            <div class="skill-item-mini"><span>REST APIs / Auth</span><div class="bar-fill" data-progress="90%"></div></div>
                            <div class="skill-item-mini"><span>PHP / Laravel</span><div class="bar-fill" data-progress="92%"></div></div>
                        </div>
                    </div>
                    <div class="skill-card">
                        <div class="card-header">🗄️ Databases</div>
                        <div class="skill-list">
                            <div class="skill-item-mini"><span>MongoDB / Firebase</span><div class="bar-fill" data-progress="85%"></div></div>
                            <div class="skill-item-mini"><span>MySQL / Postgres</span><div class="bar-fill" data-progress="90%"></div></div>
                        </div>
                    </div>
                    <div class="skill-card">
                        <div class="card-header">⚡ Web App Skills</div>
                        <div class="skill-list">
                            <div class="skill-item-mini"><span>MERN Stack</span><div class="bar-fill" data-progress="90%"></div></div>
                            <div class="skill-item-mini"><span>MVC / CRUD</span><div class="bar-fill" data-progress="95%"></div></div>
                            <div class="skill-item-mini"><span>Security / Optim.</span><div class="bar-fill" data-progress="85%"></div></div>
                        </div>
                    </div>
                    <div class="skill-card">
                        <div class="card-header">📱 App Development</div>
                        <div class="skill-list">
                            <div class="skill-item-mini"><span>React Native</span><div class="bar-fill" data-progress="88%"></div></div>
                            <div class="skill-item-mini"><span>Flutter</span><div class="bar-fill" data-progress="80%"></div></div>
                            <div class="skill-item-mini"><span>Electron / PWA</span><div class="bar-fill" data-progress="85%"></div></div>
                        </div>
                    </div>
                    <div class="skill-card highlight">
                        <div class="card-header">🎬 Modern / Advanced</div>
                        <div class="skill-list">
                            <div class="skill-item-mini"><span>Three.js / WebGL</span><div class="bar-fill" data-progress="85%"></div></div>
                            <div class="skill-item-mini"><span>GSAP / ScrollTrigger</span><div class="bar-fill" data-progress="98%"></div></div>
                            <div class="skill-item-mini"><span>UI/UX Principles</span><div class="bar-fill" data-progress="90%"></div></div>
                        </div>
                    </div>
                    <div class="skill-card">
                        <div class="card-header">🎨 Design & Tools</div>
                        <div class="skill-list">
                            <div class="skill-item-mini"><span>Figma / Adobe XD</span><div class="bar-fill" data-progress="92%"></div></div>
                            <div class="skill-item-mini"><span>Photoshop / Canva</span><div class="bar-fill" data-progress="95%"></div></div>
                            <div class="skill-item-mini"><span>Git / Docker</span><div class="bar-fill" data-progress="88%"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CONTACT SECTION -->
        <section id="contact" class="section contact-section">
            <div class="container">
                <div class="contact-wrap">
                    <h2 class="section-title">LET'S CONNECT</h2>
                    <form class="contact-form" action="contact.php" method="POST">
                        <div class="input-group">
                            <input type="text" name="name" placeholder="Your Name" required>
                        </div>
                        <div class="input-group">
                            <input type="email" name="email" placeholder="Your Email" required>
                        </div>
                        <div class="input-group">
                            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn-submit">SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </section>

    </main>

    <!-- Scripts -->
    <script src="assets/js/loader.js"></script>
    <script src="assets/js/three-scene.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
