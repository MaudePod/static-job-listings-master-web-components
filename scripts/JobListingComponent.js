const template = document.createElement("template");
template.innerHTML = `          
      <article class="job-listing">
        <img>
        <section class="company-info">
          <section class="company">
          </section>
          <button id="new">NEW!</button>
          <button id="featured">FEATURED</button>
        </section>
        <button class="position" id="position"></button>
        <section class="role">
          <span class="posted-at">
          </span>
          <span class="dot">.</span>
          <span class="contract">
          </span>
          <span class="dot">.</span>
          <span class="location">
          </span>
        </section>
        <section class="tools">
        </section>
      </article>
      <style>
        :host {
          position: relative;
        }

        article[class="job-listing"] {
          display: grid;
          width: 80%;
          min-height: min-content;
          background-color: white;
          justify-self: center;
          box-sizing: border-box;
          padding: 30px;
          grid-template-columns: min-content auto;
          grid-template-rows: min-content;
          gap: 20px;
          align-items: center;
          align-content: center;
          margin: 0 auto;
          box-shadow: 0px 0px 15px -8px var(--dark-grayish-cyan);
          border-radius: 5px;
        }

        img {
          grid-row: span 3;
        }

        section[class="company-info"] {
          grid-column: 2;
          grid-row: 1;
          display: grid;
          grid-auto-flow: column;
          width: min-content;
          gap: 10px;
          justify-self: start;
        }

        section[class="company"] {
          font-weight: 700;
          color: var(--desaturated-dark-cyan);
          align-self: center;
          text-wrap: nowrap;
        }

        button[id="new"] {
          display: none;
          background-color: var(--desaturated-dark-cyan);
          color: var(--light-grayish-cyan-filter-tablets);
          height: min-content;
          padding: 5px 10px;
          border-radius: 15px;
          border-color: transparent;
          font-weight: 700;
          cursor: pointer;
        }

        button[id="new"]:hover {
          color: var(--desaturated-dark-cyan);
          background-color: var(--light-grayish-cyan-filter-tablets);
        }

        :host([new="true"]) {
          button[id="new"] {
            display: grid;
          }
        }

        button[id="featured"] {
          display: none;
          background-color: var(--very-dark-grayish-cyan);
          color: var(--light-grayish-cyan-filter-tablets);
          height: min-content;
          padding: 5px 10px;
          border-radius: 15px;
          border-color: transparent;
          font-weight: 700;
          cursor: pointer;
        }

        button[id="featured"]:hover {
          color: var(--very-dark-grayish-cyan);
          background-color: var(--light-grayish-cyan-filter-tablets);
        }

        :host([featured="true"]) {
          article[class="job-listing"] {
            border-left: 4px solid var(--desaturated-dark-cyan);
          }

          button[id="featured"] {
            display: grid;
          }
        }

        button[class="position"] {
          grid-row: 2;
          grid-column: 2;
          color: var(--very-dark-grayish-cyan);
          background-color: transparent;
          font-weight: 700;
          font-size: 1.2em;
          border: 0;
          padding: 0;
          justify-self: start;
          cursor: pointer;
        }

        button[class="position"]:hover {
          color: var(--desaturated-dark-cyan);
        }

        section[class="role"] {
          grid-column: 2;
          grid-row: 3;
          align-items: center;
          display: grid;
          grid-auto-flow: column;
          width: min-content;
          gap: 5px;
          text-wrap: nowrap;
          align-content: center;
        }

        span[class="posted-at"] {
          color: var(--dark-grayish-cyan);
        }

        span[class="dot"] {
          color: var(--dark-grayish-cyan);
          align-self: center;
        }

        span[class="contract"] {
          color: var(--dark-grayish-cyan);
        }

        span[class="location"] {
          color: var(--dark-grayish-cyan);

        }

        section[class="tools"] {
          grid-column: 3;
          grid-row: 2;
          justify-self: end;
          color: var(--desaturated-dark-cyan);
          display: grid;
          gap: 10px;
          grid-auto-flow: column;
        }

        section[class="tools"] button {
          border-color: transparent;
          color: var(--desaturated-dark-cyan);
          font-weight: 700;
          background-color: var(--light-grayish-cyan-filter-tablets);
          padding: 10px;
          cursor: pointer;
        }

        section[class="tools"] button:hover {
          background-color: var(--desaturated-dark-cyan);
          color: var(--light-grayish-cyan-filter-tablets);
        }

        @container(inline-size < 1000px) {
          article[class="job-listing"] {
            grid-template-columns: 1fr;
          }

          img {
            position: absolute;
            top: -42px;
            left: 12%;
            transform: scale(70%);
          }

          section[class="company-info"] {
            grid-column: 1;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
          }

          button[class="position"] {
            grid-column: 1;
          }

          section[class="role"] {
            grid-column: 1;
            width: 100%;
            border-bottom: 2px solid var(--dark-grayish-cyan);
            padding-bottom: 20px;
            justify-content: start;
          }


          section[class="tools"] {
            grid-column: 1;
            grid-row: 4;
            display: flex;
            flex-wrap: wrap;
          }
        }
      </style>
`;
export default class JobListingComponent extends HTMLElement {
  constructor() {
    super();
  }
  #company;
  connectedCallback(
  ) {
    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: "open" })
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
    if (this.hasAttribute('company')) {
      this.#company = this.getAttribute('company');
      this.shadowRoot.querySelector("section[class='company']").innerHTML = this.getAttribute('company');
      this.shadowRoot.querySelector("img").alt = this.getAttribute('company');
    }
    if (this.hasAttribute('position')) {
      const position = this.getAttribute('position');
      switch (position) {
        case 'Senior Frontend Developer':
          this.shadowRoot.querySelector("button[class='position']").id = "Senior";
          break;
        case 'Senior Developer':
          this.shadowRoot.querySelector("button[class='position']").id = "Senior";
          break;
        case 'Junior Frontend Developer':
          this.shadowRoot.querySelector("button[class='position']").id = "Junior";
          break;
        case 'Junior Developer':
          this.shadowRoot.querySelector("button[class='position']").id = "Junior";
          break;
        default:
          this.shadowRoot.querySelector("button[class='position']").id = "Midweight";
          break;
      }
      this.shadowRoot.querySelector("button[class='position']").innerHTML = this.getAttribute('position');
    }
    if (this.hasAttribute('role')) {
      this.shadowRoot.querySelector("section[class='tools']").innerHTML += `<button id=${this.getAttribute('role')}>${this.getAttribute('role')}</button>`;
      this.setAttribute(this.getAttribute('role'), true);
    }
    if (this.hasAttribute('level')) {
      this.shadowRoot.querySelector("section[class='tools']").innerHTML += `<button id=${this.getAttribute('level')}>${this.getAttribute('level')}</button>`;
      this.setAttribute(this.getAttribute('level'), true);
    }
    if (this.hasAttribute('posted-at')) {
      this.shadowRoot.querySelector("span[class='posted-at']").innerHTML = this.getAttribute('posted-at');
    }
    if (this.hasAttribute('contract')) {
      this.shadowRoot.querySelector("span[class='contract']").innerHTML = this.getAttribute('contract');
    }
    if (this.hasAttribute('location')) {
      this.shadowRoot.querySelector("span[class='location']").innerHTML = this.getAttribute('location');
    }
    if (this.hasAttribute('tools')) {
      const html = this.createButtonsFromString(this.getAttribute('tools'));
      this.setFilterAttributes(this.getAttribute('tools'));
      this.shadowRoot.querySelector("section[class='tools']").innerHTML += html;
    }
    if (this.hasAttribute('languages')) {
      const html = this.createButtonsFromString(this.getAttribute('languages'));
      this.setFilterAttributes(this.getAttribute('languages'));
      this.shadowRoot.querySelector("section[class='tools']").innerHTML += html;
    }
    if (this.hasAttribute('logo')) {
      this.shadowRoot.querySelector("img").src = this.getAttribute('logo');
    }

    [...this.shadowRoot.querySelectorAll('button')].forEach(element => {
      element.addEventListener('click', (event) => {
        this.setFilter(event.target.id);
        window.dispatchEvent(new CustomEvent("Filter updated", {}));
      });

    })
  }

  disconnectedCallback() {
  }
  createButtonsFromString = (stringOfItems) => {
    const buttonIds = stringOfItems.split([',']);
    let html = "";
    buttonIds.forEach(element => {
      if (element != "") {
        html += `<button id=${element}>${element}</button>`;
      }
    });
    return html;
  }
  setFilterAttributes = (stringOfItems) => {
    const items = stringOfItems.split([',']);
    items.forEach(element => {
      if (element != "") {
        this.setAttribute(element, true);
      }
    });
  }
  setFilter = (id) => {
    const filter = localStorage.getItem('filter');
    if (filter) {
      let filterOptions = new Set(JSON.parse(filter));
      filterOptions.add(id);
      localStorage.setItem('filter', JSON.stringify([...filterOptions]));
    } else {
      const filterOption = [id];
      localStorage.setItem('filter', JSON.stringify([...filterOption]));
    }
  }
  static get observedAttributes() {
    return [
      'company',
      'new',
      'featured',
      'position',
      'role',
      'level',
      'posted-at',
      'contract',
      'location',
      'tools',
      'logo',
      'languages'
    ];
  }
}
if (!customElements.get("job-listing-component")) {
  customElements.define("job-listing-component", JobListingComponent);
}