function generarComandos() {
    let input = document.getElementById("inputNumbers").value;
    let lineas = input.split("\n");
    let resultado = lineas.map(num => `show interfaces descriptions | match ${num.trim()}`).join("\n");
    document.getElementById("outputResults").value = resultado;
}

function showTab(tabName) {
    // Oculta todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');

    // Muestra la pestaña seleccionada
    document.getElementById(tabName).style.display = 'block';

    // Quita la clase activa de todos los botones y la añade al seleccionado
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function procesarAfectacion() {
    let input = document.getElementById("inputResolve").value;
    let lineas = input.split("\n");
    let resultado = [];
    let contadorBITA = 0;

    for (let linea of lineas) {
        linea = linea.trim(); // Elimina espacios en blanco

        // Filtramos líneas no deseadas
        if (linea === "" || linea.includes("{master}") || linea.includes("> show interfaces descriptions | match")) {
            continue;
        }

        // Eliminamos la parte inicial (puerto y estados up/down)
        let partes = linea.split(/\s+/); // Divide por espacios múltiples
        if (partes.length > 3) {
            let descripcion = partes.slice(3).join(" "); // Extrae la descripción a partir de la cuarta columna
            
            // Omitimos líneas que contengan "BITA"
            if (descripcion.includes("BITA")) {
                contadorBITA++;
                continue;
            }

            resultado.push(descripcion);
        }
    }

    document.getElementById("outputAfectacion").value = resultado.join("\n");
    document.getElementById("contadorBITA").textContent = contadorBITA;
}


