const InputMasks = {
  init() {
    this.setupCPFMask();
    this.setupPhoneMask();
    this.setupCEPMask();
  },

  setupCPFMask() {
    const cpfInput = document.getElementById('cpf');
    if (!cpfInput) return;

    cpfInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      }
      
      e.target.value = value;
    });

    cpfInput.addEventListener('blur', () => {
      if (cpfInput.value && !this.validateCPF(cpfInput.value)) {
        this.showError(cpfInput, 'CPF inválido');
      } else {
        this.clearError(cpfInput);
      }
    });
  },

  setupPhoneMask() {
    const phoneInput = document.getElementById('telefone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      }
      
      e.target.value = value;
    });
  },

  setupCEPMask() {
    const cepInput = document.getElementById('cep');
    if (!cepInput) return;

    cepInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length <= 8) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
      }
      
      e.target.value = value;
    });

    cepInput.addEventListener('blur', () => {
      const cep = cepInput.value.replace(/\D/g, '');
      if (cep.length === 8) {
        CEPService.fetchAddress(cep);
      }
    });
  },

  validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  },

  showError(input, message) {
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('small');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--color-error)';
    errorDiv.style.fontSize = 'var(--font-size-sm)';
    errorDiv.style.marginTop = 'var(--spacing-1)';
    errorDiv.style.display = 'block';
    
    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = 'var(--color-error)';
  },

  clearError(input) {
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    input.style.borderColor = '';
  }
};

