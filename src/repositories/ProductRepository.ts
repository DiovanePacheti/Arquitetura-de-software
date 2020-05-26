import Product from '../models/Product';

export default class ProductRepository{
	private products: Array<Product>;

	constructor(){
		this.products = [];
	}

	public findAll():Array<Product> {//FOSSE BANCO SERIA UM SELECT
		return this.products;
	}

	public findByCode(code: number): Product | undefined{//SELECT COM WHERE
		return this.products.find(element => element.code === code);
	}

	public save({code, description, buyPrice, sellPrice, tags, lovers}:Product): Product{// INSERT

		const product = new Product({code, description, buyPrice, sellPrice, tags, lovers,});
		
		this.products.push(product);
		
		return product;
	}

	public delete(id: string): string{
		
		const produtoDeletado = this.products.find(element => element.id === id);

		if(produtoDeletado){
			const produtosDeletados = this.products.filter(element => element.id !== id);

			this.products = produtosDeletados;

			return produtoDeletado.description;
		}	

	}
}