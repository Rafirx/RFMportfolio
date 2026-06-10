/* ==========================================================================
   DEVELOPER PORTFOLIO - CYBER SYSTEM ENGINE (JS)
   Rafiu Moynul - Creative Systems Developer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. Data Repository (The 5 Premium Projects)
    // ----------------------------------------------------------------------
    const projectData = [
        {
            title: "AETHER // ENGINE",
            status: "STABLE v2.4.1",
            latency: "Render: 1.2ms",
            desc: "A high-performance WebGL2 path-tracing GPU physics engine. Renders real-time dynamic soft-shadows, refraction, and volumetric light-scattering within active web viewports.",
            compute: "14.2 TFLOPs",
            memory: "34.8 MB",
            fps: "120 FPS",
            arch: "GPGPU accelerated particle sorting using custom compute shaders, leveraging parallel matrix multiplication and Octree space subdivision.",
            tech: ["WebGL 2", "GLSL", "TypeScript", "WebAssembly", "Canvas"],
            features: [
                "Real-time GPU collision detection with 100k+ particles.",
                "Physically based glass refraction and path-traced glows.",
                "Dynamic spatial hashing for rapid neighborhood querying."
            ],
            live: "https://github.com",
            repo: "https://github.com",
            skillsToHighlight: ["webgl", "threejs", "glsl", "typescript", "wasm", "canvas"]
        },
        {
            title: "COGNITIVE // OS",
            status: "DEPLOYED v0.9.8",
            latency: "Inference: 24ms",
            desc: "An in-browser virtual UNIX-like desktop sandbox running micro-quantized AI reasoning engines locally. Fully sandboxed and operational offline with full filesystem mocks.",
            compute: "0.8 TFLOPs",
            memory: "185.2 MB",
            fps: "60 FPS",
            arch: "WebWorkers drive parallelized shell operations while a WebAssembly bundle executes quantized ONNX tensor graphs directly in the sandbox thread.",
            tech: ["React", "TypeScript", "WebAssembly", "Node.js", "Docker"],
            features: [
                "Fully operational virtual bash-terminal with virtual file structure.",
                "Local NLP command parser running in-browser tensor runtimes.",
                "Dynamic window management and desktop virtualization environment."
            ],
            live: "https://github.com",
            repo: "https://github.com",
            skillsToHighlight: ["typescript", "react", "wasm", "node", "docker"]
        },
        {
            title: "BIOSYNTH // DNA",
            status: "STABLE v1.1.2",
            latency: "Audio Delta: 0.8ms",
            desc: "A creative bio-informatics environment that parses genomic DNA strings (A, T, C, G) into procedural microtonal chord matrices and dynamic polyrhythmic synthesizers.",
            compute: "2.1 TFLOPs",
            memory: "12.4 MB",
            fps: "90 FPS",
            arch: "Genome maps translate into pitch oscillators via the Web Audio API. Nodes are spaced dynamically using frequency modulation matrices for high acoustic purity.",
            tech: ["HTML5 Canvas", "TypeScript", "Web Audio API", "Rust", "WASM"],
            features: [
                "Live genomic sequencing parser importing raw FASTA file matrices.",
                "Additive multi-oscillator polyphonic custom synth engine.",
                "Real-time Canvas Fourier transform frequency spectrum visualizer."
            ],
            live: "https://github.com",
            repo: "https://github.com",
            skillsToHighlight: ["canvas", "typescript", "webaudio", "rust", "wasm"]
        },
        {
            title: "HELIOS // PROTOCOL",
            status: "STABLE v4.0.0",
            latency: "Sync: 4.8ms",
            desc: "A decentralized, peer-to-peer real-time collaborative database engine utilizing Conflict-free Replicated Data Types (CRDTs) to maintain consensus without centralized authorities.",
            compute: "6.7 TFLOPs",
            memory: "42.1 MB",
            fps: "N/A",
            arch: "P2P WebRTC data channels orchestrate distributed network maps, and state updates synchronize via Yjs and hybrid LWW (Last-Write-Wins-Element) CRDT matrices.",
            tech: ["Rust", "WebRTC", "TypeScript", "CRDTs", "GraphQL"],
            features: [
                "Sub-10ms peer-to-peer transactional consensus synchronization.",
                "Offline write capabilities with automated cryptographic conflict sorting.",
                "Integrated multi-user active cursors and collaborative canvas grids."
            ],
            live: "https://github.com",
            repo: "https://github.com",
            skillsToHighlight: ["rust", "webrtc", "typescript", "crdt", "graphql"]
        },
        {
            title: "QUANTUM // SANDBOX",
            status: "ALPHA v0.2.0",
            latency: "Solve: 8.5ms",
            desc: "A drag-and-drop visual quantum circuit simulator plotting dynamic real-time probabilities, Bloch sphere state vectors, and complex number amplitudes.",
            compute: "11.8 TFLOPs",
            memory: "56.3 MB",
            fps: "60 FPS",
            arch: "Quantum matrices (Hadamard, CNOT, Phase) execute on parallel threads. State probabilities calculate via tensor product mathematics compiled in Rust WASM.",
            tech: ["React", "TypeScript", "Rust", "WebAssembly", "Three.js"],
            features: [
                "Interactive multi-qubit visual circuit editor with drag-and-drop gates.",
                "Bloch Sphere 3D projection rendering active state transformations.",
                "WASM accelerated complex matrix solvers plotting quantum state paths."
            ],
            live: "https://github.com",
            repo: "https://github.com",
            skillsToHighlight: ["react", "typescript", "rust", "wasm", "threejs"]
        }
    ];

    let activeProjectIdx = 0;
    let isTransitioningProject = false;

    // ----------------------------------------------------------------------
    // 2. Custom Cursor Physics & Dynamic Hover Toggles
    // ----------------------------------------------------------------------
    const cursorDot = document.getElementById('customCursor');
    const cursorGlow = document.getElementById('customCursorGlow');
    
    let cursorX = 0, cursorY = 0; // Actual cursor coordinates
    let glowX = 0, glowY = 0;     // Glow coordinates (lagged)

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursorDot.style.left = `${cursorX}px`;
        cursorDot.style.top = `${cursorY}px`;
    });

    // Animate the larger cursor glow with fluid lerped lag
    function animateCursor() {
        const dx = cursorX - glowX;
        const dy = cursorY - glowY;
        
        // Lerp factor (0.15 creates smooth follow physics)
        glowX += dx * 0.15;
        glowY += dy * 0.15;
        
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Trigger cursor size scaling on clickable items
    function setupClickableCursorEvents() {
        const clickables = document.querySelectorAll('a, button, .project-card, .nav-dot, .tab-btn, input, textarea');
        clickables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering-clickable');
            });
            item.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering-clickable');
            });
        });
    }
    setupClickableCursorEvents();

    // ----------------------------------------------------------------------
    // 3. Simulated Bio-Synaptic core loader
    // ----------------------------------------------------------------------
    const loaderOverlay = document.getElementById('loaderOverlay');
    const loaderBar = document.getElementById('loaderBar');
    const loaderPercentage = document.getElementById('loaderPercentage');
    
    let loadProgress = 0;
    
    function updateLoader() {
        // Random incremental hops
        loadProgress += Math.floor(Math.random() * 12) + 3;
        
        if (loadProgress >= 100) {
            loadProgress = 100;
            loaderBar.style.width = '100%';
            loaderPercentage.innerText = '100%';
            
            // Short aesthetic delay before entry
            setTimeout(() => {
                loaderOverlay.classList.add('fade-out');
                document.body.classList.remove('loading');
                
                // Trigger initial scroll setup & reveal layout
                initScrollDependentTransforms();
            }, 600);
        } else {
            loaderBar.style.width = `${loadProgress}%`;
            loaderPercentage.innerText = `${loadProgress}%`;
            
            // Staggered pacing for realism
            setTimeout(updateLoader, Math.random() * 80 + 30);
        }
    }
    updateLoader();

    // ----------------------------------------------------------------------
    // 4. Interactive canvas 3D DNA Helix Engine
    // ----------------------------------------------------------------------
    const dnaCanvas = document.getElementById('dnaCanvas');
    const dnaCtx = dnaCanvas.getContext('2d');
    
    let canvasW = 0;
    let canvasH = 0;
    
    function resizeDnaCanvas() {
        const rect = dnaCanvas.parentElement.getBoundingClientRect();
        canvasW = rect.width;
        canvasH = rect.height;
        
        // High DPI displays support
        const dpr = window.devicePixelRatio || 1;
        dnaCanvas.width = canvasW * dpr;
        dnaCanvas.height = canvasH * dpr;
        dnaCtx.scale(dpr, dpr);
    }
    resizeDnaCanvas();
    window.addEventListener('resize', () => {
        resizeDnaCanvas();
        resizeOrbitStage();
    });

    // Particle class for floating cyber clouds around DNA
    class DnaParticle {
        constructor() {
            this.reset();
            // Stagger them vertically initially
            this.y = Math.random() * canvasH;
        }

        reset() {
            this.orbitRadius = Math.random() * 70 + 40;
            this.phase = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 0.005 + 0.002;
            this.y = -20;
            this.ySpeed = Math.random() * 0.4 + 0.2;
            this.size = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.25;
            this.color = Math.random() > 0.5 ? 'cyan' : 'magenta';
        }

        update(scrollAngle) {
            this.y += this.ySpeed;
            this.phase += this.speed;
            
            // Particle coordinates revolving in 3D
            const angle = this.phase + scrollAngle;
            this.x = canvasW / 2 + Math.cos(angle) * this.orbitRadius;
            this.z = Math.sin(angle) * this.orbitRadius;
            
            if (this.y > canvasH + 20) {
                this.reset();
            }
        }
    }

    const particlePool = Array.from({ length: 45 }, () => new DnaParticle());

    // Scroll smoothing state
    let targetScrollRatio = 0;
    let currentScrollRatio = 0;

    const initialScrollMax = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollRatio = initialScrollMax > 0 ? window.scrollY / initialScrollMax : 0;
    currentScrollRatio = targetScrollRatio;

    window.addEventListener('scroll', () => {
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        targetScrollRatio = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    });

    // 3D DNA Simulation loop
    let lastTime = 0;
    function renderDna(time) {
        const delta = time - lastTime;
        lastTime = time;
        
        // Smoothly interpolate scroll ratio
        currentScrollRatio += (targetScrollRatio - currentScrollRatio) * 0.08;
        
        // Snap to target if very close to prevent float oscillations
        if (Math.abs(targetScrollRatio - currentScrollRatio) < 0.0001) {
            currentScrollRatio = targetScrollRatio;
        }

        dnaCtx.clearRect(0, 0, canvasW, canvasH);
        
        // Angle derived from smooth scroll (revolves 3.5 times) + self rotation
        const scrollAngle = currentScrollRatio * Math.PI * 2 * 3.5;
        const autoAngle = time * 0.00035;
        const baseAngle = scrollAngle + autoAngle;

        // Update card positions + tilt interpolation in sync with DNA rotation
        lerpCardTilts();
        updateOrbitTransitions(currentScrollRatio);

        const nodeCount = 38;
        const spacing = (canvasH - 80) / nodeCount;
        const helixRadius = Math.min(canvasW * 0.16, 75);
        
        // Queue elements for Z-Depth rendering (Painter's algorithm)
        const renderQueue = [];

        // 1. Add floating particles
        particlePool.forEach(p => {
            p.update(baseAngle * 0.5);
            renderQueue.push({
                type: 'particle',
                x: p.x,
                y: p.y,
                z: p.z,
                size: p.size,
                opacity: p.opacity,
                color: p.color
            });
        });

        // 2. Build DNA strands
        for (let i = 0; i < nodeCount; i++) {
            const nodeY = 40 + i * spacing;
            
            // Phase offsets create twisting spiral effect down the screen
            const twistPhase = i * 0.22;
            const angleA = baseAngle + twistPhase;
            const angleB = baseAngle + twistPhase + Math.PI; // 180 deg phase delta

            const xA = canvasW / 2 + Math.cos(angleA) * helixRadius;
            const zA = Math.sin(angleA) * helixRadius;

            const xB = canvasW / 2 + Math.cos(angleB) * helixRadius;
            const zB = Math.sin(angleB) * helixRadius;

            // Rung connecting nodes (Z index is midpoint)
            renderQueue.push({
                type: 'rung',
                x1: xA,
                x2: xB,
                y: nodeY,
                z: (zA + zB) / 2
            });

            // Node A
            renderQueue.push({
                type: 'node',
                x: xA,
                y: nodeY,
                z: zA,
                color: 'cyan'
            });

            // Node B
            renderQueue.push({
                type: 'node',
                x: xB,
                y: nodeY,
                z: zB,
                color: 'magenta'
            });
        }

        // 3. Sort rendering queue by Z depth ascending (Back to Front)
        renderQueue.sort((a, b) => a.z - b.z);

        // 4. Draw queue items
        renderQueue.forEach(item => {
            // Scale and opacity adjustments for 3D visual fidelity
            const normalizedZ = (item.z + helixRadius) / (2 * helixRadius || 1); // 0 (back) to 1 (front)
            
            if (item.type === 'node') {
                const nodeSize = 4.5 + normalizedZ * 5.5; // size 4.5px to 10px
                const nodeOpacity = 0.2 + normalizedZ * 0.8;
                
                // Outer glow circle (larger, lower opacity, no slow shadowBlur)
                dnaCtx.beginPath();
                dnaCtx.arc(item.x, item.y, nodeSize * (item.z > 0 ? 2.5 : 1.5), 0, Math.PI * 2);
                if (item.color === 'cyan') {
                    dnaCtx.fillStyle = `rgba(0, 242, 254, ${nodeOpacity * 0.25})`;
                } else {
                    dnaCtx.fillStyle = `rgba(243, 85, 218, ${nodeOpacity * 0.25})`;
                }
                dnaCtx.fill();
                
                // Core node circle
                dnaCtx.beginPath();
                dnaCtx.arc(item.x, item.y, nodeSize, 0, Math.PI * 2);
                if (item.color === 'cyan') {
                    dnaCtx.fillStyle = `rgba(0, 242, 254, ${nodeOpacity})`;
                } else {
                    dnaCtx.fillStyle = `rgba(243, 85, 218, ${nodeOpacity})`;
                }
                dnaCtx.fill();
                
                // Bright specular core for foreground elements
                if (item.z > 0) {
                    dnaCtx.beginPath();
                    dnaCtx.arc(item.x, item.y, nodeSize * 0.4, 0, Math.PI * 2);
                    dnaCtx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity * 0.9})`;
                    dnaCtx.fill();
                }
                
            } else if (item.type === 'rung') {
                const rungOpacity = 0.08 + normalizedZ * 0.42; // opacity 8% to 50%
                
                // Split rung drawing to avoid creating expensive CanvasGradient allocations every frame
                const midX = (item.x1 + item.x2) / 2;
                dnaCtx.lineWidth = 1 + normalizedZ * 1.5; // width 1px to 2.5px
                
                // Left half (cyan)
                dnaCtx.beginPath();
                dnaCtx.moveTo(item.x1, item.y);
                dnaCtx.lineTo(midX + 0.5, item.y);
                dnaCtx.strokeStyle = `rgba(0, 242, 254, ${rungOpacity})`;
                dnaCtx.stroke();
                
                // Right half (magenta)
                dnaCtx.beginPath();
                dnaCtx.moveTo(midX - 0.5, item.y);
                dnaCtx.lineTo(item.x2, item.y);
                dnaCtx.strokeStyle = `rgba(243, 85, 218, ${rungOpacity})`;
                dnaCtx.stroke();
                
            } else if (item.type === 'particle') {
                // Drawing floating particles
                const size = item.size * (0.8 + normalizedZ * 0.4);
                dnaCtx.beginPath();
                dnaCtx.arc(item.x, item.y, size, 0, Math.PI * 2);
                
                if (item.color === 'cyan') {
                    dnaCtx.fillStyle = `rgba(0, 242, 254, ${item.opacity})`;
                } else {
                    dnaCtx.fillStyle = `rgba(243, 85, 218, ${item.opacity})`;
                }
                
                dnaCtx.fill();
            }
        });

        requestAnimationFrame(renderDna);
    }
    requestAnimationFrame(renderDna);

    // ----------------------------------------------------------------------
    // 5. 3D CSS Orbital Cards Physics
    // ----------------------------------------------------------------------
    const projectCards = document.querySelectorAll('.project-card');
    const orbitStage = document.getElementById('orbitStage');
    const navDots = document.querySelectorAll('.nav-dot');
    
    let orbitRadius = 0;
    
    function resizeOrbitStage() {
        if (window.innerWidth >= 1024) {
            orbitRadius = Math.min(window.innerWidth * 0.13, 220) + 140; // Desktop radius 280px to 360px
        } else {
            orbitRadius = 0; // Flat layout on mobile
            projectCards.forEach(card => {
                card.style.transform = '';
                card.style.opacity = '';
            });
        }
    }
    resizeOrbitStage();

    function initScrollDependentTransforms() {
        updateOrbitTransitions(currentScrollRatio);
    }

    function updateOrbitTransitions(scrollRatio) {
        if (window.innerWidth < 1024) {
            return;
        }

        // Cards span exactly 288 degrees (4/5ths of a circle) so that scrolling 0 to 100%
        // aligns projects 1 to 5 perfectly with the active viewport panels
        const baseOrbitAngle = scrollRatio * Math.PI * 2 * (4 / 5);
        
        let closestCardIdx = 0;
        let highestZ = -Infinity;

        projectCards.forEach((card, i) => {
            // Spacing: 360 deg / 5 cards = 72 deg spacing (Math.PI * 2 / 5)
            // Inverting baseOrbitAngle makes the rotation direction chronological (Card 1 -> 2 -> 3 -> 4 -> 5)
            const cardAngle = -baseOrbitAngle + (i * Math.PI * 2 / 5);
            
            // X & Z coordinates trace circular ring
            const x = Math.sin(cardAngle) * orbitRadius;
            const z = Math.cos(cardAngle) * orbitRadius;
            
            // Smoothly spiral the cards vertically, keeping the active card centered in the viewport
            const spacingY = 120;
            const y = (i - scrollRatio * 4) * spacingY;
            
            // Keep card facing camera (Billboard Effect)
            const rotationY = -cardAngle * (180 / Math.PI);
            
            // Calculate scale & opacity based on Z depth (closer = bigger/brighter)
            const normalizedZ = (z + orbitRadius) / (2 * orbitRadius || 1); // 0 to 1
            const scale = 0.65 + normalizedZ * 0.35; // 0.65 to 1.0
            const opacity = 0.2 + normalizedZ * 0.8;   // 0.2 to 1.0
            
            const baseTransform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotationY}deg) scale(${scale})`;
            card.dataset.baseTransform = baseTransform;
            
            // Always apply the orbit transform — tilt is layered separately via CSS vars
            const tiltX = parseFloat(card.dataset.tiltX || 0);
            const tiltY = parseFloat(card.dataset.tiltY || 0);
            card.style.transform = `${baseTransform} rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            card.style.opacity = opacity;
            
            // Track card closest to camera (z-depth is largest)
            if (z > highestZ) {
                highestZ = z;
                closestCardIdx = i;
            }
        });

        // Set active project index if changed
        if (closestCardIdx !== activeProjectIdx) {
            syncActiveProject(closestCardIdx);
        }
    }

    // Listens to global scroll events to update target scroll ratio
    window.addEventListener('scroll', () => {
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        targetScrollRatio = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    });

    // ----------------------------------------------------------------------
    // 6. Decryptor Details Panel & Tech Matrix Sync
    // ----------------------------------------------------------------------
    const activeProjectIndexEl = document.getElementById('activeProjectIndex');
    const projectDetailsEl = document.getElementById('projectDetails');
    const projTitleEl = document.getElementById('projTitle');
    const projStatusEl = document.getElementById('projStatus');
    const projLatencyEl = document.getElementById('projLatency');
    const projDescEl = document.getElementById('projDesc');
    const specComputeEl = document.getElementById('specCompute');
    const specMemoryEl = document.getElementById('specMemory');
    const specFPSEl = document.getElementById('specFPS');
    const projArchTextEl = document.getElementById('projArchText');
    const projTechTagsEl = document.getElementById('projTechTags');
    const projFeaturesEl = document.getElementById('projFeatures');
    const projLiveLinkEl = document.getElementById('projLiveLink');
    const projRepoLinkEl = document.getElementById('projRepoLink');

    // Scramble decryption Sci-Fi effect utility
    function decryptText(element, targetText, duration = 400) {
        const chars = '!@#$%^&*()_+{}:"<>?|[];\',./~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let frame = 0;
        const totalFrames = Math.floor(duration / 16); // 60 FPS interval
        
        if(element._decryptInterval) {
            clearInterval(element._decryptInterval);
        }

        element._decryptInterval = setInterval(() => {
            let currentText = '';
            for (let i = 0; i < targetText.length; i++) {
                if (targetText[i] === ' ') {
                    currentText += ' ';
                    continue;
                }
                
                // If progress has passed this character position, resolve it
                if (frame / totalFrames > i / targetText.length) {
                    currentText += targetText[i];
                } else {
                    currentText += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            
            element.innerText = currentText;
            
            if (frame >= totalFrames) {
                element.innerText = targetText;
                clearInterval(element._decryptInterval);
            }
            frame++;
        }, 16);
    }

    function syncActiveProject(index) {
        if (isTransitioningProject) return;
        activeProjectIdx = index;
        
        // Update styling highlights
        projectCards.forEach((card, idx) => {
            card.classList.toggle('active', idx === index);
        });

        navDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });

        // Trigger gorgeous slide transition on Info Hub details
        projectDetailsEl.classList.add('switching');
        
        setTimeout(() => {
            const data = projectData[index];
            
            // Update panel metrics ID
            activeProjectIndexEl.innerText = `SECURE_INDEX // 0${index + 1}`;
            
            // Load texts with beautiful Sci-Fi scramble animation
            decryptText(projTitleEl, data.title, 500);
            decryptText(projStatusEl, data.status, 350);
            decryptText(specComputeEl, data.compute, 400);
            decryptText(specMemoryEl, data.memory, 400);
            decryptText(specFPSEl, data.fps, 400);
            
            // Standard dynamic updates
            projLatencyEl.innerHTML = `<i class="fa-solid fa-gauge-high"></i> ${data.latency}`;
            projDescEl.innerText = data.desc;
            projArchTextEl.innerText = data.arch;
            
            // Build dynamic Tech Tags list
            projTechTagsEl.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
            
            // Build features checklist
            projFeaturesEl.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
            
            // Update anchors
            projLiveLinkEl.href = data.live;
            projRepoLinkEl.href = data.repo;
            
            // Highlight matching nodes in the Tech Matrix grid!
            highlightTechMatrix(data.skillsToHighlight);

            // Re-bind hover styles to new tag nodes
            setupClickableCursorEvents();

            // Fade details panel back in
            projectDetailsEl.classList.remove('switching');
        }, 300);
    }

    // Highlighting matrix grid chips
    function highlightTechMatrix(skills) {
        const chips = document.querySelectorAll('.skill-chip');
        chips.forEach(chip => {
            const skillAttr = chip.getAttribute('data-skill');
            if (skills.includes(skillAttr)) {
                chip.classList.add('highlight-tech');
            } else {
                chip.classList.remove('highlight-tech');
            }
        });
    }

    // Initial project state loading
    setTimeout(() => {
        syncActiveProject(0);
    }, 100);

    // ----------------------------------------------------------------------
    // 7. Interactive Glare & 3D Tilt Mechanics
    // Tilt is stored as data attrs and injected into the orbit transform
    // each frame — no freezing, no snapping, always in sync with orbit.
    // ----------------------------------------------------------------------
    projectCards.forEach(card => {
        // Smoothly lerp tilt back to 0 when mouse leaves
        card.dataset.tiltX = '0';
        card.dataset.tiltY = '0';
        card.dataset.targetTiltX = '0';
        card.dataset.targetTiltY = '0';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Assign CSS variables for holographic glare and spotlight borders
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Compute target tilt from center — max 10 degrees
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            card.dataset.targetTiltX = ((cy - y) / cy * 10).toFixed(3);
            card.dataset.targetTiltY = ((x - cx) / cx * 10).toFixed(3);
        });

        card.addEventListener('mouseleave', () => {
            // Let lerp smoothly return to 0
            card.dataset.targetTiltX = '0';
            card.dataset.targetTiltY = '0';
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // Lerp tilt values toward targets each frame (called inside renderDna loop)
    function lerpCardTilts() {
        projectCards.forEach(card => {
            const tx = parseFloat(card.dataset.targetTiltX || 0);
            const ty = parseFloat(card.dataset.targetTiltY || 0);
            const cx = parseFloat(card.dataset.tiltX || 0);
            const cy = parseFloat(card.dataset.tiltY || 0);
            card.dataset.tiltX = (cx + (tx - cx) * 0.12).toFixed(4);
            card.dataset.tiltY = (cy + (ty - cy) * 0.12).toFixed(4);
        });
    }

    // ----------------------------------------------------------------------
    // 8. Tabs, Dashboard Nav & Form Interactions
    // ----------------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabTarget = btn.getAttribute('data-tab');
            
            // Toggle active header button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle active pane display
            tabPanes.forEach(pane => {
                if (pane.id === `tab-${tabTarget}`) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });

    // Navigation items panel toggles (Genetic Archives vs Skill Matrix vs Comm)
    const navItems = document.querySelectorAll('.nav-item');
    const panels = {
        projects: document.getElementById('projects-panel'),
        skills: document.getElementById('skills-panel'),
        contact: document.getElementById('contact-panel')
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            // Toggle visible content panel with class triggers
            Object.keys(panels).forEach(key => {
                if (key === target) {
                    panels[key].classList.remove('hide-panel');
                } else {
                    panels[key].classList.add('hide-panel');
                }
            });

            // Smooth scroll desktop orbit to corresponding cards if nav clicked
            if (target === 'projects') {
                scrollToProject(activeProjectIdx);
            }
        });
    });

    // Clicking scrolldots or cards navigates orbit
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            scrollToProject(index);
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const index = parseInt(card.getAttribute('data-index'));
            
            // If card isn't active, click scrolls it to front
            if (!card.classList.contains('active')) {
                e.preventDefault();
                scrollToProject(index);
            }
        });
    });

    // Smooth scrolls window to precise project height
    function scrollToProject(index) {
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        // Divide by 4 sectors (0 to 4 indexes)
        const targetScroll = (index / 4) * scrollMax;
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }

    // Encrypted contact form submit
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aesthetic transmission loading status
        formStatus.className = 'form-status';
        decryptText(formStatus, '> CONSTRUCTING ENCRYPTED DATA PACKETS...', 400);
        
        setTimeout(() => {
            decryptText(formStatus, '> ROUTING VIA NEXUS-8 SHIELD GATEWAY...', 450);
            
            setTimeout(() => {
                formStatus.className = 'form-status success';
                decryptText(formStatus, '> TRANSMISSION SECURELY RECEIVED. NEXUS ESTABLISHED.', 600);
                
                // Clear fields
                contactForm.reset();
            }, 800);
        }, 800);
    });

    // ----------------------------------------------------------------------
    // 9. Real-Time system clock update
    // ----------------------------------------------------------------------
    const systemTimeEl = document.getElementById('systemTime');
    
    function updateClock() {
        const now = new Date();
        const hrs = String(now.getUTCHours()).padStart(2, '0');
        const mins = String(now.getUTCMinutes()).padStart(2, '0');
        const secs = String(now.getUTCSeconds()).padStart(2, '0');
        
        systemTimeEl.innerText = `${hrs}:${mins}:${secs} UTC`;
    }
    updateClock();
    setInterval(updateClock, 1000);

});
