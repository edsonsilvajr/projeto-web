const CEPService = {
  async fetchAddress(cep) {
    const loadingMessage = this.showLoading();

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar CEP');
      }

      const data = await response.json();

      if (data.erro) {
        this.showError('CEP não encontrado');
        return;
      }

      this.fillAddressFields(data);
      this.showSuccess('CEP encontrado!');
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      this.showError('Erro ao buscar CEP. Tente novamente.');
    } finally {
      if (loadingMessage) loadingMessage.remove();
    }
  },

  fillAddressFields(data) {
    const enderecoInput = document.getElementById('endereco');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoSelect = document.getElementById('estado');

    if (enderecoInput && data.logradouro) {
      enderecoInput.value = data.logradouro;
      enderecoInput.dispatchEvent(new Event('input'));
    }

    if (bairroInput && data.bairro) {
      bairroInput.value = data.bairro;
      bairroInput.dispatchEvent(new Event('input'));
    }

    if (cidadeInput && data.localidade) {
      cidadeInput.value = data.localidade;
      cidadeInput.dispatchEvent(new Event('input'));
    }

    if (estadoSelect && data.uf) {
      estadoSelect.value = data.uf;
      estadoSelect.dispatchEvent(new Event('change'));
    }

    const numeroInput = document.getElementById('numero');
    if (numeroInput) {
      numeroInput.focus();
    }
  },

  showLoading() {
    const cepInput = document.getElementById('cep');
    if (!cepInput) return null;

    const loadingDiv = document.createElement('small');
    loadingDiv.className = 'cep-loading';
    loadingDiv.textContent = 'Buscando CEP...';
    loadingDiv.style.color = 'var(--color-info)';
    loadingDiv.style.fontSize = 'var(--font-size-sm)';
    loadingDiv.style.marginTop = 'var(--spacing-1)';
    loadingDiv.style.display = 'block';
    loadingDiv.style.fontWeight = 'var(--font-weight-medium)';

    cepInput.parentElement.appendChild(loadingDiv);
    return loadingDiv;
  },

  showSuccess(message) {
    const cepInput = document.getElementById('cep');
    if (!cepInput) return;

    const successDiv = document.createElement('small');
    successDiv.className = 'cep-success';
    successDiv.textContent = message;
    successDiv.style.color = 'var(--color-success)';
    successDiv.style.fontSize = 'var(--font-size-sm)';
    successDiv.style.marginTop = 'var(--spacing-1)';
    successDiv.style.display = 'block';
    successDiv.style.fontWeight = 'var(--font-weight-medium)';

    cepInput.parentElement.appendChild(successDiv);

    setTimeout(() => successDiv.remove(), 3000);
  },

  showError(message) {
    const cepInput = document.getElementById('cep');
    if (!cepInput) return;

    const errorDiv = document.createElement('small');
    errorDiv.className = 'cep-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--color-error)';
    errorDiv.style.fontSize = 'var(--font-size-sm)';
    errorDiv.style.marginTop = 'var(--spacing-1)';
    errorDiv.style.display = 'block';
    errorDiv.style.fontWeight = 'var(--font-weight-medium)';

    cepInput.parentElement.appendChild(errorDiv);

    setTimeout(() => errorDiv.remove(), 5000);
  }
};

