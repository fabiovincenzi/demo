export class Gui {
    constructor() {
    }

    configureEditor() {
        //EDITOR CODE MIRROR
        
       
    }

    addElementToSelect(item, value) {
        const select = document.getElementById("optimizationLevel");
        const option = document.createElement("OPTION"),
        txt = document.createTextNode(item);
        option.appendChild(txt);
        option.setAttribute("value", value);
        select.insertBefore(option, select.lastChild);
    }

    hideLoader() {
        const loader = document.querySelector(".loader");
        loader.classList.add("loader-hidden");
        document.body.removeChild("loader");
    }
}