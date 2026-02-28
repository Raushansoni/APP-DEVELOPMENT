(() => {
  window.__TASKX_BUILD__ = "2026-02-28-live-01";
  const TASK_STORAGE_KEY = "flow_schedule_items_v1";
  const PROFILE_STORAGE_KEY = "taskx_profile_v1";
  const USER_ACCOUNT_STORAGE_KEY = "taskx_user_account_v1";
  const QUOTES_STORAGE_KEY = "taskx_learning_quotes_v1";
  const LEARNING_SECTIONS_STORAGE_KEY = "taskx_learning_sections_v1";
  const QUOTES_LAUNCHER_STORAGE_KEY = "taskx_quotes_launcher_v2";
  const BOT_SETTINGS_STORAGE_KEY = "taskx_bot_settings_v1";
  const BOT_MESSAGES_STORAGE_KEY = "taskx_bot_messages_v1";
  const BOT_HISTORY_STORAGE_KEY = "taskx_bot_history_v1";
  const BOT_MEMORY_STORAGE_KEY = "taskx_bot_memory_v1";
  const THEME_STORAGE_KEY = "taskx_theme_v1";
  const PASSWORD_FEATURE_ENABLED = false;
  const ACCOUNT_MIN_AGE = 1;
  const ACCOUNT_MAX_AGE = 120;
  const ONBOARDING_GAMING_VIDEO_SOURCES = [
    "https://cdn.coverr.co/videos/coverr-gamer-session-1579/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-gamer-at-night-9712/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-neon-arcade-gaming-1570/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-hands-on-gaming-keyboard-9728/1080p.mp4"
  ];
  const ONBOARDING_MUSIC_SOURCES = [
    "https://cdn.pixabay.com/audio/2022/08/17/audio_6f703f30b8.mp3",
    "https://cdn.pixabay.com/audio/2022/10/12/audio_7d8f4f95a1.mp3",
    "https://cdn.pixabay.com/audio/2022/03/02/audio_c59dfeb170.mp3",
    "https://cdn.pixabay.com/audio/2022/11/03/audio_2ec115e322.mp3"
  ];
  const ONBOARDING_FALLBACK_BACKGROUNDS = [
    "radial-gradient(130% 130% at 84% 8%, rgba(0, 229, 200, 0.36), rgba(5, 13, 28, 0.98) 55%), linear-gradient(155deg, #061127 0%, #101844 52%, #211447 100%)",
    "radial-gradient(120% 120% at 12% 10%, rgba(97, 184, 255, 0.3), rgba(6, 14, 30, 0.98) 54%), linear-gradient(160deg, #071226 0%, #162c4e 42%, #14133f 100%)",
    "radial-gradient(130% 130% at 78% 86%, rgba(139, 92, 246, 0.34), rgba(7, 14, 31, 0.98) 58%), linear-gradient(140deg, #090f24 0%, #142948 48%, #290f3f 100%)",
    "radial-gradient(135% 125% at 6% 80%, rgba(0, 229, 200, 0.26), rgba(7, 16, 35, 0.98) 56%), linear-gradient(145deg, #091429 0%, #1a1f56 44%, #0f274b 100%)"
  ];

  const GEMINI_CHAT_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
  const BOT_MAX_CONTEXT_MESSAGES = 12;
  const BOT_FIXED_FREE_API_KEY = "AIzaSyB0Atad0FOqzeIfp0huF8IW5IyW_EVvv9c";
  const BOT_REQUEST_TIMEOUT_MS = 35000;
  const BOT_REPLY_SOUND_PATH = "media/pikachu_reply.mp3";
  const THEME_REVEAL_DURATION_MS = 170;

  const BREAKPOINTS = {
    medium: 700,
    expanded: 1100
  };

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/;
  const QUOTE_SPLASH_DELAY_MS = 260;
  const QUOTES_LAUNCHER_EDGE_RESIZE_PX = 14;
  const QUOTES_LAUNCHER_MIN_SIZE = 72;
  const QUOTES_LAUNCHER_MAX_SIZE = 260;
  const QUOTES_LAUNCHER_LONG_PRESS_MS = 460;
  const LEARNING_SECTION_MIN_SIZE = 72;
  const LEARNING_SECTION_MAX_SIZE = 220;
  const LEARNING_SECTION_TOP_OFFSET = 0;
  const TASK_LONG_PRESS_MS = 460;
  const TASK_LONG_PRESS_MOVE_PX = 10;
  const TASK_TIMESLOT_STEP_MINUTES = 30;
  const BOT_FAB_AUTO_HIDE_MS = 5600;
  const BOT_SEND_LONG_PRESS_MS = 420;
  const BOT_MESSAGE_LONG_PRESS_MS = 430;
  const BOT_MESSAGE_LONG_PRESS_MOVE_PX = 10;
  const TASK_VICTORY_ANIMATION_MS = 860;
  const TASK_TAG_OPTIONS = {
    learning: "Learning",
    fitness: "Fitness",
    work: "Work",
    language: "Language",
    general: "General"
  };
  let quotesLauncherTimer = 0;
  let quotesLauncherLongPressTimer = 0;
  let botReplyAudioEl = null;

  const DEFAULT_SCHEDULE_ITEMS = [
    {
      id: "task-1",
      time: "08:00 - 09:30",
      title: "Morning Study Block",
      tag: "Learning",
      tagClass: "learning",
      completed: false
    },
    {
      id: "task-2",
      time: "10:00 - 11:00",
      title: "Gym",
      tag: "Fitness",
      tagClass: "fitness",
      completed: false
    },
    {
      id: "task-3",
      time: "14:30 - 16:00",
      title: "Deep Work: Python Project",
      tag: "Work",
      tagClass: "work",
      completed: false
    },
    {
      id: "task-4",
      time: "19:00 - 20:00",
      title: "Spanish Lesson",
      tag: "Language",
      tagClass: "language",
      completed: false
    }
  ];

  const DEFAULT_PROFILE = {
    fullName: "User",
    age: "",
    email: "",
    phone: "",
    birthDate: "",
    city: "",
    address: "",
    bio: "",
    lockEnabled: false,
    passwordHash: ""
  };

  const DEFAULT_USER_ACCOUNT = {
    created: false,
    name: "",
    createdAt: "",
    lastLoginAt: ""
  };

  const DEFAULT_QUOTES_LAUNCHER = {
    x: 0,
    y: 0,
    size: 96,
    label: "Quote"
  };
  const DEFAULT_BOT_MEMORY = {
    interactions: 0,
    terms: {}
  };

  const DEFAULT_BOT_SETTINGS = {
    provider: "gemini",
    model: "gemini-2.5-flash",
    endpoint: GEMINI_CHAT_ENDPOINT,
    apiKey: BOT_FIXED_FREE_API_KEY,
    systemPrompt: "You are Pikachu. Keep responses concise, practical, and action-oriented for personal scheduling and learning."
  };

  const state = {
    size: "compact",
    resizeTicking: false,
    touchStartX: 0,
    touchStartY: 0,
    touchLastX: 0,
    touchLastY: 0,
    touchActive: false,
    currentView: "today",
    lastNonBotView: "today",
    scheduleItems: [],
    account: { ...DEFAULT_USER_ACCOUNT },
    profile: { ...DEFAULT_PROFILE },
    quotes: [],
    learningSections: [],
    activeLearningSectionId: "",
    learningSectionDrag: null,
    learningSectionIgnoreClickId: "",
    learningSectionEdgeHoverId: "",
    quotesLauncher: { ...DEFAULT_QUOTES_LAUNCHER },
    quotesLauncherDrag: null,
    quotesLauncherIgnoreClick: false,
    quotesLauncherEdgeHover: false,
    quotesLauncherRenderFrame: 0,
    quotesLauncherRenderBounds: null,
    botSettings: { ...DEFAULT_BOT_SETTINGS },
    botMessages: [],
    botHistory: [],
    botMemory: { ...DEFAULT_BOT_MEMORY },
    botIsSending: false,
    botAbortController: null,
    botRequestToken: 0,
    theme: "dark",
    clockTimer: 0,
    todayCrudTaskId: "",
    taskLongPress: null,
    quoteLongPress: null,
    contextMenuTarget: null,
    confirmResolver: null,
    renameTarget: null,
    botFabAutoHideTimer: 0,
    botFabHidden: false,
    botSendLongPressTimer: 0,
    botSendLongPressActive: false,
    botAttachment: null,
    botEditTargetId: "",
    botMessageLongPress: null,
    botPromptMenuMessageId: "",
    themeTransitionTimer: 0,
    onboardingVideoUrl: "",
    onboardingMusicUrl: "",
    onboardingVideoFailures: [],
    onboardingFallbackBg: "",
    onboardingAudioContext: null,
    onboardingToneOscillator: null,
    onboardingToneGain: null,
    onboardingToneTimer: 0
  };

  const dom = {
    appRoot: document.getElementById("appRoot"),
    onboardingGate: document.getElementById("onboardingGate"),
    onboardingFallback: document.getElementById("onboardingFallback"),
    onboardingVideo: document.getElementById("onboardingVideo"),
    onboardingMusic: document.getElementById("onboardingMusic"),
    onboardingIntroPanel: document.getElementById("onboardingIntroPanel"),
    onboardingLoginPanel: document.getElementById("onboardingLoginPanel"),
    onboardingGetReadyButton: document.getElementById("onboardingGetReadyButton"),
    onboardingNameForm: document.getElementById("onboardingNameForm"),
    onboardingNameInput: document.getElementById("onboardingNameInput"),
    onboardingNameFeedback: document.getElementById("onboardingNameFeedback"),
    onboardingGetStartedButton: document.getElementById("onboardingGetStartedButton"),
    themeToggleButton: document.getElementById("themeToggleButton"),
    themeToggleIcon: document.getElementById("themeToggleIcon"),
    drawerToggle: document.getElementById("drawerToggle"),
    drawerScrim: document.getElementById("drawerScrim"),
    profileScrim: document.getElementById("profileScrim"),
    quoteScrim: document.getElementById("quoteScrim"),
    taskScrim: document.getElementById("taskScrim"),
    confirmScrim: document.getElementById("confirmScrim"),
    renameScrim: document.getElementById("renameScrim"),
    contextMenuScrim: document.getElementById("contextMenuScrim"),
    botHistoryScrim: document.getElementById("botHistoryScrim"),
    botMediaScrim: document.getElementById("botMediaScrim"),

    navDrawer: document.getElementById("navDrawer"),
    profileSheet: document.getElementById("profileSheet"),
    quoteSheet: document.getElementById("quoteSheet"),
    taskSheet: document.getElementById("taskSheet"),

    drawerProfileButton: document.getElementById("drawerProfileButton"),
    drawerProfileAvatar: document.getElementById("drawerProfileAvatar"),
    drawerProfileName: document.getElementById("drawerProfileName"),
    drawerProfileMeta: document.getElementById("drawerProfileMeta"),

    profileCloseButton: document.getElementById("profileCloseButton"),
    profileForm: document.getElementById("profileForm"),
    profileName: document.getElementById("profileName"),
    profileAge: document.getElementById("profileAge"),
    profileEmail: document.getElementById("profileEmail"),
    profilePhone: document.getElementById("profilePhone"),
    profileBirthDate: document.getElementById("profileBirthDate"),
    profileCity: document.getElementById("profileCity"),
    profileAddress: document.getElementById("profileAddress"),
    profileBio: document.getElementById("profileBio"),
    profileLockEnabled: document.getElementById("profileLockEnabled"),
    profilePassword: document.getElementById("profilePassword"),
    profilePasswordConfirm: document.getElementById("profilePasswordConfirm"),
    profilePasswordLabel: document.querySelector('label[for="profilePassword"]'),
    profilePasswordConfirmLabel: document.querySelector('label[for="profilePasswordConfirm"]'),
    profileLockRow: document.querySelector(".profile-switch"),
    profileHint: document.querySelector(".profile-hint"),
    profileFeedback: document.getElementById("profileFeedback"),
    profileResetButton: document.getElementById("profileResetButton"),

    todayView: document.getElementById("todayView"),
    learningView: document.getElementById("learningView"),
    quotesView: document.getElementById("quotesView"),
    botView: document.getElementById("botView"),
    upcomingView: document.getElementById("upcomingView"),
    greetingText: document.getElementById("greetingText"),
    todayDateText: document.getElementById("todayDateText"),
    todayTimeText: document.getElementById("todayTimeText"),

    scheduleList: document.getElementById("scheduleList"),
    progressRing: document.getElementById("progressRing"),
    progressValue: document.getElementById("progressValue"),
    progressDetails: document.getElementById("progressDetails"),
    addTaskButton: document.getElementById("addTaskButton"),
    todayCrudHint: document.getElementById("todayCrudHint"),

    addQuoteButton: document.getElementById("addQuoteButton"),
    addLearningSectionButton: document.getElementById("addLearningSectionButton"),
    quotesLauncher: document.getElementById("quotesLauncher"),
    quotesLauncherTitle: document.getElementById("quotesLauncherTitle"),
    learningSectionList: document.getElementById("learningSectionList"),
    backToLearningButton: document.getElementById("backToLearningButton"),
    quotesPanelKicker: document.getElementById("quotesPanelKicker"),
    quotesPanelTitle: document.getElementById("quotesPanelTitle"),
    quoteList: document.getElementById("quoteList"),
    quoteCloseButton: document.getElementById("quoteCloseButton"),
    quoteSheetTitle: document.getElementById("quoteSheetTitle"),
    quoteForm: document.getElementById("quoteForm"),
    quoteEditingId: document.getElementById("quoteEditingId"),
    quoteText: document.getElementById("quoteText"),
    quoteAuthor: document.getElementById("quoteAuthor"),
    quoteDeleteButton: document.getElementById("quoteDeleteButton"),

    taskCloseButton: document.getElementById("taskCloseButton"),
    taskSheetTitle: document.getElementById("taskSheetTitle"),
    taskForm: document.getElementById("taskForm"),
    taskEditingId: document.getElementById("taskEditingId"),
    taskTitle: document.getElementById("taskTitle"),
    taskTime: document.getElementById("taskTime"),
    taskTag: document.getElementById("taskTag"),
    taskCompleted: document.getElementById("taskCompleted"),
    taskDeleteButton: document.getElementById("taskDeleteButton"),

    confirmSheet: document.getElementById("confirmSheet"),
    confirmTitle: document.getElementById("confirmTitle"),
    confirmMessage: document.getElementById("confirmMessage"),
    confirmCancelButton: document.getElementById("confirmCancelButton"),
    confirmAcceptButton: document.getElementById("confirmAcceptButton"),
    renameSheet: document.getElementById("renameSheet"),
    renameTitle: document.getElementById("renameTitle"),
    renameSubtitle: document.getElementById("renameSubtitle"),
    renameForm: document.getElementById("renameForm"),
    renameInput: document.getElementById("renameInput"),
    renameFeedback: document.getElementById("renameFeedback"),
    renameCancelButton: document.getElementById("renameCancelButton"),
    renameSaveButton: document.getElementById("renameSaveButton"),

    crudContextMenu: document.getElementById("crudContextMenu"),
    crudContextTitle: document.getElementById("crudContextTitle"),
    crudContextMeta: document.getElementById("crudContextMeta"),
    crudEditButton: document.getElementById("crudEditButton"),
    crudToggleButton: document.getElementById("crudToggleButton"),
    crudToggleText: document.getElementById("crudToggleText"),
    crudDeleteButton: document.getElementById("crudDeleteButton"),

    botFabButton: document.getElementById("botFabButton"),
    botRevealButton: document.getElementById("botRevealButton"),
    botBackButton: document.getElementById("botBackButton"),
    botHistoryButton: document.getElementById("botHistoryButton"),
    botHistorySheet: document.getElementById("botHistorySheet"),
    botHistoryCloseButton: document.getElementById("botHistoryCloseButton"),
    botHistoryList: document.getElementById("botHistoryList"),
    botClearButton: document.getElementById("botClearButton"),
    botSettingsForm: document.getElementById("botSettingsForm"),
    botProvider: document.getElementById("botProvider"),
    botModel: document.getElementById("botModel"),
    botEndpoint: document.getElementById("botEndpoint"),
    botApiKey: document.getElementById("botApiKey"),
    botProviderHint: document.getElementById("botProviderHint"),
    botSettingsFeedback: document.getElementById("botSettingsFeedback"),
    botResetSettingsButton: document.getElementById("botResetSettingsButton"),
    botMessageList: document.getElementById("botMessageList"),
    botPromptMenu: document.getElementById("botPromptMenu"),
    botPromptMenuEdit: document.getElementById("botPromptMenuEdit"),
    botComposerForm: document.getElementById("botComposerForm"),
    botPromptInput: document.getElementById("botPromptInput"),
    botSendButton: document.getElementById("botSendButton"),
    botMediaSheet: document.getElementById("botMediaSheet"),
    botMediaCancelButton: document.getElementById("botMediaCancelButton"),
    botAttachmentPreview: document.getElementById("botAttachmentPreview"),
    botAttachmentThumb: document.getElementById("botAttachmentThumb"),
    botAttachmentName: document.getElementById("botAttachmentName"),
    botAttachmentType: document.getElementById("botAttachmentType"),
    botAttachmentRemoveButton: document.getElementById("botAttachmentRemoveButton"),
    botCameraInput: document.getElementById("botCameraInput"),
    botGalleryInput: document.getElementById("botGalleryInput"),
    botGifInput: document.getElementById("botGifInput"),
    botMediaActions: document.querySelectorAll("[data-bot-media-action]"),

    drawerItems: document.querySelectorAll("[data-drawer-item]"),
    navItems: document.querySelectorAll("[data-nav-item]")
  };

    function init() {
    state.scheduleItems = loadScheduleItems();
    state.account = loadUserAccount();
    state.profile = loadProfile();
    syncProfileWithAccount();
    state.quotes = loadQuotes();
    state.learningSections = loadLearningSections();
    state.quotesLauncher = loadQuotesLauncher();
    state.botSettings = loadBotSettings();
    state.botMessages = loadBotMessages();
    state.botHistory = loadBotHistory();
    state.botMemory = loadBotMemory();
    state.botMemory.interactions += 1;
    saveBotMemory();

    state.theme = loadThemePreference();
    applyTheme(state.theme, false);
    setupSystemThemeSync();
    applyPerformanceMode();

    applyPasswordFeatureState();
    populateTaskTimeOptions();
    renderSchedule();
    renderProgress();
    applyProfileToUI();
    updateTodayHeaderRealtime();
    startRealtimeClock();
    renderQuotes();
    renderLearningSections();
    applyQuotesLauncherToUI();
    applyBotSettingsToUI();
    renderBotMessages();
    renderBotHistoryList();
    autoResizeBotPrompt();
    renderBotAttachmentPreview();
    updateTodayCrudUI();

    attachEvents();
    applyAdaptiveLayout(true);
    setCurrentView("today");
    showBotFab(true);
    applyOnboardingGate();

    window.TaskXApp = Object.assign(window.TaskXApp || {}, {
      handleBack: () => handleAppBackAction()
    });
  }

      function attachEvents() {
    dom.themeToggleButton.addEventListener("pointerdown", onThemeToggleClick);

    dom.onboardingGetReadyButton.addEventListener("click", onOnboardingGetReadyClick);
    dom.onboardingNameForm.addEventListener("submit", onOnboardingNameSubmit);
    dom.onboardingNameInput.addEventListener("input", onOnboardingNameInput);
    dom.onboardingVideo.addEventListener("loadeddata", onOnboardingMediaLoaded);
    dom.onboardingVideo.addEventListener("error", onOnboardingMediaError);
    dom.onboardingMusic.addEventListener("error", onOnboardingMusicError);

    dom.drawerToggle.addEventListener("click", toggleDrawer);
    dom.drawerScrim.addEventListener("click", closeDrawer);

    dom.drawerProfileButton.addEventListener("click", () => {
      openProfileSheet();
    });

    dom.profileCloseButton.addEventListener("click", closeProfileSheet);
    dom.profileScrim.addEventListener("click", closeProfileSheet);
    dom.profileForm.addEventListener("submit", onProfileSubmit);
    dom.profileResetButton.addEventListener("click", onProfileReset);

    dom.scheduleList.addEventListener("click", onScheduleListClick);
    dom.scheduleList.addEventListener("pointerdown", onSchedulePointerDown);
    dom.scheduleList.addEventListener("pointermove", onSchedulePointerMove);
    dom.scheduleList.addEventListener("pointerup", onSchedulePointerEnd);
    dom.scheduleList.addEventListener("pointercancel", onSchedulePointerEnd);
    dom.scheduleList.addEventListener("contextmenu", onScheduleContextMenu);
    dom.todayView.addEventListener("click", onTodayViewClick);
    dom.addTaskButton.addEventListener("click", () => {
      openTaskSheet();
    });
    dom.taskCloseButton.addEventListener("click", closeTaskSheet);
    dom.taskScrim.addEventListener("click", closeTaskSheet);
    dom.taskForm.addEventListener("submit", onTaskFormSubmit);
    dom.taskDeleteButton.addEventListener("click", onDeleteEditingTask);
    dom.taskTime.addEventListener("click", onTaskTimePickerRequest);
    dom.taskTime.addEventListener("focus", onTaskTimePickerRequest);

    dom.confirmCancelButton.addEventListener("click", () => resolveConfirmDialog(false));
    dom.confirmAcceptButton.addEventListener("click", () => resolveConfirmDialog(true));
    dom.confirmScrim.addEventListener("click", () => resolveConfirmDialog(false));
    dom.renameScrim.addEventListener("click", closeRenameSheet);
    dom.renameCancelButton.addEventListener("click", closeRenameSheet);
    dom.renameForm.addEventListener("submit", onRenameFormSubmit);

    dom.contextMenuScrim.addEventListener("click", closeCrudContextMenu);
    dom.crudEditButton.addEventListener("click", () => onCrudContextAction("edit"));
    dom.crudToggleButton.addEventListener("click", () => onCrudContextAction("toggle"));
    dom.crudDeleteButton.addEventListener("click", () => onCrudContextAction("delete"));

    dom.addQuoteButton.addEventListener("click", () => {
      openQuoteSheet();
    });
    dom.addLearningSectionButton.addEventListener("click", onAddLearningSectionClick);
    dom.learningSectionList.addEventListener("click", onLearningSectionListClick);
    dom.learningSectionList.addEventListener("keydown", onLearningSectionListKeyDown);
    dom.learningSectionList.addEventListener("pointerdown", onLearningSectionPointerDown);
    dom.learningSectionList.addEventListener("mousemove", onLearningSectionHoverMove);
    dom.learningSectionList.addEventListener("mouseleave", onLearningSectionHoverLeave);
    dom.quotesLauncher.addEventListener("click", onQuotesLauncherClick);
    dom.quotesLauncher.addEventListener("keydown", onQuotesLauncherKeyDown);
    dom.quotesLauncher.addEventListener("pointerdown", onQuotesLauncherPointerDown);
    dom.quotesLauncher.addEventListener("mousemove", onQuotesLauncherHoverMove);
    dom.quotesLauncher.addEventListener("mouseleave", onQuotesLauncherHoverLeave);
    dom.backToLearningButton.addEventListener("click", () => setCurrentView("learning"));
    dom.quoteCloseButton.addEventListener("click", closeQuoteSheet);
    dom.quoteScrim.addEventListener("click", closeQuoteSheet);
    dom.quoteForm.addEventListener("submit", onQuoteFormSubmit);
    dom.quoteDeleteButton.addEventListener("click", onDeleteEditingQuote);
    dom.quoteList.addEventListener("click", onQuoteListClick);
    dom.quoteList.addEventListener("pointerdown", onQuotePointerDown);
    dom.quoteList.addEventListener("pointermove", onQuotePointerMove);
    dom.quoteList.addEventListener("pointerup", onQuotePointerEnd);
    dom.quoteList.addEventListener("pointercancel", onQuotePointerEnd);
    dom.quoteList.addEventListener("contextmenu", onQuoteContextMenu);

    dom.botFabButton.addEventListener("click", openBotDisplay);
    dom.botRevealButton.addEventListener("click", onBotRevealButtonClick);
    dom.botBackButton.addEventListener("click", closeBotDisplay);
    dom.botHistoryButton.addEventListener("click", openBotHistorySheet);
    dom.botHistoryCloseButton.addEventListener("click", closeBotHistorySheet);
    dom.botHistoryScrim.addEventListener("click", closeBotHistorySheet);
    dom.botMediaScrim.addEventListener("click", closeBotMediaSheet);

    dom.botHistoryList.addEventListener("click", onBotHistoryListClick);
    dom.botSettingsForm.addEventListener("submit", onBotSettingsSubmit);
    dom.botResetSettingsButton.addEventListener("click", onBotResetSettings);
    dom.botProvider.addEventListener("change", onBotProviderChange);
    dom.botClearButton.addEventListener("click", onBotClearChat);
    dom.botComposerForm.addEventListener("submit", onBotComposerSubmit);
    dom.botMessageList.addEventListener("click", onBotMessageListClick);
    dom.botMessageList.addEventListener("pointerdown", onBotMessagePointerDown);
    dom.botMessageList.addEventListener("pointermove", onBotMessagePointerMove);
    dom.botMessageList.addEventListener("pointerup", onBotMessagePointerEnd);
    dom.botMessageList.addEventListener("pointercancel", onBotMessagePointerEnd);
    dom.botMessageList.addEventListener("contextmenu", onBotMessageContextMenu);
    document.addEventListener("pointerdown", onGlobalPointerDown, true);
    dom.botPromptInput.addEventListener("keydown", onBotPromptKeyDown);
    dom.botPromptInput.addEventListener("input", autoResizeBotPrompt);
    dom.botPromptInput.addEventListener("focus", autoResizeBotPrompt);
    dom.botPromptInput.addEventListener("paste", () => {
      window.setTimeout(autoResizeBotPrompt, 0);
    });

    dom.botSendButton.addEventListener("pointerdown", onBotSendPointerDown);
    dom.botSendButton.addEventListener("pointerup", onBotSendPointerEnd);
    dom.botSendButton.addEventListener("pointercancel", onBotSendPointerEnd);
    dom.botSendButton.addEventListener("pointerleave", onBotSendPointerEnd);
    dom.botSendButton.addEventListener("contextmenu", onBotSendContextMenu);
    dom.botSendButton.addEventListener("click", onBotSendButtonClick);
    dom.botPromptMenuEdit.addEventListener("click", onBotPromptMenuEditClick);

    dom.botMediaCancelButton.addEventListener("click", closeBotMediaSheet);
    dom.botAttachmentRemoveButton.addEventListener("click", clearBotAttachment);

    for (const actionButton of dom.botMediaActions) {
      actionButton.addEventListener("click", onBotMediaActionClick);
    }

    dom.botCameraInput.addEventListener("change", onBotMediaInputChange);
    dom.botGalleryInput.addEventListener("change", onBotMediaInputChange);
    dom.botGifInput.addEventListener("change", onBotMediaInputChange);

    for (const item of dom.drawerItems) {
      item.addEventListener("click", () => {
        const view = item.dataset.view;
        if (view) {
          setCurrentView(view);
        }
        if (state.size !== "expanded") {
          closeDrawer();
        }
      });
    }

    for (const item of dom.navItems) {
      item.addEventListener("click", () => {
        const view = item.dataset.view;
        if (view) {
          setCurrentView(view);
        }
      });
    }

    dom.appRoot.addEventListener("pointerdown", onUserInteraction, { passive: true });
    dom.appRoot.addEventListener("wheel", onUserInteraction, { passive: true });
    dom.todayView.addEventListener("scroll", onUserInteraction, { passive: true });
    dom.learningView.addEventListener("scroll", onUserInteraction, { passive: true });
    dom.quotesView.addEventListener("scroll", onUserInteraction, { passive: true });
    dom.upcomingView.addEventListener("scroll", onUserInteraction, { passive: true });

    dom.appRoot.addEventListener("touchstart", onTouchStart, { passive: true });
    dom.appRoot.addEventListener("touchmove", onTouchMove, { passive: true });
    dom.appRoot.addEventListener("touchend", onTouchEnd, { passive: true });
    dom.appRoot.addEventListener("touchcancel", resetTouchState);

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") {
        return;
      }
      if (handleAppBackAction()) {
        event.preventDefault();
      }
    });
  }

    function handleAppBackAction() {
    if (dom.appRoot.classList.contains("context-menu-open")) {
      closeCrudContextMenu();
      return true;
    }

    if (dom.appRoot.classList.contains("bot-media-open")) {
      closeBotMediaSheet();
      return true;
    }

    if (dom.appRoot.classList.contains("bot-history-open")) {
      closeBotHistorySheet();
      return true;
    }

    if (dom.appRoot.classList.contains("confirm-open")) {
      resolveConfirmDialog(false);
      return true;
    }

    if (dom.appRoot.classList.contains("rename-open")) {
      closeRenameSheet();
      return true;
    }

    if (dom.appRoot.classList.contains("profile-open")) {
      closeProfileSheet();
      return true;
    }

    if (dom.appRoot.classList.contains("quote-open")) {
      closeQuoteSheet();
      return true;
    }

    if (dom.appRoot.classList.contains("task-open")) {
      closeTaskSheet();
      return true;
    }

    if (state.currentView === "quotes") {
      setCurrentView("learning");
      return true;
    }

    if (state.currentView === "bot") {
      closeBotDisplay();
      return true;
    }

    if (state.size !== "expanded" && dom.appRoot.classList.contains("drawer-open")) {
      closeDrawer();
      return true;
    }

    return false;
  }

    function setCurrentView(view) {
    if (view === "quotes" && state.currentView !== "learning" && state.currentView !== "quotes") {
      return;
    }

    if (view !== "bot") {
      state.lastNonBotView = view === "quotes" ? "learning" : view;
    }

    state.currentView = view;
    closeRenameSheet();

    dom.todayView.hidden = view !== "today";
    dom.learningView.hidden = view !== "learning";
    dom.quotesView.hidden = view !== "quotes";
    dom.botView.hidden = view !== "bot";
    dom.upcomingView.hidden = view !== "upcoming";

    const isBotView = view === "bot";
    const isLearningView = view === "learning";
    dom.botFabButton.hidden = isBotView || isLearningView;
    dom.botRevealButton.hidden = isBotView || isLearningView;
    dom.addLearningSectionButton.hidden = !isLearningView;
    dom.appRoot.classList.toggle("bot-open", isBotView);

    closeCrudContextMenu();
    cancelScheduleLongPress();
    cancelQuoteLongPress();

    if (isBotView) {
      clearBotFabAutoHideTimer();
      state.botFabHidden = false;
      dom.appRoot.classList.remove("bot-fab-hidden");
      closeDrawer();
      closeProfileSheet();
      closeQuoteSheet();
      closeTaskSheet();
      resolveConfirmDialog(false);
      closeBotHistorySheet();
      closeBotMediaSheet(true);
      clearBotSendLongPressTimer();
    } else {
      showBotFab(!isLearningView);
      closeBotHistorySheet();
      closeBotMediaSheet(true);
      clearBotSendLongPressTimer();
    }

    if (view !== "learning") {
      window.clearTimeout(quotesLauncherTimer);
      quotesLauncherTimer = 0;
      dom.quotesLauncher.classList.remove("splashing");
      dom.quotesLauncher.classList.remove("edge-resize");
      state.quotesLauncherIgnoreClick = false;
      cancelQuotesLauncherInteraction();
      cancelQuotesLauncherRender();
      cancelLearningSectionInteraction();
      clearLearningSectionEdgeHover();
    } else {
      scheduleQuotesLauncherRender();
      renderLearningSections();
    }

    if (view !== "quotes") {
      closeQuoteSheet();
    }

    if (view !== "today") {
      closeTaskSheet();
    } else {
      updateTodayCrudUI();
    }

    if (view !== "bot") {
      onBotStopRequest(true);
      clearBotSettingsFeedback();
    }

    const baseView = view === "bot" ? (state.lastNonBotView || "today") : view;
    const selectedDrawerView = baseView === "quotes" ? "learning" : baseView;
    const selectedBottomView = baseView === "quotes" ? "learning" : baseView;

    for (const item of dom.drawerItems) {
      item.classList.toggle("selected", item.dataset.view === selectedDrawerView);
    }

    for (const item of dom.navItems) {
      item.classList.toggle("selected", item.dataset.view === selectedBottomView);
    }
  }

    function renderSchedule() {
    if (!state.scheduleItems.length) {
      dom.scheduleList.innerHTML = `
        <li class="schedule-card schedule-empty" style="--index:0">
          <p class="card-title">No tasks yet.</p>
          <p class="card-time">Tap Add to create your first task.</p>
        </li>
      `;
      updateTodayCrudUI();
      return;
    }

    if (state.todayCrudTaskId && !state.scheduleItems.some((item) => item.id === state.todayCrudTaskId)) {
      state.todayCrudTaskId = "";
    }

    dom.scheduleList.innerHTML = state.scheduleItems
      .map((item, index) => {
        const isActive = item.id === state.todayCrudTaskId;
        return `
          <li class="schedule-card ${item.completed ? "is-complete" : ""} ${isActive ? "crud-active" : ""}" data-task-id="${escapeHtml(item.id)}" style="--index:${index}">
            <div class="card-top">
              <div>
                <p class="card-time">${escapeHtml(item.time)}</p>
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
              </div>
              <button class="card-check ${item.completed ? "done" : ""}" type="button" data-task-action="toggle" aria-label="${item.completed ? "Mark task active" : "Mark task complete"}">
                <span class="material-symbols-rounded">${item.completed ? "task_alt" : "radio_button_unchecked"}</span>
              </button>
            </div>
            <span class="card-tag ${escapeHtml(item.tagClass)}">${escapeHtml(item.tag)}</span>
          </li>
        `;
      })
      .join("");

    updateTodayCrudUI();
  }

  function renderProgress() {
    const total = state.scheduleItems.length;
    const completed = state.scheduleItems.filter((item) => item.completed).length;
    const active = Math.max(total - completed, 0);
    const percent = total ? Math.round((completed / total) * 100) : 0;

    dom.progressRing.style.setProperty("--progress", String(percent));
    dom.progressValue.textContent = `${percent}%`;
    dom.progressDetails.textContent = `${total} session${total === 1 ? "" : "s"} planned, ${completed} completed, ${active} active.`;
  }

  function formatMinutesToClock(totalMinutes) {
    const normalized = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
    const hour = Math.floor(normalized / 60);
    const minute = normalized % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  function buildTaskTimeSlots() {
    const slots = [];
    for (let start = 0; start < 24 * 60; start += TASK_TIMESLOT_STEP_MINUTES) {
      const end = start + TASK_TIMESLOT_STEP_MINUTES;
      slots.push(`${formatMinutesToClock(start)} - ${formatMinutesToClock(end)}`);
    }
    return slots;
  }

  function populateTaskTimeOptions(selectedValue = "") {
    if (!dom.taskTime) {
      return;
    }

    const selected = sanitizeText(selectedValue || dom.taskTime.value);
    const slots = buildTaskTimeSlots();
    const hasSelectedInSlots = selected ? slots.includes(selected) : false;

    let optionsHtml = '<option value="">Select time slot</option>';
    optionsHtml += slots
      .map((slot) => `<option value="${escapeHtml(slot)}">${escapeHtml(slot)}</option>`)
      .join("");

    if (selected && !hasSelectedInSlots) {
      optionsHtml += `<option value="${escapeHtml(selected)}">${escapeHtml(selected)} (Saved)</option>`;
    }

    dom.taskTime.innerHTML = optionsHtml;
    dom.taskTime.value = selected || "";
  }
  function onTaskTimePickerRequest(event) {
    if (!dom.taskTime) {
      return;
    }

    populateTaskTimeOptions(dom.taskTime.value);

    if (typeof dom.taskTime.showPicker === "function" && event?.type !== "focus") {
      try {
        dom.taskTime.showPicker();
      } catch {
        // Ignore showPicker errors and allow native select behavior.
      }
    }
  }
  function openTaskSheet(taskId = "") {
    if (state.currentView !== "today") {
      return;
    }

    closeDrawer();
    closeProfileSheet();
    closeQuoteSheet();

    const task = taskId ? state.scheduleItems.find((item) => item.id === taskId) : null;

    if (task) {
      dom.taskEditingId.value = task.id;
      dom.taskTitle.value = task.title;
      populateTaskTimeOptions(task.time);
      dom.taskTag.value = normalizeTagClass(task.tagClass);
      dom.taskCompleted.checked = Boolean(task.completed);
      dom.taskSheetTitle.textContent = "Edit Task";
      dom.taskDeleteButton.hidden = false;
    } else {
      dom.taskEditingId.value = "";
      dom.taskTitle.value = "";
      populateTaskTimeOptions();
      dom.taskTag.value = "learning";
      dom.taskCompleted.checked = false;
      dom.taskSheetTitle.textContent = "Add Task";
      dom.taskDeleteButton.hidden = true;
    }

    dom.appRoot.classList.add("task-open");
    window.requestAnimationFrame(() => {
      dom.taskTitle.focus();
    });
  }

  function closeTaskSheet() {
    dom.appRoot.classList.remove("task-open");
  }

      function onTaskFormSubmit(event) {
    event.preventDefault();

    const title = sanitizeText(dom.taskTitle.value);
    const time = sanitizeText(dom.taskTime.value);
    const tagClass = normalizeTagClass(dom.taskTag.value);
    const completed = Boolean(dom.taskCompleted.checked);

    if (!title) {
      window.alert("Task title is required.");
      return;
    }

    if (!time) {
      window.alert("Task time is required.");
      return;
    }

    const editingId = dom.taskEditingId.value;
    const tag = getTaskTagLabel(tagClass);
    let celebrateTaskId = "";

    if (editingId) {
      const previousTask = state.scheduleItems.find((item) => item.id === editingId);
      state.scheduleItems = state.scheduleItems.map((item) => {
        if (item.id !== editingId) {
          return item;
        }
        return {
          ...item,
          time,
          title,
          tag,
          tagClass,
          completed
        };
      });
      state.todayCrudTaskId = editingId;

      if (!previousTask?.completed && completed) {
        celebrateTaskId = editingId;
      }
    } else {
      const nextId = "task-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
      state.scheduleItems.push({
        id: nextId,
        time,
        title,
        tag,
        tagClass,
        completed
      });
      state.todayCrudTaskId = nextId;

      if (completed) {
        celebrateTaskId = nextId;
      }
    }

    saveScheduleItems();
    renderSchedule();
    renderProgress();
    closeTaskSheet();

    if (celebrateTaskId) {
      playTaskVictoryAnimation(celebrateTaskId);
    }
  }

  async function onDeleteEditingTask() {
    const editingId = dom.taskEditingId.value;
    if (!editingId) {
      return;
    }

    const deleted = await removeTask(editingId);
    if (deleted) {
      closeTaskSheet();
    }
  }

  async function removeTask(id, skipConfirm = false) {
    if (!id) {
      return false;
    }

    const task = state.scheduleItems.find((item) => item.id === id);
    if (!task) {
      return false;
    }

    if (!skipConfirm) {
      const ok = await showConfirmDialog({
        title: "Delete task?",
        message: `"${task.title}" will vanish from your schedule.`,
        confirmLabel: "Delete"
      });
      if (!ok) {
        return false;
      }
    }

    const taskCard = findTaskCardById(id);
    await runDeleteVanishAnimation(taskCard);

    state.scheduleItems = state.scheduleItems.filter((item) => item.id !== id);
    if (state.todayCrudTaskId === id) {
      state.todayCrudTaskId = "";
    }

    saveScheduleItems();
    renderSchedule();
    renderProgress();
    closeCrudContextMenu();
    return true;
  }

  function toggleTaskCompletion(taskId) {
    if (!taskId) {
      return false;
    }

    let becameCompleted = false;

    state.scheduleItems = state.scheduleItems.map((item) => {
      if (item.id !== taskId) {
        return item;
      }

      const nextCompleted = !item.completed;
      if (!item.completed && nextCompleted) {
        becameCompleted = true;
      }

      return {
        ...item,
        completed: nextCompleted
      };
    });

    saveScheduleItems();
    renderSchedule();
    renderProgress();
    return becameCompleted;
  }
  function onScheduleListClick(event) {
    const toggleAction = event.target.closest("[data-task-action='toggle']");
    if (toggleAction) {
      const card = toggleAction.closest(".schedule-card[data-task-id]");
      const taskId = card?.dataset.taskId || "";
      if (!taskId) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      state.todayCrudTaskId = taskId;
      const becameCompleted = toggleTaskCompletion(taskId);

      if (becameCompleted) {
        playTaskVictoryAnimation(taskId);
      }
      return;
    }

    const card = event.target.closest(".schedule-card[data-task-id]");
    if (!card) {
      return;
    }

    state.todayCrudTaskId = card.dataset.taskId || "";
    renderSchedule();
  }

  function updateTodayCrudUI() {
    const hasTasks = state.scheduleItems.length > 0;

    dom.addTaskButton.hidden = false;
    dom.appRoot.classList.toggle("today-crud-active", Boolean(state.todayCrudTaskId));

    if (!dom.todayCrudHint) {
      return;
    }

    if (!hasTasks) {
      dom.todayCrudHint.textContent = "No tasks yet. Tap Add to create your first task.";
      return;
    }

    dom.todayCrudHint.textContent = "Long press any task to open Edit / Complete / Delete.";
  }

  function clearTodayCrudSelection(silent = false) {
    if (!state.todayCrudTaskId) {
      return;
    }
    state.todayCrudTaskId = "";
    renderSchedule();
    if (!silent) {
      onUserInteraction();
    }
  }

  function activateTodayCrudForTask(taskId) {
    if (!taskId || state.currentView !== "today") {
      return;
    }

    state.todayCrudTaskId = taskId;
    renderSchedule();

    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(14);
    }
  }

  function onSchedulePointerDown(event) {
    if (state.currentView !== "today") {
      return;
    }

    if (!isPrimaryPointer(event)) {
      return;
    }

    const card = event.target.closest(".schedule-card[data-task-id]");
    const isTogglePress = Boolean(event.target.closest("[data-task-action='toggle']"));
    if (isTogglePress) {
      return;
    }
    if (!card) {
      return;
    }

    closeCrudContextMenu();
    cancelScheduleLongPress();

    const taskId = card.dataset.taskId;
    const pressX = event.clientX;
    const pressY = event.clientY;

    const timer = window.setTimeout(() => {
      state.taskLongPress = null;
      card.classList.remove("pressing");
      activateTodayCrudForTask(taskId);
      openCrudContextMenu({
        type: "task",
        id: taskId,
        x: pressX,
        y: pressY
      });
    }, TASK_LONG_PRESS_MS);

    state.taskLongPress = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      taskId,
      card,
      timer
    };

    card.classList.add("pressing");
  }

  function onSchedulePointerMove(event) {
    const hold = state.taskLongPress;
    if (!hold || hold.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = Math.abs(event.clientX - hold.startX);
    const deltaY = Math.abs(event.clientY - hold.startY);

    if (deltaX > TASK_LONG_PRESS_MOVE_PX || deltaY > TASK_LONG_PRESS_MOVE_PX) {
      cancelScheduleLongPress();
    }
  }

  function onSchedulePointerEnd(event) {
    const hold = state.taskLongPress;
    if (!hold || hold.pointerId !== event.pointerId) {
      return;
    }

    cancelScheduleLongPress();
  }

  function cancelScheduleLongPress() {
    const hold = state.taskLongPress;
    if (!hold) {
      return;
    }

    window.clearTimeout(hold.timer);
    hold.card?.classList.remove("pressing");
    state.taskLongPress = null;
  }

  function onScheduleContextMenu(event) {
    const card = event.target.closest(".schedule-card[data-task-id]");
    const isTogglePress = Boolean(event.target.closest("[data-task-action='toggle']"));
    if (isTogglePress) {
      return;
    }
    if (!card) {
      return;
    }
    event.preventDefault();
  }

  function onTodayViewClick(event) {
    const insideCard = event.target.closest(".schedule-card[data-task-id]");
    const insideContextMenu = event.target.closest(".crud-context-menu");
    if (insideCard || insideContextMenu) {
      return;
    }

    closeCrudContextMenu();
    clearTodayCrudSelection(true);
  }

  function onQuotePointerDown(event) {
    if (!canAccessQuotes() || !isPrimaryPointer(event)) {
      return;
    }

    const item = event.target.closest(".quote-item[data-quote-id]");
    if (!item) {
      return;
    }

    closeCrudContextMenu();
    cancelQuoteLongPress();

    const quoteId = item.dataset.quoteId;
    const pressX = event.clientX;
    const pressY = event.clientY;

    const timer = window.setTimeout(() => {
      state.quoteLongPress = null;
      item.classList.remove("pressing");
      openCrudContextMenu({
        type: "quote",
        id: quoteId,
        x: pressX,
        y: pressY
      });
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        navigator.vibrate(14);
      }
    }, TASK_LONG_PRESS_MS);

    state.quoteLongPress = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      quoteId,
      item,
      timer
    };

    item.classList.add("pressing");
  }

  function onQuotePointerMove(event) {
    const hold = state.quoteLongPress;
    if (!hold || hold.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = Math.abs(event.clientX - hold.startX);
    const deltaY = Math.abs(event.clientY - hold.startY);

    if (deltaX > TASK_LONG_PRESS_MOVE_PX || deltaY > TASK_LONG_PRESS_MOVE_PX) {
      cancelQuoteLongPress();
    }
  }

  function onQuotePointerEnd(event) {
    const hold = state.quoteLongPress;
    if (!hold || hold.pointerId !== event.pointerId) {
      return;
    }

    cancelQuoteLongPress();
  }

  function cancelQuoteLongPress() {
    const hold = state.quoteLongPress;
    if (!hold) {
      return;
    }

    window.clearTimeout(hold.timer);
    hold.item?.classList.remove("pressing");
    state.quoteLongPress = null;
  }

  function onQuoteContextMenu(event) {
    const item = event.target.closest(".quote-item[data-quote-id]");
    if (!item) {
      return;
    }
    event.preventDefault();
  }

  function findTaskCardById(id) {
    const cards = dom.scheduleList.querySelectorAll(".schedule-card[data-task-id]");
    for (const card of cards) {
      if (card.dataset.taskId === id) {
        return card;
      }
    }
    return null;
  }

  function playTaskVictoryAnimation(taskId) {
    if (!taskId) {
      return;
    }

    const card = findTaskCardById(taskId);
    if (!card) {
      return;
    }

    card.classList.remove("victory");
    void card.offsetWidth;
    card.classList.add("victory");

    window.setTimeout(() => {
      card.classList.remove("victory");
    }, TASK_VICTORY_ANIMATION_MS);
  }

  function getActiveLearningSection() {
    const found = state.learningSections.find((section) => section.id === state.activeLearningSectionId);
    return found || state.learningSections[0] || null;
  }

  function getLearningSectionById(sectionId) {
    if (!sectionId) {
      return null;
    }
    return state.learningSections.find((section) => section.id === sectionId) || null;
  }

  function getLearningSectionBounds() {
    return {
      width: dom.learningView.clientWidth,
      height: Math.max(0, dom.learningView.clientHeight - LEARNING_SECTION_TOP_OFFSET)
    };
  }

  function getLearningSectionMaxSize(width, height) {
    if (!width || !height) {
      return LEARNING_SECTION_MAX_SIZE;
    }
    return Math.max(LEARNING_SECTION_MIN_SIZE, Math.min(LEARNING_SECTION_MAX_SIZE, Math.min(width, height) - 8));
  }

  function getLearningSectionMaxSizeForResize(width, height, drag) {
    const edge = drag.edge || {};
    const maxByX = edge.left ? drag.originX + drag.originSize : width - drag.originX;
    const maxByY = edge.top ? drag.originY + drag.originSize : height - drag.originY;
    return Math.max(LEARNING_SECTION_MIN_SIZE, Math.min(LEARNING_SECTION_MAX_SIZE, maxByX, maxByY));
  }

  function getDefaultLearningSectionPlacement(index, bounds) {
    const size = clampNumber(104, LEARNING_SECTION_MIN_SIZE, getLearningSectionMaxSize(bounds.width, bounds.height));
    const spacingX = size + 12;
    const spacingY = size + 12;
    const cols = Math.max(1, Math.floor(Math.max(bounds.width - 12, size) / spacingX));
    const col = index % cols;
    const row = Math.floor(index / cols);
    const maxX = Math.max(0, bounds.width - size);
    const maxY = Math.max(0, bounds.height - size);
    return {
      x: clampNumber(8 + col * spacingX, 0, maxX),
      y: clampNumber(8 + row * spacingY, 0, maxY),
      size
    };
  }

  function autoAlignLearningSections(saveAfter = false) {
    const bounds = getLearningSectionBounds();
    if (!bounds.width || !bounds.height) {
      return;
    }

    const sections = state.learningSections;
    let cursorX = 8;
    let cursorY = 8;
    let rowHeight = 0;

    for (const section of sections) {
      const size = clampNumber(
        Number.isFinite(section.size) ? section.size : 104,
        LEARNING_SECTION_MIN_SIZE,
        getLearningSectionMaxSize(bounds.width, bounds.height)
      );

      if (cursorX + size > bounds.width && cursorX > 8) {
        cursorX = 8;
        cursorY += rowHeight + 12;
        rowHeight = 0;
      }

      const maxX = Math.max(0, bounds.width - size);
      const maxY = Math.max(0, bounds.height - size);
      section.size = size;
      section.x = clampNumber(cursorX, 0, maxX);
      section.y = clampNumber(cursorY, 0, maxY);

      cursorX += size + 12;
      rowHeight = Math.max(rowHeight, size);
    }

    if (saveAfter) {
      saveLearningSections();
    }
  }

  function normalizeLearningSectionLayout(section, index, bounds) {
    const fallback = getDefaultLearningSectionPlacement(index, bounds);
    const maxSize = getLearningSectionMaxSize(bounds.width, bounds.height);
    const size = Number.isFinite(section.size)
      ? clampNumber(section.size, LEARNING_SECTION_MIN_SIZE, maxSize)
      : fallback.size;
    const maxX = Math.max(0, bounds.width - size);
    const maxY = Math.max(0, bounds.height - size);
    const x = Number.isFinite(section.x) ? clampNumber(section.x, 0, maxX) : fallback.x;
    const y = Number.isFinite(section.y) ? clampNumber(section.y, 0, maxY) : fallback.y;

    return {
      x,
      y,
      size,
      changed: section.x !== x || section.y !== y || section.size !== size
    };
  }

  function applyLearningSectionCardStyle(sectionId, boundsOverride = null) {
    const section = getLearningSectionById(sectionId);
    if (!section) {
      return;
    }

    const card = dom.learningSectionList.querySelector(`.learning-section-card[data-learning-section-id="${sectionId}"]`);
    if (!card) {
      return;
    }

    const bounds = boundsOverride || getLearningSectionBounds();
    const maxSize = getLearningSectionMaxSize(bounds.width, bounds.height);
    section.size = clampNumber(Number.isFinite(section.size) ? section.size : 104, LEARNING_SECTION_MIN_SIZE, maxSize);
    const maxX = Math.max(0, bounds.width - section.size);
    const maxY = Math.max(0, bounds.height - section.size);
    section.x = clampNumber(Number.isFinite(section.x) ? section.x : 0, 0, maxX);
    section.y = clampNumber(Number.isFinite(section.y) ? section.y : 0, 0, maxY);

    const fontSizePx = clampNumber(Math.round(section.size * 0.2), 14, 34);
    card.style.left = `${section.x}px`;
    card.style.top = `${section.y}px`;
    card.style.setProperty("--learning-section-size", `${section.size}px`);
    card.style.setProperty("--learning-section-font-size", `${fontSizePx}px`);
  }

  function renderLearningSections(boundsOverride = null) {
    const bounds = boundsOverride || getLearningSectionBounds();
    const hasUsableBounds = bounds.width > 0 && bounds.height > 0;
    const customSections = state.learningSections;
    dom.learningSectionList.classList.toggle("is-empty", !customSections.length);
    if (!customSections.length) {
      dom.learningSectionList.innerHTML = "";
      return;
    }

    const sectionCountMap = new Map();
    for (const quote of state.quotes) {
      if (!quote || !quote.sectionId) {
        continue;
      }
      sectionCountMap.set(quote.sectionId, (sectionCountMap.get(quote.sectionId) || 0) + 1);
    }

    let shouldPersistLayout = false;
    dom.learningSectionList.innerHTML = customSections
      .map((section, index) => {
        const layout = hasUsableBounds
          ? normalizeLearningSectionLayout(section, index, bounds)
          : {
            x: Number.isFinite(section.x) ? section.x : 0,
            y: Number.isFinite(section.y) ? section.y : 0,
            size: clampNumber(Number.isFinite(section.size) ? section.size : 104, LEARNING_SECTION_MIN_SIZE, LEARNING_SECTION_MAX_SIZE),
            changed: false
          };
        if (layout.changed) {
          section.x = layout.x;
          section.y = layout.y;
          section.size = layout.size;
          shouldPersistLayout = true;
        }
        const count = sectionCountMap.get(section.id) || 0;
        const label = sanitizeText(section.name) || "Section";
        const fontSizePx = clampNumber(Math.round(layout.size * 0.2), 14, 34);
        const style = [
          `left:${layout.x}px`,
          `top:${layout.y}px`,
          `--learning-section-size:${layout.size}px`,
          `--learning-section-font-size:${fontSizePx}px`
        ].join(";");
        return `
          <li class="learning-section-card" data-learning-section-id="${escapeHtml(section.id)}" role="button" tabindex="0" aria-label="Open ${escapeHtml(label)} section" style="${style}">
            <span class="quotes-launcher-bubble bubble-1" aria-hidden="true"></span>
            <span class="quotes-launcher-bubble bubble-2" aria-hidden="true"></span>
            <span class="quotes-launcher-bubble bubble-3" aria-hidden="true"></span>
            <span class="quotes-launcher-bubble bubble-4" aria-hidden="true"></span>
            <div class="learning-section-copy">
              <strong>${escapeHtml(label)}</strong>
              <span>${count} item${count === 1 ? "" : "s"}</span>
            </div>
          </li>
        `;
      })
      .join("");

    if (hasUsableBounds && shouldPersistLayout) {
      saveLearningSections();
    }
  }

  function onAddLearningSectionClick() {
    if (state.currentView !== "learning") {
      return;
    }
    openRenameSheet({
      type: "create-learning-section",
      id: "create-learning-section",
      title: "Create Section",
      subtitle: "Add a custom Learning section.",
      value: "",
      maxLength: 28,
      submitLabel: "Create"
    });
  }

  function onLearningSectionListClick(event) {
    const item = event.target.closest(".learning-section-card[data-learning-section-id]");
    if (!item || state.currentView !== "learning") {
      return;
    }
    const sectionId = sanitizeText(item.dataset.learningSectionId);
    if (!sectionId) {
      return;
    }

    if (state.learningSectionIgnoreClickId && state.learningSectionIgnoreClickId === sectionId) {
      state.learningSectionIgnoreClickId = "";
      event.preventDefault();
      return;
    }

    openQuotesDisplay(sectionId);
  }

  function onLearningSectionListKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    if (event.target.closest('[data-learning-section-action="delete"]')) {
      return;
    }
    const item = event.target.closest(".learning-section-card[data-learning-section-id]");
    if (!item || state.currentView !== "learning") {
      return;
    }
    event.preventDefault();
    const sectionId = sanitizeText(item.dataset.learningSectionId);
    if (!sectionId) {
      return;
    }
    openQuotesDisplay(sectionId);
  }

  function editLearningSectionLabel(sectionId) {
    const section = getLearningSectionById(sectionId);
    if (!section) {
      return;
    }

    openRenameSheet({
      type: "learning-section",
      id: sectionId,
      title: "Rename Section",
      subtitle: "Choose a clean, short name for this section.",
      value: sanitizeText(section.name),
      maxLength: 28,
      submitLabel: "Save"
    });
  }

  function openRenameSheet(config) {
    if (!config || !config.type || !config.id) {
      return;
    }

    state.renameTarget = {
      type: config.type,
      id: config.id,
      maxLength: Number.isFinite(config.maxLength) ? config.maxLength : 28
    };

    dom.renameTitle.textContent = sanitizeText(config.title) || "Rename";
    dom.renameSubtitle.textContent = sanitizeText(config.subtitle) || "Update the name.";
    dom.renameSaveButton.textContent = sanitizeText(config.submitLabel) || "Save";
    dom.renameInput.maxLength = state.renameTarget.maxLength;
    dom.renameInput.value = sanitizeText(config.value).slice(0, state.renameTarget.maxLength);
    dom.renameFeedback.textContent = "";

    dom.appRoot.classList.add("rename-open");
    window.requestAnimationFrame(() => {
      dom.renameInput.focus();
      dom.renameInput.select();
    });
  }

  function closeRenameSheet() {
    state.renameTarget = null;
    dom.renameFeedback.textContent = "";
    dom.appRoot.classList.remove("rename-open");
  }

  function onRenameFormSubmit(event) {
    event.preventDefault();
    const target = state.renameTarget;
    if (!target) {
      closeRenameSheet();
      return;
    }

    const nextValue = sanitizeText(dom.renameInput.value).slice(0, target.maxLength);
    if (!nextValue) {
      dom.renameFeedback.textContent = "Name is required.";
      return;
    }

    if (target.type === "quotes-launcher") {
      state.quotesLauncher.label = nextValue;
      applyQuotesLauncherToUI();
      saveQuotesLauncher();
      closeRenameSheet();
      return;
    }

    if (target.type === "learning-section") {
      const section = getLearningSectionById(target.id);
      if (!section) {
        closeRenameSheet();
        return;
      }

      const hasDuplicate = state.learningSections.some(
        (item) => item.id !== target.id && sanitizeText(item.name).toLowerCase() === nextValue.toLowerCase()
      );
      if (hasDuplicate) {
        dom.renameFeedback.textContent = "A section with this name already exists.";
        return;
      }

      section.name = nextValue;
      saveLearningSections();
      renderLearningSections();
      renderQuotes();
      closeRenameSheet();
      return;
    }

    if (target.type === "create-learning-section") {
      const hasDuplicate = state.learningSections.some(
        (item) => sanitizeText(item.name).toLowerCase() === nextValue.toLowerCase()
      );
      if (hasDuplicate) {
        dom.renameFeedback.textContent = "A section with this name already exists.";
        return;
      }

      const id = `section-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
      const bounds = getLearningSectionBounds();
      const layout = getDefaultLearningSectionPlacement(state.learningSections.length, bounds);
      state.learningSections.push({ id, name: nextValue, x: layout.x, y: layout.y, size: layout.size });
      autoAlignLearningSections(false);
      saveLearningSections();
      renderLearningSections();
      closeRenameSheet();
      return;
    }
  }

  function clearLearningSectionLongPressTimer() {
    const drag = state.learningSectionDrag;
    if (!drag || !drag.longPressTimer) {
      return;
    }
    window.clearTimeout(drag.longPressTimer);
    drag.longPressTimer = 0;
  }

  function clearLearningSectionEdgeHover() {
    if (!state.learningSectionEdgeHoverId) {
      return;
    }
    const old = dom.learningSectionList.querySelector(`.learning-section-card[data-learning-section-id="${state.learningSectionEdgeHoverId}"]`);
    old?.classList.remove("edge-resize");
    state.learningSectionEdgeHoverId = "";
  }

  function onLearningSectionPointerDown(event) {
    if (state.currentView !== "learning") {
      return;
    }
    if (!isPrimaryPointer(event)) {
      return;
    }

    const card = event.target.closest(".learning-section-card[data-learning-section-id]");
    if (!card) {
      return;
    }

    const sectionId = sanitizeText(card.dataset.learningSectionId);
    const section = getLearningSectionById(sectionId);
    if (!section) {
      return;
    }

    const edge = getLearningSectionResizeEdge(event, card);
    startLearningSectionInteraction(event, card, section, edge ? "resize" : "drag", edge);
  }

  function onLearningSectionHoverMove(event) {
    if (state.currentView !== "learning" || state.learningSectionDrag) {
      return;
    }

    const card = event.target.closest(".learning-section-card[data-learning-section-id]");
    if (!card) {
      clearLearningSectionEdgeHover();
      return;
    }

    const sectionId = sanitizeText(card.dataset.learningSectionId);
    const edge = getLearningSectionResizeEdge(event, card);
    const hasEdge = Boolean(edge);

    if (!hasEdge) {
      if (state.learningSectionEdgeHoverId === sectionId) {
        card.classList.remove("edge-resize");
        state.learningSectionEdgeHoverId = "";
      }
      return;
    }

    if (state.learningSectionEdgeHoverId && state.learningSectionEdgeHoverId !== sectionId) {
      clearLearningSectionEdgeHover();
    }
    state.learningSectionEdgeHoverId = sectionId;
    card.classList.add("edge-resize");
  }

  function onLearningSectionHoverLeave() {
    if (state.learningSectionDrag) {
      return;
    }
    clearLearningSectionEdgeHover();
  }

  function startLearningSectionInteraction(event, card, section, mode, edge = null) {
    const bounds = getLearningSectionBounds();
    if (!bounds.width || !bounds.height) {
      return;
    }

    event.preventDefault();
    clearLearningSectionEdgeHover();

    state.learningSectionDrag = {
      pointerId: event.pointerId,
      sectionId: section.id,
      mode,
      edge,
      card,
      bounds,
      startX: event.clientX,
      startY: event.clientY,
      originX: Number.isFinite(section.x) ? section.x : 0,
      originY: Number.isFinite(section.y) ? section.y : 0,
      originSize: Number.isFinite(section.size) ? section.size : 104,
      moved: false,
      longPressTimer: 0
    };

    card.classList.toggle("dragging", mode === "drag");
    card.classList.toggle("resizing", mode === "resize");

    if (mode === "drag") {
      state.learningSectionDrag.longPressTimer = window.setTimeout(() => {
        const activeDrag = state.learningSectionDrag;
        if (!activeDrag || activeDrag.sectionId !== section.id || activeDrag.moved || state.currentView !== "learning") {
          return;
        }
        cancelLearningSectionInteraction();
        state.learningSectionIgnoreClickId = section.id;
        const rect = card.getBoundingClientRect();
        openCrudContextMenu({
          type: "learning-section",
          id: section.id,
          x: rect.left + rect.width * 0.7,
          y: rect.top + rect.height * 0.48
        });
      }, QUOTES_LAUNCHER_LONG_PRESS_MS);
    }

    window.addEventListener("pointermove", onLearningSectionPointerMove);
    window.addEventListener("pointerup", onLearningSectionPointerUp);
    window.addEventListener("pointercancel", onLearningSectionPointerUp);
  }

  function onLearningSectionPointerMove(event) {
    const drag = state.learningSectionDrag;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    const section = getLearningSectionById(drag.sectionId);
    if (!section) {
      cancelLearningSectionInteraction();
      return;
    }

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    const { width, height } = drag.bounds || getLearningSectionBounds();
    if (!width || !height) {
      return;
    }

    if (drag.mode === "drag") {
      const maxX = Math.max(0, width - (Number.isFinite(section.size) ? section.size : drag.originSize));
      const maxY = Math.max(0, height - (Number.isFinite(section.size) ? section.size : drag.originSize));
      section.x = clampNumber(drag.originX + deltaX, 0, maxX);
      section.y = clampNumber(drag.originY + deltaY, 0, maxY);
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        drag.moved = true;
        clearLearningSectionLongPressTimer();
      }
      applyLearningSectionCardStyle(section.id, drag.bounds);
      return;
    }

    const resizeDeltaCandidates = [];
    if (drag.edge?.right) resizeDeltaCandidates.push(deltaX);
    if (drag.edge?.left) resizeDeltaCandidates.push(-deltaX);
    if (drag.edge?.bottom) resizeDeltaCandidates.push(deltaY);
    if (drag.edge?.top) resizeDeltaCandidates.push(-deltaY);
    const deltaSize = resizeDeltaCandidates.length ? Math.max(...resizeDeltaCandidates) : 0;

    const maxSize = getLearningSectionMaxSizeForResize(width, height, drag);
    const nextSize = clampNumber(drag.originSize + deltaSize, LEARNING_SECTION_MIN_SIZE, maxSize);

    let nextX = drag.originX;
    let nextY = drag.originY;
    if (drag.edge?.left) nextX = drag.originX + (drag.originSize - nextSize);
    if (drag.edge?.top) nextY = drag.originY + (drag.originSize - nextSize);

    section.size = nextSize;
    section.x = clampNumber(nextX, 0, Math.max(0, width - nextSize));
    section.y = clampNumber(nextY, 0, Math.max(0, height - nextSize));
    if (Math.abs(deltaSize) > 2) {
      drag.moved = true;
    }
    applyLearningSectionCardStyle(section.id, drag.bounds);
  }

  function onLearningSectionPointerUp(event) {
    const drag = state.learningSectionDrag;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    clearLearningSectionLongPressTimer();
    const moved = drag.moved;
    const sectionId = drag.sectionId;
    cancelLearningSectionInteraction();
    saveLearningSections();
    renderLearningSections();

    if (moved || drag.mode === "resize") {
      state.learningSectionIgnoreClickId = sectionId;
    }
  }

  function cancelLearningSectionInteraction() {
    window.removeEventListener("pointermove", onLearningSectionPointerMove);
    window.removeEventListener("pointerup", onLearningSectionPointerUp);
    window.removeEventListener("pointercancel", onLearningSectionPointerUp);

    clearLearningSectionLongPressTimer();
    const drag = state.learningSectionDrag;
    drag?.card?.classList.remove("dragging", "resizing", "edge-resize");
    state.learningSectionDrag = null;
  }

  function getLearningSectionResizeEdge(event, card) {
    const rect = card.getBoundingClientRect();
    const threshold = QUOTES_LAUNCHER_EDGE_RESIZE_PX;
    const nearLeft = event.clientX - rect.left <= threshold;
    const nearRight = rect.right - event.clientX <= threshold;
    const nearTop = event.clientY - rect.top <= threshold;
    const nearBottom = rect.bottom - event.clientY <= threshold;

    if (!nearLeft && !nearRight && !nearTop && !nearBottom) {
      return null;
    }

    return {
      left: nearLeft,
      right: nearRight,
      top: nearTop,
      bottom: nearBottom
    };
  }

  async function removeLearningSection(sectionId) {
    const section = state.learningSections.find((item) => item.id === sectionId);
    if (!section) {
      return false;
    }

    const sectionQuotesCount = state.quotes.filter((item) => item.sectionId === sectionId).length;
    const ok = await showConfirmDialog({
      title: "Delete section?",
      message: `${section.name} and ${sectionQuotesCount} item${sectionQuotesCount === 1 ? "" : "s"} will be removed.`,
      confirmLabel: "Delete"
    });
    if (!ok) {
      return false;
    }

    state.learningSections = state.learningSections.filter((item) => item.id !== sectionId);
    state.quotes = state.quotes.filter((item) => item.sectionId !== sectionId);
    if (state.learningSectionIgnoreClickId === sectionId) {
      state.learningSectionIgnoreClickId = "";
    }
    if (state.activeLearningSectionId === sectionId) {
      state.activeLearningSectionId = "";
    }

    autoAlignLearningSections(false);
    saveLearningSections();
    saveQuotes();
    renderLearningSections();
    renderQuotes();
    return true;
  }

  function renderQuotes() {
    const activeSection = getActiveLearningSection();
    if (!activeSection) {
      dom.quotesPanelKicker.textContent = "LEARNING";
      dom.quotesPanelTitle.textContent = "Your collection";
      dom.quoteList.innerHTML = `
        <li class="quote-empty">
          <p>Create a Learning section first, then open it to add entries.</p>
        </li>
      `;
      return;
    }
    const activeQuotes = state.quotes.filter((quote) => quote.sectionId === activeSection.id);

    dom.quotesPanelKicker.textContent = activeSection.name.toUpperCase();
    dom.quotesPanelTitle.textContent = `${activeSection.name} collection`;

    if (!activeQuotes.length) {
      dom.quoteList.innerHTML = `
        <li class="quote-empty">
          <p>No entries yet. Tap + to add your first one.</p>
        </li>
      `;
      return;
    }

    const sorted = [...activeQuotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    dom.quoteList.innerHTML = sorted
      .map((quote, index) => {
        const author = quote.author ? `- ${escapeHtml(quote.author)}` : "Unknown";
        const created = formatDate(quote.createdAt);
        const palette = buildQuotePalette(quote);
        const quoteStyle = [
          `--quote-index:${index}`,
          `--quote-bg-a:${palette.darkA}`,
          `--quote-bg-b:${palette.darkB}`,
          `--quote-light-a:${palette.lightA}`,
          `--quote-light-b:${palette.lightB}`,
          `--quote-glow-a:${palette.glowA}`,
          `--quote-glow-b:${palette.glowB}`,
          `--quote-border:${palette.border}`,
          `--quote-light-border:${palette.lightBorder}`
        ].join(";");

        return `
          <li class="quote-item" data-quote-id="${escapeHtml(quote.id)}" style="${quoteStyle}">
            <p class="quote-text">"${escapeHtml(quote.text)}"</p>
            <p class="quote-meta">${author} | ${created}</p>
          </li>
        `;
      })
      .join("");
  }

  function canAccessQuotes() {
    return state.currentView === "quotes" && !dom.quotesView.hidden;
  }

  function openQuotesDisplay(sectionId = "") {
    if (state.currentView !== "learning") {
      return;
    }
    const hasSection = state.learningSections.some((section) => section.id === sectionId);
    if (!hasSection) {
      return;
    }
    state.activeLearningSectionId = sectionId;
    renderQuotes();
    setCurrentView("quotes");
    window.requestAnimationFrame(() => {
      dom.quoteList.scrollTop = 0;
    });
  }

      function openBotDisplay() {
    if (state.currentView !== "bot") {
      state.lastNonBotView = state.currentView === "quotes" ? "learning" : state.currentView;
    }

    clearBotFabAutoHideTimer();
    state.botFabHidden = false;
    dom.appRoot.classList.remove("bot-fab-hidden");

    startNewBotChatSession();
    clearBotAttachment();
    closeBotHistorySheet();
    closeBotMediaSheet(true);

    setCurrentView("bot");
    window.requestAnimationFrame(() => {
      autoResizeBotPrompt();
      dom.botPromptInput.focus();
      const end = dom.botPromptInput.value.length;
      dom.botPromptInput.setSelectionRange(end, end);
    });
  }

  function closeBotDisplay() {
    const fallbackView = state.lastNonBotView || "today";
    closeBotMediaSheet(true);
    clearBotSendLongPressTimer();
    setCurrentView(fallbackView);
    showBotFab(true);
  }

  function onQuotesLauncherClick(event) {
    if (state.currentView !== "learning") {
      return;
    }

    if (state.quotesLauncherIgnoreClick) {
      state.quotesLauncherIgnoreClick = false;
      event.preventDefault();
      return;
    }

    playQuotesLauncherSplashAndOpen();
  }

  function onQuotesLauncherKeyDown(event) {
    if (state.currentView !== "learning") {
      return;
    }

    if (event.target !== dom.quotesLauncher) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      playQuotesLauncherSplashAndOpen();
    }
  }

  function playQuotesLauncherSplashAndOpen() {
    window.clearTimeout(quotesLauncherTimer);
    quotesLauncherTimer = 0;

    dom.quotesLauncher.classList.remove("splashing");
    void dom.quotesLauncher.offsetWidth;
    dom.quotesLauncher.classList.add("splashing");

    quotesLauncherTimer = window.setTimeout(() => {
      dom.quotesLauncher.classList.remove("splashing");
      quotesLauncherTimer = 0;
      openQuotesDisplay();
    }, QUOTE_SPLASH_DELAY_MS);
  }

  function editQuotesLauncherLabel() {
    if (state.currentView !== "learning") {
      return;
    }

    openRenameSheet({
      type: "quotes-launcher",
      id: "quotes-launcher",
      title: "Rename Quote Card",
      subtitle: "Give your quote card a short name.",
      value: state.quotesLauncher.label,
      maxLength: 20
    });
  }

  function clearQuotesLauncherLongPressTimer() {
    if (!quotesLauncherLongPressTimer) {
      return;
    }
    window.clearTimeout(quotesLauncherLongPressTimer);
    quotesLauncherLongPressTimer = 0;
  }

  function onQuotesLauncherPointerDown(event) {
    if (state.currentView !== "learning") {
      return;
    }

    if (!isPrimaryPointer(event)) {
      return;
    }

    const resizeEdge = getQuotesLauncherResizeEdge(event);
    if (resizeEdge) {
      startQuotesLauncherInteraction(event, "resize", resizeEdge);
      return;
    }

    startQuotesLauncherInteraction(event, "drag", null);
  }

  function onQuotesLauncherHoverMove(event) {
    if (state.currentView !== "learning" || state.quotesLauncherDrag) {
      return;
    }
    const resizeEdge = getQuotesLauncherResizeEdge(event);
    const hasResizeEdge = Boolean(resizeEdge);
    if (state.quotesLauncherEdgeHover === hasResizeEdge) {
      return;
    }
    state.quotesLauncherEdgeHover = hasResizeEdge;
    dom.quotesLauncher.classList.toggle("edge-resize", hasResizeEdge);
  }

  function onQuotesLauncherHoverLeave() {
    if (state.quotesLauncherDrag) {
      return;
    }
    if (!state.quotesLauncherEdgeHover) {
      return;
    }
    state.quotesLauncherEdgeHover = false;
    dom.quotesLauncher.classList.remove("edge-resize");
  }

  function startQuotesLauncherInteraction(event, mode, resizeEdge = null) {
    const { width, height } = getLearningBounds();
    if (!width || !height) {
      return;
    }

    event.preventDefault();
    window.clearTimeout(quotesLauncherTimer);
    quotesLauncherTimer = 0;
    dom.quotesLauncher.classList.remove("splashing");

    state.quotesLauncherDrag = {
      pointerId: event.pointerId,
      mode,
      edge: resizeEdge,
      bounds: { width, height },
      startX: event.clientX,
      startY: event.clientY,
      originX: state.quotesLauncher.x,
      originY: state.quotesLauncher.y,
      originSize: state.quotesLauncher.size,
      moved: false
    };

    state.quotesLauncherEdgeHover = false;
    dom.quotesLauncher.classList.remove("edge-resize");
    dom.quotesLauncher.classList.toggle("dragging", mode === "drag");
    dom.quotesLauncher.classList.toggle("resizing", mode === "resize");

    clearQuotesLauncherLongPressTimer();
    if (mode === "drag") {
      quotesLauncherLongPressTimer = window.setTimeout(() => {
        const activeDrag = state.quotesLauncherDrag;
        if (!activeDrag || activeDrag.mode !== "drag" || activeDrag.moved || state.currentView !== "learning") {
          return;
        }

        const bounds = activeDrag.bounds || null;
        cancelQuotesLauncherInteraction();
        cancelQuotesLauncherRender();
        applyQuotesLauncherToUI(bounds);
        state.quotesLauncherIgnoreClick = true;
        editQuotesLauncherLabel();
      }, QUOTES_LAUNCHER_LONG_PRESS_MS);
    }
    window.addEventListener("pointermove", onQuotesLauncherPointerMove);
    window.addEventListener("pointerup", onQuotesLauncherPointerUp);
    window.addEventListener("pointercancel", onQuotesLauncherPointerUp);
  }

  function onQuotesLauncherPointerMove(event) {
    const drag = state.quotesLauncherDrag;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    const { width, height } = drag.bounds || getLearningBounds();
    if (!width || !height) {
      return;
    }

    if (drag.mode === "drag") {
      const maxX = Math.max(0, width - state.quotesLauncher.size);
      const maxY = Math.max(0, height - state.quotesLauncher.size);
      state.quotesLauncher.x = clampNumber(drag.originX + deltaX, 0, maxX);
      state.quotesLauncher.y = clampNumber(drag.originY + deltaY, 0, maxY);
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        drag.moved = true;
        clearQuotesLauncherLongPressTimer();
      }
      scheduleQuotesLauncherRender(drag.bounds);
      return;
    }

    const resizeDeltaCandidates = [];
    if (drag.edge?.right) {
      resizeDeltaCandidates.push(deltaX);
    }
    if (drag.edge?.left) {
      resizeDeltaCandidates.push(-deltaX);
    }
    if (drag.edge?.bottom) {
      resizeDeltaCandidates.push(deltaY);
    }
    if (drag.edge?.top) {
      resizeDeltaCandidates.push(-deltaY);
    }
    const deltaSize = resizeDeltaCandidates.length ? Math.max(...resizeDeltaCandidates) : 0;

    const maxSize = getQuotesLauncherMaxSizeForResize(width, height, drag);
    const nextSize = clampNumber(drag.originSize + deltaSize, QUOTES_LAUNCHER_MIN_SIZE, maxSize);

    let nextX = drag.originX;
    let nextY = drag.originY;
    if (drag.edge?.left) {
      nextX = drag.originX + (drag.originSize - nextSize);
    }
    if (drag.edge?.top) {
      nextY = drag.originY + (drag.originSize - nextSize);
    }

    state.quotesLauncher.size = nextSize;
    const maxX = Math.max(0, width - nextSize);
    const maxY = Math.max(0, height - nextSize);
    state.quotesLauncher.x = clampNumber(nextX, 0, maxX);
    state.quotesLauncher.y = clampNumber(nextY, 0, maxY);
    if (Math.abs(deltaSize) > 2) {
      drag.moved = true;
    }
    scheduleQuotesLauncherRender(drag.bounds);
  }

  function onQuotesLauncherPointerUp(event) {
    const drag = state.quotesLauncherDrag;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    clearQuotesLauncherLongPressTimer();
    const moved = drag.moved;
    const bounds = drag.bounds || null;
    cancelQuotesLauncherInteraction();
    cancelQuotesLauncherRender();
    applyQuotesLauncherToUI(bounds);
    saveQuotesLauncher();

    if (moved || drag.mode === "resize") {
      state.quotesLauncherIgnoreClick = true;
    }
  }

  function cancelQuotesLauncherInteraction() {
    window.removeEventListener("pointermove", onQuotesLauncherPointerMove);
    window.removeEventListener("pointerup", onQuotesLauncherPointerUp);
    window.removeEventListener("pointercancel", onQuotesLauncherPointerUp);
    state.quotesLauncherDrag = null;
    clearQuotesLauncherLongPressTimer();
    state.quotesLauncherEdgeHover = false;
    dom.quotesLauncher.classList.remove("dragging", "resizing", "edge-resize");
  }

  function applyQuotesLauncherToUI(boundsOverride = null) {
    const { width, height } = boundsOverride || getLearningBounds();
    const maxSize = getQuotesLauncherMaxSize(width, height);

    state.quotesLauncher.size = clampNumber(state.quotesLauncher.size, QUOTES_LAUNCHER_MIN_SIZE, maxSize);
    state.quotesLauncher.label = sanitizeText(state.quotesLauncher.label).slice(0, 20) || DEFAULT_QUOTES_LAUNCHER.label;

    if (width && height) {
      state.quotesLauncher.x = clampNumber(state.quotesLauncher.x, 0, Math.max(0, width - state.quotesLauncher.size));
      state.quotesLauncher.y = clampNumber(state.quotesLauncher.y, 0, Math.max(0, height - state.quotesLauncher.size));
    } else {
      state.quotesLauncher.x = Math.max(0, state.quotesLauncher.x);
      state.quotesLauncher.y = Math.max(0, state.quotesLauncher.y);
    }

    dom.quotesLauncher.style.left = `${state.quotesLauncher.x}px`;
    dom.quotesLauncher.style.top = `${state.quotesLauncher.y}px`;
    dom.quotesLauncher.style.setProperty("--quote-card-size", `${state.quotesLauncher.size}px`);
    const fontSizePx = clampNumber(Math.round(state.quotesLauncher.size * 0.26), 14, 48);
    dom.quotesLauncher.style.setProperty("--quote-card-font-size", `${fontSizePx}px`);
    dom.quotesLauncherTitle.textContent = state.quotesLauncher.label;
  }

  function scheduleQuotesLauncherRender(boundsOverride = null) {
    state.quotesLauncherRenderBounds = boundsOverride;
    if (state.quotesLauncherRenderFrame) {
      return;
    }
    state.quotesLauncherRenderFrame = window.requestAnimationFrame(() => {
      state.quotesLauncherRenderFrame = 0;
      const bounds = state.quotesLauncherRenderBounds;
      state.quotesLauncherRenderBounds = null;
      applyQuotesLauncherToUI(bounds);
    });
  }

  function cancelQuotesLauncherRender() {
    if (state.quotesLauncherRenderFrame) {
      window.cancelAnimationFrame(state.quotesLauncherRenderFrame);
      state.quotesLauncherRenderFrame = 0;
    }
    state.quotesLauncherRenderBounds = null;
  }

  function getLearningBounds() {
    return {
      width: dom.learningView.clientWidth,
      height: dom.learningView.clientHeight
    };
  }

  function getQuotesLauncherResizeEdge(event) {
    const rect = dom.quotesLauncher.getBoundingClientRect();
    const threshold = QUOTES_LAUNCHER_EDGE_RESIZE_PX;

    const nearLeft = event.clientX - rect.left <= threshold;
    const nearRight = rect.right - event.clientX <= threshold;
    const nearTop = event.clientY - rect.top <= threshold;
    const nearBottom = rect.bottom - event.clientY <= threshold;

    if (!nearLeft && !nearRight && !nearTop && !nearBottom) {
      return null;
    }

    return {
      left: nearLeft,
      right: nearRight,
      top: nearTop,
      bottom: nearBottom
    };
  }

  function getQuotesLauncherMaxSizeForResize(width, height, drag) {
    const edge = drag.edge || {};
    const maxByX = edge.left ? drag.originX + drag.originSize : width - drag.originX;
    const maxByY = edge.top ? drag.originY + drag.originSize : height - drag.originY;
    return Math.max(QUOTES_LAUNCHER_MIN_SIZE, Math.min(QUOTES_LAUNCHER_MAX_SIZE, maxByX, maxByY));
  }

  function getQuotesLauncherMaxSize(width, height) {
    if (!width || !height) {
      return QUOTES_LAUNCHER_MAX_SIZE;
    }
    return Math.max(QUOTES_LAUNCHER_MIN_SIZE, Math.min(QUOTES_LAUNCHER_MAX_SIZE, Math.min(width, height) - 8));
  }

    async   function onQuoteListClick(event) {
    if (!canAccessQuotes()) {
      return;
    }

    const item = event.target.closest(".quote-item[data-quote-id]");
    if (!item) {
      return;
    }

    closeCrudContextMenu();
  }

  function openQuoteSheet(quoteId = "") {
    if (!canAccessQuotes()) {
      return;
    }

    closeProfileSheet();
    closeDrawer();

    const quote = quoteId ? state.quotes.find((item) => item.id === quoteId) : null;

    const activeSection = getActiveLearningSection();
    const sectionLabel = sanitizeText(activeSection.name) || "Entry";

    if (quote) {
      dom.quoteEditingId.value = quote.id;
      dom.quoteText.value = quote.text;
      dom.quoteAuthor.value = quote.author || "";
      dom.quoteSheetTitle.textContent = `Edit ${sectionLabel}`;
      dom.quoteDeleteButton.hidden = false;
    } else {
      dom.quoteEditingId.value = "";
      dom.quoteText.value = "";
      dom.quoteAuthor.value = "";
      dom.quoteSheetTitle.textContent = `Add ${sectionLabel}`;
      dom.quoteDeleteButton.hidden = true;
    }

    dom.appRoot.classList.add("quote-open");
    window.requestAnimationFrame(() => {
      dom.quoteText.focus();
    });
  }

  function closeQuoteSheet() {
    dom.appRoot.classList.remove("quote-open");
  }

  function onQuoteFormSubmit(event) {
    event.preventDefault();

    const text = sanitizeText(dom.quoteText.value);
    const author = sanitizeText(dom.quoteAuthor.value);

    if (!text) {
      window.alert("Quote text is required.");
      return;
    }

    const targetSectionId = sanitizeText(state.activeLearningSectionId);
    if (!targetSectionId) {
      window.alert("Open a Learning section first.");
      return;
    }

    const editingId = dom.quoteEditingId.value;

    if (editingId) {
      state.quotes = state.quotes.map((quote) => {
        if (quote.id !== editingId) {
          return quote;
        }
        return {
          ...quote,
          text,
          author,
          sectionId: sanitizeText(quote.sectionId) || state.activeLearningSectionId,
          colorSeed: Number.isFinite(quote.colorSeed) ? quote.colorSeed : generateQuoteColorSeed(text, author),
          updatedAt: new Date().toISOString()
        };
      });
      saveQuotes();
      renderQuotes();
      closeQuoteSheet();
      return;
    }

    state.quotes.push({
      id: `quote-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      text,
      author,
      sectionId: targetSectionId,
      colorSeed: generateQuoteColorSeed(text, author),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    saveQuotes();
    renderLearningSections();
    renderQuotes();
    closeQuoteSheet();
  }

  async function onDeleteEditingQuote() {
    const editingId = dom.quoteEditingId.value;
    if (!editingId) {
      return;
    }

    const deleted = await removeQuote(editingId);
    if (deleted) {
      closeQuoteSheet();
    }
  }

  async function removeQuote(id, skipConfirm = false) {
    if (!id) {
      return false;
    }

    const quote = state.quotes.find((item) => item.id === id);
    if (!quote) {
      return false;
    }

    if (!skipConfirm) {
      const ok = await showConfirmDialog({
        title: "Delete quote?",
        message: `"${quote.text.slice(0, 56)}${quote.text.length > 56 ? "..." : ""}" will be removed.`,
        confirmLabel: "Delete"
      });
      if (!ok) {
        return false;
      }
    }

    const quoteItem = findQuoteCardById(id);
    await runDeleteVanishAnimation(quoteItem);

    state.quotes = state.quotes.filter((quoteItemState) => quoteItemState.id !== id);
    saveQuotes();
    renderLearningSections();
    renderQuotes();
    return true;
  }
  function openCrudContextMenu(target) {
    if (!target || !target.type || !target.id) {
      return;
    }

    state.contextMenuTarget = {
      type: target.type,
      id: target.id,
      x: Number.isFinite(target.x) ? target.x : NaN,
      y: Number.isFinite(target.y) ? target.y : NaN
    };

    dom.crudContextMenu.classList.toggle("quote-mode", target.type === "quote");
    dom.crudContextMenu.classList.toggle("learning-section-mode", target.type === "learning-section");
    dom.crudContextMenu.classList.toggle("task-mode", target.type === "task");
    dom.crudContextTitle.textContent = target.type === "quote"
      ? "Quote actions"
      : target.type === "learning-section"
        ? "Section actions"
        : "Task actions";

    if (target.type === "task") {
      const task = state.scheduleItems.find((item) => item.id === target.id);
      const isCompleted = Boolean(task?.completed);
      dom.crudToggleButton.hidden = false;
      dom.crudToggleText.textContent = isCompleted ? "Mark active" : "Mark complete";
      dom.crudContextMeta.textContent = task
        ? `${task.time}  |  ${task.title}`
        : "Manage this task";
    } else if (target.type === "quote") {
      dom.crudToggleButton.hidden = true;
      const quote = state.quotes.find((item) => item.id === target.id);
      const preview = quote?.text ? `${quote.text.slice(0, 84)}${quote.text.length > 84 ? "..." : ""}` : "Manage this quote";
      dom.crudContextMeta.textContent = preview;
    } else {
      dom.crudToggleButton.hidden = true;
      const section = getLearningSectionById(target.id);
      dom.crudContextMeta.textContent = section
        ? `${section.name}  |  ${state.quotes.filter((q) => q.sectionId === section.id).length} item(s)`
        : "Manage this section";
    }

    dom.appRoot.classList.add("context-menu-open");
    positionCrudContextMenu(state.contextMenuTarget.x, state.contextMenuTarget.y, target.type, target.id);
  }

  function positionCrudContextMenu(clientX, clientY, targetType = "", targetId = "") {
    const rootRect = dom.appRoot.getBoundingClientRect();
    const menu = dom.crudContextMenu;
    const compactScreen = window.innerWidth <= 680;

    if (compactScreen) {
      menu.classList.add("mobile-layout");
      menu.style.left = "12px";
      menu.style.right = "12px";
      menu.style.top = "auto";
      menu.style.bottom = "calc(12px + env(safe-area-inset-bottom))";
      return;
    }

    menu.classList.remove("mobile-layout");
    menu.style.right = "auto";
    menu.style.bottom = "auto";
    menu.style.left = "16px";
    menu.style.top = "16px";

    const menuWidth = menu.offsetWidth || 220;
    const menuHeight = menu.offsetHeight || 180;

    let anchorX = Number.isFinite(clientX) ? clientX : NaN;
    let anchorY = Number.isFinite(clientY) ? clientY : NaN;

    if ((!Number.isFinite(anchorX) || !Number.isFinite(anchorY)) && targetId) {
      let node = null;
      if (targetType === "task") {
        node = findTaskCardById(targetId);
      } else if (targetType === "quote") {
        node = findQuoteCardById(targetId);
      } else if (targetType === "learning-section") {
        node = dom.learningSectionList.querySelector(`.learning-section-card[data-learning-section-id="${targetId}"]`);
      }

      if (node) {
        const nodeRect = node.getBoundingClientRect();
        anchorX = nodeRect.left + nodeRect.width * 0.72;
        anchorY = nodeRect.top + nodeRect.height * 0.5;
      }
    }

    if (!Number.isFinite(anchorX) || !Number.isFinite(anchorY)) {
      anchorX = rootRect.left + rootRect.width * 0.5;
      anchorY = rootRect.top + rootRect.height * 0.42;
    }

    const relativeX = anchorX - rootRect.left;
    const relativeY = anchorY - rootRect.top;

    const margin = 12;
    const maxX = Math.max(margin, rootRect.width - menuWidth - margin);
    const maxY = Math.max(margin, rootRect.height - menuHeight - margin);

    const nextX = clampNumber(relativeX - 26, margin, maxX);
    const nextY = clampNumber(relativeY - 18, margin, maxY);

    menu.style.left = `${nextX}px`;
    menu.style.top = `${nextY}px`;
  }

  function closeCrudContextMenu() {
    state.contextMenuTarget = null;
    dom.crudContextMenu.classList.remove("quote-mode", "task-mode", "learning-section-mode");
    dom.crudContextMeta.textContent = "";
    dom.appRoot.classList.remove("context-menu-open");
  }

  async function onCrudContextAction(action) {
    const target = state.contextMenuTarget;
    if (!target) {
      return;
    }

    closeCrudContextMenu();

    if (target.type === "task") {
      if (action === "edit") {
        openTaskSheet(target.id);
        return;
      }

      if (action === "toggle") {
        const becameCompleted = toggleTaskCompletion(target.id);
        if (becameCompleted) {
          playTaskVictoryAnimation(target.id);
        }
        return;
      }

      if (action === "delete") {
        await removeTask(target.id);
      }
      return;
    }

    if (target.type === "quote") {
      if (action === "edit") {
        openQuoteSheet(target.id);
        return;
      }

      if (action === "delete") {
        await removeQuote(target.id);
      }
      return;
    }

    if (target.type === "learning-section") {
      if (action === "edit") {
        editLearningSectionLabel(target.id);
        return;
      }

      if (action === "delete") {
        await removeLearningSection(target.id);
      }
    }
  }

  function openBotHistorySheet() {
    if (state.currentView !== "bot") {
      return;
    }

    closeBotMediaSheet(true);
    renderBotHistoryList();
    dom.appRoot.classList.add("bot-history-open");
    dom.botHistorySheet.hidden = false;
  }

  function closeBotHistorySheet() {
    dom.appRoot.classList.remove("bot-history-open");
    dom.botHistorySheet.hidden = true;
  }

  function renderBotHistoryList() {
    if (!dom.botHistoryList) {
      return;
    }

    if (!state.botHistory.length) {
      dom.botHistoryList.innerHTML = `
        <li class="bot-history-empty">No previous chats yet.</li>
      `;
      return;
    }

    dom.botHistoryList.innerHTML = state.botHistory
      .map((session) => {
        const preview = sanitizeText(session.preview) || "Previous chat";
        const when = formatDateTime(session.updatedAt || session.createdAt);
        return `
          <li class="bot-history-item">
            <button type="button" class="bot-history-load" data-session-id="${escapeHtml(session.id)}">
              <strong>${escapeHtml(preview)}</strong>
              <span>${escapeHtml(when)}</span>
            </button>
          </li>
        `;
      })
      .join("");
  }

  function onBotHistoryListClick(event) {
    const button = event.target.closest("button[data-session-id]");
    if (!button) {
      return;
    }

    const sessionId = button.dataset.sessionId;
    if (!sessionId) {
      return;
    }

    const session = state.botHistory.find((item) => item.id === sessionId);
    if (!session || !Array.isArray(session.messages)) {
      return;
    }

    state.botMessages = session.messages.map((message, index) => ({
      id: typeof message.id === "string" ? message.id : `bot-history-${sessionId}-${index}`,
      role: message.role === "user" ? "user" : "assistant",
      text: sanitizeText(message.text),
      source: sanitizeText(message.source),
      pending: false,
      createdAt: typeof message.createdAt === "string" ? message.createdAt : new Date().toISOString()
    })).filter((message) => message.text);

    saveBotMessages();
    renderBotMessages();
    closeBotHistorySheet();
  }

  function archiveCurrentBotSession() {
    if (!Array.isArray(state.botMessages) || !state.botMessages.length) {
      return;
    }

    const cleanMessages = state.botMessages
      .filter((message) => message && (message.role === "user" || message.role === "assistant") && sanitizeText(message.text))
      .map((message, index) => ({
        id: typeof message.id === "string" ? message.id : `bot-archived-${index}`,
        role: message.role === "user" ? "user" : "assistant",
        text: sanitizeText(message.text),
        source: sanitizeText(message.source),
        pending: false,
        createdAt: typeof message.createdAt === "string" ? message.createdAt : new Date().toISOString()
      }));

    if (!cleanMessages.length) {
      return;
    }

    const firstUser = cleanMessages.find((message) => message.role === "user");
    const previewText = firstUser ? firstUser.text : cleanMessages[0].text;
    const preview = previewText.slice(0, 68);

    const nowIso = new Date().toISOString();
    state.botHistory.unshift({
      id: `session-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      preview,
      createdAt: cleanMessages[0].createdAt || nowIso,
      updatedAt: nowIso,
      messages: cleanMessages
    });

    state.botHistory = state.botHistory.slice(0, 60);
    saveBotHistory();
    renderBotHistoryList();
  }

  function startNewBotChatSession() {
    archiveCurrentBotSession();
    state.botMessages = [];
    state.botEditTargetId = "";
    closeBotPromptMenu();
    clearBotMessageLongPressTimer();
    saveBotMessages();
    renderBotMessages();
  }

  function findQuoteCardById(id) {
    const cards = dom.quoteList.querySelectorAll(".quote-item[data-quote-id]");
    for (const card of cards) {
      if (card.dataset.quoteId === id) {
        return card;
      }
    }
    return null;
  }

  function renderBotMessages() {
    if (!state.botMessages.length) {
      dom.botMessageList.innerHTML = `
        <li class="bot-empty">
          <p>Start a new chat with Pikachu.</p>
        </li>
      `;
      return;
    }

    dom.botMessageList.innerHTML = state.botMessages
      .map((message) => {
        const roleClass = message.role === "user" ? "user" : "assistant";
        if (message.pending && roleClass === "assistant") {
          return `
            <li class="bot-message assistant pending">
              <div class="bot-bubble bot-thinking-bubble" aria-live="polite" aria-label="Pikachu is thinking">
                <div class="bot-thinking-main">
                  <span class="bot-thinking-avatar" aria-hidden="true">&#9889;</span>
                  <span class="bot-thinking-dots" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <p class="bot-thinking-label">Pikachu is thinking...</p>
              </div>
            </li>
          `;
        }

        const safeText = escapeHtml(message.text).replace(/\n/g, "<br>");
        const aiBadge = roleClass === "assistant"
          ? '<span class="bot-ai-silhouette" aria-hidden="true"></span>'
          : "";
        return `
          <li class="bot-message ${roleClass} ${message.pending ? "pending" : ""}" data-bot-message-id="${escapeHtml(message.id)}">
            <div class="bot-bubble">
              ${aiBadge}
              <p>${safeText}</p>
            </div>
          </li>
        `;
      })
      .join("");

    dom.botMessageList.scrollTop = dom.botMessageList.scrollHeight;
  }

  function onBotMessageListClick(event) {
    if (state.botIsSending) {
      return;
    }

    const userMessage = event.target.closest(".bot-message.user[data-bot-message-id]");
    if (!userMessage && !event.target.closest("#botPromptMenu")) {
      closeBotPromptMenu();
    }
  }

  function onBotPromptMenuEditClick() {
    const messageId = sanitizeText(state.botPromptMenuMessageId);
    if (!messageId) {
      return;
    }

    beginEditBotMessage(messageId);
    closeBotPromptMenu();
  }

  function onBotMessagePointerDown(event) {
    if (!isPrimaryPointer(event) || state.botIsSending) {
      return;
    }

    const messageNode = event.target.closest(".bot-message.user[data-bot-message-id]");
    if (!messageNode) {
      closeBotPromptMenu();
      return;
    }

    const messageId = sanitizeText(messageNode.dataset.botMessageId);
    if (!messageId) {
      return;
    }

    clearBotMessageLongPressTimer();
    const startX = event.clientX;
    const startY = event.clientY;

    const timer = window.setTimeout(() => {
      state.botMessageLongPress = null;
      openBotPromptMenu(messageId, messageNode);
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }, BOT_MESSAGE_LONG_PRESS_MS);

    state.botMessageLongPress = {
      pointerId: event.pointerId,
      messageId,
      startX,
      startY,
      timer
    };
  }

  function onBotMessagePointerMove(event) {
    const active = state.botMessageLongPress;
    if (!active || active.pointerId !== event.pointerId) {
      return;
    }

    const movedX = Math.abs(event.clientX - active.startX);
    const movedY = Math.abs(event.clientY - active.startY);
    if (movedX > BOT_MESSAGE_LONG_PRESS_MOVE_PX || movedY > BOT_MESSAGE_LONG_PRESS_MOVE_PX) {
      clearBotMessageLongPressTimer();
    }
  }

  function onBotMessagePointerEnd(event) {
    const active = state.botMessageLongPress;
    if (!active || active.pointerId !== event.pointerId) {
      return;
    }
    clearBotMessageLongPressTimer();
  }

  function onBotMessageContextMenu(event) {
    const messageNode = event.target.closest(".bot-message.user[data-bot-message-id]");
    if (!messageNode) {
      return;
    }

    event.preventDefault();
    const messageId = sanitizeText(messageNode.dataset.botMessageId);
    if (!messageId) {
      return;
    }
    clearBotMessageLongPressTimer();
    openBotPromptMenu(messageId, messageNode);
  }

  function onGlobalPointerDown(event) {
    if (!dom.botPromptMenu || dom.botPromptMenu.hidden) {
      return;
    }

    const inMenu = Boolean(event.target?.closest?.("#botPromptMenu"));
    const inUserMessage = Boolean(event.target?.closest?.(".bot-message.user[data-bot-message-id]"));
    if (!inMenu && !inUserMessage) {
      closeBotPromptMenu();
    }
  }

  function clearBotMessageLongPressTimer() {
    if (!state.botMessageLongPress) {
      return;
    }
    if (state.botMessageLongPress.timer) {
      window.clearTimeout(state.botMessageLongPress.timer);
    }
    state.botMessageLongPress = null;
  }

  function beginEditBotMessage(messageId) {
    const message = state.botMessages.find((item) => item.id === messageId && item.role === "user");
    if (!message) {
      return;
    }

    state.botEditTargetId = messageId;
    dom.botPromptInput.value = message.text;
    autoResizeBotPrompt();
    dom.botPromptInput.focus();
    const end = dom.botPromptInput.value.length;
    dom.botPromptInput.setSelectionRange(end, end);
    setBotSettingsFeedback("Editing selected question. Send to replace this point in chat.", "success");
  }

  function openBotPromptMenu(messageId, anchorNode) {
    if (!dom.botPromptMenu) {
      return;
    }

    state.botPromptMenuMessageId = messageId;

    const rect = anchorNode.getBoundingClientRect();
    const menuWidth = 132;
    const menuHeight = 44;
    const margin = 8;
    const maxLeft = Math.max(margin, window.innerWidth - menuWidth - margin);
    const maxTop = Math.max(margin, window.innerHeight - menuHeight - margin);
    const desiredLeft = rect.right - menuWidth;
    const desiredTop = rect.top - menuHeight - 6;
    const left = clampNumber(desiredLeft, margin, maxLeft);
    const top = clampNumber(desiredTop, margin, maxTop);

    dom.botPromptMenu.style.left = `${left}px`;
    dom.botPromptMenu.style.top = `${top}px`;
    dom.botPromptMenu.hidden = false;
  }

  function closeBotPromptMenu() {
    state.botPromptMenuMessageId = "";
    if (!dom.botPromptMenu) {
      return;
    }
    dom.botPromptMenu.hidden = true;
    dom.botPromptMenu.style.left = "";
    dom.botPromptMenu.style.top = "";
  }

  function onBotPromptKeyDown(event) {
    if (event.isComposing) {
      return;
    }
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }
    event.preventDefault();
    submitBotComposer();
  }

  function submitBotComposer() {
    if (!dom.botComposerForm) {
      return;
    }

    if (typeof dom.botComposerForm.requestSubmit === "function") {
      dom.botComposerForm.requestSubmit();
      return;
    }

    if (dom.botSendButton && !dom.botSendButton.disabled) {
      dom.botSendButton.click();
      return;
    }

    dom.botComposerForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }

  function onBotSendPointerDown(event) {
    if (state.botIsSending || event.button !== 0) {
      return;
    }

    clearBotSendLongPressTimer();
    state.botSendLongPressActive = false;

    state.botSendLongPressTimer = window.setTimeout(() => {
      state.botSendLongPressTimer = 0;
      state.botSendLongPressActive = true;
      openBotMediaSheet();
      if (navigator.vibrate) {
        navigator.vibrate(12);
      }
    }, BOT_SEND_LONG_PRESS_MS);
  }

  function onBotSendPointerEnd() {
    clearBotSendLongPressTimer();
  }

  function clearBotSendLongPressTimer() {
    if (!state.botSendLongPressTimer) {
      return;
    }

    window.clearTimeout(state.botSendLongPressTimer);
    state.botSendLongPressTimer = 0;
  }

  function onBotSendContextMenu(event) {
    event.preventDefault();
    state.botSendLongPressActive = true;
    clearBotSendLongPressTimer();
    openBotMediaSheet();
  }

  function onBotSendButtonClick(event) {
    if (!state.botSendLongPressActive) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    state.botSendLongPressActive = false;
  }

  function openBotMediaSheet() {
    if (state.currentView !== "bot") {
      return;
    }

    closeBotHistorySheet();
    dom.botMediaSheet.hidden = false;
    dom.appRoot.classList.add("bot-media-open");
  }

  function closeBotMediaSheet(forceClose = false) {
    if (forceClose) {
      state.botSendLongPressActive = false;
    }

    dom.appRoot.classList.remove("bot-media-open");
    dom.botMediaSheet.hidden = true;
  }

  function onBotMediaActionClick(event) {
    const button = event.target.closest("button[data-bot-media-action]");
    if (!button) {
      return;
    }

    const action = sanitizeText(button.dataset.botMediaAction);
    if (!action) {
      return;
    }

    if (action === "camera") {
      triggerBotFileInput(dom.botCameraInput);
      return;
    }

    if (action === "gallery") {
      triggerBotFileInput(dom.botGalleryInput);
      return;
    }

    if (action === "gif") {
      triggerBotFileInput(dom.botGifInput);
      return;
    }

    if (action === "location") {
      requestBotLocationAttachment();
    }
  }

  function triggerBotFileInput(inputElement) {
    if (!inputElement) {
      return;
    }

    closeBotMediaSheet(true);
    inputElement.value = "";
    inputElement.click();
  }

  function onBotMediaInputChange(event) {
    const input = event.target;
    if (!input || !input.files || !input.files.length) {
      return;
    }

    const file = input.files[0];
    if (!file) {
      return;
    }

    setBotAttachmentFromFile(file);
    input.value = "";
  }

  function setBotAttachmentFromFile(file) {
    if (!file) {
      return;
    }

    clearBotAttachment();

    const isGif = (file.type || "").toLowerCase() === "image/gif";
    const previewUrl = (file.type || "").startsWith("image/") ? URL.createObjectURL(file) : "";

    state.botAttachment = {
      kind: isGif ? "gif" : "image",
      name: sanitizeText(file.name) || (isGif ? "animation.gif" : "photo"),
      mime: sanitizeText(file.type) || "application/octet-stream",
      size: Number.isFinite(file.size) ? file.size : 0,
      previewUrl
    };

    renderBotAttachmentPreview();
  }

  function requestBotLocationAttachment() {
    closeBotMediaSheet(true);

    if (!navigator.geolocation) {
      window.alert("Geolocation is not available on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearBotAttachment();
        const latitude = Number(position.coords.latitude || 0).toFixed(6);
        const longitude = Number(position.coords.longitude || 0).toFixed(6);
        state.botAttachment = {
          kind: "location",
          name: "Current location",
          mime: "location/coords",
          size: 0,
          previewUrl: "",
          location: {
            latitude,
            longitude
          }
        };
        renderBotAttachmentPreview();
      },
      () => {
        window.alert("Location access denied or unavailable.");
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0
      }
    );
  }

  function clearBotAttachment() {
    if (state.botAttachment && state.botAttachment.previewUrl) {
      URL.revokeObjectURL(state.botAttachment.previewUrl);
    }

    state.botAttachment = null;
    renderBotAttachmentPreview();
  }

  function renderBotAttachmentPreview() {
    if (!dom.botAttachmentPreview || !dom.botAttachmentName || !dom.botAttachmentType || !dom.botAttachmentThumb) {
      return;
    }

    if (!state.botAttachment) {
      dom.botAttachmentPreview.hidden = true;
      dom.botAttachmentThumb.hidden = true;
      dom.botAttachmentThumb.removeAttribute("src");
      dom.botAttachmentName.textContent = "Attachment";
      dom.botAttachmentType.textContent = "image";
      return;
    }

    const attachment = state.botAttachment;
    dom.botAttachmentPreview.hidden = false;
    dom.botAttachmentName.textContent = attachment.name;

    if (attachment.kind === "location") {
      dom.botAttachmentType.textContent = `${attachment.location.latitude}, ${attachment.location.longitude}`;
      dom.botAttachmentThumb.hidden = true;
      dom.botAttachmentThumb.removeAttribute("src");
      return;
    }

    dom.botAttachmentType.textContent = `${attachment.kind.toUpperCase()} - ${formatBytes(attachment.size)}`;

    if (attachment.previewUrl) {
      dom.botAttachmentThumb.src = attachment.previewUrl;
      dom.botAttachmentThumb.hidden = false;
    } else {
      dom.botAttachmentThumb.hidden = true;
      dom.botAttachmentThumb.removeAttribute("src");
    }
  }

  function formatBytes(bytes) {
    const size = Number.isFinite(bytes) ? bytes : 0;
    if (size < 1024) {
      return `${size} B`;
    }
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  function composePromptWithAttachment(prompt, attachment) {
    const safePrompt = sanitizeText(prompt);
    if (!attachment) {
      return safePrompt;
    }

    const segments = [];
    if (safePrompt) {
      segments.push(safePrompt);
    }

    if (attachment.kind === "location" && attachment.location) {
      segments.push(`[Shared Location] Latitude: ${attachment.location.latitude}, Longitude: ${attachment.location.longitude}`);
    } else {
      segments.push(`[Attached ${attachment.kind.toUpperCase()}] ${attachment.name} (${formatBytes(attachment.size)})`);
    }

    return segments.join("\n\n");
  }
  function autoResizeBotPrompt() {
    if (!dom.botPromptInput) {
      return;
    }

    const viewportHeight = Math.max(window.innerHeight || 0, 480);
    const maxHeight = Math.min(340, Math.max(180, Math.round(viewportHeight * 0.36)));
    const minHeight = 56;

    dom.botPromptInput.style.height = "auto";
    const contentHeight = dom.botPromptInput.scrollHeight;
    const nextHeight = Math.min(contentHeight, maxHeight);

    dom.botPromptInput.style.height = `${Math.max(minHeight, nextHeight)}px`;
    dom.botPromptInput.style.overflowY = contentHeight > maxHeight ? "auto" : "hidden";
  }

  function applyBotSettingsToUI() {
    dom.botProvider.value = "gemini";
    dom.botModel.value = state.botSettings.model;
    dom.botEndpoint.value = state.botSettings.endpoint;
    dom.botApiKey.value = state.botSettings.apiKey;
    dom.botApiKey.required = true;
    dom.botApiKey.placeholder = "AIza...";
    dom.botProviderHint.textContent = "Using Google Gemini API.";
  }

  function onBotProviderChange() {
    dom.botProvider.value = "gemini";
    dom.botModel.value = DEFAULT_BOT_SETTINGS.model;
    dom.botEndpoint.value = DEFAULT_BOT_SETTINGS.endpoint;
    dom.botApiKey.required = true;
    dom.botApiKey.placeholder = "AIza...";
    dom.botProviderHint.textContent = "Using Google Gemini API.";
  }

  function onBotSettingsSubmit(event) {
    event.preventDefault();

    const provider = "gemini";
    const model = sanitizeText(dom.botModel.value);
    const endpoint = sanitizeText(dom.botEndpoint.value);
    const apiKey = sanitizeText(dom.botApiKey.value);

    if (!model) {
      setBotSettingsFeedback("Model is required.", "error");
      return;
    }

    if (!endpoint) {
      setBotSettingsFeedback("Endpoint URL is required.", "error");
      return;
    }

    try {
      // Validate URL format early to avoid runtime fetch errors.
      new URL(endpoint);
    } catch {
      setBotSettingsFeedback("Please enter a valid endpoint URL.", "error");
      return;
    }

    if (!apiKey) {
      setBotSettingsFeedback("Gemini API key is required.", "error");
      return;
    }

    state.botSettings = {
      ...state.botSettings,
      provider,
      model,
      endpoint,
      apiKey
    };

    saveBotSettings();
    applyBotSettingsToUI();
    setBotSettingsFeedback("Bot settings saved.", "success");
  }

  function onBotResetSettings() {
    const ok = window.confirm("Reset bot settings to defaults?");
    if (!ok) {
      return;
    }

    state.botSettings = { ...DEFAULT_BOT_SETTINGS };
    saveBotSettings();
    applyBotSettingsToUI();
    setBotSettingsFeedback("Bot settings reset.", "success");
  }

    async function onBotClearChat() {
    if (!state.botMessages.length) {
      return;
    }

    const ok = await showConfirmDialog({
      title: "Clear chat history?",
      message: "All chat messages will vanish from Pikachu.",
      confirmLabel: "Clear"
    });

    if (!ok) {
      return;
    }

    const messageNodes = dom.botMessageList.querySelectorAll(".bot-message");
    for (const node of messageNodes) {
      node.classList.add("is-vanishing");
    }

    if (messageNodes.length) {
      await Promise.all(Array.from(messageNodes).map((node) => runDeleteVanishAnimation(node)));
    }

    state.botMessages = [];
    closeBotPromptMenu();
    clearBotMessageLongPressTimer();
    saveBotMessages();
    renderBotMessages();
    renderBotHistoryList();
    clearBotSettingsFeedback();
  }


  function clearBotSettingsFeedback() {
    dom.botSettingsFeedback.textContent = "";
    dom.botSettingsFeedback.className = "profile-feedback";
  }

  function setBotSettingsFeedback(message, type) {
    dom.botSettingsFeedback.textContent = message;
    dom.botSettingsFeedback.className = `profile-feedback ${type}`;
  }

  function getBotReplyAudio() {
    if (botReplyAudioEl) {
      return botReplyAudioEl;
    }

    try {
      botReplyAudioEl = new Audio(BOT_REPLY_SOUND_PATH);
      botReplyAudioEl.preload = "auto";
      botReplyAudioEl.volume = 0.9;
    } catch {
      botReplyAudioEl = null;
    }

    return botReplyAudioEl;
  }

  function primeBotReplyAudioOnUserGesture() {
    const audio = getBotReplyAudio();
    if (!audio) {
      return;
    }

    try {
      audio.volume = 0;
      const maybePromise = audio.play();
      if (maybePromise && typeof maybePromise.then === "function") {
        maybePromise
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0.9;
          })
          .catch(() => {
            audio.volume = 0.9;
          });
      } else {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.9;
      }
    } catch {
      audio.volume = 0.9;
    }
  }

  function playBotReplyCue() {
    const audio = getBotReplyAudio();
    if (!audio) {
      return;
    }

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0.9;
      const maybePromise = audio.play();
      if (maybePromise && typeof maybePromise.catch === "function") {
        maybePromise.catch(() => {});
      }
    } catch {
      // Ignore playback errors silently.
    }
  }

  function setBotSendingState(isSending) {
    state.botIsSending = isSending;
    dom.botPromptInput.disabled = isSending;
    dom.botSendButton.disabled = isSending;
    dom.botSendButton.innerHTML = isSending
      ? '<span class="material-symbols-rounded">hourglass_top</span>'
      : '<span class="material-symbols-rounded">send</span>';
    dom.botSendButton.setAttribute("aria-label", isSending ? "Sending" : "Send message");
  }

  function onBotStopRequest(silent = true) {
    if (!state.botIsSending && !state.botAbortController) {
      return;
    }

    if (state.botAbortController) {
      state.botAbortController.abort();
      state.botAbortController = null;
    }

    state.botMessages = state.botMessages.filter((message) => !message.pending);
    saveBotMessages();
    renderBotMessages();
    renderBotHistoryList();
    setBotSendingState(false);

    if (!silent) {
      setBotSettingsFeedback("Bot request stopped.", "success");
    }
  }

  async function tryHandleBotAppAction(rawPrompt) {
    const prompt = sanitizeText(rawPrompt);
    if (!prompt) {
      return { handled: false, reply: "" };
    }

    const lower = prompt.toLowerCase();

    const navMatch = lower.match(/\b(open|go to|show|switch to)\s+(today|learning|quotes|upcoming|bot|chat)\b/i);
    if (navMatch) {
      const target = navMatch[2] === "chat" ? "bot" : navMatch[2];
      if (target === "quotes") {
        if (!state.learningSections.length) {
          return { handled: true, reply: "No Learning section exists yet. Create one first with: Add section <name>." };
        }
        setCurrentView("learning");
        const sectionId = state.activeLearningSectionId || state.learningSections[0].id;
        openQuotesDisplay(sectionId);
        return { handled: true, reply: `Opened Quotes in section "${getLearningSectionById(sectionId)?.name || "Section"}".` };
      }

      if (target === "bot") {
        openBotDisplay();
      } else {
        setCurrentView(target);
      }
      return { handled: true, reply: `Opened ${target}.` };
    }

    const addSection = prompt.match(/^(?:add|create|new)\s+(?:learning\s+)?section\s+(.+)$/i);
    if (addSection) {
      const sectionName = sanitizeText(stripOuterQuotes(addSection[1])).slice(0, 28);
      if (!sectionName) {
        return { handled: true, reply: "Section name is required." };
      }
      if (state.learningSections.some((item) => sanitizeText(item.name).toLowerCase() === sectionName.toLowerCase())) {
        return { handled: true, reply: `Section "${sectionName}" already exists.` };
      }
      const id = `section-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
      const bounds = getLearningSectionBounds();
      const layout = getDefaultLearningSectionPlacement(state.learningSections.length, bounds);
      state.learningSections.push({ id, name: sectionName, x: layout.x, y: layout.y, size: layout.size });
      autoAlignLearningSections(false);
      saveLearningSections();
      renderLearningSections();
      return { handled: true, reply: `Created section "${sectionName}".` };
    }

    const renameSection = prompt.match(/^rename\s+section\s+(.+?)\s+(?:to|as)\s+(.+)$/i);
    if (renameSection) {
      const from = sanitizeText(stripOuterQuotes(renameSection[1]));
      const to = sanitizeText(stripOuterQuotes(renameSection[2])).slice(0, 28);
      const section = findLearningSectionByName(from);
      if (!section) {
        return { handled: true, reply: `Section "${from}" not found.` };
      }
      if (!to) {
        return { handled: true, reply: "New section name is required." };
      }
      section.name = to;
      saveLearningSections();
      renderLearningSections();
      renderQuotes();
      return { handled: true, reply: `Renamed section "${from}" to "${to}".` };
    }

    const deleteSection = prompt.match(/^(?:delete|remove)\s+section\s+(.+)$/i);
    if (deleteSection) {
      const sectionName = sanitizeText(stripOuterQuotes(deleteSection[1]));
      const section = findLearningSectionByName(sectionName);
      if (!section) {
        return { handled: true, reply: `Section "${sectionName}" not found.` };
      }
      removeLearningSectionImmediate(section.id);
      return { handled: true, reply: `Deleted section "${section.name}".` };
    }

    const addTask = prompt.match(/^(?:add|create|new)\s+task\b\s*(.+)$/i);
    if (addTask) {
      const parsed = parseTaskCreatePayload(addTask[1]);
      if (!parsed.title) {
        return { handled: true, reply: "Task title is required. Example: Add task Gym at 10:00-11:00 category fitness" };
      }
      const nextId = `task-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
      state.scheduleItems.push({
        id: nextId,
        time: parsed.time,
        title: parsed.title,
        tag: getTaskTagLabel(parsed.tagClass),
        tagClass: parsed.tagClass,
        completed: false
      });
      saveScheduleItems();
      renderSchedule();
      renderProgress();
      return { handled: true, reply: `Added task "${parsed.title}" at ${parsed.time}.` };
    }

    const completeTask = prompt.match(/^(?:complete|finish|done|mark complete)\s+task\s+(.+)$/i);
    if (completeTask) {
      const needle = sanitizeText(stripOuterQuotes(completeTask[1]));
      const task = findTaskByTitle(needle);
      if (!task) {
        return { handled: true, reply: `Task "${needle}" not found.` };
      }
      if (!task.completed) {
        task.completed = true;
        saveScheduleItems();
        renderSchedule();
        renderProgress();
        playTaskVictoryAnimation(task.id);
      }
      return { handled: true, reply: `Task "${task.title}" marked complete.` };
    }

    const deleteTask = prompt.match(/^(?:delete|remove)\s+task\s+(.+)$/i);
    if (deleteTask) {
      const needle = sanitizeText(stripOuterQuotes(deleteTask[1]));
      const task = findTaskByTitle(needle);
      if (!task) {
        return { handled: true, reply: `Task "${needle}" not found.` };
      }
      await removeTask(task.id, true);
      return { handled: true, reply: `Deleted task "${task.title}".` };
    }

    const renameTask = prompt.match(/^rename\s+task\s+(.+?)\s+(?:to|as)\s+(.+)$/i);
    if (renameTask) {
      const oldName = sanitizeText(stripOuterQuotes(renameTask[1]));
      const nextName = sanitizeText(stripOuterQuotes(renameTask[2]));
      const task = findTaskByTitle(oldName);
      if (!task) {
        return { handled: true, reply: `Task "${oldName}" not found.` };
      }
      if (!nextName) {
        return { handled: true, reply: "New task name is required." };
      }
      task.title = nextName;
      saveScheduleItems();
      renderSchedule();
      return { handled: true, reply: `Renamed task to "${nextName}".` };
    }

    const addQuote = prompt.match(/^(?:add|create|write)\s+quote\s+(.+)$/i);
    if (addQuote) {
      const parsed = parseQuoteCreatePayload(addQuote[1]);
      if (!parsed.text) {
        return { handled: true, reply: "Quote text is required. Example: Add quote \"Discipline over mood\" by You in section Motivation" };
      }

      const targetSection = ensureLearningSectionByName(parsed.sectionName || "General");
      state.quotes.push({
        id: `quote-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
        text: parsed.text,
        author: parsed.author,
        sectionId: targetSection.id,
        colorSeed: generateQuoteColorSeed(parsed.text, parsed.author),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      saveQuotes();
      renderLearningSections();
      if (state.currentView === "quotes") {
        renderQuotes();
      }
      return { handled: true, reply: `Added quote in "${targetSection.name}".` };
    }

    const deleteQuote = prompt.match(/^(?:delete|remove)\s+quote\s+(.+)$/i);
    if (deleteQuote) {
      const needle = sanitizeText(stripOuterQuotes(deleteQuote[1])).toLowerCase();
      const quote = state.quotes.find((item) => sanitizeText(item.text).toLowerCase().includes(needle));
      if (!quote) {
        return { handled: true, reply: `Quote not found for "${needle}".` };
      }
      await removeQuote(quote.id, true);
      return { handled: true, reply: "Quote deleted." };
    }

    const setName = prompt.match(/^(?:set|update|change)\s+(?:my\s+)?name(?:\s+to)?\s+(.+)$/i) || prompt.match(/^my\s+name\s+is\s+(.+)$/i);
    if (setName) {
      const nextName = sanitizeText(stripOuterQuotes(setName[1]));
      if (!nextName) {
        return { handled: true, reply: "Name cannot be empty." };
      }
      state.profile.fullName = nextName;
      if (state.account.created) {
        state.account.name = nextName;
        state.account.lastLoginAt = new Date().toISOString();
        saveUserAccount();
      }
      saveProfile();
      applyProfileToUI();
      return { handled: true, reply: `Profile name updated to "${nextName}".` };
    }

    const setEmail = prompt.match(/^(?:set|update|change)\s+(?:my\s+)?email(?:\s+to)?\s+(.+)$/i);
    if (setEmail) {
      const nextEmail = sanitizeText(stripOuterQuotes(setEmail[1])).toLowerCase();
      if (!EMAIL_PATTERN.test(nextEmail)) {
        return { handled: true, reply: "Email format looks invalid." };
      }
      state.profile.email = nextEmail;
      saveProfile();
      applyProfileToUI();
      return { handled: true, reply: `Email updated to ${nextEmail}.` };
    }

    const setPhone = prompt.match(/^(?:set|update|change)\s+(?:my\s+)?phone(?:\s+to)?\s+(.+)$/i);
    if (setPhone) {
      const nextPhone = sanitizeText(stripOuterQuotes(setPhone[1]));
      if (!PHONE_PATTERN.test(nextPhone)) {
        return { handled: true, reply: "Phone format looks invalid." };
      }
      state.profile.phone = nextPhone;
      saveProfile();
      applyProfileToUI();
      return { handled: true, reply: `Phone updated to ${nextPhone}.` };
    }

    const setCity = prompt.match(/^(?:set|update|change)\s+(?:my\s+)?city(?:\s+to)?\s+(.+)$/i);
    if (setCity) {
      const nextCity = sanitizeText(stripOuterQuotes(setCity[1]));
      state.profile.city = nextCity;
      saveProfile();
      applyProfileToUI();
      return { handled: true, reply: `City updated to ${nextCity}.` };
    }

    const setBio = prompt.match(/^(?:set|update|change)\s+(?:my\s+)?bio(?:\s+to)?\s+(.+)$/i);
    if (setBio) {
      const nextBio = sanitizeText(stripOuterQuotes(setBio[1])).slice(0, 220);
      state.profile.bio = nextBio;
      saveProfile();
      applyProfileToUI();
      return { handled: true, reply: "Bio updated." };
    }

    const capabilityQuery = lower.includes("what can you do") || lower.includes("app access") || lower === "help";
    if (capabilityQuery) {
      return {
        handled: true,
        reply: [
          "I can control TaskX directly.",
          "Commands:",
          "- Add/Create/Delete/Rename task",
          "- Mark complete task <name>",
          "- Add/Create/Delete quote",
          "- Add/Create/Rename/Delete section",
          "- Set my name/email/phone/city/bio",
          "- Open today / learning / quotes / upcoming / bot"
        ].join("\n")
      };
    }

    return { handled: false, reply: "" };
  }

  function removeLearningSectionImmediate(sectionId) {
    state.learningSections = state.learningSections.filter((item) => item.id !== sectionId);
    state.quotes = state.quotes.filter((item) => item.sectionId !== sectionId);
    if (state.learningSectionIgnoreClickId === sectionId) {
      state.learningSectionIgnoreClickId = "";
    }
    if (state.activeLearningSectionId === sectionId) {
      state.activeLearningSectionId = "";
    }
    autoAlignLearningSections(false);
    saveLearningSections();
    saveQuotes();
    renderLearningSections();
    renderQuotes();
  }

  function findTaskByTitle(title) {
    const query = normalizeMatchText(title);
    if (!query) return null;
    return state.scheduleItems.find((item) => normalizeMatchText(item.title) === query)
      || state.scheduleItems.find((item) => normalizeMatchText(item.title).includes(query))
      || null;
  }

  function findLearningSectionByName(name) {
    const query = normalizeMatchText(name);
    if (!query) return null;
    return state.learningSections.find((item) => normalizeMatchText(item.name) === query)
      || state.learningSections.find((item) => normalizeMatchText(item.name).includes(query))
      || null;
  }

  function ensureLearningSectionByName(name) {
    const nextName = sanitizeText(name).slice(0, 28) || "General";
    const existing = findLearningSectionByName(nextName);
    if (existing) {
      return existing;
    }

    const id = `section-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const bounds = getLearningSectionBounds();
    const layout = getDefaultLearningSectionPlacement(state.learningSections.length, bounds);
    const created = { id, name: nextName, x: layout.x, y: layout.y, size: layout.size };
    state.learningSections.push(created);
    autoAlignLearningSections(false);
    saveLearningSections();
    renderLearningSections();
    return created;
  }

  function parseTaskCreatePayload(raw) {
    const text = sanitizeText(raw);
    const timeRange = extractTimeRange(text) || "08:00 - 09:00";
    const tagClass = detectTaskTagClass(text);
    let title = text
      .replace(/\bat\s+\d{1,2}:\d{2}\s*(?:am|pm)?\s*-\s*\d{1,2}:\d{2}\s*(?:am|pm)?/i, "")
      .replace(/\b(?:category|tag)\s+(learning|fitness|work|language|general)\b/i, "")
      .replace(/^[|:\-]+/, "")
      .trim();
    title = stripOuterQuotes(title);
    return { title: sanitizeText(title), time: timeRange, tagClass };
  }

  function parseQuoteCreatePayload(raw) {
    const text = sanitizeText(raw);
    const sectionMatch = text.match(/\bin\s+section\s+(.+)$/i);
    const sectionName = sectionMatch ? sanitizeText(stripOuterQuotes(sectionMatch[1])) : "";
    const withoutSection = sectionMatch ? sanitizeText(text.slice(0, sectionMatch.index)) : text;
    const byMatch = withoutSection.match(/\s+by\s+(.+)$/i);
    const author = byMatch ? sanitizeText(stripOuterQuotes(byMatch[1])) : "";
    const quoteTextRaw = byMatch ? sanitizeText(withoutSection.slice(0, byMatch.index)) : withoutSection;
    const quoteText = sanitizeText(stripOuterQuotes(quoteTextRaw));
    return { text: quoteText, author, sectionName };
  }

  function detectTaskTagClass(text) {
    const lower = sanitizeText(text).toLowerCase();
    if (lower.includes("fitness") || lower.includes("gym")) return "fitness";
    if (lower.includes("work") || lower.includes("project")) return "work";
    if (lower.includes("language") || lower.includes("spanish")) return "language";
    if (lower.includes("general")) return "general";
    return "learning";
  }

  function extractTimeRange(text) {
    const match = sanitizeText(text).match(/(\d{1,2}:\d{2}\s*(?:am|pm)?)\s*-\s*(\d{1,2}:\d{2}\s*(?:am|pm)?)/i);
    if (!match) {
      return "";
    }
    const start = parseClockTo24(match[1]);
    const end = parseClockTo24(match[2]);
    if (!start || !end) return "";
    return `${start} - ${end}`;
  }

  function parseClockTo24(value) {
    const match = sanitizeText(value).match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/i);
    if (!match) return "";
    let hour = Number.parseInt(match[1], 10);
    const minute = Number.parseInt(match[2], 10);
    const meridiem = (match[3] || "").toLowerCase();
    if (!Number.isFinite(hour) || !Number.isFinite(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return "";
    }
    if (meridiem) {
      if (hour === 12) hour = 0;
      if (meridiem === "pm") hour += 12;
    }
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  function stripOuterQuotes(value) {
    const text = sanitizeText(value);
    return text.replace(/^["'`“”]+|["'`“”]+$/g, "");
  }

  function normalizeMatchText(value) {
    return sanitizeText(value).toLowerCase().replace(/\s+/g, " ");
  }

  async function onBotComposerSubmit(event) {
    event.preventDefault();

    if (state.botIsSending) {
      return;
    }

    const prompt = sanitizeText(dom.botPromptInput.value);
    const hasAttachment = Boolean(state.botAttachment);
    if (!prompt && !hasAttachment) {
      return;
    }

    const composedPrompt = composePromptWithAttachment(prompt, state.botAttachment);
    // Prime audio while still in user gesture context.
    primeBotReplyAudioOnUserGesture();

    clearBotSettingsFeedback();
    updateBotMemoryFromPrompt(composedPrompt);
    saveBotMemory();

    if (state.botEditTargetId) {
      const editIndex = state.botMessages.findIndex(
        (message) => message.id === state.botEditTargetId && message.role === "user"
      );
      if (editIndex >= 0) {
        // Replace from edited question onward so regenerated answer stays consistent.
        state.botMessages = state.botMessages.slice(0, editIndex);
      }
      state.botEditTargetId = "";
    }
    closeBotPromptMenu();
    clearBotMessageLongPressTimer();

    state.botMessages.push(createBotMessage("user", composedPrompt, "local"));
    const appAction = await tryHandleBotAppAction(composedPrompt);
    if (appAction.handled) {
      state.botMessages.push(createBotMessage("assistant", appAction.reply, "TaskX control"));
      saveBotMessages();
      renderBotMessages();
      renderBotHistoryList();
      dom.botPromptInput.value = "";
      clearBotAttachment();
      autoResizeBotPrompt();
      return;
    }

    state.botMessages.push(createBotMessage("assistant", "Thinking...", "", true));
    saveBotMessages();
    renderBotMessages();
    renderBotHistoryList();

    dom.botPromptInput.value = "";
    clearBotAttachment();
    autoResizeBotPrompt();
    setBotSendingState(true);

    const requestToken = ++state.botRequestToken;
    state.botAbortController = new AbortController();

    try {
      const conversation = buildBotConversationMessages();
      const response = await requestBotResponse(conversation, state.botAbortController.signal);

      if (requestToken !== state.botRequestToken) {
        return;
      }

      playBotReplyCue();
      state.botMessages = state.botMessages.map((message) => {
        if (!message.pending) {
          return message;
        }
        return {
          ...message,
          text: response.text,
          source: response.source,
          pending: false,
          createdAt: new Date().toISOString()
        };
      });

      saveBotMessages();
      renderBotMessages();
      renderBotHistoryList();
    } catch (error) {
      const isAbort = error && error.name === "AbortError";

      if (isAbort) {
        state.botMessages = state.botMessages.filter((message) => !message.pending);
        saveBotMessages();
        renderBotMessages();
        renderBotHistoryList();
      } else {
        const fallbackReply = buildOfflineBotReply(composedPrompt, error instanceof Error ? error.message : "Unknown error");
        playBotReplyCue();
        state.botMessages = state.botMessages.map((message) => {
          if (!message.pending) {
            return message;
          }
          return {
            ...message,
            text: fallbackReply,
            source: "Offline fallback",
            pending: false,
            createdAt: new Date().toISOString()
          };
        });
        saveBotMessages();
        renderBotMessages();
        renderBotHistoryList();
        setBotSettingsFeedback("Model request failed. Using offline fallback response.", "error");
      }
    } finally {
      if (requestToken === state.botRequestToken) {
        state.botAbortController = null;
        setBotSendingState(false);
      }
    }
  }

  

  async function requestBotResponse(conversationMessages, abortSignal) {
    return queryGeminiChat(conversationMessages, abortSignal);
  }

  async function queryGeminiChat(messages, abortSignal) {
    const endpoint = sanitizeText(state.botSettings.endpoint) || GEMINI_CHAT_ENDPOINT;
    const configuredModel = sanitizeText(state.botSettings.model) || DEFAULT_BOT_SETTINGS.model;
    const apiKey = sanitizeText(state.botSettings.apiKey) || BOT_FIXED_FREE_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is missing.");
    }

    const [systemMessage, ...historyMessages] = Array.isArray(messages) ? messages : [];
    const contents = historyMessages
      .filter((item) => item && typeof item === "object" && sanitizeText(item.content))
      .map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: sanitizeText(item.content) }]
      }));

    const systemPrompt = sanitizeText(systemMessage?.content) || DEFAULT_BOT_SETTINGS.systemPrompt;
    const payloadPrimary = {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: contents.length ? contents : [{ role: "user", parts: [{ text: "Hello" }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 700
      }
    };
    const payloadCompat = {
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: payloadPrimary.contents,
      generation_config: {
        temperature: 0.4,
        max_output_tokens: 700
      }
    };

    const urls = buildGeminiCandidateUrls(endpoint, configuredModel, apiKey);
    const payloads = [payloadPrimary, payloadCompat];
    let lastError = "";

    for (const urlInfo of urls) {
      for (const payload of payloads) {
        const response = await fetchWithTimeout(urlInfo.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify(payload),
          signal: abortSignal
        });

        if (!response.ok) {
          const details = await response.text();
          lastError = `Gemini request failed (${response.status}) for ${urlInfo.model}. ${details.slice(0, 220)}`;
          continue;
        }

        const data = await response.json();
        const text = readGeminiResponseText(data);
        if (text) {
          return {
            text,
            source: urlInfo.model
          };
        }

        lastError = `Gemini returned empty response for ${urlInfo.model}.`;
      }
    }

    throw new Error(lastError || "Gemini request failed.");
  }

  function buildGeminiCandidateUrls(endpoint, model, apiKey) {
    const cleanEndpoint = sanitizeText(endpoint).replace(/\?key=.*$/i, "");
    const modelCandidates = [model, "gemini-2.5-flash", "gemini-flash-latest", "gemini-2.0-flash"]
      .map((item) => sanitizeText(item))
      .filter(Boolean)
      .filter((item, index, arr) => arr.indexOf(item) === index);

    const urls = [];
    for (const modelName of modelCandidates) {
      let baseUrl = cleanEndpoint;
      if (/:generateContent$/i.test(baseUrl)) {
        const replaced = baseUrl.replace(/models\/[^/:]+:generateContent/i, `models/${encodeURIComponent(modelName)}:generateContent`);
        baseUrl = replaced;
      } else if (/\/models$/i.test(baseUrl)) {
        baseUrl = `${baseUrl}/${encodeURIComponent(modelName)}:generateContent`;
      } else if (/\/models\//i.test(baseUrl)) {
        baseUrl = `${baseUrl}:generateContent`;
      } else {
        baseUrl = `${GEMINI_CHAT_ENDPOINT}/${encodeURIComponent(modelName)}:generateContent`;
      }

      const separator = baseUrl.includes("?") ? "&" : "?";
      const fullUrl = `${baseUrl}${separator}key=${encodeURIComponent(apiKey)}`;
      if (!urls.some((item) => item.url === fullUrl)) {
        urls.push({ model: modelName, url: fullUrl });
      }
    }
    return urls;
  }

  function readGeminiResponseText(data) {
    return sanitizeText(
      (data?.candidates?.[0]?.content?.parts || [])
        .map((part) => sanitizeText(part?.text))
        .filter(Boolean)
        .join("\n")
    );
  }

  async function fetchWithTimeout(input, init = {}) {
    const timeoutMs = BOT_REQUEST_TIMEOUT_MS;
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
      return fetch(input, init);
    }

    const timeoutController = new AbortController();
    const timeoutId = window.setTimeout(() => {
      timeoutController.abort();
    }, timeoutMs);

    const externalSignal = init.signal;
    const signal = mergeAbortSignals(externalSignal, timeoutController.signal);

    try {
      return await fetch(input, {
        ...init,
        signal
      });
    } catch (error) {
      const isTimeout = timeoutController.signal.aborted && (!externalSignal || !externalSignal.aborted);
      if (isTimeout) {
        throw new Error(`Request timed out after ${timeoutMs / 1000}s.`);
      }
      throw error;
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  function mergeAbortSignals(primary, secondary) {
    if (!primary) {
      return secondary;
    }
    if (!secondary) {
      return primary;
    }
    if (primary.aborted) {
      return primary;
    }
    if (secondary.aborted) {
      return secondary;
    }

    const controller = new AbortController();
    const abort = () => {
      if (!controller.signal.aborted) {
        controller.abort();
      }
    };

    primary.addEventListener("abort", abort, { once: true });
    secondary.addEventListener("abort", abort, { once: true });
    return controller.signal;
  }

  function buildBotConversationMessages() {
    const history = state.botMessages
      .filter((message) => !message.pending && (message.role === "user" || message.role === "assistant"))
      .slice(-BOT_MAX_CONTEXT_MESSAGES)
      .map((message) => ({
        role: message.role,
        content: message.text
      }));

    const systemPrompt = `${state.botSettings.systemPrompt}\n\n${buildTaskContextForBot()}`;

    return [
      {
        role: "system",
        content: systemPrompt
      },
      ...history
    ];
  }

  function buildTaskContextForBot() {
    const total = state.scheduleItems.length;
    const completed = state.scheduleItems.filter((item) => item.completed).length;
    const active = Math.max(total - completed, 0);

    const profileFields = [
      `Name: ${sanitizeText(state.profile.fullName) || "User"}`,
      normalizeAge(state.profile.age) ? `Age: ${normalizeAge(state.profile.age)}` : "",
      sanitizeText(state.profile.email) ? `Email: ${sanitizeText(state.profile.email)}` : "",
      sanitizeText(state.profile.phone) ? `Phone: ${sanitizeText(state.profile.phone)}` : "",
      sanitizeText(state.profile.city) ? `City: ${sanitizeText(state.profile.city)}` : "",
      sanitizeText(state.profile.bio) ? `Bio: ${sanitizeText(state.profile.bio)}` : ""
    ].filter(Boolean);

    const taskLines = state.scheduleItems
      .map((item) => `${item.time} | ${item.title} | ${item.completed ? "completed" : "active"}`)
      .slice(0, 12);

    const quoteLines = [...state.quotes]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)
      .map((quote) => `"${quote.text}"${quote.author ? ` - ${quote.author}` : ""}`);

    const topInterests = getTopBotMemoryTerms(8);

    return [
      "User Profile:",
      ...profileFields,
      "",
      `Schedule Summary: ${total} tasks total, ${completed} completed, ${active} active.`,
      ...taskLines,
      "",
      "Recent Quotes:",
      ...(quoteLines.length ? quoteLines : ["No quotes saved yet."]),
      "",
      `Adaptive Memory: ${state.botMemory.interactions} interactions tracked.`,
      topInterests.length ? `Top interests: ${topInterests.join(", ")}` : "Top interests: none yet"
    ].join("\n");
  }

  function buildOfflineBotReply(userPrompt, errorMessage) {
    const total = state.scheduleItems.length;
    const completed = state.scheduleItems.filter((item) => item.completed).length;
    const active = Math.max(total - completed, 0);

    return [
      `I could not reach the configured model endpoint (${errorMessage}).`,
      "Offline planner mode:",
      `- You currently have ${total} tasks (${completed} completed, ${active} active).`,
      "- Try one focused 45-minute block, then 10-minute break.",
      "- Prioritize the single highest-impact task first.",
      `Your message was: "${userPrompt}"`
    ].join("\n");
  }

  function getTopBotMemoryTerms(limit = 6) {
    const terms = state.botMemory?.terms || {};
    return Object.entries(terms)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([term]) => term);
  }

  function updateBotMemoryFromPrompt(prompt) {
    const text = sanitizeText(prompt).toLowerCase();
    if (!text) {
      return;
    }

    const stopWords = new Set([
      "the", "and", "for", "with", "that", "this", "from", "have", "your", "you", "are", "was", "were", "will", "would", "could", "should", "please", "about", "into", "today", "tomorrow", "task", "tasks"
    ]);

    const words = text.match(/[a-z0-9]{3,}/g) || [];

    state.botMemory.interactions += 1;
    if (!state.botMemory.terms || typeof state.botMemory.terms !== "object") {
      state.botMemory.terms = {};
    }

    for (const word of words) {
      if (stopWords.has(word)) {
        continue;
      }
      state.botMemory.terms[word] = (state.botMemory.terms[word] || 0) + 1;
    }

    const trimmed = Object.entries(state.botMemory.terms)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 80);
    state.botMemory.terms = Object.fromEntries(trimmed);
  }
  function createBotMessage(role, text, source, pending = false) {
    return {
      id: `bot-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      role,
      text,
      source,
      pending,
      createdAt: new Date().toISOString()
    };
  }

  function getDefaultBotSettingsForProvider(provider) {
    return {
      provider: "gemini",
      model: DEFAULT_BOT_SETTINGS.model,
      endpoint: GEMINI_CHAT_ENDPOINT,
      apiKey: BOT_FIXED_FREE_API_KEY,
      systemPrompt: DEFAULT_BOT_SETTINGS.systemPrompt
    };
  }

  function applyOnboardingGate() {
    if (state.account.created) {
      closeOnboardingGate();
      return;
    }

    dom.onboardingGate.hidden = false;
    dom.appRoot.classList.add("onboarding-open");
    applyRandomOnboardingFallback();
    showOnboardingIntroStep();
    loadRandomOnboardingMedia(false);
  }

  function showOnboardingIntroStep() {
    dom.onboardingIntroPanel.hidden = false;
    dom.onboardingLoginPanel.hidden = true;
    clearOnboardingFeedback();
  }

  function showOnboardingLoginStep() {
    dom.onboardingIntroPanel.hidden = true;
    dom.onboardingLoginPanel.hidden = false;
    dom.onboardingNameInput.value = sanitizeText(state.account.name);
    onOnboardingNameInput();
    clearOnboardingFeedback();
    window.requestAnimationFrame(() => {
      dom.onboardingNameInput.focus();
    });
  }

  function closeOnboardingGate() {
    dom.onboardingGate.hidden = true;
    dom.appRoot.classList.remove("onboarding-open");
    clearOnboardingFeedback();
    stopOnboardingMedia();
  }

  function onOnboardingGetReadyClick() {
    showOnboardingLoginStep();
    loadRandomOnboardingMedia(true);
  }

  function onOnboardingNameInput() {
    const name = sanitizeText(dom.onboardingNameInput.value);
    dom.onboardingGetStartedButton.disabled = name.length < 2;
    if (name.length >= 2) {
      clearOnboardingFeedback();
    }
  }

  function onOnboardingNameSubmit(event) {
    event.preventDefault();

    const name = sanitizeText(dom.onboardingNameInput.value);
    if (name.length < 2) {
      setOnboardingFeedback("Enter your name (at least 2 characters).", "error");
      return;
    }

    const nowIso = new Date().toISOString();
    state.account = {
      created: true,
      name,
      createdAt: state.account.createdAt || nowIso,
      lastLoginAt: nowIso
    };
    saveUserAccount();

    state.profile = {
      ...state.profile,
      fullName: name
    };
    saveProfile();
    applyProfileToUI();

    setOnboardingFeedback("Welcome to TaskX.", "success");
    window.setTimeout(() => {
      closeOnboardingGate();
    }, 180);
  }

  function clearOnboardingFeedback() {
    dom.onboardingNameFeedback.textContent = "";
    dom.onboardingNameFeedback.className = "onboarding-feedback";
  }

  function setOnboardingFeedback(message, type) {
    dom.onboardingNameFeedback.textContent = message;
    dom.onboardingNameFeedback.className = `onboarding-feedback ${type}`;
  }

  function applyRandomOnboardingFallback() {
    const nextBg = getRandomMediaSource(ONBOARDING_FALLBACK_BACKGROUNDS, state.onboardingFallbackBg);
    if (!nextBg) {
      return;
    }
    state.onboardingFallbackBg = nextBg;
    dom.onboardingFallback.style.setProperty("--onboarding-fallback-bg", nextBg);
  }

  function getRandomMediaSource(pool, previousValue, excludedValues = []) {
    const list = pool
      .filter(Boolean)
      .filter((item) => !excludedValues.includes(item));
    if (!list.length) {
      return "";
    }

    if (list.length === 1) {
      return list[0];
    }

    const candidates = list.filter((item) => item !== previousValue);
    const activePool = candidates.length ? candidates : list;
    const pickIndex = Math.floor(Math.random() * activePool.length);
    return activePool[pickIndex];
  }

  function loadRandomOnboardingMedia(unmuted) {
    const videoSource = getRandomMediaSource(
      ONBOARDING_GAMING_VIDEO_SOURCES,
      state.onboardingVideoUrl,
      state.onboardingVideoFailures
    );
    const musicSource = getRandomMediaSource(ONBOARDING_MUSIC_SOURCES, state.onboardingMusicUrl);

    if (videoSource) {
      state.onboardingVideoUrl = videoSource;
      dom.onboardingVideo.classList.remove("is-ready");
      dom.onboardingVideo.src = videoSource;
      dom.onboardingVideo.muted = !unmuted;
      dom.onboardingVideo.volume = unmuted ? 0.45 : 0;
      void dom.onboardingVideo.play().catch(() => {});
    } else {
      dom.onboardingVideo.classList.remove("is-ready");
      dom.onboardingVideo.removeAttribute("src");
    }

    if (!unmuted) {
      stopFallbackOnboardingTone();
      dom.onboardingMusic.pause();
      dom.onboardingMusic.currentTime = 0;
      return;
    }

    if (musicSource) {
      state.onboardingMusicUrl = musicSource;
      dom.onboardingMusic.src = musicSource;
      dom.onboardingMusic.volume = 0.56;
      void dom.onboardingMusic.play().then(() => {
        stopFallbackOnboardingTone();
      }).catch(() => {
        startFallbackOnboardingTone();
      });
    } else {
      startFallbackOnboardingTone();
    }
  }

  function stopOnboardingMedia() {
    state.onboardingVideoUrl = "";
    state.onboardingMusicUrl = "";
    state.onboardingVideoFailures = [];

    dom.onboardingVideo.pause();
    dom.onboardingVideo.classList.remove("is-ready");
    dom.onboardingVideo.removeAttribute("src");
    dom.onboardingVideo.load();

    dom.onboardingMusic.pause();
    dom.onboardingMusic.removeAttribute("src");
    dom.onboardingMusic.load();
    stopFallbackOnboardingTone();
  }

  function onOnboardingMediaLoaded() {
    dom.onboardingVideo.classList.add("is-ready");
  }

  function onOnboardingMediaError() {
    if (state.onboardingVideoUrl && !state.onboardingVideoFailures.includes(state.onboardingVideoUrl)) {
      state.onboardingVideoFailures.push(state.onboardingVideoUrl);
    }

    if (!dom.onboardingGate.hidden) {
      loadRandomOnboardingMedia(dom.onboardingLoginPanel.hidden === false);
    }
  }

  function onOnboardingMusicError() {
    if (!dom.onboardingGate.hidden && !dom.onboardingLoginPanel.hidden) {
      const musicSource = getRandomMediaSource(ONBOARDING_MUSIC_SOURCES, state.onboardingMusicUrl);
      if (!musicSource) {
        startFallbackOnboardingTone();
        return;
      }
      state.onboardingMusicUrl = musicSource;
      dom.onboardingMusic.src = musicSource;
      dom.onboardingMusic.volume = 0.56;
      void dom.onboardingMusic.play().then(() => {
        stopFallbackOnboardingTone();
      }).catch(() => {
        startFallbackOnboardingTone();
      });
    }
  }

  function startFallbackOnboardingTone() {
    if (state.onboardingToneOscillator) {
      return;
    }

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      return;
    }

    try {
      state.onboardingAudioContext = state.onboardingAudioContext || new AudioCtx();
      const ctx = state.onboardingAudioContext;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const gain = ctx.createGain();
      gain.gain.value = 0.018;
      gain.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = 196;
      osc.connect(gain);
      osc.start();

      const notes = [131, 147, 165, 196, 220, 247, 262];
      state.onboardingToneTimer = window.setInterval(() => {
        if (!state.onboardingToneOscillator || !state.onboardingAudioContext) {
          return;
        }
        const next = notes[Math.floor(Math.random() * notes.length)];
        state.onboardingToneOscillator.frequency.setTargetAtTime(next, state.onboardingAudioContext.currentTime, 0.09);
      }, 820);

      state.onboardingToneOscillator = osc;
      state.onboardingToneGain = gain;
    } catch {
      // Ignore fallback tone failures on unsupported devices.
    }
  }

  function stopFallbackOnboardingTone() {
    if (state.onboardingToneTimer) {
      window.clearInterval(state.onboardingToneTimer);
      state.onboardingToneTimer = 0;
    }

    if (state.onboardingToneOscillator) {
      try {
        state.onboardingToneOscillator.stop();
      } catch {
        // no-op
      }
      state.onboardingToneOscillator.disconnect();
      state.onboardingToneOscillator = null;
    }

    if (state.onboardingToneGain) {
      state.onboardingToneGain.disconnect();
      state.onboardingToneGain = null;
    }
  }

    function applyProfileToUI() {
    const fullName = sanitizeText(state.profile.fullName) || "User";
    const ageValue = normalizeAge(state.profile.age);
    const subtitle =
      sanitizeText(state.profile.email) ||
      sanitizeText(state.profile.phone) ||
      (ageValue ? `Age ${ageValue}` : "Personal Planner");

    dom.drawerProfileAvatar.textContent = fullName.charAt(0).toUpperCase();
    dom.drawerProfileName.textContent = fullName;
    dom.drawerProfileMeta.textContent = subtitle;

    populateProfileForm();
    updateTodayHeaderRealtime();
  }

  function populateProfileForm() {
    dom.profileName.value = state.profile.fullName;
    dom.profileAge.value = state.profile.age;
    dom.profileEmail.value = state.profile.email;
    dom.profilePhone.value = state.profile.phone;
    dom.profileBirthDate.value = state.profile.birthDate;
    dom.profileCity.value = state.profile.city;
    dom.profileAddress.value = state.profile.address;
    dom.profileBio.value = state.profile.bio;
    dom.profileLockEnabled.checked = Boolean(state.profile.lockEnabled);
    dom.profilePassword.value = "";
    dom.profilePasswordConfirm.value = "";
  }

  function applyPasswordFeatureState() {
    if (PASSWORD_FEATURE_ENABLED) {
      return;
    }

    dom.profileLockEnabled.checked = false;
    dom.profileLockEnabled.disabled = true;
    dom.profilePassword.disabled = true;
    dom.profilePasswordConfirm.disabled = true;

    if (dom.profileLockRow) {
      dom.profileLockRow.hidden = true;
    }
    if (dom.profilePasswordLabel) {
      dom.profilePasswordLabel.hidden = true;
    }
    if (dom.profilePasswordConfirmLabel) {
      dom.profilePasswordConfirmLabel.hidden = true;
    }

    dom.profilePassword.hidden = true;
    dom.profilePasswordConfirm.hidden = true;

    if (dom.profileHint) {
      dom.profileHint.textContent = "Password feature is temporarily disabled.";
    }

    state.profile.lockEnabled = false;
    state.profile.passwordHash = "";
    saveProfile();
  }

  function openProfileSheet() {
    closeTaskSheet();
    closeQuoteSheet();
    closeDrawer();
    clearProfileFeedback();
    populateProfileForm();
    dom.appRoot.classList.add("profile-open");
    window.requestAnimationFrame(() => {
      dom.profileName.focus();
    });
  }

  function closeProfileSheet() {
    dom.appRoot.classList.remove("profile-open");
  }

  function onProfileSubmit(event) {
    event.preventDefault();

    const fullName = sanitizeText(dom.profileName.value);
    const age = normalizeAge(dom.profileAge.value);
    const rawAge = sanitizeText(dom.profileAge.value);
    const email = sanitizeText(dom.profileEmail.value).toLowerCase();
    const phone = sanitizeText(dom.profilePhone.value);
    const birthDate = sanitizeText(dom.profileBirthDate.value);
    const city = sanitizeText(dom.profileCity.value);
    const address = sanitizeText(dom.profileAddress.value);
    const bio = sanitizeText(dom.profileBio.value);

    if (fullName.length < 2) {
      setProfileFeedback("Please enter your full name (at least 2 characters).", "error");
      return;
    }

    if (rawAge && !age) {
      setProfileFeedback("Please enter a valid age between 1 and 120.", "error");
      return;
    }

    if (email && !EMAIL_PATTERN.test(email)) {
      setProfileFeedback("Please enter a valid email address.", "error");
      return;
    }

    if (phone && !PHONE_PATTERN.test(phone)) {
      setProfileFeedback("Please enter a valid phone number.", "error");
      return;
    }

    state.profile = {
      ...state.profile,
      fullName,
      age,
      email,
      phone,
      birthDate,
      city,
      address,
      bio,
      lockEnabled: false,
      passwordHash: ""
    };

    if (state.account.created) {
      state.account.name = fullName;
      saveUserAccount();
    }

    saveProfile();
    applyProfileToUI();
    setProfileFeedback("Profile updated successfully.", "success");

    window.setTimeout(() => {
      closeProfileSheet();
    }, 220);
  }

  function onProfileReset() {
    const ok = window.confirm("Reset all profile details?");
    if (!ok) {
      return;
    }

    state.profile = state.account.created
      ? { ...DEFAULT_PROFILE, fullName: state.account.name }
      : { ...DEFAULT_PROFILE };
    saveProfile();
    applyProfileToUI();
    setProfileFeedback("Profile reset complete.", "success");
  }

  function clearProfileFeedback() {
    dom.profileFeedback.textContent = "";
    dom.profileFeedback.className = "profile-feedback";
  }

  function setProfileFeedback(message, type) {
    dom.profileFeedback.textContent = message;
    dom.profileFeedback.className = `profile-feedback ${type}`;
  }


  function onThemeToggleClick(event) {
    const nextTheme = state.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme, true, event);
  }

  function getThemeTransitionPoint(triggerEvent) {
    if (triggerEvent && Number.isFinite(triggerEvent.clientX) && Number.isFinite(triggerEvent.clientY)) {
      return { x: triggerEvent.clientX, y: triggerEvent.clientY };
    }

    if (dom.themeToggleButton) {
      const rect = dom.themeToggleButton.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  function getThemeRevealScale(point) {
    const maxX = Math.max(point.x, window.innerWidth - point.x);
    const maxY = Math.max(point.y, window.innerHeight - point.y);
    const radius = Math.sqrt(maxX * maxX + maxY * maxY);
    return Math.max(1, Math.ceil(radius / 11));
  }

  function getSavedThemePreference() {
    const saved = sanitizeText(safeStorageGet(THEME_STORAGE_KEY)).toLowerCase();
    return saved === "dark" || saved === "light" ? saved : "";
  }

  function loadThemePreference() {
    const saved = getSavedThemePreference();
    if (saved) {
      return saved;
    }

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }

    return "dark";
  }

  function applyTheme(theme, persist = true, triggerEvent = null) {
    const normalized = theme === "light" ? "light" : "dark";
    const previous = state.theme === "light" ? "light" : "dark";
    const hasThemeAlready = Boolean(document.body.dataset.theme);
    const prefersReducedMotion = Boolean(
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const shouldAnimate = hasThemeAlready && previous !== normalized && !prefersReducedMotion;

    state.theme = normalized;

    if (shouldAnimate) {
      const point = getThemeTransitionPoint(triggerEvent);
      const revealScale = getThemeRevealScale(point);

      document.body.style.setProperty("--theme-ripple-x", `${point.x}px`);
      document.body.style.setProperty("--theme-ripple-y", `${point.y}px`);
      document.body.style.setProperty("--theme-ripple-scale", String(revealScale));

      document.body.classList.remove(
        "theme-transitioning",
        "theme-transition-light",
        "theme-transition-dark",
        "theme-ripple-active"
      );

      // Force a reflow so repeated toggles restart animation instantly.
      void document.body.offsetWidth;

      document.body.classList.add(
        "theme-transitioning",
        normalized === "light" ? "theme-transition-light" : "theme-transition-dark",
        "theme-ripple-active"
      );
    }

    document.body.dataset.theme = normalized;
    dom.appRoot.dataset.theme = normalized;

    if (dom.themeToggleIcon) {
      // Show the currently active theme icon (dark->moon, light->sun).
      dom.themeToggleIcon.textContent = normalized === "dark" ? "dark_mode" : "light_mode";
    }

    if (dom.themeToggleButton) {
      dom.themeToggleButton.setAttribute(
        "aria-label",
        normalized === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    if (persist) {
      safeStorageSet(THEME_STORAGE_KEY, normalized);
    }

    if (shouldAnimate) {
      if (state.themeTransitionTimer) {
        window.clearTimeout(state.themeTransitionTimer);
      }

      state.themeTransitionTimer = window.setTimeout(() => {
        document.body.classList.remove(
          "theme-transitioning",
          "theme-transition-light",
          "theme-transition-dark",
          "theme-ripple-active"
        );
        state.themeTransitionTimer = 0;
      }, THEME_REVEAL_DURATION_MS + 30);
    }
  }

  function setupSystemThemeSync() {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const applySystemTheme = () => {
      if (getSavedThemePreference()) {
        return;
      }

      applyTheme(mediaQuery.matches ? "light" : "dark", false);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", applySystemTheme);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(applySystemTheme);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        applySystemTheme();
      }
    });
  }
  function applyPerformanceMode() {
    const memory = Number(navigator.deviceMemory || 0);
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);
    const reducedMotion = Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const lowMemoryDevice = memory > 0 && memory <= 4;
    const userAgent = String(navigator.userAgent || "");
    const isAndroid = /android/i.test(userAgent);
    const isWebView = /\bwv\b/i.test(userAgent) || /version\/\d+\.\d+ chrome\//i.test(userAgent);
    const enableLiteMode = lowMemoryDevice || saveData || reducedMotion || isAndroid || isWebView;

    document.body.classList.toggle("perf-lite", enableLiteMode);
  }

  function startRealtimeClock() {
    updateTodayHeaderRealtime();

    if (state.clockTimer) {
      window.clearInterval(state.clockTimer);
    }

    state.clockTimer = window.setInterval(() => {
      updateTodayHeaderRealtime();
    }, 1000);
  }

  function updateTodayHeaderRealtime() {
    const fullName = sanitizeText(state.profile.fullName) || "User";
    const firstName = fullName.split(/\s+/)[0];
    const now = new Date();

    const greeting = getGreetingForHour(now.getHours());
    dom.greetingText.textContent = `${greeting}, ${firstName}`;

    dom.todayDateText.textContent = now.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    dom.todayTimeText.textContent = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  function getGreetingForHour(hour) {
    if (hour >= 5 && hour < 12) {
      return "Good morning";
    }
    if (hour >= 12 && hour < 17) {
      return "Good afternoon";
    }
    if (hour >= 17 && hour < 22) {
      return "Good evening";
    }
    return "Good night";
  }

  function onUserInteraction() {
    if (state.currentView === "bot") {
      return;
    }

    if (
      dom.appRoot.classList.contains("profile-open") ||
      dom.appRoot.classList.contains("quote-open") ||
      dom.appRoot.classList.contains("task-open") ||
      dom.appRoot.classList.contains("confirm-open") ||
      dom.appRoot.classList.contains("context-menu-open") ||
      dom.appRoot.classList.contains("bot-history-open") || dom.appRoot.classList.contains("bot-media-open")
    ) {
      return;
    }

    if (state.botFabHidden) {
      return;
    }

    scheduleBotFabAutoHide();
  }

  function onVisibilityChange() {
    if (document.hidden) {
      clearBotFabAutoHideTimer();
      clearBotSendLongPressTimer();
      closeBotMediaSheet(true);
      return;
    }

    if (state.currentView !== "bot") {
      showBotFab(true);
    }
  }

  function clearBotFabAutoHideTimer() {
    if (!state.botFabAutoHideTimer) {
      return;
    }

    window.clearTimeout(state.botFabAutoHideTimer);
    state.botFabAutoHideTimer = 0;
  }

  function scheduleBotFabAutoHide() {
    clearBotFabAutoHideTimer();

    state.botFabAutoHideTimer = window.setTimeout(() => {
      if (state.currentView === "bot") {
        return;
      }

      state.botFabHidden = true;
      dom.appRoot.classList.add("bot-fab-hidden");
    }, BOT_FAB_AUTO_HIDE_MS);
  }

  function showBotFab(shouldScheduleAutoHide = false) {
    clearBotFabAutoHideTimer();
    state.botFabHidden = false;
    dom.appRoot.classList.remove("bot-fab-hidden");

    if (shouldScheduleAutoHide && state.currentView !== "bot") {
      scheduleBotFabAutoHide();
    }
  }

  function onBotRevealButtonClick() {
    showBotFab(true);
  }

  function showConfirmDialog(options = {}) {
    const title = sanitizeText(options.title) || "Confirm action";
    const message = sanitizeText(options.message) || "This action cannot be undone.";
    const confirmLabel = sanitizeText(options.confirmLabel) || "Delete";

    if (state.confirmResolver) {
      resolveConfirmDialog(false);
    }

    closeDrawer();

    dom.confirmTitle.textContent = title;
    dom.confirmMessage.textContent = message;
    dom.confirmAcceptButton.textContent = confirmLabel;
    dom.appRoot.classList.add("confirm-open");

    return new Promise((resolve) => {
      state.confirmResolver = resolve;
    });
  }

  function resolveConfirmDialog(accepted) {
    dom.appRoot.classList.remove("confirm-open");

    if (!state.confirmResolver) {
      return;
    }

    const resolver = state.confirmResolver;
    state.confirmResolver = null;
    resolver(Boolean(accepted));
  }

  function runDeleteVanishAnimation(element) {
    if (!element) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      let settled = false;

      const finish = () => {
        if (settled) {
          return;
        }
        settled = true;
        element.removeEventListener("animationend", onAnimationEnd);
        resolve();
      };

      const onAnimationEnd = (event) => {
        if (event.target !== element) {
          return;
        }
        finish();
      };

      element.addEventListener("animationend", onAnimationEnd);
      element.classList.add("is-vanishing");
      window.setTimeout(finish, 420);
    });
  }
  function onWindowResize() {
    if (state.resizeTicking) {
      return;
    }

    state.resizeTicking = true;
    window.requestAnimationFrame(() => {
      applyAdaptiveLayout(false);
      scheduleQuotesLauncherRender();
      if (state.currentView === "learning" || !dom.learningView.hidden) {
        renderLearningSections();
      }

      if (dom.appRoot.classList.contains("context-menu-open") && state.contextMenuTarget) {
        positionCrudContextMenu(
          state.contextMenuTarget.x,
          state.contextMenuTarget.y,
          state.contextMenuTarget.type,
          state.contextMenuTarget.id
        );
      }

      state.resizeTicking = false;
    });
  }

  function applyAdaptiveLayout(initialLoad) {
    const previousSize = state.size;
    const currentSize = detectSize(window.innerWidth);

    state.size = currentSize;
    dom.appRoot.dataset.size = currentSize;

    if (currentSize === "expanded") {
      dom.appRoot.classList.add("drawer-open");
      return;
    }

    if (currentSize === "medium") {
      if (initialLoad || previousSize === "expanded") {
        dom.appRoot.classList.add("drawer-open");
      }
      return;
    }

    dom.appRoot.classList.remove("drawer-open");
  }

  function detectSize(width) {
    if (width >= BREAKPOINTS.expanded) {
      return "expanded";
    }
    if (width >= BREAKPOINTS.medium) {
      return "medium";
    }
    return "compact";
  }

  function toggleDrawer() {
    if (state.size === "expanded" || dom.appRoot.classList.contains("profile-open") || dom.appRoot.classList.contains("quote-open") || dom.appRoot.classList.contains("task-open") || dom.appRoot.classList.contains("confirm-open") || dom.appRoot.classList.contains("context-menu-open") || dom.appRoot.classList.contains("bot-history-open") || dom.appRoot.classList.contains("bot-media-open")) {
      return;
    }

    if (dom.appRoot.classList.contains("drawer-open")) {
      closeDrawer();
      return;
    }
    openDrawer();
  }

  function openDrawer() {
    if (state.size === "expanded" || dom.appRoot.classList.contains("profile-open") || dom.appRoot.classList.contains("quote-open") || dom.appRoot.classList.contains("task-open") || dom.appRoot.classList.contains("confirm-open") || dom.appRoot.classList.contains("context-menu-open") || dom.appRoot.classList.contains("bot-history-open") || dom.appRoot.classList.contains("bot-media-open")) {
      return;
    }
    dom.appRoot.classList.add("drawer-open");
  }

  function closeDrawer() {
    if (state.size === "expanded") {
      return;
    }
    dom.appRoot.classList.remove("drawer-open");
  }

  function onTouchStart(event) {
    if (state.size === "expanded" || dom.appRoot.classList.contains("profile-open") || dom.appRoot.classList.contains("quote-open") || dom.appRoot.classList.contains("task-open") || dom.appRoot.classList.contains("confirm-open") || dom.appRoot.classList.contains("context-menu-open") || dom.appRoot.classList.contains("bot-history-open") || dom.appRoot.classList.contains("bot-media-open") || !event.touches.length) {
      return;
    }

    const touch = event.touches[0];
    state.touchStartX = touch.clientX;
    state.touchStartY = touch.clientY;
    state.touchLastX = touch.clientX;
    state.touchLastY = touch.clientY;
    state.touchActive = true;
  }

  function onTouchMove(event) {
    if (!state.touchActive || !event.touches.length) {
      return;
    }

    const touch = event.touches[0];
    state.touchLastX = touch.clientX;
    state.touchLastY = touch.clientY;
  }

  function onTouchEnd() {
    if (!state.touchActive || state.size === "expanded") {
      resetTouchState();
      return;
    }

    const deltaX = state.touchLastX - state.touchStartX;
    const deltaY = Math.abs(state.touchLastY - state.touchStartY);
    const isMostlyHorizontal = Math.abs(deltaX) > deltaY;
    const isDrawerOpen = dom.appRoot.classList.contains("drawer-open");
    const openedFromEdge = state.touchStartX <= 24;

    if (isMostlyHorizontal && !isDrawerOpen && openedFromEdge && deltaX >= 60) {
      openDrawer();
    }

    if (isMostlyHorizontal && isDrawerOpen && deltaX <= -60) {
      closeDrawer();
    }

    resetTouchState();
  }

  function resetTouchState() {
    state.touchStartX = 0;
    state.touchStartY = 0;
    state.touchLastX = 0;
    state.touchLastY = 0;
    state.touchActive = false;
  }

  function loadScheduleItems() {
    const fallback = DEFAULT_SCHEDULE_ITEMS.map((item) => ({ ...item }));
    const raw = safeStorageGet(TASK_STORAGE_KEY);

    if (!raw) {
      return fallback;
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.length) {
        return fallback;
      }

      return parsed
        .filter((item) => item && typeof item === "object")
        .map((item, index) => ({
          id: typeof item.id === "string" ? item.id : `task-${index + 1}`,
          time: typeof item.time === "string" ? item.time : "00:00 - 00:00",
          title: typeof item.title === "string" ? item.title : "Untitled task",
          tag: typeof item.tag === "string" && sanitizeText(item.tag) ? sanitizeText(item.tag) : getTaskTagLabel(item.tagClass),
          tagClass: normalizeTagClass(item.tagClass),
          completed: Boolean(item.completed)
        }));
    } catch {
      return fallback;
    }
  }

  function saveScheduleItems() {
    safeStorageSet(TASK_STORAGE_KEY, JSON.stringify(state.scheduleItems));
  }

  function loadUserAccount() {
    const raw = safeStorageGet(USER_ACCOUNT_STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_USER_ACCOUNT };
    }

    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return { ...DEFAULT_USER_ACCOUNT };
      }

      const name = sanitizeText(parsed.name);
      const created =
        Boolean(name) &&
        (Boolean(parsed.created) || Boolean(sanitizeText(parsed.createdAt)) || Boolean(sanitizeText(parsed.lastLoginAt)));

      return {
        created,
        name: created ? name : "",
        createdAt: sanitizeText(parsed.createdAt),
        lastLoginAt: sanitizeText(parsed.lastLoginAt)
      };
    } catch {
      return { ...DEFAULT_USER_ACCOUNT };
    }
  }

  function saveUserAccount() {
    safeStorageSet(USER_ACCOUNT_STORAGE_KEY, JSON.stringify(state.account));
  }

  function syncProfileWithAccount() {
    if (!state.account.created) {
      return;
    }

    const accountName = sanitizeText(state.account.name);
    let shouldSaveProfile = false;

    if (!sanitizeText(state.profile.fullName) || state.profile.fullName === DEFAULT_PROFILE.fullName) {
      state.profile.fullName = accountName || state.profile.fullName;
      shouldSaveProfile = true;
    }

    if (shouldSaveProfile) {
      saveProfile();
    }
  }

  function loadProfile() {
    const raw = safeStorageGet(PROFILE_STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_PROFILE };
    }

    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return { ...DEFAULT_PROFILE };
      }

      return {
        fullName: sanitizeText(parsed.fullName) || DEFAULT_PROFILE.fullName,
        age: normalizeAge(parsed.age),
        email: sanitizeText(parsed.email).toLowerCase(),
        phone: sanitizeText(parsed.phone),
        birthDate: sanitizeText(parsed.birthDate),
        city: sanitizeText(parsed.city),
        address: sanitizeText(parsed.address),
        bio: sanitizeText(parsed.bio),
        lockEnabled: false,
        passwordHash: ""
      };
    } catch {
      return { ...DEFAULT_PROFILE };
    }
  }

  function saveProfile() {
    safeStorageSet(PROFILE_STORAGE_KEY, JSON.stringify(state.profile));
  }

  function loadQuotes() {
    const raw = safeStorageGet(QUOTES_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      let didMigrateColorSeeds = false;
      let didMigrateSectionIds = false;

      const normalized = parsed
        .filter((item) => item && typeof item === "object")
        .map((item, index) => {
          const id = typeof item.id === "string" ? item.id : `quote-${index + 1}`;
          const text = sanitizeText(item.text);
          const author = sanitizeText(item.author);
          const hasColorSeed = Number.isFinite(item.colorSeed);
          const colorSeed = hasColorSeed ? item.colorSeed : generateQuoteColorSeed(text, author);
          const sectionIdRaw = sanitizeText(item.sectionId);
          const sectionId = sectionIdRaw;

          if (!hasColorSeed && text) {
            didMigrateColorSeeds = true;
          }
          if (item.sectionId !== sectionIdRaw && text) {
            didMigrateSectionIds = true;
          }

          return {
            id,
            text,
            author,
            sectionId,
            colorSeed,
            createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
            updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : new Date().toISOString()
          };
        })
        .filter((quote) => quote.text);

      if (didMigrateColorSeeds || didMigrateSectionIds) {
        safeStorageSet(QUOTES_STORAGE_KEY, JSON.stringify(normalized));
      }

      return normalized;
    } catch {
      return [];
    }
  }

  function saveQuotes() {
    safeStorageSet(QUOTES_STORAGE_KEY, JSON.stringify(state.quotes));
  }

  function loadLearningSections() {
    const raw = safeStorageGet(LEARNING_SECTIONS_STORAGE_KEY);
    const fallback = [];
    if (!raw) {
      return fallback;
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return fallback;
      }

      const seen = new Set();
      const custom = parsed
        .filter((item) => item && typeof item === "object")
        .map((item) => {
          const id = sanitizeText(item.id);
          const name = sanitizeText(item.name);
          const x = Number.isFinite(item.x) ? item.x : undefined;
          const y = Number.isFinite(item.y) ? item.y : undefined;
          const size = Number.isFinite(item.size) ? item.size : undefined;
          return { id, name, x, y, size };
        })
        .filter((item) => item.id && item.name && !seen.has(item.id))
        .map((item) => {
          seen.add(item.id);
          return item;
        });

      return custom;
    } catch {
      return fallback;
    }
  }

  function saveLearningSections() {
    const custom = state.learningSections
      .map((section) => ({
        id: sanitizeText(section.id),
        name: sanitizeText(section.name),
        x: Number.isFinite(section.x) ? section.x : undefined,
        y: Number.isFinite(section.y) ? section.y : undefined,
        size: Number.isFinite(section.size) ? section.size : undefined
      }))
      .filter((section) => section.id && section.name);

    safeStorageSet(LEARNING_SECTIONS_STORAGE_KEY, JSON.stringify(custom));
  }

  function loadQuotesLauncher() {
    const raw = safeStorageGet(QUOTES_LAUNCHER_STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_QUOTES_LAUNCHER };
    }

    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return { ...DEFAULT_QUOTES_LAUNCHER };
      }

      return {
        x: Number.isFinite(parsed.x) ? parsed.x : DEFAULT_QUOTES_LAUNCHER.x,
        y: Number.isFinite(parsed.y) ? parsed.y : DEFAULT_QUOTES_LAUNCHER.y,
        size: Number.isFinite(parsed.size) ? parsed.size : DEFAULT_QUOTES_LAUNCHER.size,
        label: sanitizeText(parsed.label) || DEFAULT_QUOTES_LAUNCHER.label
      };
    } catch {
      return { ...DEFAULT_QUOTES_LAUNCHER };
    }
  }

  function saveQuotesLauncher() {
    safeStorageSet(
      QUOTES_LAUNCHER_STORAGE_KEY,
      JSON.stringify({
        x: state.quotesLauncher.x,
        y: state.quotesLauncher.y,
        size: state.quotesLauncher.size,
        label: state.quotesLauncher.label
      })
    );
  }

  function loadBotSettings() {
    // Force simple chat mode: integrated free backend, no user-facing model/provider controls.
    return { ...DEFAULT_BOT_SETTINGS };
  }

  function saveBotSettings() {
    safeStorageSet(BOT_SETTINGS_STORAGE_KEY, JSON.stringify(state.botSettings));
  }
  function loadBotMemory() {
    const raw = safeStorageGet(BOT_MEMORY_STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_BOT_MEMORY };
    }

    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return { ...DEFAULT_BOT_MEMORY };
      }

      return {
        interactions: Number.isFinite(parsed.interactions) ? Math.max(0, parsed.interactions) : 0,
        terms: parsed.terms && typeof parsed.terms === "object" ? parsed.terms : {}
      };
    } catch {
      return { ...DEFAULT_BOT_MEMORY };
    }
  }

  function saveBotMemory() {
    safeStorageSet(BOT_MEMORY_STORAGE_KEY, JSON.stringify(state.botMemory));
  }
  function loadBotMessages() {
    const raw = safeStorageGet(BOT_MESSAGES_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter((item) => item && typeof item === "object")
        .map((item, index) => ({
          id: typeof item.id === "string" ? item.id : `bot-${index + 1}`,
          role: item.role === "user" ? "user" : "assistant",
          text: sanitizeText(item.text),
          source: sanitizeText(item.source),
          pending: false,
          createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString()
        }))
        .filter((message) => message.text);
    } catch {
      return [];
    }
  }

  function saveBotMessages() {
    safeStorageSet(BOT_MESSAGES_STORAGE_KEY, JSON.stringify(state.botMessages));
  }
  function loadBotHistory() {
    const raw = safeStorageGet(BOT_HISTORY_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter((session) => session && typeof session === "object")
        .map((session, index) => ({
          id: typeof session.id === "string" ? session.id : `session-${index + 1}`,
          preview: sanitizeText(session.preview) || "Previous chat",
          createdAt: typeof session.createdAt === "string" ? session.createdAt : new Date().toISOString(),
          updatedAt: typeof session.updatedAt === "string" ? session.updatedAt : new Date().toISOString(),
          messages: Array.isArray(session.messages)
            ? session.messages
              .filter((message) => message && typeof message === "object")
              .map((message, messageIndex) => ({
                id: typeof message.id === "string" ? message.id : `msg-${messageIndex + 1}`,
                role: message.role === "user" ? "user" : "assistant",
                text: sanitizeText(message.text),
                source: sanitizeText(message.source),
                pending: false,
                createdAt: typeof message.createdAt === "string" ? message.createdAt : new Date().toISOString()
              }))
              .filter((message) => message.text)
            : []
        }))
        .filter((session) => session.messages.length);
    } catch {
      return [];
    }
  }

  function saveBotHistory() {
    safeStorageSet(BOT_HISTORY_STORAGE_KEY, JSON.stringify(state.botHistory));
  }
  function safeStorageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Storage read failed for key: ${key}`, error);
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Storage write failed for key: ${key}`, error);
      return false;
    }
  }

  function normalizeTagClass(tagClass) {
    const allowed = new Set(["learning", "fitness", "work", "language", "general"]);
    return allowed.has(tagClass) ? tagClass : "learning";
  }

  function getTaskTagLabel(tagClass) {
    return TASK_TAG_OPTIONS[normalizeTagClass(tagClass)] || TASK_TAG_OPTIONS.learning;
  }

    function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  function formatDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "Unknown time";
    }
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function hashTextSeed(value) {
    const text = String(value || "");
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function hslaColor(hue, saturation, lightness, alpha) {
    return `hsla(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%, ${alpha})`;
  }

  function generateQuoteColorSeed(text, author) {
    const dataHash = hashTextSeed(`${text}|${author}`);
    let randomPart = Math.floor(Math.random() * 0xffffffff);

    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const buffer = new Uint32Array(1);
      crypto.getRandomValues(buffer);
      randomPart = buffer[0];
    }

    return (dataHash ^ randomPart) >>> 0;
  }

  function buildQuotePalette(quote) {
    const seed = Number.isFinite(quote.colorSeed)
      ? (quote.colorSeed >>> 0)
      : hashTextSeed(`${quote.text}|${quote.author || ""}|${quote.id || ""}`);

    const hueA = seed % 360;
    const hueB = (hueA + 130 + ((seed >>> 5) % 90)) % 360;
    const hueGlowA = (hueA + 36) % 360;
    const hueGlowB = (hueB + 28) % 360;

    const darkA = hslaColor(hueA, 95, 50, 0.98);
    const darkB = hslaColor(hueB, 90, 24, 0.96);

    const lightA = hslaColor(hueA, 96, 86, 0.98);
    const lightB = hslaColor(hueB, 90, 76, 0.97);

    const glowA = hslaColor(hueGlowA, 100, 62, 0.5);
    const glowB = hslaColor(hueGlowB, 96, 60, 0.46);

    const border = hslaColor(hueA, 95, 66, 0.55);
    const lightBorder = hslaColor(hueA, 88, 48, 0.45);

    return {
      darkA,
      darkB,
      lightA,
      lightB,
      glowA,
      glowB,
      border,
      lightBorder
    };
  }

  function normalizeAge(value) {
    const text = sanitizeText(String(value ?? ""));
    if (!text) {
      return "";
    }

    const ageNumber = Number.parseInt(text, 10);
    if (!Number.isFinite(ageNumber)) {
      return "";
    }

    if (ageNumber < ACCOUNT_MIN_AGE || ageNumber > ACCOUNT_MAX_AGE) {
      return "";
    }

    return String(ageNumber);
  }

  function sanitizeText(value) {
    if (typeof value !== "string") {
      return "";
    }
    return value.trim();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function isPrimaryPointer(event) {
    if (event.pointerType === "mouse") {
      return event.button === 0;
    }
    return event.isPrimary !== false;
  }

  init();
})();









































































































































