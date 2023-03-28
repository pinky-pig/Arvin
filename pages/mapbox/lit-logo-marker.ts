import type { PropertyDeclarations, TemplateResult } from 'lit'
import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

const styles = css`
  .LogoMarker {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border: 4px solid rgb(255, 255, 255);
    background: rgba(152, 208, 255, 0.5);
    z-index: 1;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    will-change: transform;;
  }
`

export default class LogoMarker extends LitElement {
  static styles = styles
  declare disabled

  constructor() {
    super()
    this.disabled = false
  }

  static get properties(): PropertyDeclarations {
    return {
      disabled: { type: Boolean, reflect: true },
    }
  }

  _button?: HTMLButtonElement | null

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this)
  }

  firstUpdated(): void {
    this._button = this.querySelector('button')
  }

  handleEvent(evt: Event): void {
    evt.stopPropagation()
    this._button?.focus()
  }

  //   <button ?disabled=${this.disabled}>
  //   <slot></slot>
  // </button>
  render(): TemplateResult {
    return html`
      <div class="LogoMarker">
        <img src="https://nevflynn.com/_next/image?url=%2Fimages%2Fmemoji-1.png&w=32&q=100" alt="">
      </div>
    `
  }
}

if (!customElements.get('logo-marker'))
  customElement('logo-marker')(LogoMarker)
