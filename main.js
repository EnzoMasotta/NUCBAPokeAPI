// Escuchar cuando el usuario haga clic en el botón de buscar
document.getElementById('searchButton').addEventListener('click', function() {
    // Obtener el valor ingresado en el input (ID del Pokémon)
    const pokemonId = document.getElementById('inputID').value;
  
    // Verificar si el usuario ingresó un valor válido
    if (!pokemonId) {
      alert('Por favor ingresa un ID de Pokémon válido.');
      return;
    }
  
    // Construir la URL con el ID del Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  
    // Hacer la solicitud con fetch
    fetch(url)
      .then(response => {
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('No se encontró el Pokémon');
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then(data => {
        // Mostrar los datos en el HTML
        const pokemonInfo = `
          <h2>${data.name}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}" />
          <p><strong>Altura:</strong> ${data.height}</p>
          <p><strong>Peso:</strong> ${data.weight}</p>
          <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
        `;
        document.getElementById('pokemonInfo').innerHTML = pokemonInfo;
      })
      .catch(error => {
        // Manejar errores, como si el Pokémon no existe
        document.getElementById('pokemonInfo').innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
  