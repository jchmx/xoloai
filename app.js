async function buscar() {
    const searchTerm = document.getElementById("searchInput").value;
    const apiKey = ""; // Reemplaza con tu clave API
    const url = `https://api.search.brave.com/app/v1/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        mostrarResultados(data.results);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("resultados").innerHTML = `
            <div class="resultado">
                <h2>Error</h2>
                <p>Hubo un error al realizar la búsqueda. Por favor, intenta nuevamente.</p>
            </div>
        `;
    }
}

function mostrarResultados(results) {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    if (!results || results.length === 0) {
        resultadosDiv.innerHTML = `
            <div class="resultado">
                <h2>Sin resultados</h2>
                <p>No se encontraron resultados para tu búsqueda.</p>
            </div>
        `;
        return;
    }

    results.forEach(result => {
        const resultado = document.createElement("div");
        resultado.className = "resultado";
        resultado.innerHTML = `
            <h2>${result.title}</h2>
            <a href="${result.url}" target="_blank">${result.url}</a>
        `;
        resultadosDiv.appendChild(resultado);
    });
}

// Permitir búsqueda con Enter
document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscar();
    }
});