$(document).ready(function() {
    const pokemonIdInput = $('#pokemon-id-input');
    const imgPokemon = $('#img_pokemon');
    const pokemonInfo = $('#pokemon-info');

    const mostrarPokemon = (pokemonId) => {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
            method: 'GET',
            success: function(data) {
                // Limpiar el contenido anterior
                pokemonInfo.empty();

                // Crear elementos HTML para mostrar los datos del Pokémon
                const nameElement = $('<h2>').text(`${data.name}`);

                // Obtener la URL de la imagen del Pokémon
                const imageUrl = data.sprites.front_default;

                // Establecer la imagen del Pokémon
                imgPokemon.attr('src', imageUrl).attr('alt', `Imagen de ${data.name}`);

                // Agregar la imagen y los datos al contenedor
                pokemonInfo.append(imgPokemon);
                pokemonInfo.append(nameElement);
                pokemonInfo.append(typesElement);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error al consultar la API:', errorThrown);
            }
        });
    };

    // Mostrar el Pokémon número 1 al cargar la página
    mostrarPokemon(1);

    $('#buscar-pokemon-btn').click(function() {
        const pokemonId = pokemonIdInput.val().trim();

        if (pokemonId) {
            mostrarPokemon(pokemonId);
        }
    });
});