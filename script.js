// ====================================================
//              SUPABASE CONFIG
// ====================================================

const SUPABASE_URL = 'https://lgthshyzacxgnrpnqxvn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndGhzaHl6YWN4Z25ycG5xeHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3Njc4NTAsImV4cCI6MjA2ODM0Mzg1MH0.ZhOJolUsn5X44qTOiaUFBcps-HVBxklMbUe55ET1j7s';

// Initialize the Supabase client
const dbClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ====================================================
//              CONSTANTS & CONFIG
// ====================================================

const NUM_COLS = 4;
const NUM_ROWS = 10;
const WILDCARD_SYMBOL = "★"; // Unicode star symbol for wildcard
const BASE_DROP_INTERVAL = 1440; // Milliseconds for auto-drop in Practice mode (slowed 20% from 1200)
const MANUAL_DROP_VISUAL_DELAY = 50; // Milliseconds delay between steps in manual drop animation for visual effect
const WORD_CLEAR_DELAY = 800; // Milliseconds delay before removing visually cleared rows and shifting tiles down
const MANUAL_DROP_COOLDOWN = 300; // Milliseconds cooldown period after a manual drop to prevent accidental rapid drops

// Speed Challenge Mode Config (Now the main Daily Challenge)
const SPEED_CHALLENGE_INITIAL_INTERVAL = 1200; // Starting drop interval (ms) for speed mode (slowed 20% from 1000)
const SPEED_CHALLENGE_MIN_INTERVAL = 240;    // Minimum drop interval (ms) - fastest speed (slowed 20% from 200)
const SPEED_CHALLENGE_INTERVAL_DECREMENT = 30; // Amount (ms) to decrease interval each time speed increases (adjusted from 25)
const SPEED_INCREASE_ROW_COUNT = 1; // Increase speed every N rows cleared

// Game Modes Enum
const GAME_MODE = {
    PRACTICE: 'practice',
    DAILY_CHALLENGE: 'daily_challenge'
};

// Tutorial Steps Enum - Added SHOW_NEXT_PREVIEW_TIP
const TUTORIAL_STEP = {
    INACTIVE: 0,
    SHOW_GOAL: 1,
    SHOW_MOVE: 2,
    AWAIT_MOVE: 3,
    SHOW_DROP: 4,
    SHOW_EARLY_DROP: 5,
    SHOW_NEXT_PREVIEW_TIP: 6, // NEW: Tip after first tile lands, shows next preview
    SHOW_WILDCARD: 7,        // Was 6
    SHOW_FIRST_WORD_TIP: 8,    // Was 7
    COMPLETE: 9                // Was 8
};

// Sizing Constants
const GRID_GAP = 5;
const CONTAINER_PADDING = 10;
const CONTAINER_GAP = 10;
const PANEL_GAP = 10;
const MIN_CELL_SIZE = 30;

// Base Letter Frequencies
const baseFrequencies = {
    A: 8.17, B: 1.49, C: 2.78, D: 4.25, E: 12.70, F: 2.23, G: 2.02, H: 6.09,
    I: 6.97, J: 0.15, K: 0.77, L: 4.03, M: 2.41, N: 6.75, O: 7.51, P: 1.93,
    Q: 0.10, R: 5.99, S: 6.33, T: 9.06, U: 2.76, V: 0.98, W: 2.36, X: 0.15,
    Y: 1.97, Z: 0.07
};

// LocalStorage Keys for Streak Data
const STREAK_COUNT_KEY = 'QuadroStreakCount';
const LAST_COMPLETED_DATE_KEY = 'QuadroLastCompletedDateUTC';

// --- LocalStorage Keys for Leaderboards ---
const DAILY_LEADERBOARD_KEY = 'QuadroDailyLeaderboard';
const PRACTICE_LEADERBOARD_KEY = 'QuadroPracticeLeaderboard';
const LEADERBOARD_SIZE = 5; // Store Top 5 scores
const LEADERBOARD_DISPLAY_COUNT = 3; // Display Top 3 scores

// --- NEW: Daily Challenge Play Limit Constants ---
const MAX_DAILY_CHALLENGE_PLAYS = 3;
const DAILY_CHALLENGE_PLAYS_KEY = 'QuadroDailyChallengePlays';
const DAILY_CHALLENGE_LAST_PLAY_DATE_KEY = 'QuadroDailyChallengeLastPlayDateUTC';


// --- NEW DYNAMIC ENCOURAGING COMMENT SETS ---
const newHighScoreComments = [
    "Wow! New High Score! You're on fire! 🔥",
    "Personal Best! You've smashed your previous record! 🚀",
    "Incredible! That's a new high score for you! Keep it up! 🏆",
    "High Score Alert! You're raising the bar! 🌟",
    "Sensational! You just set a new personal best! 🎉"
];

const commentsForZeroScore = [
    "Tough grid that time! Every game is a chance to learn.",
    "Zero points this round, but this game can be tricky! Don't give up! 💪",
    "That was a challenging one! Shake it off and try a new strategy. 💡",
    "Not every grid's a winner. Ready for another go? 🙂",
    "It happens to the best of us! The next one could be your masterpiece. 🌱"
];

const commentsForScoreUnder50 = [
    "Good start! Keep practicing to spot more words. 👍",
    "You're getting the hang of it! Every point counts towards improvement.",
    "Nice effort! A few more words and you'll be flying soon! 😊",
    "Solid attempt! Keep building those word skills.",
    "That's the spirit! Keep an eye out for those word opportunities. 👀"
];

const commentsForScore50to99 = [
    "Great job! You're definitely finding some good words in there. 👌",
    "That's a solid score! You're showing some real talent for this!",
    "Well played! You're consistently clearing those rows. ✨",
    "Nice one! You're building up a good score there.",
    "Impressive! You're making those letters work for you! 💡"
];

const commentsForScore100to149 = [
    "Excellent! You've got a great eye for words and strategy! 🎯",
    "Fantastic score! You're mastering this game! 🌟",
    "That's some serious word power! Brilliant play.",
    "You're making it look easy! Superb score. 😎",
    "Top-notch performance! You're really getting the hang of this. 👍"
];

const commentsForScore150plus = [
    "Amazing! A truly outstanding score! You're a word wizard! 🧙✨",
    "Phenomenal! That's an incredible display of skill! 🏆",
    "Spectacular! Scores like that are legendary! 🤩",
    "Unbelievable! You've conquered the grid with that score! 🚀",
    "Simply brilliant! A masterclass in solving these puzzles! 🌟"
];

// Fallback comments (if needed, though new logic should cover most cases)
const fallbackComments = [ // Renamed from ENCOURAGING_COMMENTS to avoid confusion
    "Nice score!",
    "Well done!",
    "Great effort!",
    "Keep practicing!",
    "Awesome job!"
];


// --- Practice Mode Timer Constants ---
const PRACTICE_MODE_DURATION_SECONDS = 120; // 2 minutes (120 seconds)
const TIMER_WARNING_SECONDS = 15; // Last 15 seconds for warning style


// ====================================================
// ====================================================
//              GLOBAL VARIABLES
// ====================================================
let grid = [];
let currentTile = null;
let score = 0;
let nextTiles = [];
let tilesSpawned = 0;
let currentGameMode = null; // Stores the mode of the currently/last played game
let gameOverFlag = false;
let autoDropping = true;
let canManualDrop = true;
let lastTime = null;
let accumulatedTime = 0;
let dropInterval = BASE_DROP_INTERVAL;
let rowsClearedSinceSpeedIncrease = 0;
let dailySeed = 0;
let seededPrng = null;
let isTutorialPaused = false;
let currentTutorialStep = TUTORIAL_STEP.INACTIVE;
let needsTutorial = false;
let firstWildcardSpawned = false;
let tutorialFirstWordFormed = false; // NEW: Track if first word tip shown
let tutorialMoveCount = 0;
let awaitingEarlyDropMessage = false;

// --- NEW Tutorial Flags for Next Preview Tip ---
let tutorialFirstTileHasLanded = false;
let tutorialNextPreviewTipShown = false;

// --- Practice Mode Timer Variables ---
let practiceTimerInterval = null; // To store the interval ID for the practice timer
let timeRemaining = PRACTICE_MODE_DURATION_SECONDS; // Time remaining in seconds for practice mode

// --- Supabase Variables ---
let playerId = null; // Unique player ID for database tracking
let gameStartTime = null; // Track when game started for duration calculation

// --- DOM Element Variables ---
let tutorialOverlayElement = null;
let tutorialMessageBoxElement = null;
let tutorialStepTitleElement = null;
let tutorialMessageTextElement = null;
let tutorialContinueBtnElement = null;
let topBarElement = null;
let gameContainerElement = null;
let landingPageElement = null;
let instructionPopupElement = null;
let gameOverOverlayElement = null;
let scoreDisplayElement = null;
let timerDisplayElement = null; // For Practice Mode Timer
let gameGridElement = null;
let mobileControlsElement = null;
let nextPreviewElement = null; // Element for the next tiles preview box
let nextTilesElement = null; // Element for the individual next tiles
let playDailyChallengeBtn = null;
// let dailyPlaysIndicatorElement = null; // OLD: For landing page play count (text)
let dailyPlaysIndicatorCirclesContainer = null; // NEW: Container for circle indicators
let dailyPlayCircleElements = []; // NEW: Array to hold the circle span elements
let howToPlayBtn = null;
let practiceBtn = null;
let backToHomeFromInstructionsBtn = null;
// Game Over Screen Elements (Updated)
let encouragingCommentElement = null; // New
let dailyScoreDisplayElement = null;
let practiceScoreDisplayElement = null;
let dailyScoreValueElement = null;
let practiceScoreValueElement = null;
let practiceHighScoreElement = null;
let dailyResultsElement = null;
let practiceResultsElement = null;
let sharePromptElement = null;
let sharePanelElement = null;
let playAgainPracticeBtn = null;
let backToHomeBtn = null;
let goToPracticeModeBtn = null; // NEW: For game over screen
let dailyPlaysRemainingMessageElement = null; // NEW: For game over screen
let shareTwitterBtn = null;
let shareWhatsAppBtn = null;
let shareFacebookBtn = null;
let shareCopyBtn = null;
// Controls
let btnLeft = null;
let btnDown = null;
let btnRight = null;
// Streak Display Elements
let landingStreakDisplayElement = null;
let dailyStreakResultElement = null;
// Leaderboard Display Elements
let dailyLeaderboardDisplayElement = null;
let practiceLeaderboardDisplayElement = null;

// --- Streak Data Variables ---
let currentStreak = 0;
let lastCompletedDailyUTCString = ''; // Stores date as 'YYYY-MM-DD'

// --- Leaderboard Data Variables ---
let dailyLeaderboard = []; // Array to hold daily top scores [{ score: number, date: string }]
let practiceLeaderboard = []; // Array to hold practice top scores [{ score: number, date: string }]

// --- NEW: Daily Challenge Play Limit Variables ---
let dailyChallengePlaysToday = 0;
let dailyChallengeLastPlayDateUTC = '';


