import { LitElement, html, css } from 'lit';
import { t } from '../utils/i18n.js';

export class ConfirmationModal extends LitElement {
  static properties = {
    open: { type: Boolean },
    message: { type: String },
    title: { type: String }
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
      z-index: 1000;
    }

    .modal.open {
      visibility: visible;
      opacity: 1;
    }

    .modal-content {
      background-color: #fff;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      max-width: 400px;
      width: 90%;
    }

    .modal-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .modal-message {
      margin-bottom: 1.5rem;
    }

    .modal-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }

    .confirm {
      background-color: #f60;
      color: white;
    }

    .cancel {
      background-color: #ccc;
      color: #333;
    }

    button:hover {
      opacity: 0.9;
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
          <div class="modal-title">${this.title}</div>
          <div class="modal-message">${this.message}</div>
          <div class="modal-actions">
            <button class="confirm" @click=${this._confirm}>${t('actions.proceed')}</button>
            <button class="cancel" @click=${this._cancel}>${t('actions.cancel')}</button>
          </div>
        </div>
      </div>
    `;
  }

  _confirm() {
    this.dispatchEvent(new CustomEvent('confirm'));
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }
}

customElements.define('confirmation-modal', ConfirmationModal);