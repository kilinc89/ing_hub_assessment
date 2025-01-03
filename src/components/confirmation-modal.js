import { LitElement, html, css } from 'lit';

export class ConfirmationModal extends LitElement {
    static properties = {
        open: { type: Boolean },
        message: { type: String }
    };

    static styles = css`
    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s, opacity 0.3s;
    }

    .modal.open {
      visibility: visible;
      opacity: 1;
    }

    .modal-content {
      background-color: #fff;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    button {
      margin: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .confirm {
      background-color: #f60;
      color: white;
    }

    .cancel {
      background-color: #ccc;
    }
  `;

    constructor() {
        super();
        this.open = false;
        this.message = '';
        this.title = '';
    }

    render() {
        return html`
      <div class="modal ${this.open ? 'open' : ''}">
        <div class="modal-content">
          <p>${this.title}</p>
          <p>${this.message}</p>
          <button class="confirm" @click=${this._confirm}>Proceed</button>
          <button class="cancel" @click=${this._cancel}>Cancel</button>
        </div>
      </div>
    `;
    }

    _confirm() {
        this.dispatchEvent(new CustomEvent('confirm'));
        this.open = false;
    }

    _cancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
        this.open = false;
    }
}

customElements.define('confirmation-modal', ConfirmationModal);