// Start of IIFE (Immediately Invoked Function Expression)
(function() {

    // ====================================================
    //              INITIALIZATION & SETUP
    // ====================================================

    /**
     * Caches references to frequently used DOM elements.
     */
    function cacheDOMElements() {
        console.log("Caching DOM elements...");
        try {
            // Core Layout
            topBarElement = document.getElementById('top-bar');
            gameContainerElement = document.getElementById('game-container');
            landingPageElement = document.getElementById('landing-page');
            instructionPopupElement = document.getElementById('instruction-popup');
            gameOverOverlayElement = document.getElementById('game-over-overlay');
            // In-Game UI
            scoreDisplayElement = document.getElementById('score-display');
            timerDisplayElement = document.getElementById('timer-display');
            gameGridElement = document.getElementById('game-grid');
            mobileControlsElement = document.getElementById('mobile-controls');
            nextPreviewElement = document.getElementById('next-preview');
            nextTilesElement = document.getElementById('next-tiles');
            // Landing Page Buttons
            playDailyChallengeBtn = document.getElementById('play-daily-speed-btn');
            // dailyPlaysIndicatorElement = document.getElementById('daily-plays-indicator'); // OLD: Removed
            if (playDailyChallengeBtn) { // Ensure button exists before querying within it
                dailyPlaysIndicatorCirclesContainer = playDailyChallengeBtn.querySelector('.daily-plays-indicator-circles');
                if (dailyPlaysIndicatorCirclesContainer) {
                    dailyPlayCircleElements = Array.from(dailyPlaysIndicatorCirclesContainer.querySelectorAll('.play-circle'));
                } else {
                    console.warn("Daily plays indicator circles container not found.");
                }
            } else {
                   console.warn("playDailyChallengeBtn not found during DOM caching for circles.");
            }

            howToPlayBtn = document.getElementById('how-to-play-btn');
            practiceBtn = document.getElementById('practice-btn');
            backToHomeFromInstructionsBtn = document.getElementById('back-to-home-from-instructions-btn');
            // Game Over Screen Elements
            encouragingCommentElement = document.getElementById('encouraging-comment');
            dailyScoreDisplayElement = document.getElementById('daily-score-display');
            practiceScoreDisplayElement = document.getElementById('practice-score-display');
            dailyScoreValueElement = document.getElementById('daily-score-value');
            practiceScoreValueElement = document.getElementById('practice-score-value');
            practiceHighScoreElement = document.getElementById('practice-high-score');
            dailyResultsElement = document.getElementById('daily-results');
            practiceResultsElement = document.getElementById('practice-results');
            sharePromptElement = document.getElementById('share-prompt');
            sharePanelElement = document.getElementById('share-panel');
            shareTwitterBtn = document.getElementById("share-twitter");
            shareWhatsAppBtn = document.getElementById("share-whatsapp");
            shareFacebookBtn = document.getElementById("share-facebook");
            shareCopyBtn = document.getElementById("share-copy");
            playAgainPracticeBtn = document.getElementById('play-again-practice-btn');
            backToHomeBtn = document.getElementById('back-to-home-btn');
            goToPracticeModeBtn = document.getElementById('go-to-practice-mode-btn'); // NEW
            dailyPlaysRemainingMessageElement = document.getElementById('daily-plays-remaining-message'); // NEW
            // Controls
            btnLeft = document.getElementById('btn-left');
            btnDown = document.getElementById('btn-down');
            btnRight = document.getElementById('btn-right');
            // Tutorial elements
            tutorialOverlayElement = document.getElementById('tutorial-overlay');
            tutorialMessageBoxElement = document.getElementById('tutorial-message-box');
            tutorialStepTitleElement = document.getElementById('tutorial-step-title');
            tutorialMessageTextElement = document.getElementById('tutorial-message-text');
            tutorialContinueBtnElement = document.getElementById('tutorial-continue-btn');
            // Streak elements
            landingStreakDisplayElement = document.getElementById('landing-streak-display');
            dailyStreakResultElement = document.getElementById('daily-streak-result');
            // Leaderboard Display Containers
            dailyLeaderboardDisplayElement = document.getElementById('daily-leaderboard-display');
            practiceLeaderboardDisplayElement = document.getElementById('practice-leaderboard-display');

            if (!encouragingCommentElement) console.warn("Encouraging comment element not found.");
            if (!dailyResultsElement) console.warn("Daily results container element not found.");
            if (!practiceResultsElement) console.warn("Practice results container element not found.");
            if (!dailyLeaderboardDisplayElement) console.warn("Daily leaderboard display container not found.");
            if (!practiceLeaderboardDisplayElement) console.warn("Practice leaderboard display container not found.");
            if (!nextPreviewElement) console.warn("Next Preview element (next-preview) not found.");
            if (!timerDisplayElement) console.warn("Timer display element (timer-display) not found.");
            // if (!dailyPlaysIndicatorElement) console.warn("Daily plays indicator element not found."); // OLD
            if (dailyPlayCircleElements.length !== MAX_DAILY_CHALLENGE_PLAYS) console.warn(`Expected ${MAX_DAILY_CHALLENGE_PLAYS} play circle elements, found ${dailyPlayCircleElements.length}.`);
            if (!goToPracticeModeBtn) console.warn("Go to practice mode button (game over) not found.");
            if (!dailyPlaysRemainingMessageElement) console.warn("Daily plays remaining message element (game over) not found.");


            console.log("DOM elements cached successfully.");
        } catch (error) {
            console.error("Error caching DOM elements:", error);
        }
    }

    /**
     * Sets up all necessary event listeners for UI elements.
     */
    function setupEventListeners() {
        console.log("Setting up event listeners...");
        try {
            // Landing Page Listeners
            if (playDailyChallengeBtn) { playDailyChallengeBtn.addEventListener('click', handlePlayDailyChallengeClick); } else { console.warn("playDailyChallengeBtn not found."); }
            if (howToPlayBtn) { howToPlayBtn.addEventListener('click', showInstructions); } else { console.warn("howToPlayBtn not found."); }
            if (practiceBtn) { practiceBtn.addEventListener('click', handlePracticeClick); } else { console.warn("practiceBtn not found."); }

            // Static Instruction Popup Listeners
            if (backToHomeFromInstructionsBtn) {
                backToHomeFromInstructionsBtn.addEventListener('click', hideInstructionsAndShowLanding);
            } else {
                console.warn("backToHomeFromInstructionsBtn not found.");
            }

            // Game Over Listeners
            if (playAgainPracticeBtn) { playAgainPracticeBtn.addEventListener('click', handlePlayAgainClick); } else { console.warn("playAgainPracticeBtn not found."); }
            if (backToHomeBtn) { backToHomeBtn.addEventListener('click', showLandingPage); } else { console.warn("backToHomeBtn (game over) not found."); }
            if (goToPracticeModeBtn) { goToPracticeModeBtn.addEventListener('click', handleGoToPracticeModeClick); } else { console.warn("goToPracticeModeBtn (game over) not found."); } // NEW

            // Share Button Listeners
            if (shareTwitterBtn) { shareTwitterBtn.addEventListener("click", shareOnTwitter); } else { console.warn("shareTwitterBtn not found."); }
            if (shareWhatsAppBtn) { shareWhatsAppBtn.addEventListener("click", shareOnWhatsApp); } else { console.warn("shareWhatsAppBtn not found."); }
            if (shareFacebookBtn) { shareFacebookBtn.addEventListener("click", shareOnFacebook); } else { console.warn("shareFacebookBtn not found."); }
            if (shareCopyBtn) { shareCopyBtn.addEventListener("click", copyShareCaption); } else { console.warn("shareCopyBtn not found."); }

            // Keyboard Listener
            document.addEventListener("keydown", handleKeyDown);

            // Mobile Control Button Listeners
            if (mobileControlsElement) {
                if (btnLeft) { btnLeft.addEventListener('pointerdown', handlePointerDownControls); } else { console.warn("btnLeft element not found during listener setup."); }
                if (btnDown) { btnDown.addEventListener('pointerdown', handlePointerDownControls); } else { console.warn("btnDown element not found during listener setup."); }
                if (btnRight) { btnRight.addEventListener('pointerdown', handlePointerDownControls); } else { console.warn("btnRight element not found during listener setup."); }
            } else { console.warn("mobileControlsElement not found, cannot add listeners to control buttons."); }

            // Window Resize/Orientation Change Listeners
            const resizeHandler = () => { setDynamicVh(); calculateAndSetCellSize(); };
            window.addEventListener('resize', resizeHandler);
            window.addEventListener('orientationchange', resizeHandler);

            // Tutorial Listeners
            if (tutorialContinueBtnElement) { tutorialContinueBtnElement.addEventListener('click', handleTutorialDismiss); } else { console.warn("tutorialContinueBtnElement not found."); }

            console.log("Event listeners setup completed.");
        } catch (error) {
            console.error("Error setting up event listeners:", error);
        }
    }

    /**
     * Gets a unique player ID from local storage, or creates and saves a new one.
     */
    function getPlayerId() {
        const PLAYER_ID_KEY = 'QuadroPlayerId';
        let storedPlayerId = localStorage.getItem(PLAYER_ID_KEY);
        if (!storedPlayerId) {
            storedPlayerId = self.crypto.randomUUID();
            localStorage.setItem(PLAYER_ID_KEY, storedPlayerId);
            console.log("New player ID created and saved:", storedPlayerId);
        }
        return storedPlayerId;
    }

    /**
     * Initializes the application on window load.
     */
    function initializeApp() {
        console.log("Initializing app...");
        try {
            setDynamicVh();
            cacheDOMElements();
            setupEventListeners();
            playerId = getPlayerId(); // Initialize player ID for Supabase
            needsTutorial = !localStorage.getItem("hasCompletedTutorial");
            console.log(`Needs tutorial on init? ${needsTutorial}`);

            loadStreakData();
            loadDailyChallengePlayData(); // --- Load daily challenge play data ---
            dailyLeaderboard = getLeaderboard(DAILY_LEADERBOARD_KEY);
            practiceLeaderboard = getLeaderboard(PRACTICE_LEADERBOARD_KEY);
            console.log(`Loaded Daily Leaderboard: ${dailyLeaderboard.length} entries`);
            console.log(`Loaded Practice Leaderboard: ${practiceLeaderboard.length} entries`);

            if (typeof validWords4 === 'undefined' || !Array.isArray(validWords4)) {
                console.error("Word list 'validWords4' not found or invalid. Game cannot start.");
                if (playDailyChallengeBtn) playDailyChallengeBtn.disabled = true;
                if (practiceBtn) practiceBtn.disabled = true;
                const lpPara = landingPageElement?.querySelector('p');
                if (lpPara) {
                    lpPara.innerHTML += "<br><strong style='color: red;'>Error: Word list failed to load. Please refresh.</strong>";
                }
                return;
            }

            showLandingPage(); // This will also update the daily challenge button UI
            console.log("App initialized successfully.");

        } catch (error) {
            console.error("Error during app initialization:", error);
            if (landingPageElement) {
                const errorMsg = document.createElement('p');
                errorMsg.innerHTML = "<strong style='color: red;'>An error occurred during initialization. Please refresh the page.</strong>";
                errorMsg.id = 'init-error-msg';
                if (!document.getElementById('init-error-msg')) {
                    landingPageElement.appendChild(errorMsg);
                }
            }
        }
    }

    window.addEventListener('load', initializeApp);

    // ====================================================
    //          DYNAMIC VIEWPORT HEIGHT CALCULATION
    // ====================================================
    function setDynamicVh() { let v; if (window.visualViewport) { v = Math.min(window.visualViewport.height, window.innerHeight); } else { v = window.innerHeight; } const h = v * 0.01; document.documentElement.style.setProperty('--vh', `${h}px`); }


    // ====================================================
    //              UI FLOW & STATE CHANGES
    // ====================================================

    function showLandingPage() {
        console.log("Showing landing page...");
        if (landingPageElement) landingPageElement.classList.remove('hidden'); else console.warn("Landing page element not found in showLandingPage");
        if (instructionPopupElement) instructionPopupElement.classList.remove('visible');
        if (gameOverOverlayElement) gameOverOverlayElement.classList.remove('visible');
        if (gameContainerElement) gameContainerElement.classList.remove('visible');
        if (topBarElement) topBarElement.classList.remove('visible');
        hideTutorialElements();

        // Ensure dailyChallengePlaysToday is current before using it for UI logic
        loadDailyChallengePlayData();

        // Conditionally hide the introductory paragraph
        const introParagraph = landingPageElement?.querySelector('h1 + p'); // Targets the <p> immediately after <h1>
        if (introParagraph) {
            if (dailyChallengePlaysToday >= MAX_DAILY_CHALLENGE_PLAYS) {
                introParagraph.style.display = 'none';
            } else {
                introParagraph.style.display = ''; // Resets to default (typically 'block' for <p>)
            }
        } else {
            console.warn("Landing page introductory paragraph not found for hiding/showing.");
        }

        updateStreakDisplay(); // This will now use the updated dailyChallengePlaysToday
        updateDailyChallengeButtonUI();
        stopPracticeTimer(); // Ensure timer is stopped when returning to landing page
        console.log("Landing page shown.");
    }

    function showInstructions() {
        console.log("Showing instructions...");
        if (!instructionPopupElement) { console.error("Instruction popup element not found!"); return; }
        instructionPopupElement.classList.add('visible');
        if (landingPageElement) landingPageElement.classList.add('hidden'); else console.warn("Landing page element not found in showInstructions");
        console.log("Instructions shown.");
    }

    function hideInstructionsAndShowLanding() {
        console.log("Hiding instructions and showing landing page...");
        if (instructionPopupElement) instructionPopupElement.classList.remove('visible'); else console.warn("Instruction popup element not found in hideInstructionsAndShowLanding");
        showLandingPage();
    }

    function showGameUI() {
        console.log("Showing game UI...");
        setDynamicVh();

        if (landingPageElement) landingPageElement.classList.add('hidden'); else console.warn("Landing page element not found in showGameUI");
        if (instructionPopupElement) instructionPopupElement.classList.remove('visible');
        if (gameOverOverlayElement) gameOverOverlayElement.classList.remove('visible');
        hideTutorialElements();

        if (topBarElement) topBarElement.classList.add('visible'); else console.warn("Top bar element not found in showGameUI");
        if (gameContainerElement) gameContainerElement.classList.add('visible'); else console.warn("Game container element not found in showGameUI");
        if (mobileControlsElement) {
            mobileControlsElement.style.display = 'flex';
        } else { console.warn("Mobile controls element not found in showGameUI"); }

        calculateAndSetCellSize();

        if (topBarElement) {
            setTimeout(() => {
                if (topBarElement) {
                    document.documentElement.style.setProperty('--top-bar-height', `${topBarElement.offsetHeight}px`);
                    calculateAndSetCellSize();
                }
            }, 50);
        }
        console.log("Game UI shown.");
    }

    // ====================================================
    //                  EVENT HANDLERS
    // ====================================================

    function handlePlayDailyChallengeClick() {
        console.log("Play Daily Challenge clicked");

        loadDailyChallengePlayData(); // Ensure count is current
        if (dailyChallengePlaysToday >= MAX_DAILY_CHALLENGE_PLAYS) {
            console.log("Daily Challenge limit reached. Cannot play. Button should be disabled.");
            // The button being disabled and having a title attribute handles user feedback.
            return;
        }

        currentGameMode = GAME_MODE.DAILY_CHALLENGE;
        startTutorialOrGame();
    }

    function handlePracticeClick() {
        console.log("Practice clicked");
        currentGameMode = GAME_MODE.PRACTICE;
        startTutorialOrGame();
    }

    function handleGoToPracticeModeClick() { // NEW
        console.log("Go To Practice Mode clicked from Game Over");
        currentGameMode = GAME_MODE.PRACTICE;
        startTutorialOrGame();
    }

    function handlePlayAgainClick() {
        console.log(`Play Again clicked. Restarting mode: ${currentGameMode}`);
        if (!currentGameMode) {
            console.warn("currentGameMode is not set. Defaulting to Practice.");
            currentGameMode = GAME_MODE.PRACTICE;
        }

        if (currentGameMode === GAME_MODE.DAILY_CHALLENGE) {
            loadDailyChallengePlayData(); // Ensure count is current
            if (dailyChallengePlaysToday >= MAX_DAILY_CHALLENGE_PLAYS) {
                console.log("Daily Challenge limit reached. Cannot play again today. Switching to landing page.");
                // Potentially show a custom message here if desired, but for now, just go to landing.
                showLandingPage();
                return;
            }
        }
        startTutorialOrGame();
    }


    function handleKeyDown(event) {
        if (isTutorialPaused) {
            if (event.key === "Enter") {
                event.preventDefault();
                handleTutorialDismiss();
                return;
            }
            if (handleTutorialInput(event.key)) {
                if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'a', 'A', 'd', 'D', 's', 'S'].includes(event.key)) {
                    event.preventDefault();
                }
            } else if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'a', 'A', 'd', 'D', 's', 'S'].includes(event.key)) {
                event.preventDefault();
            }
            return;
        }

        if (currentTutorialStep === TUTORIAL_STEP.AWAIT_MOVE) {
            if (handleTutorialInput(event.key)) {
                if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'a', 'A', 'd', 'D', 's', 'S'].includes(event.key)) {
                    event.preventDefault();
                }
            }
            return;
        }

        const instructionsVisible = instructionPopupElement?.classList.contains('visible');
        const gameOverVisible = gameOverOverlayElement?.classList.contains('visible');
        if (gameOverFlag || !currentTile || instructionsVisible || gameOverVisible) {
            return;
        }

        switch (event.key) {
            case "ArrowLeft": case "a": case "A": moveTileHorizontally(-1); break;
            case "ArrowRight": case "d": case "D": moveTileHorizontally(1); break;
            case " ": case "ArrowDown": case "s": case "S":
                event.preventDefault();
                if (canManualDrop) manualDrop();
                break;
        }
    }

    function handlePointerDownControls(e) {
        e.preventDefault();
        const targetId = e.currentTarget.id;

        if (isTutorialPaused) { handleTutorialInput(targetId); return; }
        if (currentTutorialStep === TUTORIAL_STEP.AWAIT_MOVE) { handleTutorialInput(targetId); return; }
        if (gameOverFlag || !currentTile) return;

        switch (targetId) {
            case 'btn-left': moveTileHorizontally(-1); break;
            case 'btn-right': moveTileHorizontally(1); break;
            case 'btn-down': if (canManualDrop) manualDrop(); break;
        }
    }

    function handleTutorialDismiss() {
        if (!isTutorialPaused) return;

        const dismissedStep = currentTutorialStep;
        console.log(`Dismissing tutorial message for step: ${dismissedStep}`);

        let nextTutorialState = TUTORIAL_STEP.COMPLETE;
        let shouldCompleteTutorial = false;
        let wasFirstWordTipDismissed = false;

        switch (dismissedStep) {
            case TUTORIAL_STEP.SHOW_GOAL:
                nextTutorialState = TUTORIAL_STEP.SHOW_MOVE;
                break;
            case TUTORIAL_STEP.SHOW_MOVE:
                nextTutorialState = TUTORIAL_STEP.AWAIT_MOVE;
                break;
            case TUTORIAL_STEP.SHOW_DROP:
                if (needsTutorial && tutorialFirstTileHasLanded && !tutorialNextPreviewTipShown) {
                    nextTutorialState = TUTORIAL_STEP.SHOW_NEXT_PREVIEW_TIP;
                } else if (needsTutorial && !firstWildcardSpawned) {
                    nextTutorialState = TUTORIAL_STEP.INACTIVE;
                } else if (needsTutorial && firstWildcardSpawned && !tutorialFirstWordFormed) {
                    nextTutorialState = TUTORIAL_STEP.INACTIVE;
                } else {
                    nextTutorialState = TUTORIAL_STEP.COMPLETE;
                    shouldCompleteTutorial = true;
                }
                break;
            case TUTORIAL_STEP.SHOW_EARLY_DROP:
                if (needsTutorial && tutorialFirstTileHasLanded && !tutorialNextPreviewTipShown) {
                    nextTutorialState = TUTORIAL_STEP.SHOW_NEXT_PREVIEW_TIP;
                } else if (needsTutorial && !firstWildcardSpawned) {
                    nextTutorialState = TUTORIAL_STEP.INACTIVE;
                } else if (needsTutorial && firstWildcardSpawned && !tutorialFirstWordFormed) {
                    nextTutorialState = TUTORIAL_STEP.INACTIVE;
                } else {
                    nextTutorialState = TUTORIAL_STEP.COMPLETE;
                    shouldCompleteTutorial = true;
                }
                break;
            case TUTORIAL_STEP.SHOW_NEXT_PREVIEW_TIP:
                if (needsTutorial && !firstWildcardSpawned) {
                    nextTutorialState = TUTORIAL_STEP.INACTIVE;
                } else if (needsTutorial && firstWildcardSpawned && !tutorialFirstWordFormed) {
                    nextTutorialState = TUTORIAL_STEP.INACTIVE;
                } else {
                    nextTutorialState = TUTORIAL_STEP.COMPLETE;
                    shouldCompleteTutorial = true;
                }
                break;
            case TUTORIAL_STEP.SHOW_WILDCARD:
                if (needsTutorial && !tutorialFirstWordFormed) {
                    nextTutorialState = TUTORIAL_STEP.INACTIVE;
                } else {
                    nextTutorialState = TUTORIAL_STEP.COMPLETE;
                    shouldCompleteTutorial = true;
                }
                break;
            case TUTORIAL_STEP.SHOW_FIRST_WORD_TIP:
                nextTutorialState = TUTORIAL_STEP.COMPLETE;
                shouldCompleteTutorial = true;
                wasFirstWordTipDismissed = true;
                break;
            default:
                console.warn("Dismissed unexpected tutorial step:", dismissedStep);
                nextTutorialState = TUTORIAL_STEP.COMPLETE;
                shouldCompleteTutorial = true;
                break;
        }

        resumeGameAfterTutorialStep();
        currentTutorialStep = nextTutorialState;

        if (shouldCompleteTutorial) {
            completeTutorial();
        } else if (nextTutorialState !== TUTORIAL_STEP.INACTIVE && nextTutorialState !== TUTORIAL_STEP.AWAIT_MOVE) {
            startTutorialStep(nextTutorialState);
        } else if (nextTutorialState === TUTORIAL_STEP.INACTIVE) {
            if (!gameOverFlag && !currentTile && !isTutorialPaused) {
                spawnTile();
            }
        }

        if (wasFirstWordTipDismissed) {
            console.log("First word tip dismissed, continuing game flow...");
            const chainClearedCount = checkForWords();
            if (!gameOverFlag && !currentTile && chainClearedCount === 0 && !isTutorialPaused) {
                spawnTile();
            }
        }
    }

    // ====================================================
    //              GAME MODE MANAGEMENT
    // ====================================================

    function startTutorialOrGame() {
        if (!currentGameMode) {
            console.error("Cannot start game: currentGameMode is not set. Defaulting to Practice.");
            currentGameMode = GAME_MODE.PRACTICE;
        }
        console.log(`Attempting to start tutorial or game. Needs tutorial: ${needsTutorial}, Mode: ${currentGameMode}`);
        try {
            showGameUI();
            setupNewGame(currentGameMode); // Play count increment happens here for Daily

            if (needsTutorial && currentTutorialStep !== TUTORIAL_STEP.COMPLETE) {
                startTutorialStep(TUTORIAL_STEP.SHOW_GOAL);
            } else {
                startGameLoop();
            }
            console.log("Tutorial or game started successfully.");
        } catch (error) {
            console.error("Error occurred in startTutorialOrGame:", error);
            showLandingPage();
            if (landingPageElement) {
                const errorMsg = document.createElement('p');
                errorMsg.innerHTML = "<strong style='color: red;'>An error occurred starting the game. Please refresh.</strong>";
                errorMsg.id = 'start-error-msg';
                if (!document.getElementById('start-error-msg')) { landingPageElement.appendChild(errorMsg); }
            }
        }
    }

    function setupNewGame(mode) {
        console.log(`Setting up new game for mode: ${mode}`);
        gameOverFlag = false;
        grid = [];
        currentTile = null;
        score = 0;
        tilesSpawned = 0;
        lastTime = null;
        accumulatedTime = 0;
        autoDropping = true;
        canManualDrop = true;
        dropInterval = BASE_DROP_INTERVAL;
        rowsClearedSinceSpeedIncrease = 0;
        firstWildcardSpawned = false;
        tutorialFirstWordFormed = false;
        tutorialMoveCount = 0;
        isTutorialPaused = false;
        currentTutorialStep = needsTutorial ? TUTORIAL_STEP.INACTIVE : TUTORIAL_STEP.COMPLETE;
        awaitingEarlyDropMessage = false;

        tutorialFirstTileHasLanded = false;
        tutorialNextPreviewTipShown = false;

        stopPracticeTimer(); // Clear any existing timer
        gameStartTime = new Date(); // Track game start time for Supabase

        if (mode === GAME_MODE.DAILY_CHALLENGE) {
            // Increment and save play count for Daily Challenge
            // This happens *before* the game actually starts, upon mode selection.
            // If they back out, the play is still counted.
            dailyChallengePlaysToday++;
            saveDailyChallengePlayData();
            updateDailyChallengeButtonUI(); // Update landing page button immediately if they go back
            console.log(`Daily Challenge play count incremented to: ${dailyChallengePlaysToday}`);

            dailySeed = getDailySeed();
            seededPrng = mulberry32(dailySeed);
            console.log(`Daily Seed: ${dailySeed}`);
            dropInterval = SPEED_CHALLENGE_INITIAL_INTERVAL;
            console.log(`Initial drop interval (Daily Challenge): ${dropInterval}ms`);
            if (timerDisplayElement) {
                timerDisplayElement.style.display = 'none';
                timerDisplayElement.style.visibility = 'hidden';
            }
        } else { // Practice Mode
            seededPrng = Math.random;
            startPracticeTimer();
        }

        initGrid();
        createGridUI();
        nextTiles = [];
        nextTiles.push(generateTile());
        nextTiles.push(generateTile());
        updateNextPreview();
        spawnTile();
        updateScoreUI();
        updateGridUI();

        if (gameOverOverlayElement) gameOverOverlayElement.classList.remove('visible');
        if (instructionPopupElement) instructionPopupElement.classList.remove('visible');
        hideTutorialElements();

        console.log("New game setup complete.");
    }

    // ====================================================
    //          PRACTICE MODE TIMER FUNCTIONS
    // ====================================================

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        if (timerDisplayElement) {
            timerDisplayElement.textContent = `Time: ${formatTime(timeRemaining)}`;
            if (timeRemaining <= TIMER_WARNING_SECONDS) {
                timerDisplayElement.classList.add('timer-warning');
            } else {
                timerDisplayElement.classList.remove('timer-warning');
            }
        }
    }

    function practiceTimerTick() {
        if (gameOverFlag || isTutorialPaused) {
            return;
        }

        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            stopPracticeTimer();
            if (!gameOverFlag) {
                showGameOver("Time's Up!");
            }
        }
    }

    function startPracticeTimer() {
        if (practiceTimerInterval) {
            clearInterval(practiceTimerInterval);
        }
        timeRemaining = PRACTICE_MODE_DURATION_SECONDS;
        if (timerDisplayElement) {
            timerDisplayElement.style.display = 'inline';
            timerDisplayElement.style.visibility = 'visible';
            updateTimerDisplay();
        }
        practiceTimerInterval = setInterval(practiceTimerTick, 1000);
        console.log("Practice timer started.");
    }

    function stopPracticeTimer() {
        if (practiceTimerInterval) {
            clearInterval(practiceTimerInterval);
            practiceTimerInterval = null;
            console.log("Practice timer stopped.");
        }
        if (timerDisplayElement) {
            timerDisplayElement.style.display = 'none';
            timerDisplayElement.style.visibility = 'hidden';
            timerDisplayElement.classList.remove('timer-warning');
        }
    }


    // ====================================================
    //              SEEDING & RANDOMNESS
    // ====================================================

    function mulberry32(seed) {
        return function() {
            var t = seed += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }

    function getDailySeed() {
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth() + 1;
        const day = today.getUTCDate();
        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        let seed = 0;
        for (let i = 0; i < dateString.length; i++) {
            seed = dateString.charCodeAt(i) + ((seed << 6) + (seed << 16) - seed);
            seed |= 0;
        }
        return Math.abs(seed);
    }

    function getRandom() {
        return seededPrng ? seededPrng() : Math.random();
    }

    // ====================================================
    //          TILE GENERATION & MANAGEMENT
    // ====================================================

    function getWeightedRandomLetter() {
        const letters = Object.keys(baseFrequencies);
        let weightedArray = [];
        let totalWeight = 0;
        letters.forEach(letter => {
            let multiplier = 0.99 + getRandom() * 0.02;
            let weight = baseFrequencies[letter] * multiplier;
            weightedArray.push({ letter: letter, weight: weight });
            totalWeight += weight;
        });
        let randomNum = getRandom() * totalWeight;
        for (let i = 0; i < weightedArray.length; i++) {
            if (randomNum < weightedArray[i].weight) {
                return weightedArray[i].letter;
            }
            randomNum -= weightedArray[i].weight;
        }
        return "E";
    }

    function generateTile() {
        tilesSpawned++;
        const isWild = (tilesSpawned % 5 === 0);
        if (isWild) {
            return { letter: WILDCARD_SYMBOL, isWildcard: true };
        } else {
            return { letter: getWeightedRandomLetter(), isWildcard: false };
        }
    }

    function spawnTile() {
        if (gameOverFlag) return;

        const spawnCol = Math.floor(NUM_COLS / 2);

        if (!grid || !grid[0] || grid[0][spawnCol]) {
            showGameOver("Spawn Blocked");
            return;
        }

        while (nextTiles.length < 3) {
            nextTiles.push(generateTile());
        }

        if (nextTiles.length > 0) {
            const nextTileDataPeek = nextTiles[0];
            if (needsTutorial && currentTutorialStep !== TUTORIAL_STEP.COMPLETE && nextTileDataPeek.isWildcard && !firstWildcardSpawned) {
                firstWildcardSpawned = true;
                const actualTileData = nextTiles.shift();
                currentTile = { row: 0, col: spawnCol, ...actualTileData };
                updateNextPreview();
                updateGridUI();
                startTutorialStep(TUTORIAL_STEP.SHOW_WILDCARD);
                return;
            }
        }

        const nextTileData = nextTiles.shift();
        currentTile = { row: 0, col: spawnCol, ...nextTileData };
        updateNextPreview();
        updateGridUI();
        accumulatedTime = 0;
        autoDropping = !isTutorialPaused;
    }


    // ====================================================
    //              GRID & UI UPDATES
    // ====================================================

    function initGrid() {
        grid = [];
        for (let r = 0; r < NUM_ROWS; r++) {
            grid.push(Array(NUM_COLS).fill(null));
        }
    }

    function createGridUI() {
        if (!gameGridElement) { console.error("Game grid element not found!"); return; }
        gameGridElement.innerHTML = "";
        document.documentElement.style.setProperty('--num-cols', NUM_COLS);
        document.documentElement.style.setProperty('--num-rows', NUM_ROWS);
        for (let r = 0; r < NUM_ROWS; r++) {
            for (let c = 0; c < NUM_COLS; c++) {
                let cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                cellDiv.id = `cell-${r}-${c}`;
                gameGridElement.appendChild(cellDiv);
            }
        }
    }

    function updateGridUI() {
        if (!gameGridElement) return;
        try {
            for (let r = 0; r < NUM_ROWS; r++) {
                for (let c = 0; c < NUM_COLS; c++) {
                    let cellDiv = document.getElementById(`cell-${r}-${c}`);
                    if (!cellDiv) continue;
                    const tileData = grid[r]?.[c];
                    cellDiv.className = "cell";
                    cellDiv.textContent = "";
                    if (tileData) {
                        cellDiv.textContent = tileData.letter;
                        if (tileData.isWildcard) cellDiv.classList.add("wildcard");
                        if (tileData.clearing) cellDiv.classList.add("clearing");
                    }
                }
            }
            if (currentTile) {
                const { row, col, letter, isWildcard } = currentTile;
                if (row >= 0 && row < NUM_ROWS && col >= 0 && col < NUM_COLS) {
                    let cellDiv = document.getElementById(`cell-${row}-${col}`);
                    if (cellDiv && !grid[row]?.[col]) {
                        cellDiv.textContent = letter;
                        cellDiv.classList.add("falling");
                        if (isWildcard) cellDiv.classList.add("wildcard");
                    }
                }
            }
        } catch(error) {
            console.error("Error in updateGridUI:", error);
        }
    }

    function updateNextPreview() {
        if (!nextTilesElement) return;
        nextTilesElement.innerHTML = "";
        nextTiles.forEach(tile => {
            const previewDiv = document.createElement("div");
            previewDiv.className = "preview-tile";
            previewDiv.textContent = tile.letter;
            if (tile.isWildcard) previewDiv.classList.add("wildcard");
            nextTilesElement.appendChild(previewDiv);
        });
    }

    function updateScoreUI() {
        if (scoreDisplayElement) {
            scoreDisplayElement.textContent = `Score: ${score}`;
        }
    }

    function calculateAndSetCellSize() {
        if (!topBarElement || !gameContainerElement) {
            topBarElement = document.getElementById('top-bar');
            gameContainerElement = document.getElementById('game-container');
            if (!topBarElement || !gameContainerElement) {
                console.warn("Cannot calculate cell size: topBar or gameContainer not found.");
                document.documentElement.style.setProperty('--cell-size', `${MIN_CELL_SIZE}px`);
                return;
            }
        }
        const isGameContainerVisible = gameContainerElement.classList.contains('visible') || parseFloat(window.getComputedStyle(gameContainerElement).opacity) > 0;
        if (!isGameContainerVisible || gameContainerElement.offsetHeight === 0) {
            const currentSize = getComputedStyle(document.documentElement).getPropertyValue('--cell-size');
            if (!currentSize || parseFloat(currentSize) < MIN_CELL_SIZE) {
                document.documentElement.style.setProperty('--cell-size', `${MIN_CELL_SIZE}px`);
            }
            return;
        }
        const topBarHeight = topBarElement.offsetHeight;
        const viewportHeight = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vh')) * 100) || window.innerHeight;
        const viewportWidth = document.documentElement.clientWidth;
        const styles = getComputedStyle(document.documentElement);
        const containerPadding = parseFloat(styles.getPropertyValue('--container-padding')) || CONTAINER_PADDING;
        const gridGap = parseFloat(styles.getPropertyValue('--grid-gap')) || GRID_GAP;
        const panelGap = parseFloat(styles.getPropertyValue('--panel-gap')) || PANEL_GAP;
        const containerGap = parseFloat(styles.getPropertyValue('--container-gap')) || CONTAINER_GAP;
        const availableHeight = viewportHeight - topBarHeight - (containerPadding * 2);
        const availableWidth = viewportWidth - (containerPadding * 2);
        let effectiveGridAvailableWidth = availableWidth;
        if (viewportWidth >= 1024) {
            effectiveGridAvailableWidth -= (MIN_CELL_SIZE * 1.5 + containerGap);
        }
        const cellWidthFromWidth = (effectiveGridAvailableWidth - (gridGap * (NUM_COLS + 1))) / NUM_COLS;
        const cellHeightFromHeight = (availableHeight - panelGap - (gridGap * (NUM_ROWS + 1))) / (NUM_ROWS + 1.5);
        let calculatedCellSize = Math.floor(Math.min(cellWidthFromWidth, cellHeightFromHeight));
        if (isNaN(calculatedCellSize) || calculatedCellSize < MIN_CELL_SIZE) {
            calculatedCellSize = MIN_CELL_SIZE;
        }
        document.documentElement.style.setProperty('--cell-size', `${calculatedCellSize}px`);
        document.documentElement.style.setProperty('--top-bar-height', `${topBarHeight}px`);
    }

    // ====================================================
    //          TILE MOVEMENT & PLACEMENT
    // ====================================================

    function isValidPosition(row, col) {
        const rowInBounds = row >= 0 && row < NUM_ROWS;
        const colInBounds = col >= 0 && col < NUM_COLS;
        const isEmpty = grid && grid[row] && !grid[row][col];
        return rowInBounds && colInBounds && isEmpty;
    }

    function moveTileDown() {
        if (!currentTile || gameOverFlag || isTutorialPaused) return;
        if (isValidPosition(currentTile.row + 1, currentTile.col)) {
            currentTile.row++;
            updateGridUI();
        } else {
            landTile();
        }
    }

    function moveTileHorizontally(delta) {
        if (!currentTile || gameOverFlag) return;
        if (currentTutorialStep === TUTORIAL_STEP.SHOW_DROP ||
            currentTutorialStep === TUTORIAL_STEP.SHOW_WILDCARD ||
            currentTutorialStep === TUTORIAL_STEP.SHOW_NEXT_PREVIEW_TIP) {
            return;
        }
        const newCol = currentTile.col + delta;
        if (isValidPosition(currentTile.row, newCol)) {
            currentTile.col = newCol;
            updateGridUI();
        }
    }

    function manualDrop() {
        if (!currentTile || gameOverFlag || !canManualDrop) return;
        if (isTutorialPaused && currentTutorialStep !== TUTORIAL_STEP.AWAIT_MOVE) { return; }
        if (currentTutorialStep === TUTORIAL_STEP.AWAIT_MOVE && !awaitingEarlyDropMessage) { return; }

        canManualDrop = false;
        setTimeout(() => { canManualDrop = true; }, MANUAL_DROP_COOLDOWN);
        autoDropping = false;

        function step() {
            if (isTutorialPaused || !currentTile) { autoDropping = !isTutorialPaused; return; }
            if (isValidPosition(currentTile.row + 1, currentTile.col)) {
                currentTile.row++;
                updateGridUI();
                setTimeout(step, MANUAL_DROP_VISUAL_DELAY);
            } else {
                landTile();
            }
        }
        step();
    }

    function landTile() {
        if (!currentTile) return;

        if (grid && grid[currentTile.row] && currentTile.row >= 0 && currentTile.row < NUM_ROWS && currentTile.col >= 0 && currentTile.col < NUM_COLS) {
            grid[currentTile.row][currentTile.col] = {
                letter: currentTile.letter,
                isWildcard: currentTile.isWildcard,
                clearing: false
            };
        } else {
            console.error("Tile landed outside grid bounds or grid invalid:", currentTile, grid);
            showGameOver("Internal Error");
            return;
        }

        currentTile = null;
        updateGridUI();

        if (needsTutorial && currentTutorialStep !== TUTORIAL_STEP.COMPLETE) {
            if (!tutorialFirstTileHasLanded) {
                tutorialFirstTileHasLanded = true;
                console.log("Tutorial: First tile has landed.");
            }
            if (awaitingEarlyDropMessage) {
                console.log("Tutorial: Handling early drop message.");
                awaitingEarlyDropMessage = false;
                startTutorialStep(TUTORIAL_STEP.SHOW_EARLY_DROP);
                return;
            }
            if (tutorialFirstTileHasLanded && !tutorialNextPreviewTipShown) {
                console.log("Tutorial: Conditions met to show next preview tip.");
                startTutorialStep(TUTORIAL_STEP.SHOW_NEXT_PREVIEW_TIP);
                return;
            }
        }

        const clearedRowCount = checkForWords();
        if (!gameOverFlag && clearedRowCount === 0 && !isTutorialPaused && currentTutorialStep !== TUTORIAL_STEP.SHOW_FIRST_WORD_TIP) {
            spawnTile();
        }
        accumulatedTime = 0;
        autoDropping = !isTutorialPaused;
    }

    // ====================================================
    //          WORD CHECKING & CLEARING
    // ====================================================

    function checkForWords() {
        if (typeof validWords4 === 'undefined' || !Array.isArray(validWords4)) { console.error("Word list 'validWords4' is missing or invalid."); return 0; }
        if (!grid) { console.error("Grid data is missing."); return 0; }
        const wordList = validWords4;
        let rowsToClear = [];
        let verticalWordsToClear = []; // Track vertical words: [{col, startRow, endRow, word}]

        // --- HORIZONTAL CHECK (existing logic) ---
        for (let r = NUM_ROWS - 1; r >= 0; r--) {
            let rowString = "";
            let isFullRow = true;
            let potentialTiles = [];
            for (let c = 0; c < NUM_COLS; c++) {
                const tile = grid[r]?.[c];
                if (!tile || tile.clearing) {
                    isFullRow = false;
                    break;
                }
                potentialTiles.push({ r: r, c: c, ...tile });
                rowString += tile.isWildcard ? "?" : tile.letter;
            }
            if (isFullRow) {
                const pattern = rowString.replace(/\?/g, "[A-Z]");
                const regex = new RegExp("^" + pattern + "$", "i");
                const matchedWord = wordList.find(word => regex.test(word.toUpperCase()));
                if (matchedWord) {
                    console.log(`Horizontal word found: ${matchedWord} in row ${r}`);
                    rowsToClear.push(r);
                    potentialTiles.forEach(tileInfo => {
                        if (grid[tileInfo.r]?.[tileInfo.c]) {
                            grid[tileInfo.r][tileInfo.c].clearing = true;
                            if (grid[tileInfo.r][tileInfo.c].isWildcard) {
                                grid[tileInfo.r][tileInfo.c].letter = matchedWord[tileInfo.c].toUpperCase();
                                grid[tileInfo.r][tileInfo.c].isWildcard = false;
                            }
                        }
                    });
                }
            }
        }

        // --- VERTICAL CHECK (new logic) ---
        for (let c = 0; c < NUM_COLS; c++) {
            // Check all possible 4-cell vertical sequences in this column
            for (let startRow = 0; startRow <= NUM_ROWS - 4; startRow++) {
                let colString = "";
                let isValidSequence = true;
                let potentialTiles = [];

                for (let r = startRow; r < startRow + 4; r++) {
                    const tile = grid[r]?.[c];
                    if (!tile || tile.clearing) {
                        isValidSequence = false;
                        break;
                    }
                    potentialTiles.push({ r: r, c: c, ...tile });
                    colString += tile.isWildcard ? "?" : tile.letter;
                }

                if (isValidSequence) {
                    const pattern = colString.replace(/\?/g, "[A-Z]");
                    const regex = new RegExp("^" + pattern + "$", "i");
                    const matchedWord = wordList.find(word => regex.test(word.toUpperCase()));
                    if (matchedWord) {
                        console.log(`Vertical word found: ${matchedWord} in column ${c}, rows ${startRow}-${startRow + 3}`);
                        verticalWordsToClear.push({ col: c, startRow: startRow, endRow: startRow + 3 });
                        potentialTiles.forEach((tileInfo, idx) => {
                            if (grid[tileInfo.r]?.[tileInfo.c]) {
                                grid[tileInfo.r][tileInfo.c].clearing = true;
                                if (grid[tileInfo.r][tileInfo.c].isWildcard) {
                                    grid[tileInfo.r][tileInfo.c].letter = matchedWord[idx].toUpperCase();
                                    grid[tileInfo.r][tileInfo.c].isWildcard = false;
                                }
                            }
                        });
                    }
                }
            }
        }

        const totalWordsCleared = rowsToClear.length + verticalWordsToClear.length;
        if (totalWordsCleared > 0) {
            updateGridUI();
            setTimeout(() => removeClearedCellsAndShift(rowsToClear, verticalWordsToClear), WORD_CLEAR_DELAY);
            return totalWordsCleared;
        }
        return 0;
    }

    // Legacy function kept for reference - now using removeClearedCellsAndShift
    function removeClearedRowsAndShift(rowsToRemove) {
        // Redirect to new unified function (horizontal only)
        removeClearedCellsAndShift(rowsToRemove, []);
    }

    // New unified function handling both horizontal rows and vertical words
    function removeClearedCellsAndShift(rowsToClear, verticalWordsToClear) {
        if (gameOverFlag || !grid) return;

        // Calculate score: each word (horizontal or vertical) counts as 1 for multiplier
        const totalWordsCleared = rowsToClear.length + verticalWordsToClear.length;
        let scoreMultiplier = totalWordsCleared;
        score += 10 * scoreMultiplier * scoreMultiplier;
        updateScoreUI();

        // Speed increase for daily challenge (count total words cleared)
        if (currentGameMode === GAME_MODE.DAILY_CHALLENGE) {
            rowsClearedSinceSpeedIncrease += totalWordsCleared;
            if (rowsClearedSinceSpeedIncrease >= SPEED_INCREASE_ROW_COUNT) {
                increaseSpeed();
                rowsClearedSinceSpeedIncrease = 0;
            }
        }

        // Build a new grid by processing each column independently
        // This handles both horizontal (full row) and vertical (column segment) clears
        let newGrid = Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(null));

        for (let c = 0; c < NUM_COLS; c++) {
            // Collect all non-clearing tiles in this column (from bottom to top)
            let columnTiles = [];
            for (let r = NUM_ROWS - 1; r >= 0; r--) {
                const tile = grid[r]?.[c];
                if (tile && !tile.clearing) {
                    tile.clearing = false; // Reset clearing flag
                    columnTiles.push(tile);
                }
            }

            // Place tiles at the bottom of the column in new grid
            let newRow = NUM_ROWS - 1;
            for (let i = 0; i < columnTiles.length; i++) {
                newGrid[newRow][c] = columnTiles[i];
                newRow--;
            }
        }

        grid = newGrid;
        updateGridUI();

        // Tutorial handling
        let tutorialTipTriggered = false;
        if (needsTutorial && currentTutorialStep !== TUTORIAL_STEP.COMPLETE && !tutorialFirstWordFormed) {
            tutorialFirstWordFormed = true;
            startTutorialStep(TUTORIAL_STEP.SHOW_FIRST_WORD_TIP);
            tutorialTipTriggered = true;
        }

        // Check for chain reactions
        let chainClearedCount = 0;
        if (!tutorialTipTriggered) {
            chainClearedCount = checkForWords();
        }

        // Spawn next tile if needed
        if (!gameOverFlag && !currentTile && chainClearedCount === 0 && !isTutorialPaused && !tutorialTipTriggered) {
            spawnTile();
        }
    }

    function increaseSpeed() {
        if (currentGameMode !== GAME_MODE.DAILY_CHALLENGE) return;
        if (dropInterval > SPEED_CHALLENGE_MIN_INTERVAL) {
            dropInterval -= SPEED_CHALLENGE_INTERVAL_DECREMENT;
            dropInterval = Math.max(dropInterval, SPEED_CHALLENGE_MIN_INTERVAL);
            console.log(`Speed increased! New interval: ${dropInterval}ms`);
        } else {
            console.log("Max speed reached!");
        }
        accumulatedTime = 0;
    }

    // ====================================================
    //          GAME LOOP (requestAnimationFrame)
    // ====================================================

    let gameLoopRequestId = null;
    gameLoop.isRunning = false;

    function startGameLoop() {
        if (gameOverFlag || gameLoop.isRunning || isTutorialPaused) { return; }
        console.log("Starting game loop");
        lastTime = null;
        accumulatedTime = 0;
        autoDropping = !isTutorialPaused;
        gameLoop.isRunning = true;
        gameLoopRequestId = requestAnimationFrame(gameLoop);
    }

    function gameLoop(timestamp) {
        if (gameOverFlag) {
            gameLoop.isRunning = false;
            gameLoopRequestId = null;
            return;
        }
        if (isTutorialPaused) {
            lastTime = timestamp;
            gameLoopRequestId = requestAnimationFrame(gameLoop);
            return;
        }
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        if (currentTile && autoDropping) {
            accumulatedTime += deltaTime;
            if (accumulatedTime >= dropInterval) {
                moveTileDown();
                accumulatedTime %= dropInterval;
            }
        }
        if (!gameOverFlag) {
            gameLoopRequestId = requestAnimationFrame(gameLoop);
        } else {
            gameLoop.isRunning = false;
            gameLoopRequestId = null;
        }
    }

    function stopGameLoop() {
        if (gameLoopRequestId) {
            cancelAnimationFrame(gameLoopRequestId);
            gameLoopRequestId = null;
        }
        gameLoop.isRunning = false;
        console.log("Game loop stopped.");
    }

    // ====================================================
    //              GAME OVER & RESULTS
    // ====================================================

    // Helper function to select a random comment from an array
    function selectRandomComment(commentArray) {
        if (!commentArray || commentArray.length === 0) {
            // Fallback to a very generic comment if the provided array is empty
            return fallbackComments[Math.floor(Math.random() * fallbackComments.length)];
        }
        return commentArray[Math.floor(Math.random() * commentArray.length)];
    }

    function showGameOver(reason = "Grid Filled") {
        if (gameOverFlag) return;
        console.log(`Game Over triggered. Reason: ${reason}`);
        gameOverFlag = true;
        autoDropping = false;
        stopGameLoop();
        stopPracticeTimer();
        hideTutorialElements();
        submitScoreToDatabase(); // Submit score to Supabase
        let streakMessage = "";

        if (currentGameMode === GAME_MODE.DAILY_CHALLENGE) {
            streakMessage = updateDailyStreak();
            updateDailyChallengeButtonUI(); // Update landing page button state for next time
        }

        if (currentTile) {
            const { row, col } = currentTile;
            if (grid && grid[row] && row >= 0 && row < NUM_ROWS && col >= 0 && col < NUM_COLS) {
                let cellDiv = document.getElementById(`cell-${row}-${col}`);
                if (cellDiv && !grid[row]?.[col]) {
                    cellDiv.classList.remove('falling', 'wildcard');
                    cellDiv.textContent = '';
                }
            }
            currentTile = null;
        }
        updateGridUI();

        let encouragingComment = ""; // Initialize new comment variable
        let isSpecialCommentSet = false; // Flag for high-priority comments
        let showShare = false;
        let sharePromptText = "Can your friends beat this? Share below!";

        // Hide all conditional elements initially
        if (dailyScoreDisplayElement) dailyScoreDisplayElement.style.display = 'none';
        if (practiceScoreDisplayElement) practiceScoreDisplayElement.style.display = 'none';
        if (dailyStreakResultElement) dailyStreakResultElement.style.display = 'none';
        if (dailyResultsElement) dailyResultsElement.style.display = 'none';
        if (practiceResultsElement) practiceResultsElement.style.display = 'none';
        if (sharePanelElement) sharePanelElement.style.display = 'none';
        if (sharePromptElement) sharePromptElement.style.display = 'none';
        if (playAgainPracticeBtn) playAgainPracticeBtn.style.display = 'none';
        if (goToPracticeModeBtn) goToPracticeModeBtn.style.display = 'none';
        if (dailyPlaysRemainingMessageElement) dailyPlaysRemainingMessageElement.style.display = 'none';

        if (currentGameMode === GAME_MODE.DAILY_CHALLENGE) {
            if (dailyScoreValueElement) dailyScoreValueElement.textContent = score;
            if (dailyScoreDisplayElement) dailyScoreDisplayElement.style.display = 'block';
            
            const previousDailyHighScore = dailyLeaderboard.length > 0 ? dailyLeaderboard[0].score : 0;
            dailyLeaderboard = updateLeaderboard(DAILY_LEADERBOARD_KEY, score); // Update leaderboard
            displayLeaderboard(dailyLeaderboardDisplayElement, dailyLeaderboard, LEADERBOARD_DISPLAY_COUNT);
            if (dailyResultsElement) dailyResultsElement.style.display = 'block';

            if (dailyStreakResultElement && streakMessage) {
                dailyStreakResultElement.innerHTML = streakMessage; // Display factual streak info
                dailyStreakResultElement.style.display = 'block';
            }
            
            // Check for new Daily High Score (and score is not 0, unless it's the very first score ever)
            if (score > 0 && dailyLeaderboard.length > 0 && score === dailyLeaderboard[0].score && score > previousDailyHighScore) {
                encouragingComment = selectRandomComment(newHighScoreComments);
                isSpecialCommentSet = true;
            } else if (score > 0 && dailyLeaderboard.length === 1 && score === dailyLeaderboard[0].score) { // First ever score is a high score
                encouragingComment = selectRandomComment(newHighScoreComments);
                isSpecialCommentSet = true;
            }

            showShare = true; // Always show share for daily challenge results

            const playsLeft = MAX_DAILY_CHALLENGE_PLAYS - dailyChallengePlaysToday;
            if (dailyPlaysRemainingMessageElement) {
                if (playsLeft > 0) {
                    dailyPlaysRemainingMessageElement.innerHTML = `<strong>You have ${playsLeft} daily play${playsLeft === 1 ? '' : 's'} remaining.</strong>`;
                } else {
                    dailyPlaysRemainingMessageElement.innerHTML = "<strong>No daily plays left. Try Practice Mode!</strong>";
                }
                dailyPlaysRemainingMessageElement.style.display = 'block';
            }

            if (dailyChallengePlaysToday >= MAX_DAILY_CHALLENGE_PLAYS) {
                if (goToPracticeModeBtn) {
                    goToPracticeModeBtn.style.display = 'block';
                    goToPracticeModeBtn.classList.remove('btn-secondary');
                    goToPracticeModeBtn.classList.add('btn-primary');
                }
            } else {
                if (playAgainPracticeBtn) playAgainPracticeBtn.style.display = 'block';
            }

        } else { // Practice Mode
            if (practiceScoreValueElement) practiceScoreValueElement.textContent = score;
            if (practiceScoreDisplayElement) practiceScoreDisplayElement.style.display = 'block';

            const previousPracticeHighScore = practiceLeaderboard.length > 0 ? practiceLeaderboard[0].score : 0;
            practiceLeaderboard = updateLeaderboard(PRACTICE_LEADERBOARD_KEY, score); // Update before checking
            displayLeaderboard(practiceLeaderboardDisplayElement, practiceLeaderboard, LEADERBOARD_DISPLAY_COUNT);
            if (practiceResultsElement) practiceResultsElement.style.display = 'block';
            
            if (score > 0 && practiceLeaderboard.length > 0 && score === practiceLeaderboard[0].score && score > previousPracticeHighScore) {
                encouragingComment = selectRandomComment(newHighScoreComments);
                isSpecialCommentSet = true;
                showShare = true; 
            } else if (score > 0 && practiceLeaderboard.length === 1 && score === practiceLeaderboard[0].score) { // First ever score
                 encouragingComment = selectRandomComment(newHighScoreComments);
                 isSpecialCommentSet = true;
                 showShare = true;
            } else {
                showShare = false;
            }

            const practiceBestScore = practiceLeaderboard.length > 0 ? practiceLeaderboard[0].score : 0;
            if (practiceHighScoreElement) {
                practiceHighScoreElement.textContent = `Best: ${practiceBestScore}`;
                practiceHighScoreElement.style.display = 'block';
            }
            if (playAgainPracticeBtn) playAgainPracticeBtn.style.display = 'block';
        }

        // If no special high score comment was set, use score bracket logic
        if (!isSpecialCommentSet) {
            if (score === 0) {
                encouragingComment = selectRandomComment(commentsForZeroScore);
            } else if (score < 50) {
                encouragingComment = selectRandomComment(commentsForScoreUnder50);
            } else if (score < 100) {
                encouragingComment = selectRandomComment(commentsForScore50to99);
            } else if (score < 150) {
                encouragingComment = selectRandomComment(commentsForScore100to149);
            } else { // score >= 150
                encouragingComment = selectRandomComment(commentsForScore150plus);
            }
        }
        
        if (encouragingCommentElement) encouragingCommentElement.textContent = encouragingComment;

        if (showShare) {
            if (sharePromptElement) { sharePromptElement.textContent = sharePromptText; sharePromptElement.style.display = 'block'; }
            if (sharePanelElement) sharePanelElement.style.display = 'flex';
        } else {
            if (sharePromptElement) sharePromptElement.style.display = 'none';
            if (sharePanelElement) sharePanelElement.style.display = 'none';
        }

        if (backToHomeBtn) backToHomeBtn.style.display = 'block';
        if (gameOverOverlayElement) gameOverOverlayElement.classList.add('visible'); else console.error("Game over overlay element not found!");
        console.log("Game Over screen displayed.");
    }


    // ====================================================
    //              SHARING & UTILITIES
    // ====================================================

    function getShareText() {
        let text = "";
        const domain = "quadro.club"; // TODO: Replace with your actual domain
        const url = `https://${domain}`;
        switch(currentGameMode) {
            case GAME_MODE.DAILY_CHALLENGE:
                const streakText = currentStreak > 0 ? ` with a ${currentStreak}-day streak` : '';
                // Using generic hashtags as game name might change
                text = `I scored ${score} in today's Daily Challenge${streakText}! Think you can beat it? Play now: ${url} #DailyChallenge #WordGame`;
                break;
            default: // Practice Mode
                const practiceHighScoreVal = practiceLeaderboard.length > 0 ? practiceLeaderboard[0].score : 0;
                if (score === practiceHighScoreVal && score > 0) {
                    text = `New High Score! I scored ${score} in Practice Mode! ${url} #HighScore #WordPuzzle`;
                } else {
                    text = `I scored ${score} in Practice! Check out this fun word puzzle game: ${url} #PuzzleGame #WordFun`;
                }
                break;
        }
        return text;
    }

    function shareOnTwitter() { const text = encodeURIComponent(getShareText()); window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener,noreferrer'); }
    function shareOnWhatsApp() { const text = encodeURIComponent(getShareText()); window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer'); }
    function shareOnFacebook() { const domain = "quadro.club"; const url = `https://${domain}`; const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(getShareText())}`; window.open(fbShareUrl, '_blank', 'noopener,noreferrer'); }
    function copyShareCaption() {
        const caption = getShareText();
        copyToClipboard(caption)
            .then(() => {
                if (shareCopyBtn) {
                    const originalHTML = shareCopyBtn.innerHTML;
                    shareCopyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.5 1.5a.5.5 0 0 1 .5.5v11.5a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5z"/><path d="M11.354 1.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 3.793l2.646-2.647a.5.5 0 0 1 .708 0z"/></svg> Copied!`;
                    shareCopyBtn.disabled = true;
                    setTimeout(() => {
                        if (shareCopyBtn) {
                            shareCopyBtn.innerHTML = originalHTML;
                            shareCopyBtn.disabled = false;
                        }
                    }, 1500);
                }
            })
            .catch(err => {
                console.error('Failed to copy caption: ', err);
                if (shareCopyBtn) {
                    const originalHTML = shareCopyBtn.innerHTML;
                    shareCopyBtn.innerHTML = "Error";
                    shareCopyBtn.disabled = true;
                    setTimeout(() => {
                        if (shareCopyBtn) {
                            shareCopyBtn.innerHTML = originalHTML;
                            shareCopyBtn.disabled = false;
                        }
                    }, 1500);
                }
            });
    }
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            console.warn('Clipboard API not available, using fallback (may not work).');
            return new Promise((resolve, reject) => {
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    textArea.style.position = 'fixed'; textArea.style.left = '-9999px'; textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    const successful = document.execCommand('copy');
                    document.body.removeChild(textArea);
                    if (successful) { resolve(); } else { reject(new Error('Fallback copy command failed')); }
                } catch (err) { reject(err); }
            });
        }
    }

    // ====================================================
    //          INTERACTIVE TUTORIAL FUNCTIONS
    // ====================================================

    function highlightNextPreview(shouldHighlight) {
        if (nextPreviewElement) {
            if (shouldHighlight) {
                nextPreviewElement.classList.add('tutorial-highlight-next-preview');
            } else {
                nextPreviewElement.classList.remove('tutorial-highlight-next-preview');
            }
        } else {
            console.warn("Next preview element not found for highlighting.");
        }
    }


    function startTutorialStep(step) {
        if (!tutorialOverlayElement || !tutorialMessageBoxElement || !tutorialStepTitleElement || !tutorialMessageTextElement || !tutorialContinueBtnElement) {
            console.error("Cannot start tutorial step - essential elements missing!");
            completeTutorial();
            return;
        }

        currentTutorialStep = step;
        isTutorialPaused = true;
        hideControlsHighlight();
        highlightNextPreview(false);

        let message = ""; let title = ""; let showContinueButton = true;

        switch (step) {
            case TUTORIAL_STEP.SHOW_GOAL:
                // HTML for the example grid.
                const exampleGridHTML = `
                    <div class="step-preview">
                        <!-- 1. The static background grid -->
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>

                        <!-- 2. The animated tiles -->
                        <div class="anim-tile w">W</div>
                        <div class="anim-tile o">O</div>
                        <div class="anim-tile r">R</div>
                        <div class="anim-tile d">D</div>
                    </div>
                `;

                if (currentGameMode === GAME_MODE.DAILY_CHALLENGE) {
                    title = "Hi! 👋 Welcome to the Daily Challenge";
                    message = `Make <strong>4-letter words</strong> to clear the row, just like this: <br>${exampleGridHTML}<br>Unused letters will stack up. Don't let the grid fill to the top!`;
                } else { // Assuming GAME_MODE.PRACTICE
                    title = "Hi! 👋 Welcome to Practice Mode";
                    message = `Make <strong>4-letter words</strong> to clear the row, just like this: <br>${exampleGridHTML}<br>Unused letters will stack up. Don't let the grid fill to the top!`;
                }
                break;
            case TUTORIAL_STEP.SHOW_MOVE:
                title = "Step 1: Move the letter";
                message = "Use <strong>← →</strong> or tap the buttons. <br>The letter will fall to the bottom available row.";
                highlightControls(['btn-left', 'btn-right']);
                break;
            case TUTORIAL_STEP.SHOW_MOVE:
                title = "Step 1: Move the letter";
                message = "Use <strong>← →</strong> or tap the buttons. <br>The letter will fall to the bottom available row.";
                highlightControls(['btn-left', 'btn-right']);
                break;
            case TUTORIAL_STEP.AWAIT_MOVE:
                console.log("Entering AWAIT_MOVE step - waiting for user input.");
                isTutorialPaused = false;
                if (!gameOverFlag && !gameLoop.isRunning) { startGameLoop(); }
                return;
            case TUTORIAL_STEP.SHOW_DROP:
                title = "Step 2: Drop";
                message = "Now drop the letter to the bottom available row. Hit <strong>↓</strong> or <strong>Space</strong>.";
                highlightControls(['btn-down']);
                break;
            case TUTORIAL_STEP.SHOW_EARLY_DROP:
                title = "Quick Learner!";
                message = "Nice one. You dropped it early. Let's keep going.";
                break;
            case TUTORIAL_STEP.SHOW_NEXT_PREVIEW_TIP:
                title = "Next Up!";
                message = "This is the <strong>upcoming preview</strong>. It shows you the next letters that will appear.";
                highlightNextPreview(true);
                tutorialNextPreviewTipShown = true;
                break;
            case TUTORIAL_STEP.SHOW_WILDCARD:
                title = "Wildcard Tip";
                message = `This <strong>${WILDCARD_SYMBOL}</strong> is a wildcard! It works as <strong>any</strong> letter. Handy.`;
                break;
            case TUTORIAL_STEP.SHOW_FIRST_WORD_TIP:
                title = "First Word Cleared! 🎉";
                message = "You've got it now! But watch out: <strong>it gets faster!</strong>. <br><br> You get <strong>3 attempts</strong> daily. Good luck!";
                break;
            default:
                console.warn("Tried to start unknown tutorial step:", step);
                completeTutorial();
                return;
        }

        tutorialStepTitleElement.textContent = title;
        tutorialMessageTextElement.innerHTML = message;
        tutorialContinueBtnElement.style.display = showContinueButton ? 'inline-block' : 'none';
        if (tutorialOverlayElement) tutorialOverlayElement.classList.add('visible');
        if (tutorialMessageBoxElement) tutorialMessageBoxElement.classList.add('visible');
        if (gameLoop.isRunning) { console.log("Tutorial step started, game loop logic will pause."); }
    }

    function handleTutorialInput(inputKey) {
        if (isTutorialPaused) {
            if (inputKey === 'Enter') {
                handleTutorialDismiss();
                return true;
            }
            if (currentTutorialStep === TUTORIAL_STEP.SHOW_MOVE) {
                if (inputKey === 'ArrowLeft' || inputKey === 'a' || inputKey === 'A' || inputKey === 'btn-left') { moveTileHorizontally(-1); return true; }
                if (inputKey === 'ArrowRight' || inputKey === 'd' || inputKey === 'D' || inputKey === 'btn-right') { moveTileHorizontally(1); return true; }
                if (inputKey === ' ' || inputKey === 'ArrowDown' || inputKey === 's' || inputKey === 'S' || inputKey === 'btn-down') { if(canManualDrop) manualDrop(); return true; }
            } else if (currentTutorialStep === TUTORIAL_STEP.SHOW_DROP) {
                if (inputKey === ' ' || inputKey === 'ArrowDown' || inputKey === 's' || inputKey === 'S' || inputKey === 'btn-down') { if(canManualDrop) manualDrop(); return true; }
            }
            return false;
        }

        if (currentTutorialStep === TUTORIAL_STEP.AWAIT_MOVE) {
            let actionTaken = false;
            if (inputKey === 'ArrowLeft' || inputKey === 'a' || inputKey === 'A' || inputKey === 'btn-left') {
                moveTileHorizontally(-1);
                tutorialMoveCount++;
                actionTaken = true;
            } else if (inputKey === 'ArrowRight' || inputKey === 'd' || inputKey === 'D' || inputKey === 'btn-right') {
                moveTileHorizontally(1);
                tutorialMoveCount++;
                actionTaken = true;
            }
            else if (inputKey === ' ' || inputKey === 'ArrowDown' || inputKey === 's' || inputKey === 'S' || inputKey === 'btn-down') {
                awaitingEarlyDropMessage = true;
                if (canManualDrop) { manualDrop(); }
                return true;
            }
            if (actionTaken && tutorialMoveCount >= 3) {
                awaitingEarlyDropMessage = false;
                startTutorialStep(TUTORIAL_STEP.SHOW_DROP);
            }
            return actionTaken;
        }
        return false;
    }

    function resumeGameAfterTutorialStep() {
        isTutorialPaused = false;
        hideTutorialElements();
        hideControlsHighlight();
        highlightNextPreview(false);
        if (!gameOverFlag && !gameLoop.isRunning) {
            console.log("Resuming game loop after tutorial step.");
            startGameLoop();
        }
        autoDropping = !isTutorialPaused;
    }

    function completeTutorial() {
        if (currentTutorialStep === TUTORIAL_STEP.COMPLETE && !needsTutorial) { return; }
        console.log("Completing tutorial sequence permanently.");
        needsTutorial = false;
        currentTutorialStep = TUTORIAL_STEP.COMPLETE;
        try {
            localStorage.setItem("hasCompletedTutorial", "true");
        } catch (e) { console.warn("Could not save tutorial completion status to localStorage:", e); }
        if (isTutorialPaused) {
            resumeGameAfterTutorialStep();
        } else if (!gameOverFlag && !gameLoop.isRunning) {
            startGameLoop();
        }
    }

    function hideTutorialElements() {
        if (tutorialOverlayElement) tutorialOverlayElement.classList.remove('visible');
        if (tutorialMessageBoxElement) tutorialMessageBoxElement.classList.remove('visible');
    }

    function highlightControls(buttonIds) {
        buttonIds.forEach(id => {
            const button = document.getElementById(id);
            if (button) {
                button.classList.add('tutorial-highlight');
            } else { console.warn(`Button with ID ${id} not found for highlighting.`); }
        });
    }

    function hideControlsHighlight() {
        document.querySelectorAll('.control-btn.tutorial-highlight').forEach(button => {
            button.classList.remove('tutorial-highlight');
        });
    }

    // ====================================================
    //              DAILY STREAK FUNCTIONS
    // ====================================================

    function getUTCDateString(date = new Date()) {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function loadStreakData() {
        try {
            const storedStreak = localStorage.getItem(STREAK_COUNT_KEY);
            const storedDate = localStorage.getItem(LAST_COMPLETED_DATE_KEY);
            currentStreak = storedStreak ? parseInt(storedStreak, 10) : 0;
            lastCompletedDailyUTCString = storedDate || '';
            if (lastCompletedDailyUTCString) {
                const todayUTC = getUTCDateString();
                const yesterdayDate = new Date();
                yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
                const yesterdayUTC = getUTCDateString(yesterdayDate);
                if (lastCompletedDailyUTCString !== todayUTC && lastCompletedDailyUTCString !== yesterdayUTC) {
                    console.log(`Streak reset detected. Last played: ${lastCompletedDailyUTCString}, Today: ${todayUTC}`);
                    currentStreak = 0;
                }
            }
            console.log(`Loaded streak data - Count: ${currentStreak}, Last Date: ${lastCompletedDailyUTCString || 'None'}`);
        } catch (e) {
            console.warn("Could not load streak data from localStorage:", e);
            currentStreak = 0;
            lastCompletedDailyUTCString = '';
        }
    }

    function saveStreakData() {
        try {
            localStorage.setItem(STREAK_COUNT_KEY, String(currentStreak));
            localStorage.setItem(LAST_COMPLETED_DATE_KEY, lastCompletedDailyUTCString);
            console.log(`Saved streak data - Count: ${currentStreak}, Last Date: ${lastCompletedDailyUTCString}`);
        } catch (e) {
            console.warn("Could not save streak data to localStorage:", e);
        }
    }

    function updateDailyStreak() {
        const todayUTC = getUTCDateString();
        let message = "";
        loadStreakData(); // Ensure currentStreak and lastCompletedDailyUTCString are up-to-date
        if (lastCompletedDailyUTCString === todayUTC) {
            console.log("Daily challenge already completed today. Streak maintained.");
            if (currentStreak > 0) {
                message = `🔥 ${currentStreak} Day Streak Maintained!`;
            } else {
                message = "Challenge Complete!"; // Should not happen if streak logic is correct, but a fallback.
            }
        } else {
            const yesterdayDate = new Date();
            yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
            const yesterdayUTC = getUTCDateString(yesterdayDate);

            if (lastCompletedDailyUTCString === yesterdayUTC) {
                currentStreak++;
                lastCompletedDailyUTCString = todayUTC;
                message = `Streak Extended! 🔥 ${currentStreak} Days!`;
                console.log(`Streak extended to ${currentStreak} days.`);
            } else {
                // Streak was broken or it's the very first play
                currentStreak = 1; // Start a new streak
                lastCompletedDailyUTCString = todayUTC;
                message = "New Streak Started! 🔥 1 Day";
                console.log("Streak reset or started. Current streak: 1 day.");
            }
            saveStreakData();
        }
        return message;
    }

    function updateStreakDisplay() {
        loadStreakData(); // Ensure streak data is current
        // dailyChallengePlaysToday is already updated by showLandingPage() before this is called

        if (landingStreakDisplayElement) {
            if (dailyChallengePlaysToday >= MAX_DAILY_CHALLENGE_PLAYS) {
                // All daily attempts used - Restructure the message
                let streakText = "";
                if (currentStreak > 0) {
                    streakText = `<div style="font-size: 1.5em; margin-bottom: 10px;">🔥 ${currentStreak} Day Streak!</div>`; // Focal point
                } else {
                    streakText = `<div style="font-size: 1.5em; margin-bottom: 10px;">Daily plays used.</div>`; // Focal point if no streak
                }
                const comeBackMessage = `<div class="streak-comeback-message" style="margin-bottom: 10px;">Come back tomorrow to keep your streak going!</div>`;
                const practiceSuggestion = `<div class="streak-practice-suggestion"></div>`; //left message empty for now 

                landingStreakDisplayElement.innerHTML = streakText + comeBackMessage + practiceSuggestion;
                landingStreakDisplayElement.style.display = 'block';
                landingStreakDisplayElement.style.textAlign = 'center'; // Ensure centering
            } else {
                // Daily attempts still available or not applicable (e.g., first load)
                const streakText = currentStreak > 0 ? `🔥 ${currentStreak} Day Streak!` : '';
                if (currentStreak > 0) {
                    landingStreakDisplayElement.innerHTML = streakText;
                    landingStreakDisplayElement.style.display = 'block';
                    landingStreakDisplayElement.style.textAlign = ''; // Reset alignment if needed
                } else {
                    landingStreakDisplayElement.innerHTML = ''; // Clear content
                    landingStreakDisplayElement.style.display = 'none';
                }
            }
        } else { console.warn("Landing streak display element not found."); }
    }

    // --- NEW: Daily Challenge Play Limit Functions ---
    function loadDailyChallengePlayData() {
        try {
            const storedPlays = localStorage.getItem(DAILY_CHALLENGE_PLAYS_KEY);
            const storedDate = localStorage.getItem(DAILY_CHALLENGE_LAST_PLAY_DATE_KEY);

            dailyChallengePlaysToday = storedPlays ? parseInt(storedPlays, 10) : 0;
            dailyChallengeLastPlayDateUTC = storedDate || '';

            const todayUTC = getUTCDateString();

            if (dailyChallengeLastPlayDateUTC !== todayUTC) {
                console.log(`New day detected for Daily Challenge plays. Last play date: ${dailyChallengeLastPlayDateUTC}, Today: ${todayUTC}. Resetting plays.`);
                dailyChallengePlaysToday = 0;
                dailyChallengeLastPlayDateUTC = todayUTC; // Set to today
                saveDailyChallengePlayData(); // Save the reset state for the new day
            }
            if (isNaN(dailyChallengePlaysToday)) { // Ensure it's a number
                dailyChallengePlaysToday = 0;
            }
            console.log(`Loaded Daily Challenge plays - Count: ${dailyChallengePlaysToday}, Last Play Date: ${dailyChallengeLastPlayDateUTC || 'None'}`);
        } catch (e) {
            console.warn("Could not load Daily Challenge play data from localStorage:", e);
            dailyChallengePlaysToday = 0;
            dailyChallengeLastPlayDateUTC = getUTCDateString(); // Default to today if error
        }
    }

    function saveDailyChallengePlayData() {
        try {
            localStorage.setItem(DAILY_CHALLENGE_PLAYS_KEY, String(dailyChallengePlaysToday));
            localStorage.setItem(DAILY_CHALLENGE_LAST_PLAY_DATE_KEY, dailyChallengeLastPlayDateUTC);
            console.log(`Saved Daily Challenge plays - Count: ${dailyChallengePlaysToday}, Date: ${dailyChallengeLastPlayDateUTC}`);
        } catch (e) {
            console.warn("Could not save Daily Challenge play data to localStorage:", e);
        }
    }

    function updateDailyChallengeButtonUI() {
        // MODIFIED FUNCTION
        if (!playDailyChallengeBtn || !practiceBtn) {
            console.warn("Daily challenge button or practice button element not found for UI update.");
            return;
        }
        if (dailyPlayCircleElements.length !== MAX_DAILY_CHALLENGE_PLAYS) {
             console.warn("Daily play circle elements not cached correctly or missing for UI update.");
            return;
        }

        loadDailyChallengePlayData(); // Ensure data is fresh

        const playsLeft = MAX_DAILY_CHALLENGE_PLAYS - dailyChallengePlaysToday;

        // Update circle indicators
        dailyPlayCircleElements.forEach((circle, index) => {
            if (index < playsLeft) {
                circle.classList.remove('used');
            } else {
                circle.classList.add('used');
            }
        });

        if (playsLeft <= 0) {
            playDailyChallengeBtn.disabled = true;
            playDailyChallengeBtn.title = "You've used all your daily attempts. Please try again tomorrow!";
            // Change Practice button to primary style
            practiceBtn.classList.remove('btn-secondary');
            practiceBtn.classList.add('btn-primary');
        } else {
            playDailyChallengeBtn.disabled = false;
            playDailyChallengeBtn.title = ""; // Clear title when enabled
            // Ensure Practice button is secondary style
            practiceBtn.classList.remove('btn-primary');
            practiceBtn.classList.add('btn-secondary');
        }
    }
    // --- END NEW ---


    // ====================================================
    //              SUPABASE SCORE SUBMISSION
    // ====================================================

    /**
     * Submits the final score and game data to the Supabase database.
     */
    async function submitScoreToDatabase() {
        if (!dbClient) {
            console.error("Supabase client not initialized. Cannot submit score.");
            return;
        }
        if (!playerId) {
            console.error("Player ID is not available. Cannot submit score.");
            return;
        }

        const gameEndTime = new Date();
        const durationInSeconds = gameStartTime ? Math.round((gameEndTime - gameStartTime) / 1000) : 0;

        const gameData = {
            player_id: playerId,
            score: score,
            game_mode: currentGameMode,
            play_duration_seconds: durationInSeconds
        };

        console.log("Submitting score to database:", gameData);

        try {
            const { data, error } = await dbClient
                .from('scores')
                .insert([gameData]);

            if (error) {
                console.error("Error inserting score data:", error);
            } else {
                console.log("Score submitted successfully:", data);
            }
        } catch (err) {
            console.error("A critical error occurred during score submission:", err);
        }
    }


    // ====================================================
    //              LEADERBOARD FUNCTIONS
    // ====================================================

    function getLeaderboard(key) {
        try {
            const storedData = localStorage.getItem(key);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                if (Array.isArray(parsedData)) {
                    return parsedData.filter(item => typeof item.score === 'number' && typeof item.date === 'string');
                } else {
                    console.warn(`Invalid data format found in localStorage for key "${key}". Resetting.`);
                    localStorage.removeItem(key);
                    return [];
                }
            }
            return [];
        } catch (error) {
            console.error(`Error retrieving or parsing leaderboard from localStorage (key: ${key}):`, error);
            try { localStorage.removeItem(key); } catch (removeError) { console.error("Failed to remove corrupted leaderboard data:", removeError); }
            return [];
        }
    }

    function saveLeaderboard(key, leaderboard) {
        try {
            leaderboard.sort((a, b) => b.score - a.score);
            const trimmedLeaderboard = leaderboard.slice(0, LEADERBOARD_SIZE);
            localStorage.setItem(key, JSON.stringify(trimmedLeaderboard));
            console.log(`Saved leaderboard (key: ${key}), ${trimmedLeaderboard.length} entries.`);
        } catch (error) {
            console.error(`Error saving leaderboard to localStorage (key: ${key}):`, error);
        }
    }

    function updateLeaderboard(key, newScore) {
        // Allow 0 score for daily leaderboard to track completion, but not for practice high scores.
        if (newScore < 0 || (newScore === 0 && key === PRACTICE_LEADERBOARD_KEY)) {
             console.log("Score is less than 0, or 0 for practice. Not adding to leaderboard.");
             return getLeaderboard(key); // Return current leaderboard without adding
        }
        const leaderboard = getLeaderboard(key);
        const currentDate = getUTCDateString();
        leaderboard.push({ score: newScore, date: currentDate });
        saveLeaderboard(key, leaderboard);
        return getLeaderboard(key); // Return the newly updated and sorted leaderboard
    }

    function displayLeaderboard(displayElement, leaderboard, displayCount) {
        if (!displayElement) {
            console.error("Leaderboard display element not provided or not found.");
            return;
        }
        displayElement.innerHTML = '';
        const leaderboardToShow = leaderboard.slice(0, displayCount);
        if (!leaderboardToShow || leaderboardToShow.length === 0) {
            const noScoresMsg = document.createElement('p');
            noScoresMsg.textContent = 'No scores recorded yet.';
            noScoresMsg.className = 'no-scores';
            displayElement.appendChild(noScoresMsg);
        } else {
            const list = document.createElement('ol');
            list.className = 'leaderboard-list';
            leaderboardToShow.forEach((entry, index) => {
                const listItem = document.createElement('li');
                const rankSpan = document.createElement('span');
                rankSpan.className = 'leaderboard-rank';
                rankSpan.textContent = `${index + 1}.`;
                const scoreSpan = document.createElement('span');
                scoreSpan.className = 'leaderboard-score';
                scoreSpan.textContent = entry.score;
                const dateSpan = document.createElement('span');
                dateSpan.className = 'leaderboard-date';
                dateSpan.textContent = entry.date;
                listItem.appendChild(rankSpan);
                listItem.appendChild(scoreSpan);
                listItem.appendChild(dateSpan);
                list.appendChild(listItem);
            });
            displayElement.appendChild(list);
        }
    }

// End of IIFE
})();