document.addEventListener('DOMContentLoaded', () => {
    const buscarPokemonBtn = document.getElementById('buscar-pokemon-btn');
    const pokemonIdInput = document.getElementById('pokemon-id-input');
    const imgPokemon = document.getElementById('img_pokemon');
    const pokemonInfo = document.getElementById('pokemon-info');

    const mostrarPokemon = (pokemonId) => {
        const xhr = new XMLHttpRequest();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                // Limpiar el contenido anterior
                pokemonInfo.innerHTML = '';

                // Crear elementos HTML para mostrar los datos del Pokémon
                const nameElement = document.createElement('h2');
                nameElement.textContent = `${data.name}`;

                // Obtener la URL de la imagen del Pokémon
                const imageUrl = data.sprites.front_default;

                // Establecer la imagen del Pokémon
                imgPokemon.src = imageUrl;
                imgPokemon.alt = `Imagen de ${data.name}`;

                // Agregar la imagen y los datos al contenedor
                pokemonInfo.appendChild(imgPokemon);
                pokemonInfo.appendChild(nameElement);
            } else {
                console.error('Error al consultar la API:', xhr.statusText);
            }
        };

        xhr.onerror = function () {
            console.error('Error de red al consultar la API');
        };

        xhr.send();
    };

    // Mostrar el Pokémon número 1 al cargar la página
    mostrarPokemon(1);

    buscarPokemonBtn.addEventListener('click', () => {
        const pokemonId = pokemonIdInput.value.trim();

        if (pokemonId) {
            mostrarPokemon(pokemonId);
        }
    });
});