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

  function renderCard(project, index) {
    const delay = Math.min(index * 0.08, 0.32);
    return `
      <article class="project-card reveal" style="transition-delay:${delay.toFixed(2)}s">
        <a class="project-card-link" href="#project/${escapeHtml(project.slug)}" aria-label="Open ${escapeHtml(project.title)} case study">
          <div class="project-card-media">
            <img src="${escapeHtml(project.cardImage)}" alt="${escapeHtml(project.title)} project cover image" loading="lazy" />
          </div>
          <div class="project-card-body">
            <h3 class="project-name">${escapeHtml(project.title)}</h3>
            <p class="project-subtitle">${escapeHtml(project.subtitle)}</p>
            <p class="project-stack">${escapeHtml(project.technologies.join(' · '))}</p>
            <p class="project-summary">${escapeHtml(project.cardSummary.join(' · '))}</p>
          </div>
        </a>
      </article>
    `;
  }

  function renderFeatureGroups(featureGroups) {
    return featureGroups
      .map(
        (group) => `
          <article class="case-feature-group">
            <h4>${escapeHtml(group.title)}</h4>
            <ul>
              ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </article>
        `
      )
      .join('');
  }

  function renderCaseStudy(project) {
    const hero = project.hero || {};
    const heroLinks = hero.links || {};
    const hasLinks = Boolean(heroLinks.github || heroLinks.liveDemo);
    const hasDesignSystem = Boolean(project.designSystem);

    return `
      <div class="project-case-study-layout">
        <a class="case-back-link" href="#projects">← Back to Projects</a>

        <section class="case-hero">
          <div class="case-hero-content">
            <p class="case-kicker">Project Case Study</p>
            <h2>${escapeHtml(project.title)}</h2>
            <p class="case-subtitle">${escapeHtml(project.subtitle)}</p>
            <p class="case-description">${escapeHtml(hero.description || '')}</p>
            <p class="case-stack">${escapeHtml(project.technologies.join(' · '))}</p>
            ${
              hero.role
                ? `<p class="case-role"><span>Role:</span> ${escapeHtml(hero.role)}</p>`
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
                        ? `<a href="${escapeHtml(heroLinks.liveDemo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
                        : ''
                    }
                  </div>`
                : ''
            }
          </div>
          <div class="case-hero-image">
            <img src="${escapeHtml(project.cardImage)}" alt="${escapeHtml(project.title)} primary preview" />
          </div>
        </section>

        <section class="case-section">
          <h3>Project Overview</h3>
          <p>${escapeHtml(project.overview)}</p>
        </section>

        <section class="case-section">
          <h3>Project Gallery</h3>
          <div class="case-gallery">
            ${project.gallery
              .map(
                (shot) => `
                  <figure class="case-gallery-item">
                    <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt)}" loading="lazy" />
                    <figcaption>${escapeHtml(shot.caption)}</figcaption>
                  </figure>
                `
              )
              .join('')}
          </div>
        </section>

        <section class="case-section">
          <h3>Key Features</h3>
          <div class="case-feature-grid">
            ${renderFeatureGroups(project.keyFeatures)}
          </div>
        </section>

        <section class="case-section">
          <h3>Technical Implementation</h3>
          <ul class="case-list">
            ${project.technicalImplementation.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>

        <section class="case-section">
          <h3>Engineering Highlights</h3>
          <ul class="case-list">
            ${project.engineeringHighlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>

        ${
          hasDesignSystem
            ? `<section class="case-section">
                <h3>Design System / UI Details</h3>
                <div class="case-design-system">
                  <div>
                    <h4>Color Direction</h4>
                    <p>${escapeHtml(project.designSystem.palette.join(' · '))}</p>
                  </div>
                  <div>
                    <h4>Typography</h4>
                    <p>${escapeHtml(project.designSystem.typography.join(' · '))}</p>
                  </div>
                  <div>
                    <h4>UI Notes</h4>
                    <p>${escapeHtml(project.designSystem.notes)}</p>
                  </div>
                </div>
              </section>`
            : ''
        }

        ${
          hasLinks
            ? `<section class="case-section">
                <h3>Links</h3>
                <div class="case-links">
                  ${
                    heroLinks.github
                      ? `<a href="${escapeHtml(heroLinks.github)}" target="_blank" rel="noopener noreferrer">GitHub Repository</a>`
                      : ''
                  }
                  ${
                    heroLinks.liveDemo
                      ? `<a href="${escapeHtml(heroLinks.liveDemo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
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

    projectsGrid.innerHTML = projects.map((project, index) => renderCard(project, index)).join('');
    window.dispatchEvent(new CustomEvent('portfolio:interactive-updated'));

    const handleRoute = () => {
      const selectedProject = getProjectFromHash(projects, window.location.hash);
      const isCaseStudyRoute = Boolean(selectedProject);

      document.body.classList.toggle('project-details-mode', isCaseStudyRoute);
      caseStudySection.hidden = !isCaseStudyRoute;

      if (selectedProject) {
        caseStudyContainer.innerHTML = renderCaseStudy(selectedProject);
        window.dispatchEvent(new CustomEvent('portfolio:interactive-updated'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        caseStudyContainer.innerHTML = '';
      }
    };

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  window.PortfolioProjects = { init };
})();
