// Smooth scroll function with easing
function scrollDown() {
    const currentPosition = window.scrollY;
    const nextSection = calculateNextSection(currentPosition);

    if (nextSection !== currentPosition) {
        smoothScrollTo(nextSection, 1000);
    }
}

// Smooth scroll up to previous section
function scrollUp() {
    const currentPosition = window.scrollY;
    const prevSection = calculatePrevSection(currentPosition);

    if (prevSection !== currentPosition) {
        smoothScrollTo(prevSection, 1000);
    }
}

// Calculate the next section to scroll to
function calculateNextSection(currentPosition) {
    const sections = document.querySelectorAll('header, .card');
    let nextSection = 0;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (sectionTop > currentPosition + 50) {
            if (nextSection === 0) {
                nextSection = sectionTop;
            }
        }
    });

    return nextSection || document.documentElement.scrollHeight;
}

// Calculate the previous section to scroll to
function calculatePrevSection(currentPosition) {
    const sections = document.querySelectorAll('header, .card');
    let prevSection = 0;

     sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (sectionTop < currentPosition - 50) {
            if (prevSection === 0) {
                prevSection = sectionTop;
            }
        }
    });


    return prevSection;
}

// Smooth scroll with cubic easing
function smoothScrollTo(target, duration = 1000) {
    const start = window.scrollY;
    const distance = target - start;
    const startTime = performance.now();

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function scroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, start + distance * ease);

        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }

    requestAnimationFrame(scroll);
}

// Create a command display element
function createCommandDisplay() {
    const display = document.createElement('div');
    display.id = 'command-display';
    display.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.98), rgba(118, 75, 162, 0.98));
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 18px;
        font-weight: 700;
        box-shadow: 0 12px 48px rgba(102, 126, 234, 0.5);
        z-index: 1001;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 500px;
        word-wrap: break-word;
        line-height: 1.6;
        text-align: center;
        letter-spacing: 1px;
    `;
    document.body.appendChild(display);
    return display;
}

function showCommand(message) {
    let display = document.getElementById('command-display');
    if (!display) {
        display = createCommandDisplay();
    }
    display.textContent = message;
    display.style.opacity = '1';

    // Auto-hide after 2 seconds
    clearTimeout(display.hideTimeout);
    display.hideTimeout = setTimeout(() => {
        display.style.opacity = '0';
    }, 2000);
}

function showFeedback(message) {
    let feedback = document.getElementById('voice-feedback');
    if (!feedback) {
        feedback = createFeedbackElement();
    }
    feedback.textContent = message;
    feedback.style.opacity = '1';

    // Auto-hide after 3 seconds
    clearTimeout(feedback.hideTimeout);
    feedback.hideTimeout = setTimeout(() => {
        feedback.style.opacity = '0';
    }, 3000);
}

// Voice command setup using Annyang
if (annyang) {
    var commands = {
        'down': function() {
            showCommand('Scrolling Down');
            scrollDown();
        },
        'up': function() {
            showCommand('Scrolling Up');
            scrollUp();
        },
        'top': function() {
            showCommand('Back to Top');
            smoothScrollTo(0, 1200);
        }
    };

    annyang.addCommands(commands);
    annyang.start();

    annyang.onstart = function() {
        showFeedback('🎤 Listening...');
        console.log('🎤 Listening for voice commands...');
    };

    // Show what command was recognized
    annyang.onresult = function(phrases) {
        if (phrases && phrases[0]) {
            showFeedback('✅ Command Recognized: ' + phrases[0].toUpperCase());
            console.log('Recognized: ' + phrases[0]);
        }
    };

    // Show what the browser is currently hearing in real-time
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        var speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new speechRecognition();

        recognition.onstart = function() {
            showFeedback('🎤 Listening... Speak now');
        };

        // Capture interim transcript and show real-time
        recognition.onresult = function(event) {
            var interimTranscript = '';
            var finalTranscript = '';

            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i].transcript;

                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            // Show real-time as user speaks
            if (interimTranscript) {
                showFeedback('🎙️ ' + interimTranscript);
            } else if (finalTranscript) {
                showFeedback('✓ You said: ' + finalTranscript);
            }
        };
    }

    annyang.onerror = function(error) {
        showFeedback('❌ Voice error');
        console.log('Voice error: ' + error);
    };
}

// Card animation on page load
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) rotateX(10deg)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0)';
        }, index * 150);
    });

    console.log('%c⚡ Portfolio Loaded!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cTry saying: "down", "up", or "back to top"', 'color: #764ba2; font-size: 12px;');
});

// Sparkle effect on card hover
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--c1);
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 10px var(--c1);
            animation: sparkleFloat 1s ease-out forwards;
            z-index: 10;
        `;

        const rect = card.getBoundingClientRect();
        sparkle.style.left = (e.clientX - rect.left) + 'px';
        sparkle.style.top = (e.clientY - rect.top) + 'px';

        card.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    });
});

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(0, -30px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcut for scrolling (spacebar for down, Shift+spacebar for up)
document.addEventListener('keydown', function(event) {
    if (event.target === document.body) {
        if (event.code === 'Space') {
            event.preventDefault();
            if (event.shiftKey) {
                scrollUp();
            } else {
                scrollDown();
            }
        }
    }
});
