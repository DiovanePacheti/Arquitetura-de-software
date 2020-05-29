import ProductRepository from '../repositories/ProductRepository';
import Product from '../models/Product';

// Class ** CREATE PRODUCT SERVICE **//
export default class CreateProductService {
	// ** ATRIBUTO **
	repository: ProductRepository;

	// ** constructor **
	constructor(repository: ProductRepository) {
		//Recebe um elemento repository e atribui ao atributo da class
		this.repository = repository;
	}

	// O Method execute recebe um objeto produto e retorna um objeto produto
	public execute({
		buyPrice,
		code,
		description,
		sellPrice,
		tags,
		deletado,
	}: Product): Product {
		//atribui a constante product o resultado da busca por produto pelo code
		const product = this.repository.findByCode(code); //chama o method findByCode(code: number)
		let lovers = 0;
		if (product) {

			const p = new Product({
				buyPrice,
				sellPrice,
				code,
				description,
				tags,
				lovers: product.lovers,
				deletado,
			});

			this.repository.save(p);
			return p;
		} else {
			//senao instancia um product em uma constante 'p'
			const p = new Product({
				buyPrice,
				sellPrice,
				code,
				description,
				tags,
				lovers:0,
				deletado,
			});

			this.repository.save(p);
			return p;
		}
	}
} //fim da class
