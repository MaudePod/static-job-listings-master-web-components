export default class JobGridComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        this.getJobsDataFromJson();
        const buttons = this.createButtonsForFilter();
        if (buttons != "") {
            this.updateFilterOptions();
        }
        window.addEventListener('Filter updated', (event) => {
            this.updateFilterOptions();
        });
    }
    disconnectedCallback() {
    }
    updateFilterOptions = () => {
        this.shadowRoot.querySelector('section[class="options"]').innerHTML = this.createButtonsForFilter();
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(this.createFilterStyleSheet());
        this.shadowRoot.adoptedStyleSheets = [sheet];
        this.addEventListenersForButtons();
    }
    getJobsDataFromJson = () => {
        let html = "";
        fetch('data.json').then((response) => {
            response.text().then((response) => {
                return JSON.parse(response);
            }).then(data => {
                data.forEach(element => {
                    html += `
                <job-listing-component 
                    company='${element["company"]}'
                    new='${element["new"]}'
                    featured='${element["featured"]}'
                    position='${element["position"]}'
                    role='${element["role"]}'
                    level='${element["level"]}'
                    posted-at='${element["postedAt"]}'
                    contract='${element["contract"]}'
                    location='${element["location"]}'
                    tools='${element["tools"]}'
                    logo='${element["logo"]}'
                    languages='${element["languages"]}'
                  >
                </job-listing-component>`;
                });
                this.shadowRoot.querySelector('section[class="job-grid"]').innerHTML = html;
            })
        });
    }
    createButtonsForFilter = () => {
        const filter = localStorage.getItem('filter');
        let html = "";
        if (filter) {
            let filterOptions = JSON.parse(filter);
            filterOptions.forEach(element => {
                let id = element;
                if (element != "") {
                    if (element == "new") {
                        element = "NEW!"
                    }
                    if (element == "featured") {
                        element = "FEATURED"
                    }
                    html += `
                <button id=${id}>
                    <div>
                        <span>
                        ${element}
                        </span>
                     <section class="image-container">
                     <title>remove filter</title>
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
                     </section>
                    </div>
                </button>`;
                }
            });
        }

        return html;
    }
    addEventListenersForButtons = () => {
        [...this.shadowRoot.querySelectorAll('button')].forEach(element => {
            element.addEventListener('click', (event) => {
                const filterValue = event.currentTarget.id;
                if (filterValue == "clear") {
                    localStorage.removeItem('filter');
                } else {
                    const oldFilter = JSON.parse(localStorage.getItem("filter"));
                    let newFilter = oldFilter.filter(element => element != filterValue);
                    localStorage.setItem('filter', JSON.stringify(newFilter));
                }
                this.updateFilterOptions();
            });
        })
    }
    createFilterStyleSheet = () => {
        const filter = localStorage.getItem('filter');
        let not = "";
        let has = "";
        if (filter) {
            let filterOptions = JSON.parse(filter);
            filterOptions.forEach(element => {
                if (element != "") {
                    not += `:not(job-listing-component[${element}="true" i])`;
                    has += `:has(button[id="${element}" i])`;
                }
            });
            if (has != "" && not != "") {
                let css = `
            :host${has}{
                    job-listing-component${not}{
                    display: none;
                    } 
                }`;
                return css;
            } else {
                return "";
            }
        }
        return "";
    }

    static get observedAttributes() {
        return [
        ];
    }
}
if (!customElements.get("job-grid-component")) {
    customElements.define("job-grid-component", JobGridComponent);
}