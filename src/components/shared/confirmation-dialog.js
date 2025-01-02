import { LitElement, html, css } from 'lit';

export class ConfirmationDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    message: { type: String }
  };

  static styles = css`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dialog {
      background: white;
      padding: 2rem;
      border-radius: 4px;
      max-width: 400px;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }

    button.proceed {
      background: #ff4400;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }

    button.cancel {
      background: white;
      border: 1px solid #ccc;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  render() {
    if (!this.open) return null;

    return html`
      <div class="overlay">
        <div class="dialog">
          <h3>Are you sure?</h3>
          <p>${this.message}</p>
          <div class="actions">
            <button class="proceed" @click=${this._handleProceed}>Proceed</button>
            <button class="cancel" @click=${this._handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    `;
  }

  _handleProceed() {
    this.dispatchEvent(new CustomEvent('confirm'));
    this.open = false;
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
    this.open = false;
  }
}

customElements.define('confirmation-dialog', ConfirmationDialog); 