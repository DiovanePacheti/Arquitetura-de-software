import {uuid} from 'uuidv4';//importando modulo para executar o id do produto

// ** Class PRODUCT
export default class Product{

	// ** ATRIBUTO **
	id: string;
	code: number;
	description: string;
	buyPrice: number;
	sellPrice: number;
	tags: Array<Product>;
	lovers: number;
	deletado: Date | string;

	constructor({
		code,
		description,
		buyPrice,
		sellPrice,
		lovers,
		tags
	}: Omit<Product, 'id'>){
		
		this.id = uuid();
		this.code = code;
		this.description = description;
		this.buyPrice = buyPrice;
		this.sellPrice = sellPrice;
		this.tags = tags;
		this.lovers = lovers;
		this.deletado = "null";

	}


}