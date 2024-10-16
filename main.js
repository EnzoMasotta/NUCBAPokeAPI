document.getElementById('searchButton').addEventListener('click', function() {
  
    const pokemonId = document.getElementById('inputID').value;
  
   
    if (!pokemonId) {
  
      const invalidID = `<p>Por favor ingresa un ID de Pokemon.</p>`;
    
      document.getElementById('pokemonInfo').innerHTML = invalidID;

      return;
    };
  
    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  
   
    fetch(url)
      .then(response => {
       
        if (!response.ok) {
          throw new Error('No se encontró el Pokemon');
        }
        return response.json(); 
      })
      .then(data => {

        const heightInMeters = data.height / 10;
        const weightInKilograms = data.weight / 10;
        let heightDisplay;
        let weightDisplay;

        if (heightInMeters < 1) {
          heightDisplay = `${heightInMeters * 100} Centímetros`;
        } else {
          heightDisplay = `${heightInMeters} ${heightInMeters === 1 ? 'Metro' : 'Metros'}`;
        }
        
        
        if (weightInKilograms < 1) {
          weightDisplay = `${weightInKilograms * 1000} Gramos`;
        } else {
          weightDisplay = `${weightInKilograms} ${weightInKilograms === 1 ? 'Kilogramo' : 'Kilogramos'}`;
        }
        

        
        const pokemonInfo = `
          <h2>${data.name}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}" />
          <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
          <p><strong>Altura:</strong> ${heightDisplay}</p>
          <p><strong>Peso:</strong> ${weightDisplay}</p>
        `;
        document.getElementById('pokemonInfo').innerHTML = pokemonInfo;
      })
      .catch(error => {
        
        document.getElementById('pokemonInfo').innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
  