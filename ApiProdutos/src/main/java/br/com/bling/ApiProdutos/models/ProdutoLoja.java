package br.com.bling.ApiProdutos.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProdutoLoja {

    @JsonProperty("preco")
    private Preco preco;

    @JsonProperty("categoria")
    private List<Categoria> categoria;
}