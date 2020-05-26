import ProductRepository from '../repositories/ProductRepository';
import Product from '../models/Product';

// Class ** CREATE PRODUCT SERVICE **//
export default class CreateProductService {

	// ** ATRIBUTO **
	repository: ProductRepository;

	// ** constructor **
	constructor(repository: ProductRepository){ //Recebe um elemento repository e atribui ao atributo da class
		this.repository = repository;
	}

	// O Method execute recebe um objeto produto e retorna um objeto produto
	public execute({buyPrice, code, description, lovers, sellPrice, tags}: Product): Product {

		//atribui a constante product o resultado da busca por produto pelo code
		const product = this.repository.findByCode(code);//chama o method findByCode(code: number)

		if(product){//verifica se o product ja existir
			throw Error('Produto já cadastrado');
			
		}else{//senao instancia um product em uma constante 'p'
			const p =  new Product({buyPrice,sellPrice, code, description, tags,lovers,});

			this.repository.save(p);
			return p;
		}
	}

}//fim da class