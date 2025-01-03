import { LitElement, html, css } from 'lit';

export class Pagination extends LitElement {
    static properties = {
        currentPage: { type: Number },
        totalPages: { type: Number }
    };

    static styles = css`
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }

    button {
      background-color: #f60;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      margin: 0 1rem;
    }

    button:hover {
      background-color: #e55;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `;

    constructor() {
        super();
        this.currentPage = 1;
        this.totalPages = 1;
    }

    render() {
        return html`
      <div class="pagination">
        <button @click=${this._prevPage} ?disabled=${this.currentPage === 1}>Previous</button>
        <span>Page ${this.currentPage} of ${this.totalPages}</span>
        <button @click=${this._nextPage} ?disabled=${this.currentPage >= this.totalPages}>Next</button>
      </div>
    `;
    }

    _prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.dispatchEvent(new CustomEvent('page-changed', { detail: this.currentPage }));
        }
    }

    _nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.dispatchEvent(new CustomEvent('page-changed', { detail: this.currentPage }));
        }
    }
}

customElements.define('pagination-component', Pagination); 