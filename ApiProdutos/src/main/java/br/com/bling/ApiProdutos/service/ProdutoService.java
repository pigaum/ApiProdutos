package br.com.bling.ApiProdutos.service;

import br.com.bling.ApiProdutos.models.Resposta;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface ProdutoService {

    public Resposta getAllProducts();

    public Resposta getProductByCode(String codigo);

    public Resposta getProductByCodeSupplier(String codigo, String nomeFornecedor);

    public ResponseEntity<Void> deleteProductByCode(String codigo);

    public Resposta createProduct(@RequestBody String xml);
}
