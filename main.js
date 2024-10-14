document.getElementById('searchButton').addEventListener('click', function() {
  
    const pokemonId = document.getElementById('inputID').value;
  
   
    if (!pokemonId) {
  
      const invalidID = `<p>Por favor ingresa un ID de Pokémon válido.</p>`;
    
      document.getElementById('pokemonInfo').innerHTML = invalidID;

      return;
    };
  
    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  
   
    fetch(url)
      .then(response => {
       
        if (!response.ok) {
          throw new Error('No se encontró el Pokémon');
        }
        return response.json(); 
      })
      .then(data => {

        const heightInMeters = data.height / 10;
        let heightDisplay;

        if (heightInMeters < 1) {
          heightDisplay = `${heightInMeters * 100} Centimetros`;
        } else {
          heightDisplay = `${heightInMeters} ${heightInMeters === 1 ? 'Metro' : 'Metros'}`; 
        }

        
        const pokemonInfo = `
          <h2>${data.name}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}" />
          <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
          <p><strong>Altura:</strong> ${heightDisplay}</p>
          <p><strong>Peso:</strong> ${data.weight / 10} Kilogramos</p>
        `;
        document.getElementById('pokemonInfo').innerHTML = pokemonInfo;
      })
      .catch(error => {
        
        document.getElementById('pokemonInfo').innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
  