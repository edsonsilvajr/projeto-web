const Templates = {
  projectCard(project) {
    return `
      <article class="card">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="card-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${project.tags ? this.renderTags(project.tags) : ''}
          ${project.link ? `<a href="${project.link}" class="button">Saiba mais</a>` : ''}
        </div>
      </article>
    `;
  },

  renderTags(tags) {
    return `
      <div style="margin: var(--spacing-2) 0;">
        ${tags.map(tag => `<span class="badge badge-secondary">${tag}</span>`).join('')}
      </div>
    `;
  },

  statsCard(stat) {
    return `
      <div class="stat-card">
        <div class="stat-number">${stat.number}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `;
  },

  alert(message, type = 'info') {
    return `
      <div class="alert alert-${type}">
        ${message}
      </div>
    `;
  },

  loadingSpinner() {
    return `
      <div style="text-align: center; padding: var(--spacing-6);">
        <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid var(--color-neutral-200); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <p style="margin-top: var(--spacing-2); color: var(--color-neutral-600);">Carregando...</p>
      </div>
    `;
  },

  projectsList(projects) {
    return `
      <div class="projects-grid">
        ${projects.map(project => this.projectCard(project)).join('')}
      </div>
    `;
  },

  testimonialCard(testimonial) {
    return `
      <blockquote>
        <p>${testimonial.text}</p>
        <footer>
          <cite>- ${testimonial.author}, ${testimonial.role}</cite>
        </footer>
      </blockquote>
    `;
  }
};

const DOMHelpers = {
  createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  },

  insertAfter(newElement, referenceElement) {
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
  },

  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      element.style.opacity = '1';
    }, 10);
  },

  fadeOut(element, duration = 300) {
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.remove();
    }, duration);
  },

  slideDown(element, duration = 300) {
    element.style.maxHeight = '0';
    element.style.overflow = 'hidden';
    element.style.transition = `max-height ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      element.style.maxHeight = element.scrollHeight + 'px';
    }, 10);
    
    setTimeout(() => {
      element.style.maxHeight = '';
      element.style.overflow = '';
    }, duration);
  },

  slideUp(element, duration = 300) {
    element.style.maxHeight = element.scrollHeight + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `max-height ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      element.style.maxHeight = '0';
    }, 10);
    
    setTimeout(() => {
      element.remove();
    }, duration);
  }
};

