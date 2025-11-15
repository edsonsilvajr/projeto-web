const FormValidator = {
  init() {
    const form = document.querySelector('form');
    if (!form) return;

    this.form = form;
    this.setupValidation();
    this.setupSubmit();
  },

  setupValidation() {
    const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          this.validateField(input);
        }
      });
    });
  },

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório';
    } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'E-mail inválido';
    } else if (field.id === 'telefone' && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = 'Telefone inválido';
    } else if (field.id === 'cep' && value && !this.isValidCEP(value)) {
      isValid = false;
      errorMessage = 'CEP inválido';
    } else if (field.type === 'date' && value && !this.isValidDate(field)) {
      isValid = false;
      errorMessage = 'Data inválida';
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
      field.classList.add('invalid');
      field.classList.remove('valid');
    } else {
      this.clearFieldError(field);
      field.classList.remove('invalid');
      if (value) {
        field.classList.add('valid');
      }
    }

    return isValid;
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
  },

  isValidCEP(cep) {
    const cleaned = cep.replace(/\D/g, '');
    return cleaned.length === 8;
  },

  isValidDate(input) {
    const value = new Date(input.value);
    const min = input.min ? new Date(input.min) : null;
    const max = input.max ? new Date(input.max) : null;

    if (isNaN(value.getTime())) return false;
    if (min && value < min) return false;
    if (max && value > max) return false;

    return true;
  },

  showFieldError(field, message) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.textContent = message;
      return;
    }

    const errorDiv = document.createElement('small');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--color-error)';
    errorDiv.style.fontSize = 'var(--font-size-sm)';
    errorDiv.style.marginTop = 'var(--spacing-1)';
    errorDiv.style.display = 'block';
    errorDiv.style.fontWeight = 'var(--font-weight-medium)';
    
    field.parentElement.appendChild(errorDiv);
  },

  clearFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
  },

  setupSubmit() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const requiredFields = this.form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });

      if (isValid) {
        this.handleSubmit();
      } else {
        this.showFormError('Por favor, corrija os erros antes de enviar o formulário.');
        const firstInvalid = this.form.querySelector('.invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
      }
    });
  },

  handleSubmit() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    console.log('Dados do formulário:', data);

    FormStorage.save(data);

    this.showSuccessMessage();

    setTimeout(() => {
      this.form.reset();
      this.form.querySelectorAll('.valid, .invalid').forEach(field => {
        field.classList.remove('valid', 'invalid');
      });
      FormStorage.clear();
    }, 3000);
  },

  showFormError(message) {
    const existingAlert = this.form.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement('div');
    alert.className = 'form-alert alert-error';
    alert.textContent = message;
    
    this.form.insertBefore(alert, this.form.firstChild);
    alert.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => alert.remove(), 5000);
  },

  showSuccessMessage() {
    const existingAlert = this.form.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement('div');
    alert.className = 'form-alert alert-success';
    alert.innerHTML = `
      <strong>Cadastro enviado com sucesso!</strong><br>
      Nossa equipe entrará em contato em até 48 horas.
    `;
    
    this.form.insertBefore(alert, this.form.firstChild);
    alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

