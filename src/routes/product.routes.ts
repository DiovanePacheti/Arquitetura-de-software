import {Router} from 'express';
import ProductRepository from '../repositories/ProductRepository';
import CreateProductService from '../services/CreateProductService';

const productRouter = Router();

const productRepository = new ProductRepository();// INSTANCIANDO O ProductRepository OU BANCO DE DADOS

productRouter.get('/',(req, res) => {
	res.json(productRepository.findAll());	
});

// ROTA QUE CRIA UM NOVO PRODUTO
productRouter.post('/',(req,res) =>{

	try{

		//ATRIBUI UMA INSTANCIA DA CLASS CREATE PRODUCT SERVICE 
		const service = new CreateProductService(productRepository);

		const {buyPrice, sellPrice, code,lovers , description, tags,id} = req.body;

		const produto = service.execute({id, buyPrice, code, description, lovers, sellPrice, tags,});

	    res.status(201).json(produto);
	}catch(err){
		return res.status(400).json({Erro: err.message});
	}

});

productRouter.delete('/:id',(req, res) =>{

	try{

		const {id} = req.params;

		const deletando = productRepository.delete(id);

		//console.log(deletando);
		if(deletando){
			return res.status(200).json({deletando});
		}
	}catch(err){
		//const err = "produto não encontrado !";
		return res.status(400).json({Erro: err.message})
	}	


});



export default productRouter;