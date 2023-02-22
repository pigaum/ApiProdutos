package br.com.bling.ApiProdutos.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.ArrayList;

@Data
public class ProdutoLoja {

    public Preco preco;
    @JsonIgnoreProperties(ignoreUnknown = true)
    public ArrayList<Categoria> categoria;
}