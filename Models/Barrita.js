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
}