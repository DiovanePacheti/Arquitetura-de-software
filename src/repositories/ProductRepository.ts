import Product from '../models/Product';

export default class ProductRepository {
	private products: Array<Product>;

	constructor() {
		this.products = [];
	}

	public findAll(): Array<Product> {
		//FOSSE BANCO SERIA UM SELECT

		return  this.products.filter(element => element.deletado === "null");
	}

	public findByCode( code: number ): Array<Product> | undefined {
		//SELECT COM WHERE
		if(!(this.products.find(element => element.code == code))){
			return undefined;
		}
		return this.products.filter(element => (element.code == code && element.deletado == "null"));
	}

	public save({
		code,
		description,
		buyPrice,
		sellPrice,
		tags,
		lovers,
		deletado
	}: Product): Product {
		// INSERT

		const product = new Product({
			code,
			description,
			buyPrice,
			sellPrice,
			tags,
			lovers,
			deletado,
		});

		this.products.push(product);

		return product;
	}

	public delete(id: string): string {
		const produtoDeletado = this.products.find(element => element.id === id);

		if (produtoDeletado) {
			const produtosNaoDeletados = this.products.filter(
				element => (element.id === id)? element.deletado = new Date(): element);

			this.products = produtosNaoDeletados;

			return produtoDeletado.description;
		}
	}

	public alterar(
		description: string,
		buyPrice: number,
		sellPrice: number,
		tags: Array<Product>,
		code: number,
	): Array<Product> {

		
		const produtoAlterar = this.products.filter(element => {
			if (element.code !== code) {
				return element;
			} else {
				element.description = description;
				element.buyPrice = buyPrice;
				element.sellPrice = sellPrice;
				element.tags = tags;

				return element;
			}
		});

		this.products = produtoAlterar;

		return this.products;
	}

	public darLovers(code: number): Array<Product> {

		const productsLoversAdd = this.products.filter(element =>{

			if(element.code !== code){
				return element
			}else{
				element.lovers += 1;
				return element;
			}
		}); 

		this.products = productsLoversAdd;
		return this.products;
	}
}
