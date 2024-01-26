const formulaire = document.querySelector("form");
const main = document.querySelector("main");
const btnToutEffacer = document.querySelector("#effacer");
const btnToutCocher = document.querySelector("#cocher");
const select = document.querySelector("select");
const body = document.querySelector("body");

select.addEventListener("change", function (event) {
    switch (event.target.value) {
        case "0":
            body.style.backgroundImage = "url(fond.png)"
            break;
        case "1":
            body.style.backgroundImage = "url(fleur.svg)"
            break;
        case "2":
            body.style.backgroundImage = "url(foret.svg)"
            break;
        case "3":
            body.style.backgroundImage = "url(violet.svg)"
            break;
        case "4":
            body.style.backgroundImage = "url(champignon.svg)"
            break;
        case "5":
            body.style.backgroundImage = "url(blanc.svg)"
            break;
        case "6":
            body.style.backgroundImage = "url(cabane.svg)"
            break;
        default:
            body.style.backgroundImage = "url(fond.png)"
    }
    const theme = body.style.backgroundImage;
    window.localStorage.setItem("theme", theme);


    console.log(event.target);
})

function chargerTheme() {
    let themeActuel = window.localStorage.getItem("theme");
    let nombre = "0";
    switch (themeActuel) {
        case 'url("fond.png")':
            nombre = '0'
            break;
        case 'url("fleur.svg")':
            nombre = '1'
            break;
        case 'url("foret.svg")':
            nombre = '2'
            break;
        case 'url("violet.svg")':
            nombre = '3'
            break;
        case 'url(champignon.svg)':
            nombre = '4'
            break;
        case 'url(blanc.svg)':
            nombre = '5'
            break;
        case 'url(cabane.svg)':
            nombre = '6'
            break;
    }
    let option = select.querySelector("option[value='" + nombre + "']")
    option.selected = true;
    body.style.backgroundImage = themeActuel;
}

btnToutEffacer.addEventListener("click", function () {
    window.localStorage.removeItem("taches");
    chargerTaches();
})

btnToutCocher.addEventListener("click", function () {
    let taches = JSON.parse(window.localStorage.getItem("taches"));
    if (taches) {
        taches = taches.map(function (tache) {
            tache.fait = true;
            return tache;
        });
        window.localStorage.setItem("taches", JSON.stringify(taches))
        chargerTaches()
    }

})

formulaire.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!event.target.querySelector("[type=text]").value == "") {
        const tache = {
            tache: event.target.querySelector("[type=text]").value,
            date: event.target.querySelector("[type=date]").value,
            id: Math.floor(Math.random() * 10000),
            fait: false
        }
        event.target.querySelector("[type=text]").value = "";
        sauvegarder(tache);
        chargerTaches()
    }

})

function chargerTaches() {
    refreshTache()
    const taches = window.localStorage.getItem("taches");
    if (taches) {
        let listeTaches = JSON.parse(taches);
        listeTaches.map(function (tache) {
            let nouvelleTache = creerTache(tache);
            ajouterTache(nouvelleTache);
        })
    }

}

function sauvegarder(tache) {
    const tacheSauvegarder = window.localStorage.getItem("taches");
    if (!tacheSauvegarder) {
        const taches = [tache];
        window.localStorage.setItem("taches", JSON.stringify(taches));
    } else {
        let listeTaches = JSON.parse(tacheSauvegarder);
        let listeNouvelleTaches = [...listeTaches, tache]
        window.localStorage.setItem("taches", JSON.stringify(listeNouvelleTaches));
    }


}

function refreshTache() {
    main.innerHTML = '';
}

function ajouterTache(nouvelleTache) {
    main.innerHTML += nouvelleTache;
}


function supprimer(el) {
    const id = el.parentElement.id
    let taches = JSON.parse(window.localStorage.getItem("taches"));
    if (taches) {
        taches = taches.filter((tache) => tache.id != id);
        window.localStorage.setItem("taches", JSON.stringify(taches))
        chargerTaches()
    }
}

function fait(el) {
    const id = el.id.split("cbx-")[1];

    let taches = JSON.parse(window.localStorage.getItem("taches"));
    if (taches) {
        taches = taches.map(function (tache) {
            if (tache.id == id) {
                tache.fait = !tache.fait;
            }
            return tache;
        });
        window.localStorage.setItem("taches", JSON.stringify(taches))
        chargerTaches()
    }

}



function creerTache(tache) {
    return `<div class="task" id='${tache.id}'>
    <div class="debut">
        <div class="container">
            <input type="checkbox" onclick="fait(this)" class="cbx2" id="cbx-${tache.id}" style="display: none;" ${tache.fait ? 'checked' : ''}>
            <label for="cbx-${tache.id}" class="check">
                <svg width="30px" height="30px" viewBox="0 0 18 18">
                    <path
                        d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z">
                    </path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
            </label>
        </div>
        <div>
            <p>${tache.tache}</p>
            <p class="date">${tache.date && new Date(tache.date).toLocaleDateString("fr")}</p>
        </div>
    </div>
    <button class="buttonP" onclick='supprimer(this)'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" class="svgIcon bin-top">
            <g clip-path="url(#clip0_35_24)">
                <path fill="black"
                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z">
                </path>
            </g>
            <defs>
                <clipPath id="clip0_35_24">
                    <rect fill="white" height="14" width="69"></rect>
                </clipPath>
            </defs>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" class="svgIcon bin-bottom">
            <g clip-path="url(#clip0_35_22)">
                <path fill="black"
                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z">
                </path>
            </g>
            <defs>
                <clipPath id="clip0_35_22">
                    <rect fill="white" height="57" width="69"></rect>
                </clipPath>
            </defs>
        </svg>
    </button>
</div>`
}


chargerTaches()
chargerTheme()