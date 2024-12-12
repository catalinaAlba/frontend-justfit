export default class Barrita {
    id;
    sabor;
    tipo;
    precio;
    imagen;

    constructor(id = 0, sabor = "", tipo = "", precio = "", imagen = "") {
        this.id = id;
        this.sabor = sabor;
        this.tipo = tipo;
        this.precio = precio;
        this.imagen = imagen;
    }

    mostrarEnLista() {
        return `
          <div class="card" id="${this.id}">
              <div class="card-content">
                  <strong class="card-title">${this.sabor}</strong>
                  <p class="card-type">${this.tipo}</p>
                  <p class="card-price">$${this.precio.toFixed(2)}</p>
                  <p class="card-id">ID: ${this.id}</p>
              </div>
          </div>
      `;
    }

    mostrarAmpliacion() {
        return `
        <div class="layout">
           
            <section class="barrita-image">
                <img src=" <!-- AGREGAR THIS.IMG -->" alt="Barrita x">
            </section>

            
            <section class="barrita-info">
                <h1>Barrita de ${this.sabor}</h1>
                <h3>${this.tipo.toUpperCase()}</h3>
                <p class="barrita-description">
                    Disfruta de la mejor barrita energética con ingredientes naturales y un sabor delicioso. Ideal para recargar energías antes o después de tu entrenamiento.
                </p>
                
                <p class="barrita-price">$${this.precio.toFixed(2)}</p>

                <button class="cta-btn" class="add-to-box">Añadir <!-- AGREGAR ICONO DE BOX --></button>
            </section>
        </div>
        `;
    }
}