const template = document.createElement("template");
template.innerHTML = `
`;

export default class JobGridComponent extends HTMLElement {
    #internals;
    #form;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        this.getJobsDataFromJson();
    
        window.addEventListener('Filter updated', (event) => {
        const filter = localStorage.getItem('filter');
          let filterOptions = JSON.parse(filter);
        // this.shadowRoot.querySelector('section[class="filter"]').innerHTML += this.createButtonsFromArray(filterOptions);
        });
   
    }
    disconnectedCallback() {
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
    createButtonsFromArray=(filterOptions)=>{
        let html = "";
        filterOptions.forEach(element => {
          if(element!=""){
          html += `<button id=${element.toLowerCase()}>${element}</button>`;
          }
        });
        return html;
      }


    static get observedAttributes() {
        return [
        ];
    }
}
if (!customElements.get("job-grid-component")) {
    customElements.define("job-grid-component", JobGridComponent);
}