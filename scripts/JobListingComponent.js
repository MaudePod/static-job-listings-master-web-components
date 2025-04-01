const template = document.createElement("template");
template.innerHTML = `          
        <article class="job-listing">
          <img>
          <section class="company-info">
            <section class="company">
            </section>
            <span class="new">NEW!</span>
            <span class="featured">FEATURED</span>
          </section>
          <section class="position"></section>
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
            <button id="role"></button>
            <button id="level"></button>
          </section>
        </article>
        <style>
          article[class="job-listing"] {
            display: grid;
            width: 80%;
            height: min-content;
            background-color: white;
            justify-self: center;
            box-sizing: border-box;
            padding: 30px;
            grid-template-columns: min-content auto;
            grid-template-rows: min-content;
            gap: 20px;
            align-items: center;
            align-content: center;
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

          span[class="new"] {
            display:none;
            background-color: var(--desaturated-dark-cyan);
            height: min-content;
            padding: 5px 10px;
            border-radius: 10px;
          }

          span[class="featured"] {
            background-color: var(--very-dark-grayish-cyan);
            height: min-content;
            padding: 5px 10px;
            border-radius: 10px;
          }

          section[class="position"] {
            grid-row: 2;
            grid-column: 2;
            color: var(--very-dark-grayish-cyan);
            font-weight: 700;
            font-size: 1.2em;
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
            cursor:pointer;
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
    if (this.hasAttribute('new')) {
      const isNew = this.getAttribute('new');
      if (isNew) {
        this.shadowRoot.querySelector("span[class='new']").style.display = "grid";
      }
    }
    if (this.hasAttribute('featured')) {
      const isFeatured = this.getAttribute('featured');
      if (isFeatured) {
        this.shadowRoot.querySelector("span[class='featured']").style.display = "grid";
      }
    }
    if (this.hasAttribute('position')) {
      this.shadowRoot.querySelector("section[class='position']").innerHTML = this.getAttribute('position');
    }
    if (this.hasAttribute('role')) {
      this.shadowRoot.querySelector("button[id='role']").innerHTML = this.getAttribute('role');
    }
    if (this.hasAttribute('level')) {
      this.shadowRoot.querySelector("button[id='level']").innerHTML = this.getAttribute('level');
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
      const html=this.createButtonsFromString(this.getAttribute('tools'));
      this.shadowRoot.querySelector("section[class='tools']").innerHTML += html;
    }
    if (this.hasAttribute('languages')) {
      const html=this.createButtonsFromString(this.getAttribute('languages'));
      this.shadowRoot.querySelector("section[class='tools']").innerHTML += html;
    }
    if (this.hasAttribute('logo')) {
      this.shadowRoot.querySelector("img").src = this.getAttribute('logo');
    }
    [...this.shadowRoot.querySelectorAll('button')].forEach(element => {
      element.addEventListener('click', (event) => {
        const filter = localStorage.getItem('filter');
        if (filter) {
          let filterOptions = new Set(JSON.parse(filter));
          filterOptions.add(event.target.id);
          localStorage.setItem('filter', JSON.stringify([...filterOptions]));
        } else {
          const filterOption = [event.target.id];
          localStorage.setItem('filter', JSON.stringify([...filterOption]));
        }
        window.dispatchEvent(new CustomEvent("Filter updated", {}));
      });

    })
  }

  disconnectedCallback() {
  }
createButtonsFromString=(stringOfItems)=>{
  const buttonIds = stringOfItems.split([',']);
  let html = "";
  buttonIds.forEach(element => {
    if(element!=""){
    html += `<button id=${element.toLowerCase()}>${element}</button>`;
    }
  });
  return html;
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