package br.com.bling.ApiProdutos.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Preco {

	@JsonProperty("preco")
	private double preco;
	
	@JsonProperty("precoPromocional")
    private double precoPromocional;

}
