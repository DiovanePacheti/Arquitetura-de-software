import { Router } from 'express';
import ProductRepository from '../repositories/ProductRepository';
import CreateProductService from '../services/CreateProductService';

const productRouter = Router();

const productRepository = new ProductRepository(); // INSTANCIANDO O ProductRepository OU BANCO DE DADOS

productRouter.get('/', (request, response) => {
	const {code} = request.query;
	if(code === undefined){
		response.json(productRepository.findAll());
	}
	
	response.status(200).json(productRepository.findByCode(Number(code)));	
});

// ROTA QUE CRIA UM NOVO PRODUTO
productRouter.post('/', (req, res) => {
	try {
		//ATRIBUI UMA INSTANCIA DA CLASS CREATE PRODUCT SERVICE
		const service = new CreateProductService(productRepository);

		const {
			buyPrice,
			sellPrice,
			code,
			lovers,
			description,
			tags,
			id,
			deletado
		} = req.body;

		const produto = service.execute({
			id,
			buyPrice,
			code,
			description,
			lovers,
			sellPrice,
			tags,
			deletado,
		});

		res.status(201).json(produto);
	} catch (err) {
		return res.status(400).json({ Erro: err.message });
	}
});

productRouter.delete('/:id', (req, res) => {
	try {
		const { id } = req.params;

		const deletando = productRepository.delete(id);

		if (deletando) {
			return res.status(200).json({ deletando });
		}
	} catch (err) {
		//const err = "produto não encontrado !";
		return res.status(400).json({ Erro: err.message });
	}
});

productRouter.put('/:code', (req, res) => {
	const { buyPrice, sellPrice, tags, description } = req.body;
	const { code } = req.params;
	const produtoAlterado = productRepository.alterar(
		description,
		buyPrice,
		sellPrice,
		tags,
		code,
	);


	return res.status(200).json(produtoAlterado);
});

export default productRouter;
