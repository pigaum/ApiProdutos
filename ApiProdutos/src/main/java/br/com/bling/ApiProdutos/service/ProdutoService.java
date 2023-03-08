package br.com.bling.ApiProdutos.service;

import br.com.bling.ApiProdutos.controllers.response.JsonResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

public interface ProdutoService {

    public JsonResponse getAllProducts();

    public JsonResponse getProductByCode(@PathVariable("codigo") String codigo);

    public JsonResponse getProductByCodeSupplier(@PathVariable("codigo") String codigo, @PathVariable("codigoFabricante") String id_fornecedor);

    public void deleteProductByCode(@PathVariable("codigo") String codigo);

    public Object createProduct(@RequestBody String xmlProdutos);

    public Object updateProduct(@RequestBody @Valid String xmlProdutos, @PathVariable("codigo") String codigo);
}
