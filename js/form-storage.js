const FormStorage = {
  STORAGE_KEY: 'esperanca_solidaria_form',
  EXPIRY_TIME: 30 * 60 * 1000,

  init() {
    this.loadSavedData();
    this.setupAutoSave();
    this.showRecoveryMessage();
  },

  setupAutoSave() {
    const form = document.querySelector('form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      if (input.type !== 'checkbox' && input.type !== 'radio') {
        input.addEventListener('input', () => {
          this.autoSave();
        });
      } else {
        input.addEventListener('change', () => {
          this.autoSave();
        });
      }
    });
  },

  autoSave() {
    const form = document.querySelector('form');
    if (!form) return;

    const formData = new FormData(form);
    const data = {
      timestamp: Date.now(),
      fields: {}
    };

    for (let [key, value] of formData.entries()) {
      if (key !== 'aceite-termos') {
        data.fields[key] = value;
      }
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Não foi possível salvar os dados:', e);
    }
  },

  loadSavedData() {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      if (!savedData) return;

      const data = JSON.parse(savedData);
      const timeElapsed = Date.now() - data.timestamp;

      if (timeElapsed > this.EXPIRY_TIME) {
        this.clear();
        return;
      }

      const form = document.querySelector('form');
      if (!form) return;

      Object.entries(data.fields).forEach(([key, value]) => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input && value) {
          if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.value === value) {
              input.checked = true;
            }
          } else {
            input.value = value;
          }
        }
      });
    } catch (e) {
      console.warn('Erro ao carregar dados salvos:', e);
      this.clear();
    }
  },

  showRecoveryMessage() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (!savedData) return;

    const data = JSON.parse(savedData);
    const timeElapsed = Date.now() - data.timestamp;

    if (timeElapsed > this.EXPIRY_TIME) return;

    const form = document.querySelector('form');
    if (!form) return;

    const alert = document.createElement('div');
    alert.className = 'form-alert alert-info';
    alert.innerHTML = `
      <strong>Dados recuperados!</strong><br>
      Encontramos um rascunho salvo do seu formulário.
      <button type="button" class="clear-draft-btn" style="margin-left: var(--spacing-2); padding: var(--spacing-1) var(--spacing-2); background: var(--color-white); color: var(--color-info); border: 1px solid currentColor; border-radius: var(--radius-sm); cursor: pointer; font-size: var(--font-size-sm);">Limpar rascunho</button>
    `;

    form.insertBefore(alert, form.firstChild);

    const clearBtn = alert.querySelector('.clear-draft-btn');
    clearBtn.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja limpar o rascunho?')) {
        this.clear();
        form.reset();
        alert.remove();
      }
    });

    setTimeout(() => {
      if (alert.parentElement) {
        alert.style.transition = 'opacity 0.3s';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
      }
    }, 10000);
  },

  save(data) {
    try {
      const saveData = {
        timestamp: Date.now(),
        fields: data,
        submitted: true
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(saveData));
    } catch (e) {
      console.warn('Não foi possível salvar os dados:', e);
    }
  },

  clear() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {
      console.warn('Erro ao limpar dados:', e);
    }
  }
};

