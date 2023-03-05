package br.com.bling.ApiProdutosFornecedores.controllers;

import br.com.bling.ApiProdutosFornecedores.controllers.request.JsonRequest;
import br.com.bling.ApiProdutosFornecedores.controllers.request.ProdutoFornecedor2Request;
import br.com.bling.ApiProdutosFornecedores.controllers.request.RetornoRequest;
import br.com.bling.ApiProdutosFornecedores.controllers.response.*;
import br.com.bling.ApiProdutosFornecedores.exceptions.ProdutoFornecedorIdException;
import br.com.bling.ApiProdutosFornecedores.exceptions.ProdutoFornecedorCadastroException;
import br.com.bling.ApiProdutosFornecedores.exceptions.ProdutoFornecedorListaException;
import br.com.bling.ApiProdutosFornecedores.service.ProdutoFornecedorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ProdutoFornecedorControllerTest {
    @Mock
    RestTemplate restTemplate;
    @Mock
    ProdutoFornecedorService produtoFornecedorService;
    @InjectMocks
    ProdutoFornecedorController produtoFornecedorController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * TESTE CONTROLLER - GET "BUSCAR A LISTA DE PRODUTOS FORNECEDORES CADASTRADOS NO BLING".
     */
    @Test
    void testGetAllProducts() {
        // Cria uma resposta simulada do serviço
        RetornoResponse.Produtosfornecedores produtosfornecedores1 = new RetornoResponse.Produtosfornecedores();
        produtosfornecedores1.produtofornecedores = new ProdutofornecedoreResponse();
        produtosfornecedores1.produtofornecedores.setIdProduto("16023092137");

        produtosfornecedores1.produtofornecedores.fornecedores = new ArrayList<>();
        produtosfornecedores1.produtofornecedores.fornecedores.add(new FornecedoreResponse());
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor = new ProdutoFornecedor2Response();

        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setIdProdutoFornecedor("478963346");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setIdFornecedor("0");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setProdutoDescricao("Descricao do fornecedor 1");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setProdutoCodigo("123");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setPrecoCompra("0.0000000000");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setPrecoCusto("1.2300000000");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setProdutoGarantia("4");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setPadrao("1");

        RetornoResponse.Produtosfornecedores produtosfornecedores2 = new RetornoResponse.Produtosfornecedores();
        produtosfornecedores2.produtofornecedores = new ProdutofornecedoreResponse();
        produtosfornecedores2.produtofornecedores.idProduto = "16023092137";

        produtosfornecedores2.produtofornecedores.fornecedores = new ArrayList<>();
        produtosfornecedores2.produtofornecedores.fornecedores.add(new FornecedoreResponse());
        produtosfornecedores2.produtofornecedores.fornecedores.get(0).produtoFornecedor = new ProdutoFornecedor2Response();

        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setIdProdutoFornecedor("478963346");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setIdFornecedor("0");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setProdutoDescricao("Descricao do fornecedor 2");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setProdutoCodigo("123");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setPrecoCompra("0.0000000000");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setPrecoCusto("1.2300000000");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setProdutoGarantia("6");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setPadrao("2");


        RetornoResponse retorno = new RetornoResponse();
        retorno.produtosfornecedores = new ArrayList<>();
        retorno.produtosfornecedores.add(produtosfornecedores1);
        retorno.produtosfornecedores.add(produtosfornecedores2);

        JsonResponse resposta = new JsonResponse();
        resposta.retorno = retorno;

        // Configura o comportamento do serviço simulado
        when(produtoFornecedorService.getAllProducts()).thenReturn(resposta);

        // Chama o método sendo testado
        JsonResponse result = this.produtoFornecedorController.getAllProducts().getBody();

        // Verifica se o serviço simulado foi chamado corretamente e se o resultado foi o esperado
        verify(produtoFornecedorService).getAllProducts();
        assertEquals(resposta, result);
    }

    /**
     * TESTE CONTROLLER - GET "FORÇA O METODO BUSCAR A LISTA DE PRODUTOS FORNECEDORES A ENTRAR NO EXCEPTION".
     */
    @Test
    void testGetAllProductsException() {
        when(produtoFornecedorService.getAllProducts()).thenReturn(null);

        // Chama o método sendo testado
        assertThrows(ProdutoFornecedorListaException.class, () -> {
            produtoFornecedorController.getAllProducts();
        });

        // Verifica se o serviço foi chamado
        verify(produtoFornecedorService).getAllProducts();
    }

    /**
     * TESTE CONTROLLER - GET "BUSCA PRODUTO FORNECEDOR PELO IDPRODUTOFORNECEDOR".
     */
    @Test
    void testGetProducId() {
        String idProdutoFornecedor = "159357";

        RetornoResponse.Produtosfornecedores produtosfornecedores1 = new RetornoResponse.Produtosfornecedores();
        produtosfornecedores1.produtofornecedores = new ProdutofornecedoreResponse();
        produtosfornecedores1.produtofornecedores.idProduto = "16023092137";

        produtosfornecedores1.produtofornecedores.fornecedores = new ArrayList<>();
        produtosfornecedores1.produtofornecedores.fornecedores.add(new FornecedoreResponse());
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor = new ProdutoFornecedor2Response();

        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setIdProdutoFornecedor(idProdutoFornecedor);
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setIdProdutoFornecedor("478963346");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setIdFornecedor("0");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setProdutoDescricao("Descricao do fornecedor 1");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setProdutoCodigo("123");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setPrecoCompra("0.0000000000");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setPrecoCusto("1.2300000000");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setProdutoGarantia("4");
        produtosfornecedores1.produtofornecedores.fornecedores.get(0).produtoFornecedor.setPadrao("1");

        RetornoResponse retorno = new RetornoResponse();
        retorno.produtosfornecedores = new ArrayList<>();
        retorno.produtosfornecedores.add(produtosfornecedores1);

        JsonResponse resposta = new JsonResponse();
        resposta.setRetorno(retorno);

        // Configura o comportamento do serviço simulado
        when(produtoFornecedorService.getProducId(idProdutoFornecedor)).thenReturn(resposta);

        // Chama o método sendo testado
        JsonResponse result = this.produtoFornecedorController.getProducId(idProdutoFornecedor).getBody();

        // Verifica se o serviço simulado foi chamado corretamente e se o resultado foi o esperado
        verify(produtoFornecedorService).getProducId(idProdutoFornecedor);
        assertEquals(resposta, result);
    }

    /**
     * TESTE CONTROLLER - GET "FORÇA O METODO BUSCA PRODUTO FORNECEDOR PELO IDPRODUTOFORNECEDOR A ENTRAR NO EXCEPTION".
     */
    @Test
    void testGetProducIdException() {
        String idProdutoFornecedor = "753159";
        when(produtoFornecedorService.getProducId(idProdutoFornecedor)).thenReturn(null);

        // Chama o método sendo testado
        assertThrows(ProdutoFornecedorIdException.class, () -> {
            produtoFornecedorController.getProducId(idProdutoFornecedor);
        });

        // Verifica se o serviço foi chamado
        verify(produtoFornecedorService).getProducId(idProdutoFornecedor);
    }

    /**
     * TESTE CONTROLLER - POST "CADASTRA UMA NOVO PRODUTO FORNECEDOR UTILIZANDO XML/JSON".
     */
    @Test
    void testCreateProduct() {
        // Cria o XML de categoria a ser enviado na requisição
        String xml = "<produtoFornecedor>\n" +
                "   <idProduto>16023124986</idProduto>\n" +
                "   <idFornecedor>16054055910</idFornecedor>\n" +
                "   <produtoDescricao>Fralda Descartável 54P</produtoDescricao>\n" +
                "   <produtoCodigo>6706322</produtoCodigo>\n" +
                "   <precoCompra>10.6300000000</precoCompra>\n" +
                "   <precoCusto>13.5000000000</precoCusto>\n" +
                "   <produtoGarantia>36</produtoGarantia>\n" +
                "   <padrao>0</padrao>\n" +
                "</produtoFornecedor>";

        // Simula a resposta da chamada para o serviço de categoria
        JsonRequest resposta = new JsonRequest();
        RetornoRequest retorno = new RetornoRequest();

        ArrayList<RetornoRequest.Produtosfornecedore> produtosfornecedores = new ArrayList<>();
        RetornoRequest.Produtosfornecedore produtoFornecedor = new RetornoRequest.Produtosfornecedore();

        produtoFornecedor.produtoFornecedor = new ProdutoFornecedor2Request();
        produtoFornecedor.produtoFornecedor.id = "01";
        produtoFornecedor.produtoFornecedor.setIdProdutoFornecedor("16023092137");
        produtoFornecedor.produtoFornecedor.setIdFornecedor(478963346);
        produtoFornecedor.produtoFornecedor.setProdutoDescricao("Descricao do fornecedor");
        produtoFornecedor.produtoFornecedor.setProdutoCodigo("159");
        produtoFornecedor.produtoFornecedor.setPrecoCompra(BigDecimal.valueOf(0.0000000000));
        produtoFornecedor.produtoFornecedor.setPrecoCusto(BigDecimal.valueOf(1.2300000000));
        produtoFornecedor.produtoFornecedor.setProdutoGarantia(4);
        produtoFornecedor.produtoFornecedor.setPadrao(1);

        produtosfornecedores.add(produtoFornecedor);
        retorno.setProdutosfornecedores(produtosfornecedores);
        resposta.setRetorno(retorno);

        when(produtoFornecedorService.createProduct(xml)).thenReturn(resposta);

        JsonRequest result = this.produtoFornecedorController.createProduct(xml).getBody();
        verify(produtoFornecedorService).createProduct(xml);
        assertEquals(resposta, result);
    }

    /**
     * TESTE CONTROLLER - POST "FORÇA O METODO DE CADASTRO DE PRODUTO FORNECEDOR A ENTRAR NO EXCEPTION".
     */
    @Test
    void testCreateProductException() {
        // Cria o XML de categoria a ser enviado na requisição
        String xml = "<produtoFornecedor>\n" +
                "   <idProduto>16023124986</idProduto>\n" +
                "   <idFornecedor>16054055910</idFornecedor>\n" +
                "   <produtoDescricao>Fralda Descartável 54P</produtoDescricao>\n" +
                "   <produtoCodigo>6706322</produtoCodigo>\n" +
                "   <precoCompra>10.6300000000</precoCompra>\n" +
                "   <precoCusto>13.5000000000</precoCusto>\n" +
                "   <produtoGarantia>36</produtoGarantia>\n" +
                "   <padrao>0</padrao>\n" +
                "</produtoFornecedor>";

        // Cria um mock do serviço que retorna null
        when(produtoFornecedorService.createProduct(xml)).thenReturn(null);

        // Chama o método sendo testado
        assertThrows(ProdutoFornecedorCadastroException.class, () -> {
            produtoFornecedorController.createProduct(xml);
        });

        // Verifica se o serviço foi chamado
        verify(produtoFornecedorService).createProduct(xml);
    }


    @Test
    void testUpdateProduct() {
//        when(produtoFornecedorService.updateProduct(anyString(), anyString())).thenReturn(new RespostaRequest());
//
//        RespostaRequest result = produtoFornecedorController.updateProduct("xml", "idProdutoFornecedor");
//        Assertions.assertEquals(new RespostaRequest(), result);
    }
}