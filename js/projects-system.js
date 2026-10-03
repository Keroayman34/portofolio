(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalizeHash(hash) {
    return (hash || '').trim().toLowerCase();
  }

  function getLocalizedValue(value, language) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (language && value[language] !== undefined) return value[language];
      if (value.en !== undefined) return value.en;
    }
    return value ?? '';
  }

  function getLocalizedString(value, language) {
    return String(getLocalizedValue(value, language));
  }

  function getLocalizedList(items, language) {
    return Array.isArray(items)
      ? items.map((item) => (typeof item === 'string' ? item : getLocalizedString(item, language)))
      : [];
  }

  function getProjectFromHash(projects, hash) {
    const normalizedHash = normalizeHash(hash);
    if (!normalizedHash.startsWith('#project/')) {
      return null;
    }

    const slug = normalizedHash.replace('#project/', '').trim();
    if (!slug) {
      return null;
    }

    return projects.find((project) => project.slug.toLowerCase() === slug) || null;
  }

  function renderCard(project, index, language) {
    const delay = Math.min(index * 0.08, 0.32);
    const title = getLocalizedString(project.title, language);
    const subtitle = getLocalizedString(project.subtitle, language);
    const cardSummary = getLocalizedList(project.cardSummary || [], language).join(' · ');
    const technologies = getLocalizedList(project.technologies || [], language).join(' · ');

    return `
      <article class="project-card reveal" style="transition-delay:${delay.toFixed(2)}s">
        <a class="project-card-link" href="#project/${escapeHtml(project.slug)}" aria-label="Open ${escapeHtml(title)} case study">
          <div class="project-card-media">
            <img src="${escapeHtml(project.cardImage)}" alt="${escapeHtml(title)} project cover image" loading="lazy" />
          </div>
          <div class="project-card-body">
            <h3 class="project-name">${escapeHtml(title)}</h3>
            <p class="project-subtitle">${escapeHtml(subtitle)}</p>
            <p class="project-stack">${escapeHtml(technologies)}</p>
            <p class="project-summary">${escapeHtml(cardSummary)}</p>
          </div>
        </a>
      </article>
    `;
  }

  function renderFeatureGroups(featureGroups, language) {
    return (featureGroups || [])
      .map(
        (group) => `
          <article class="case-feature-group">
            <h4>${escapeHtml(getLocalizedString(group.title, language))}</h4>
            <ul>
              ${(group.items || []).map((item) => `<li>${escapeHtml(getLocalizedString(item, language))}</li>`).join('')}
            </ul>
          </article>
        `
      )
      .join('');
  }

  function buildProjectImages(project) {
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];
    return [
      {
        src: project.cardImage,
        alt: `${project.title} primary preview`,
        caption: `${project.title} — primary project preview.`
      },
      ...gallery.map((shot, index) => ({
        src: shot.src,
        alt: shot.alt || `${project.title} screenshot ${index + 1}`,
        caption: shot.caption || `${project.title} — application screenshot.`
      }))
    ];
  }

  function createImageViewer() {
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.hidden = true;
    viewer.innerHTML = `
      <div class="image-viewer-dialog" role="dialog" aria-modal="true" aria-label="Project image viewer">
        <div class="image-viewer-toolbar">
          <div class="image-viewer-meta">
            <span class="image-viewer-counter" aria-live="polite"></span>
            <span class="image-viewer-zoom-value" aria-live="polite">100%</span>
          </div>
          <div class="image-viewer-controls">
            <button type="button" class="image-viewer-btn" data-action="zoom-out" aria-label="Zoom out">−</button>
            <button type="button" class="image-viewer-btn" data-action="zoom-in" aria-label="Zoom in">+</button>
            <button type="button" class="image-viewer-btn" data-action="reset" aria-label="Reset zoom">Reset</button>
            <button type="button" class="image-viewer-btn image-viewer-close" data-action="close" aria-label="Close image viewer">×</button>
          </div>
        </div>
        <div class="image-viewer-stage" tabindex="0">
          <button type="button" class="image-viewer-nav image-viewer-prev" data-action="prev" aria-label="Previous image">‹</button>
          <img class="image-viewer-image" src="" alt="" />
          <button type="button" class="image-viewer-nav image-viewer-next" data-action="next" aria-label="Next image">›</button>
        </div>
        <p class="image-viewer-caption"></p>
      </div>
    `;

    document.body.appendChild(viewer);

    const dialog = viewer.querySelector('.image-viewer-dialog');
    const stage = viewer.querySelector('.image-viewer-stage');
    const image = viewer.querySelector('.image-viewer-image');
    const caption = viewer.querySelector('.image-viewer-caption');
    const counter = viewer.querySelector('.image-viewer-counter');
    const zoomValue = viewer.querySelector('.image-viewer-zoom-value');
    const prevButton = viewer.querySelector('.image-viewer-prev');
    const nextButton = viewer.querySelector('.image-viewer-next');
    const closeButton = viewer.querySelector('.image-viewer-close');
    const zoomInButton = viewer.querySelector('[data-action="zoom-in"]');
    const zoomOutButton = viewer.querySelector('[data-action="zoom-out"]');
    const resetButton = viewer.querySelector('[data-action="reset"]');

    const state = {
      isOpen: false,
      images: [],
      index: 0,
      zoom: 1,
      minZoom: 1,
      maxZoom: 5,
      zoomStep: 0.25,
      offsetX: 0,
      offsetY: 0,
      baseWidth: 0,
      baseHeight: 0,
      previousOverflow: '',
      previousPaddingRight: '',
      triggerElement: null,
      activeElementBeforeOpen: null,
      pointers: new Map(),
      dragPointerId: null,
      dragStartX: 0,
      dragStartY: 0,
      pinchStartDistance: 0,
      pinchStartZoom: 1
    };

    function getFocusableElements() {
      return Array.from(
        dialog.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute('disabled'));
    }

    function lockBodyScroll() {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      state.previousOverflow = document.body.style.overflow;
      state.previousPaddingRight = document.body.style.paddingRight;
      document.body.classList.add('image-viewer-open');
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    function unlockBodyScroll() {
      document.body.classList.remove('image-viewer-open');
      document.body.style.overflow = state.previousOverflow;
      document.body.style.paddingRight = state.previousPaddingRight;
    }

    function updateZoomLabel() {
      zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
      zoomOutButton.disabled = state.zoom <= state.minZoom;
      zoomInButton.disabled = state.zoom >= state.maxZoom;
      resetButton.disabled = state.zoom === 1 && state.offsetX === 0 && state.offsetY === 0;
    }

    function measureBaseImageSize() {
      const previousTransform = image.style.transform;
      image.style.transform = 'translate3d(0, 0, 0) scale(1)';
      const bounds = image.getBoundingClientRect();
      state.baseWidth = bounds.width;
      state.baseHeight = bounds.height;
      image.style.transform = previousTransform;
    }

    function clampOffsets() {
      if (!state.baseWidth || !state.baseHeight) {
        return;
      }

      const stageWidth = stage.clientWidth;
      const stageHeight = stage.clientHeight;
      const scaledWidth = state.baseWidth * state.zoom;
      const scaledHeight = state.baseHeight * state.zoom;

      const maxOffsetX = Math.max((scaledWidth - stageWidth) / 2, 0);
      const maxOffsetY = Math.max((scaledHeight - stageHeight) / 2, 0);

      state.offsetX = Math.min(maxOffsetX, Math.max(-maxOffsetX, state.offsetX));
      state.offsetY = Math.min(maxOffsetY, Math.max(-maxOffsetY, state.offsetY));
    }

    function applyTransform() {
      clampOffsets();
      image.style.transform = `translate3d(${state.offsetX}px, ${state.offsetY}px, 0) scale(${state.zoom})`;
      stage.classList.toggle('is-zoomed', state.zoom > 1);
      updateZoomLabel();
    }

    function resetTransform() {
      state.zoom = 1;
      state.offsetX = 0;
      state.offsetY = 0;
      applyTransform();
    }

    function setZoom(zoomLevel) {
      const nextZoom = Math.min(state.maxZoom, Math.max(state.minZoom, zoomLevel));
      if (nextZoom === state.zoom) {
        return;
      }

      state.zoom = nextZoom;
      applyTransform();
    }

    function navigate(step) {
      if (state.images.length <= 1) {
        return;
      }
      state.index = (state.index + step + state.images.length) % state.images.length;
      renderCurrentImage();
    }

    function updateNavigationState() {
      const hasMultipleImages = state.images.length > 1;
      prevButton.hidden = !hasMultipleImages;
      nextButton.hidden = !hasMultipleImages;
      prevButton.disabled = !hasMultipleImages;
      nextButton.disabled = !hasMultipleImages;
    }

    function renderCurrentImage() {
      const current = state.images[state.index];
      if (!current) {
        return;
      }

      image.src = current.src;
      image.alt = current.alt || 'Project screenshot';
      caption.textContent = current.caption || '';
      caption.style.display = caption.textContent ? 'block' : 'none';
      counter.textContent = `${state.index + 1} / ${state.images.length}`;
      updateNavigationState();
      resetTransform();
    }

    function handleImageLoaded() {
      measureBaseImageSize();
      applyTransform();
    }

    function closeViewer() {
      if (!state.isOpen) {
        return;
      }

      state.isOpen = false;
      state.pointers.clear();
      state.dragPointerId = null;
      state.pinchStartDistance = 0;
      stage.classList.remove('is-dragging');
      viewer.classList.remove('is-open');
      viewer.hidden = true;
      unlockBodyScroll();

      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);

      if (state.triggerElement && typeof state.triggerElement.focus === 'function') {
        state.triggerElement.focus();
      } else if (state.activeElementBeforeOpen && typeof state.activeElementBeforeOpen.focus === 'function') {
        state.activeElementBeforeOpen.focus();
      }
    }

    function openViewer(images, startIndex, triggerElement) {
      if (!Array.isArray(images) || images.length === 0) {
        return;
      }

      state.images = images;
      state.index = Math.min(images.length - 1, Math.max(0, startIndex));
      state.triggerElement = triggerElement || null;
      state.activeElementBeforeOpen = document.activeElement;

      viewer.hidden = false;
      viewer.classList.add('is-open');
      state.isOpen = true;
      lockBodyScroll();
      renderCurrentImage();
      closeButton.focus();

      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
    }

    function handleResize() {
      if (!state.isOpen) {
        return;
      }
      measureBaseImageSize();
      applyTransform();
    }

    function handleKeyDown(event) {
      if (!state.isOpen) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        closeViewer();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigate(-1);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigate(1);
        return;
      }

      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        setZoom(state.zoom + state.zoomStep);
        return;
      }

      if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        setZoom(state.zoom - state.zoomStep);
        return;
      }

      if (event.key === '0') {
        event.preventDefault();
        resetTransform();
        return;
      }

      if (event.key === 'Tab') {
        const focusable = getFocusableElements();
        if (focusable.length === 0) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
          return;
        }

        if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    function handlePointerDown(event) {
      if (!state.isOpen) {
        return;
      }

      stage.focus();
      state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (state.pointers.size === 2) {
        const points = Array.from(state.pointers.values());
        state.pinchStartDistance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        state.pinchStartZoom = state.zoom;
        state.dragPointerId = null;
        return;
      }

      if (state.zoom > 1) {
        state.dragPointerId = event.pointerId;
        state.dragStartX = event.clientX - state.offsetX;
        state.dragStartY = event.clientY - state.offsetY;
        stage.classList.add('is-dragging');
      }
    }

    function handlePointerMove(event) {
      if (!state.isOpen || !state.pointers.has(event.pointerId)) {
        return;
      }

      state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (state.pointers.size === 2 && state.pinchStartDistance > 0) {
        event.preventDefault();
        const points = Array.from(state.pointers.values());
        const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        const pinchRatio = distance / state.pinchStartDistance;
        setZoom(state.pinchStartZoom * pinchRatio);
        return;
      }

      if (state.dragPointerId === event.pointerId && state.zoom > 1) {
        event.preventDefault();
        state.offsetX = event.clientX - state.dragStartX;
        state.offsetY = event.clientY - state.dragStartY;
        applyTransform();
      }
    }

    function handlePointerEnd(event) {
      state.pointers.delete(event.pointerId);

      if (state.dragPointerId === event.pointerId) {
        state.dragPointerId = null;
        stage.classList.remove('is-dragging');
      }

      if (state.pointers.size < 2) {
        state.pinchStartDistance = 0;
      }
    }

    viewer.addEventListener('click', (event) => {
      if (event.target === viewer) {
        closeViewer();
      }
    });

    dialog.addEventListener('click', (event) => {
      const actionButton = event.target.closest('[data-action]');
      if (!actionButton) {
        return;
      }

      const action = actionButton.getAttribute('data-action');
      if (action === 'close') {
        closeViewer();
      } else if (action === 'zoom-in') {
        setZoom(state.zoom + state.zoomStep);
      } else if (action === 'zoom-out') {
        setZoom(state.zoom - state.zoomStep);
      } else if (action === 'reset') {
        resetTransform();
      } else if (action === 'prev') {
        navigate(-1);
      } else if (action === 'next') {
        navigate(1);
      }
    });

    stage.addEventListener(
      'wheel',
      (event) => {
        if (!state.isOpen) {
          return;
        }
        event.preventDefault();
        if (event.deltaY < 0) {
          setZoom(state.zoom + state.zoomStep);
        } else {
          setZoom(state.zoom - state.zoomStep);
        }
      },
      { passive: false }
    );

    stage.addEventListener('dblclick', (event) => {
      event.preventDefault();
      if (state.zoom > 1) {
        resetTransform();
      } else {
        setZoom(2);
      }
    });

    stage.addEventListener('pointerdown', handlePointerDown);
    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerup', handlePointerEnd);
    stage.addEventListener('pointercancel', handlePointerEnd);
    stage.addEventListener('pointerleave', handlePointerEnd);
    image.addEventListener('load', handleImageLoaded);

    return {
      open: openViewer,
      close: closeViewer
    };
  }

  function renderCaseStudy(project, language) {
    const hero = project.hero || {};
    const heroLinks = hero.links || {};
    const hasLinks = Boolean(heroLinks.github || heroLinks.liveDemo);
    const hasDesignSystem = Boolean(project.designSystem);
    const title = getLocalizedString(project.title, language);
    const subtitle = getLocalizedString(project.subtitle, language);
    const overview = getLocalizedString(project.overview, language);
    const role = getLocalizedString(hero.role, language);
    const description = getLocalizedString(hero.description, language);
    const techText = getLocalizedList(project.technologies || [], language).join(' · ');

    return `
      <div class="project-case-study-layout">
        <a class="case-back-link" href="#projects">${language === 'ar' ? '← العودة إلى المشاريع' : '← Back to Projects'}</a>

        <section class="case-hero">
          <div class="case-hero-content">
            <p class="case-kicker">${language === 'ar' ? 'دراسة حالة المشروع' : 'Project Case Study'}</p>
            <h2>${escapeHtml(title)}</h2>
            <p class="case-subtitle">${escapeHtml(subtitle)}</p>
            <p class="case-description">${escapeHtml(description)}</p>
            <p class="case-stack">${escapeHtml(techText)}</p>
            ${
              role
                ? `<p class="case-role"><span>${language === 'ar' ? 'الدور:' : 'Role:'}</span> ${escapeHtml(role)}</p>`
                : ''
            }
            ${
              hasLinks
                ? `<div class="case-links">
                    ${
                      heroLinks.github
                        ? `<a href="${escapeHtml(heroLinks.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`
                        : ''
                    }
                    ${
                      heroLinks.liveDemo
                        ? `<a href="${escapeHtml(heroLinks.liveDemo)}" target="_blank" rel="noopener noreferrer">${language === 'ar' ? 'عرض مباشر' : 'Live Demo'}</a>`
                        : ''
                    }
                  </div>`
                : ''
            }
          </div>
          <div class="case-hero-image">
            <img class="case-viewer-trigger" data-lightbox-index="0" src="${escapeHtml(project.cardImage)}" alt="${escapeHtml(title)} primary preview" />
          </div>
        </section>

        <section class="case-section">
          <h3>${language === 'ar' ? 'نظرة عامة على المشروع' : 'Project Overview'}</h3>
          <p>${escapeHtml(overview)}</p>
        </section>

        <section class="case-section">
          <h3>${language === 'ar' ? 'معرض المشروع' : 'Project Gallery'}</h3>
          <div class="case-gallery">
            ${(project.gallery || [])
              .map(
                (shot, index) => `
                  <figure class="case-gallery-item">
                    <img class="case-viewer-trigger" data-lightbox-index="${index + 1}" src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt || title)}" loading="lazy" />
                    <figcaption>${escapeHtml(getLocalizedString(shot.caption, language))}</figcaption>
                  </figure>
                `
              )
              .join('')}
          </div>
        </section>

        <section class="case-section">
          <h3>${language === 'ar' ? 'المميزات الأساسية' : 'Key Features'}</h3>
          <div class="case-feature-grid">
            ${renderFeatureGroups(project.keyFeatures, language)}
          </div>
        </section>

        <section class="case-section">
          <h3>${language === 'ar' ? 'التنفيذ التقني' : 'Technical Implementation'}</h3>
          <ul class="case-list">
            ${(project.technicalImplementation || [])
              .map((item) => `<li>${escapeHtml(getLocalizedString(item, language))}</li>`)
              .join('')}
          </ul>
        </section>

        <section class="case-section">
          <h3>${language === 'ar' ? 'أبرز الجوانب الهندسية' : 'Engineering Highlights'}</h3>
          <ul class="case-list">
            ${(project.engineeringHighlights || [])
              .map((item) => `<li>${escapeHtml(getLocalizedString(item, language))}</li>`)
              .join('')}
          </ul>
        </section>

        ${
          hasDesignSystem
            ? `<section class="case-section">
                <h3>${language === 'ar' ? 'نظام التصميم / تفاصيل واجهة المستخدم' : 'Design System / UI Details'}</h3>
                <div class="case-design-system">
                  <div>
                    <h4>${language === 'ar' ? 'اتجاه الألوان' : 'Color Direction'}</h4>
                    <p>${escapeHtml((project.designSystem.palette || []).join(' · '))}</p>
                  </div>
                  <div>
                    <h4>${language === 'ar' ? 'الخطوط' : 'Typography'}</h4>
                    <p>${escapeHtml((project.designSystem.typography || []).join(' · '))}</p>
                  </div>
                  <div>
                    <h4>${language === 'ar' ? 'ملاحظات الواجهة' : 'UI Notes'}</h4>
                    <p>${escapeHtml(getLocalizedString(project.designSystem.notes, language))}</p>
                  </div>
                </div>
              </section>`
            : ''
        }

        ${
          hasLinks
            ? `<section class="case-section">
                <h3>${language === 'ar' ? 'الروابط' : 'Links'}</h3>
                <div class="case-links">
                  ${
                    heroLinks.github
                      ? `<a href="${escapeHtml(heroLinks.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`
                      : ''
                  }
                  ${
                    heroLinks.liveDemo
                      ? `<a href="${escapeHtml(heroLinks.liveDemo)}" target="_blank" rel="noopener noreferrer">${language === 'ar' ? 'عرض مباشر' : 'Live Demo'}</a>`
                      : ''
                  }
                </div>
              </section>`
            : ''
        }
      </div>
    `;
  }

  function init() {
    const projects = Array.isArray(window.PROJECTS_DATA) ? window.PROJECTS_DATA : [];
    const projectsGrid = document.getElementById('projectsGrid');
    const caseStudySection = document.getElementById('project-case-study');
    const caseStudyContainer = document.getElementById('projectCaseStudyContainer');

    if (!projectsGrid || !caseStudySection || !caseStudyContainer || projects.length === 0) {
      return;
    }

    const imageViewer = createImageViewer();
    let currentProject = null;

    const renderPortfolio = (language = 'en') => {
      projectsGrid.innerHTML = projects.map((project, index) => renderCard(project, index, language)).join('');
      window.dispatchEvent(new CustomEvent('portfolio:interactive-updated'));

      const selectedProject = getProjectFromHash(projects, window.location.hash);
      if (selectedProject) {
        currentProject = selectedProject;
        caseStudyContainer.innerHTML = renderCaseStudy(selectedProject, language);
        window.dispatchEvent(new CustomEvent('portfolio:interactive-updated'));
      } else {
        currentProject = null;
        caseStudyContainer.innerHTML = '';
      }
    };

    caseStudyContainer.addEventListener('click', (event) => {
      const triggerImage = event.target.closest('.case-viewer-trigger');
      if (!triggerImage || !currentProject) {
        return;
      }

      const imageIndex = Number(triggerImage.getAttribute('data-lightbox-index'));
      if (Number.isNaN(imageIndex)) {
        return;
      }

      imageViewer.open(buildProjectImages(currentProject), imageIndex, triggerImage);
    });

    const handleRoute = () => {
      const selectedProject = getProjectFromHash(projects, window.location.hash);
      const isCaseStudyRoute = Boolean(selectedProject);
      const language = document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';

      document.body.classList.toggle('project-details-mode', isCaseStudyRoute);
      caseStudySection.hidden = !isCaseStudyRoute;

      if (selectedProject) {
        currentProject = selectedProject;
        caseStudyContainer.innerHTML = renderCaseStudy(selectedProject, language);
        window.dispatchEvent(new CustomEvent('portfolio:interactive-updated'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        currentProject = null;
        imageViewer.close();
        caseStudyContainer.innerHTML = '';
      }
    };

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('portfolio:language-change', () => {
      const language = document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';
      renderPortfolio(language);
      handleRoute();
    });
    renderPortfolio(document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en');
    handleRoute();
  }

  window.PortfolioProjects = { init };
})();
