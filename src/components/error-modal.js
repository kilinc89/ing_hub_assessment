import { LitElement, html, css } from 'lit';

export class ErrorModal extends LitElement {
    static properties = {
        open: { type: Boolean },
        message: { type: String }
    };

    static styles = css`
    .error-modal {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #ff4444;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transition: transform 0.3s, opacity 0.3s;
      transform: translateX(150%);
      opacity: 0;
    }

    .error-modal.open {
      transform: translateX(0);
      opacity: 1;
    }

    .message {
      margin-right: 20px;
    }

    .close-button {
      position: absolute;
      top: 5px;
      right: 5px;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1.2rem;
    }
  `;

    constructor() {
        super();
        this.open = false;
        this.message = '';
    }

    updated(changedProperties) {
        if (changedProperties.has('open') && this.open) {
            setTimeout(() => {
                this.closeModal();
            }, 5000);
        }
    }


    closeModal() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('close-error-modal'));
    }

    render() {
        return html`
      <div class="error-modal ${this.open ? 'open' : ''}">
        <button class="close-button" @click=${() => this.closeModal()}>×</button>
        <div class="message">${this.message}</div>
      </div>
    `;
    }
}

customElements.define('error-modal', ErrorModal); 