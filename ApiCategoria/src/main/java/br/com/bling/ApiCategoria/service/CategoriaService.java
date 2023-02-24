package br.com.bling.ApiCategoria.service;

import br.com.bling.ApiCategoria.controllers.request.CategoriaRequest;
import br.com.bling.ApiCategoria.controllers.request.RespostaRequest;
import br.com.bling.ApiCategoria.controllers.response.Resposta;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface CategoriaService {

    public Resposta getAllCategory();

    public Resposta getCategoryByIdCategoria(@PathVariable String idCategoria);

    public RespostaRequest createCategory(@RequestBody String xml);

    public RespostaRequest updateCategory(@RequestBody String xml, @PathVariable String idCategoria);
}