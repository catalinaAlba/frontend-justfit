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
                    <div class="card-image">
                        <img src="${this.imagen}">
                    </div>
                  <strong class="card-title">${this.sabor}</strong>
                  <p class="card-type">${this.tipo}</p>
                  <p class="card-price">$ ${this.precio.toFixed(2)}</p>
                  <p class="card-id">ID: ${this.id}</p>
                  <button class="cta-btn btn-agregar" data-id="${this.id}">Agregar</button>
                  <button class="ghost-btn btn-eliminar" data-id="${this.id}">Eliminar</button>
              </div>
          </div>
      `;
    }

    mostrarEnAmpliacion() {
        return `
            <div class="layout">
            
                <div class="barrita-image">
                    <img src="${this.imagen}"  class="card-image">
                </div>

                
                <section class="barrita-info">
                    <h1>Barrita de ${this.sabor}</h1>
                    <h3>${this.tipo.toUpperCase()}</h3>
                    <p class="barrita-description">
                        Disfruta de la mejor barrita energética con ingredientes naturales y un sabor delicioso. Ideal para recargar energías antes o después de tu entrenamiento.
                    </p>

                    <p class="barrita-price">$ ${this.precio.toFixed(2)}</p>
                    
                    
                    <h4>Ingredientes</h4>
                    <ul class="barrita-ingredientes-list">
                        <li>Whey protein</li>
                        <li>Harina de avena</li>
                        <li>Harina de avena integral</li>
                        <li>Inulina</li>
                        <li>Leche en polvo descremada</li>
                        <li>Sucralosa</li>
                    </ul>

                    <h4>Envíos</h4>
                    <p class="barrita-envio">
                        Los costos de envío al interior del país se basan en los precios de la agencia elegida. También puedes retirar gratis en nuestros puntos de retiro.
                    </p>
                    

                    <button class="cta-btn btn-agregar" data-id="${this.id}"> Agregar <!-- AGREGAR ICONO DE BOX --></button>

                    <button class="ghost-btn btn-eliminar" data-id="${this.id}"> Eliminar <!-- AGREGAR ICONO DE BOX --></button>
                </section>
            </div>
        `;
    }

    mostrarEnPedido() {
        return `
            <div class="card-horizontal" id="${this.id}">
                <div class="card-content-horizontal">
                    <div class="card-image">
                        <img src="${this.imagen}" alt="Imagen de la barrita">
                    </div>
                     <div class="card-info">
                        <strong class="card-title">${this.sabor}</strong>
                        <button class="btn-eliminar" data-id="${this.id}">Eliminar</button>
                    </div>
                    <div class="card-price">
                        <p>$ ${this.precio.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `;
    }
}