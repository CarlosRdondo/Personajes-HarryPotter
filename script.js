let characters = [];

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://hp-api.onrender.com/api/characters')
        .then(response => response.json())
        .then(data => {
            characters = data;
            displayCharacters(characters);
        });
});

function displayCharacters(characters) {
    const charactersContainer = document.getElementById('characters-container');
    charactersContainer.innerHTML = '';

    characters.forEach(character => {
        const characterCard = createCharacterCard(character);
        charactersContainer.appendChild(characterCard);
    });
}

function createCharacterCard(character) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');

    const imgSrc = character.image || 'descarga.jpeg'; 

    card.innerHTML = `
    <div class="card">
            <img src="${imgSrc}" class="card-img-top" alt="${character.name}">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text">Casa: ${character.house}</p>
                <p class="card-text">Actor: ${character.actor}</p>
                <p class="card-text">Estado: ${character.alive ? 'Vivo' : 'Fallecido'}</p>
                <p class="card-text">Especie: ${character.species}</p>
                <p class="card-text">Patronus: ${character.patronus}</p>
                <p class="card-text">Tipo: ${character.hogwartsStudent ? 'Estudiante' : 'Trabajador'}</p>
            </div>
        </div>
    `;

    return card;
}

function filterCharacters() {
    const filterValue = document.getElementById('filter').value;
    const searchValue = document.getElementById('search').value.toLowerCase();

    const filteredCharacters = characters.filter(character => {
        const houseMatch = filterValue === 'all' || character.house.toLowerCase() === filterValue.toLowerCase();
        const nameMatch = character.name.toLowerCase().includes(searchValue);

        return houseMatch && nameMatch;
    });

    displayCharacters(filteredCharacters);
}

