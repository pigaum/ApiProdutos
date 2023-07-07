import React from "react";
import '../css/FrenteCaixa.css';

import { IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { pencil } from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCalendarAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import ptBR from 'date-fns/locale/pt-BR';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Table from "react-bootstrap/Table";
import { Toast } from 'react-bootstrap';

import { Alert } from "react-bootstrap";
import { Offcanvas } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { InputGroup } from "react-bootstrap";


// import { Stack } from "react-bootstrap"
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { format } from 'date-fns';
// import { parse } from 'js2xmlparser';
// import Autosuggest from 'react-autosuggest';


class FrenteCaixa extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            buscaProduto: '',
            buscaContato: '',
            buscaVendedor: '',
            vendedor: '',
            nome: '',
            consumidorFinal: '',
            cnpj: '',
            ie: '',
            rg: '',
            tipo: '',
            contribuinte: 9,
            cep: '',
            endereco: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
            email: '',
            fone: '',
            celular: '',
            observacoes: '',
            observacaointerna: '',
            comentario: '',
            produtos: [],
            contatos: [],
            depositos: [],
            vendedores: [],
            pedidos: [],
            formaspagamento: [],
            lojas: [],
            produtosSelecionados: [],
            contatosSelecionados: [],
            vendedoresSelecionados: [],
            vendedoresFiltrados: [],
            itensSelecionados: [],
            produtoSelecionado: '',
            contatoSelecionado: '',
            vendedorSelecionado: '',
            carregandoProduto: '',
            carregandoContato: '',
            carregandoVendedor: '',
            preco: 0,
            precoProdutoSelecionado: 0,
            quantidade: 1,
            valorTotal: 0,
            valorDesconto: 0,
            totalComDesconto: 0,
            subTotalComDesconto: 0,
            desconto: 0,
            total: 0,
            subTotal: 0,
            dinheiroRecebido: 0,
            troco: 0,
            dinheiro: 0,
            dataPrevista: '',
            dataPrevistaFormatted: '',
            depositoSelecionado: null,
            ModalFinalizarVendaSemItem: false,
            ModalExcluirPedido: false,
            modalInserirProduto: false,
            modalSalvarPedido: false,
            modalInserirParcela: false,
            modalEditarProduto: false,
            canvasFinalizarPedido: false,
            ModalSelecionarLoja: false,
            ModalCadastrarCliente: false,
            ModalFormaPagamento: false,
            subtotalComFrete: 0,
            frete: 0,
            freteInserido: false,
            parcelas: [{ dias: 0 }],
            condicao: 0,
            forma: [],
            subtotalGeral: 0,
            carregando: false,
            numLinhas: 0,
            newParcelas: 0,
            numeroPedido: 0,
            ultimoPedido: 0,
            data: '',
            valor: '',
            observacao: '',
            prazo: 0,
            carregado: false, // novo estado
            erro: null,
            imagem: '',
            descontoProduto: 0,
            descontoTotal: 0,
            opcaoDescontoItem: 'desliga',
            opcaoDescontoLista: 'desliga',
            validated: false,
            produtoNaoLocalizado: false,
            contatoNaoLocalizado: false,
            vendedorNaoLocalizado: false,
            primeiroProdutoDesconto: false,
            nomeLoja: '',
            idLoja: '',
            unidadeLoja: '',
        };

        this.atualizaDesconto = this.atualizaDesconto.bind(this);
        this.atualizaTotalComFrete = this.atualizaTotalComFrete.bind(this);
        this.adicionarParcela = this.adicionarParcela.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePrazo = this.handleChangePrazo.bind(this);
    }

    ModalCadastrarCliente = () => {
        this.setState({
            ModalCadastrarCliente: !this.state.ModalCadastrarCliente
        });
    }

    ModalSelecionarLoja = () => {
        this.setState({
            ModalSelecionarLoja: !this.state.ModalSelecionarLoja
        });
    }

    ModalFinalizarVendaSemItem = () => {
        this.setState({
            ModalFinalizarVendaSemItem: !this.state.ModalFinalizarVendaSemItem
        });
    }

    ModalFormaPagamento = () => {
        this.setState({
            ModalFormaPagamento: !this.state.ModalFormaPagamento
        });
    }


    ModalExcluirPedido = () => {
        this.setState({
            ModalExcluirPedido: !this.state.ModalExcluirPedido
        });
    }

    modalInserirProduto = () => {
        this.setState({
            modalInserirProduto: !this.state.modalInserirProduto
        });
    }

    modalInserirParcela = () => {
        this.setState({
            modalInserirParcela: !this.state.modalInserirParcela
        });
    }

    modalEditarProduto = (produto) => {
        const index = this.state.produtosSelecionados.findIndex((p) => p.produto.id === produto.produto.id);
        const { preco } = produto.produto
        this.setState({
            modalEditarProduto: true,
            produtoSelecionadoIndex: index,
            produtoSelecionadoLista: produto,
            valorLista: preco || '',
            quantidadeLista: produto.quantidade || '',
            descontoItemLista: produto.descontoItem || '',
            valorUnitarioLista: produto.precoUnitario || '',
            valorTotalLista: produto.subTotal || '',
            observacaointerna: produto.observacaointerna || '',
            valorUnitarioOriginal: preco, // Salva o valor original do campo PRECO UNITARIO
        }, () => {
            this.atualizaSubTotalLista();
        });
    };

    modalSalvarPedido = () => {
        this.setState({
            modalSalvarPedido: !this.state.modalSalvarPedido
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalSalvarPedido: false
                })
            }, 3000);
        });
    }

    canvasFinalizarPedido = () => {
        this.setState({
            canvasFinalizarPedido: !this.state.canvasFinalizarPedido
        });
    }

    componentDidMount() {
        this.buscarFormaDePagamento()
            .catch(() => { throw new Error("Erro ao conectar a API"); })
            .then(() => this.buscarLoja())
            .catch(() => { throw new Error("Erro ao conectar a API"); })
            .then(() => this.buscarPedido())
            .catch(() => { throw new Error("Erro ao conectar a API"); })
            .then(() => {
                this.setState({ carregado: true });
            })
            .catch((error) => {
                this.setState({ erro: error.message });
            });
        this.ModalSelecionarLoja()

        this.setState({ carregado: true }); //APAGAR (GAMBIARRA)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.nome !== this.state.nome) {
            this.atualizaNome({ target: { value: this.state.nome } });
        }
        if (prevState.cnpj !== this.state.cnpj) {
            this.atualizaCpfCnpj({ target: { value: this.state.cnpj } });
        }
        if (prevState.descontoItemLista !== this.state.descontoItemLista) {
            this.atualizaSubTotalLista({ target: { value: this.state.descontoItemLista } })
        }
        if (prevState.consumidorFinal !== this.state.consumidorFinal) {
            this.atualizaConsumidorFinal(prevState);
        }
        if (prevState.produtosSelecionados !== this.state.produtosSelecionados ||
            prevState.subTotal !== this.state.subTotal ||
            prevState.valorDesconto !== this.state.valorDesconto ||
            prevState.subTotalComFrete !== this.state.subTotalComFrete //||
            // prevState.dinheiroRecebido !== this.state.dinheiroRecebido // Adicionado o dinheiroRecebido como dependência
        ) {
            const subtotalGeral = this.calcularSubTotalGeral().toFixed(2);
            // console.log("Subtotal Geral:", subtotalGeral);
            this.setState({
                subTotalGeral: subtotalGeral
            });
        }
    }

    //----------------------------------------- CHAMADAS DE API´S ----------------------------------------------------------

    buscarProdutos = (value) => {
        return new Promise((resolve, reject) => {
            this.setState({ buscaProduto: value, carregando: false });

            fetch(`http://localhost:8081/api/v1/produtos`)
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error('Erro na chamada da API');
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.retorno.produtos) {
                        const produtosFiltrados = dados.retorno.produtos.filter(
                            (produto) =>
                                (produto.produto.descricao && produto.produto.descricao.toLowerCase().includes(value.toLowerCase())) ||
                                (produto.produto.codigo && produto.produto.codigo.toLowerCase().includes(value.toLowerCase())) ||
                                (produto.produto.gtin && produto.produto.gtin.toLowerCase().includes(value.toLowerCase())) ||
                                (produto.produto.gtinEmbalagem && produto.produto.gtinEmbalagem.toLowerCase().includes(value.toLowerCase())) ||
                                (produto.produto.descricaoFornecedor && produto.produto.descricaoFornecedor.toLowerCase().includes(value.toLowerCase())) ||
                                (produto.produto.nomeFornecedor && produto.produto.nomeFornecedor.toLowerCase().includes(value.toLowerCase())) ||
                                (produto.produto.idFabricante && produto.produto.idFabricante.toLowerCase().includes(value.toLowerCase()))
                        );

                        if (produtosFiltrados.length === 0) {
                            // Nenhum produto encontrado
                            this.setState({
                                produtos: [],
                                produtoSelecionado: null,
                                carregando: false,
                                produtoNaoLocalizado: true // Adicione essa variável de estado para controlar se o produto não foi localizado
                            });
                        } else {
                            // Produtos encontrados
                            this.setState({
                                produtos: produtosFiltrados,
                                produtoSelecionado: null,
                                carregando: false,
                                produtoNaoLocalizado: false // Reinicie a variável para false caso tenha sido setada anteriormente
                            });
                        }
                    } else {
                        // Nenhum produto encontrado
                        this.setState({
                            produtos: [],
                            carregando: false,
                            produtoNaoLocalizado: true // Adicione essa variável de estado para controlar se o produto não foi localizado
                        });
                    }
                    resolve();
                })
                .catch((error) => {
                    this.setState({
                        produtos: [],
                        carregando: false,
                        produtoNaoLocalizado: true // Adicione essa variável de estado para controlar se o produto não foi localizado
                    });
                    reject(error);
                });
        });
    };

    // buscarProdutos = (value) => {
    //     // console.log("Buscando produto por:", value);
    //     this.setState({ buscaProduto: value, carregando: false });
    //     fetch(`http://localhost:8081/api/v1/produtos`)
    //         .then((resposta) => {
    //             if (!resposta.ok) {
    //                 throw new Error('Erro na chamada da API');
    //             }
    //             return resposta.json();
    //         })
    //         .then((dados) => {
    //             if (dados.retorno.produtos) {
    //                 const produtosFiltrados = dados.retorno.produtos.filter(
    //                     (produto) =>
    //                         (produto.produto.descricao && produto.produto.descricao.toLowerCase().includes(value.toLowerCase())) ||
    //                         (produto.produto.codigo && produto.produto.codigo.toLowerCase().includes(value.toLowerCase())) ||
    //                         (produto.produto.gtin && produto.produto.gtin.toLowerCase().includes(value.toLowerCase())) ||
    //                         (produto.produto.gtinEmbalagem && produto.produto.gtinEmbalagem.toLowerCase().includes(value.toLowerCase())) ||
    //                         (produto.produto.descricaoFornecedor && produto.produto.descricaoFornecedor.toLowerCase().includes(value.toLowerCase())) ||
    //                         (produto.produto.nomeFornecedor && produto.produto.nomeFornecedor.toLowerCase().includes(value.toLowerCase())) ||
    //                         (produto.produto.idFabricante && produto.produto.idFabricante.toLowerCase().includes(value.toLowerCase()))
    //                 );
    //                 // console.log("Produto objeto retornado:", produtosFiltrados);
    //                 this.setState({
    //                     produtos: produtosFiltrados,
    //                     produtoSelecionado: null,
    //                     carregando: false,
    //                 });
    //             } else {
    //                 this.setState({
    //                     produtos: [],
    //                     carregando: false
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             // console.log("Erro ao buscar produtos:", error);
    //             this.setState({
    //                 produtos: [],
    //                 carregando: false
    //             });
    //         });
    // };

    buscarContato = (value) => {
        // console.log("Buscando contato por:", value);
        this.setState({ buscaContato: value, carregando: true });
        fetch(`http://localhost:8080/api/v1/contatos`)
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error('Erro na chamada da API');
                }
                return resposta.json();
            })
            .then((dados) => {
                if (dados.retorno.contatos) {
                    const contatosFiltrados = dados.retorno.contatos.filter(
                        (contato) =>
                            (contato.contato.nome && contato.contato.nome.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.cnpj && contato.contato.cnpj.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.rg && contato.contato.rg.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.ie_rg && contato.contato.ie_rg.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.contribuinte && contato.contato.contribuinte.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.cidade && contato.contato.cidade.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.endereco && contato.contato.endereco.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.numero && contato.contato.numero.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.bairro && contato.contato.bairro.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.complemento && contato.contato.complemento.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.cep && contato.contato.cep.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.uf && contato.contato.uf.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.email && contato.contato.email.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.celular && contato.contato.celular.toLowerCase().includes(value.toLowerCase())) ||
                            (contato.contato.fone && contato.contato.fone.toLowerCase().includes(value.toLowerCase()))
                    );

                    if (contatosFiltrados.length === 0) {
                        // Nenhum contato encontrado
                        this.setState({
                            contatos: [],
                            contatoSelecionado: null,
                            carregando: false,
                            contatoNaoLocalizado: true // Adicione essa variável de estado para controlar se o contato não foi localizado
                        });
                    } else {
                        // Contatos encontrados
                        this.setState({
                            contatos: contatosFiltrados,
                            contatoSelecionado: null,
                            carregando: false,
                            contatoNaoLocalizado: false // Reinicie a variável para false caso tenha sido setada anteriormente
                        });
                    }
                } else {
                    // Nenhum contato encontrado
                    this.setState({
                        contatos: [],
                        carregando: false,
                        contatoNaoLocalizado: true // Adicione essa variável de estado para controlar se o contato não foi localizado
                    });
                }
            })
            .catch((error) => {
                // console.log("Erro ao buscar contatos:", error);
                this.setState({
                    contatos: [],
                    carregando: false,
                    contatoNaoLocalizado: true // Adicione essa variável de estado para controlar se o contato não foi localizado
                });
            });
    };

    buscarVendedor = (value) => {
        return new Promise((resolve, reject) => {
            this.setState({ buscaVendedor: value, carregando: true });

            fetch(`http://localhost:8080/api/v1/contatos`)
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error("Erro na chamada da API");
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.retorno.contatos) {
                        const vendedoresFiltrados = dados.retorno.contatos.filter(
                            (contato) =>
                                contato?.contato?.tiposContato?.some(
                                    (tipoContato) =>
                                        tipoContato?.tipoContato?.descricao
                                            ?.toLowerCase()
                                            .includes("vendedor")
                                ) &&
                                (contato?.contato?.nome?.toLowerCase().includes(value.toLowerCase()) ||
                                    contato?.contato?.codigo?.toLowerCase().includes(value.toLowerCase()))
                        );

                        if (vendedoresFiltrados.length === 0) {
                            // Nenhum vendedor encontrado
                            this.setState({
                                vendedores: [],
                                vendedorSelecionado: null,
                                carregando: false,
                                vendedorNaoLocalizado: true // Adicione essa variável de estado para controlar se o vendedor não foi localizado
                            });
                        } else {
                            // Vendedores encontrados
                            this.setState({
                                vendedores: vendedoresFiltrados,
                                vendedorSelecionado: null,
                                carregando: false,
                                vendedorNaoLocalizado: false // Reinicie a variável para false caso tenha sido setada anteriormente
                            });
                        }
                    } else {
                        // Nenhum vendedor encontrado
                        this.setState({
                            vendedores: [],
                            carregando: false,
                            vendedorNaoLocalizado: true // Adicione essa variável de estado para controlar se o vendedor não foi localizado
                        });
                    }
                    resolve();
                })
                .catch((error) => {
                    // console.log("Erro ao buscar vendedor:", error);
                    this.setState({
                        vendedores: [],
                        carregando: false,
                        vendedorNaoLocalizado: true // Adicione essa variável de estado para controlar se o vendedor não foi localizado
                    });
                    reject(error);
                });
        });
    };

    // buscarVendedor = (value) => {
    //     return new Promise((resolve, reject) => {
    //         // console.log("Buscando vendedor por:", value);
    //         this.setState({ buscaVendedor: value, carregando: false });
    //         fetch(`http://localhost:8080/api/v1/contatos`)
    //             .then((resposta) => {
    //                 if (!resposta.ok) {
    //                     throw new Error("Erro na chamada da API");
    //                 }
    //                 return resposta.json();
    //             })
    //             .then((dados) => {
    //                 if (dados.retorno.contatos) {
    //                     const vendedoresFiltrados = dados.retorno.contatos.filter(
    //                         (contato) =>
    //                             contato?.contato?.tiposContato?.some(
    //                                 (tipoContato) => tipoContato?.tipoContato?.descricao?.toLowerCase().includes("vendedor")
    //                             )
    //                     );
    //                     this.setState({
    //                         vendedores: vendedoresFiltrados,
    //                         vendedorSelecionado: null,
    //                         carregando: false,
    //                         vendedoresFiltrados: vendedoresFiltrados,
    //                     });
    //                 } else {
    //                     this.setState({
    //                         vendedores: [],
    //                         carregando: false,
    //                     });
    //                 }
    //                 resolve(); // Resolva a Promise quando a chamada da API for concluída com sucesso
    //             })
    //             .catch((error) => {
    //                 console.log("Erro ao buscar vendedor:", error);
    //                 this.setState({
    //                     vendedores: [],
    //                     carregando: false,
    //                 });
    //                 reject(error); // Rejeite a Promise se ocorrer um erro na chamada da API
    //             });
    //     });
    // };

    // buscarDeposito = () => {
    //     return new Promise((resolve, reject) => {
    //         fetch("http://localhost:8083/api/v1/depositos")
    //             .then((resposta) => {
    //                 if (!resposta.ok) {
    //                     throw new Error("Erro na chamada da API");
    //                 }
    //                 return resposta.json();
    //             })
    //             .then(dados => {
    //                 if (dados.retorno.depositos) {
    //                     this.setState({
    //                         depositos: dados.retorno.depositos,
    //                     });
    //                 } else {
    //                     this.setState({
    //                         depositos: []
    //                     });
    //                 }
    //                 this.setState({
    //                     carregando: false
    //                 });
    //                 resolve(); // Resolva a Promise quando a chamada da API for concluída com sucesso
    //             })
    //             .catch((error) => {
    //                 console.log("Erro ao buscar deposito:", error);
    //                 this.setState({
    //                     depositos: [],
    //                     carregando: false
    //                 });
    //                 reject(error); // Rejeite a Promise se ocorrer um erro na chamada da API
    //             });
    //     });
    // };

    buscarPedido = (value) => {
        return new Promise((resolve, reject) => {
            this.setState({ buscaPedido: value, carregando: true });
            fetch("http://localhost:8085/api/v1/pedidos")
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error("Erro na chamada da API");
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.retorno.pedidos) {
                        const ultimoPedido = dados.retorno.pedidos[dados.retorno.pedidos.length - 1];
                        const numeroPedido = +ultimoPedido.pedido.numero + 1; // Adiciona 1 ao último pedido
                        // console.log("Numero do ultimo pedido:", ultimoPedido);
                        // console.log("Numero do proximo pedido:", numeroPedido);
                        this.setState({
                            numeroPedido: ultimoPedido.pedido.numero,
                            ultimoPedido: numeroPedido,
                        });
                    } else {
                        this.setState({
                            pedidos: [],
                        });
                    }
                    this.setState({
                        carregando: false,
                    });
                    resolve(); // Resolva a Promise quando a chamada da API for concluída com sucesso
                })
                .catch((error) => {
                    // console.log("Erro ao buscar pedido:", error);
                    this.setState({
                        pedidos: [],
                        carregando: false,
                    });
                    reject(error); // Rejeite a Promise se ocorrer um erro na chamada da API
                });
        });
    };

    buscarFormaDePagamento = () => {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:8086/api/v1/formaspagamento")
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error("Erro na chamada da API");
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.retorno.formaspagamento) {
                        // console.log("Forma de pagamento objeto retornado:", dados);
                        this.setState({
                            formaspagamento: dados.retorno.formaspagamento,
                        });
                    } else {
                        this.setState({
                            formaspagamento: [],
                        });
                    }
                    this.setState({
                        carregando: false,
                    });
                    resolve(); // Resolva a Promise quando a chamada da API for concluída com sucesso
                })
                .catch((error) => {
                    // console.log("Erro ao buscar forma de pagamento:", error);
                    this.setState({
                        formaspagamento: [],
                        carregando: false,
                    });
                    reject(error); // Rejeite a Promise se ocorrer um erro na chamada da API
                });
        });
    };

    buscarLoja = () => {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:8086/api/v1/selecionaLojas")
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error("Erro na chamada da API");
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados) {
                        // console.log("Forma de pagamento objeto retornado:", dados);
                        const idLojas = dados.map((objeto) => objeto.idLoja);
                        const unidade = dados.map((objeto) => objeto.unidadeLoja);
                        console.log("idLojas:", idLojas, "unidade: ", unidade);
                        this.setState({
                            idLoja: idLojas,
                            unidadeLoja: unidade,
                            objeto: dados // Defina o estado 'objeto' com 'dados' diretamente
                        });
                    } else {
                        this.setState({
                            idLoja: [], // Defina os estados como arrays vazios se não houver dados
                            unidadeLoja: [],
                            objeto: []
                        });
                    }
                    this.setState({
                        carregando: false,
                    });
                    resolve();
                })
                .catch((error) => {
                    // console.log("Erro ao buscar forma de pagamento:", error);
                    this.setState({
                        idLoja: [], // Defina os estados como arrays vazios em caso de erro
                        unidadeLoja: [],
                        objeto: []
                    });
                    reject(error);
                });
        });
    };

    cadastrarPedido = (xmlPedido) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlPedido, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);

        fetch('http://localhost:8085/api/v1/cadastrarpedido', {
            method: 'POST',
            body: stringXml,
            headers: {
                'Content-Type': 'application/xml'
            }
        });
    };

    cadastrarFormaDePagamento = (xmlFormaPagamento) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlFormaPagamento, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);

        fetch('http://localhost:8086/api/v1/cadastrarformapagamento', {
            method: 'POST',
            body: stringXml,
            headers: {
                'Content-Type': 'application/xml'
            }
        });
    };

    //--------------------------------------------- API´s PUBLICAS  ---------------------------------------------

    buscarCep = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                const { logradouro, bairro, localidade, uf } = data;

                this.setState({
                    endereco: logradouro,
                    bairro: bairro,
                    cidade: localidade,
                    uf: uf,
                });

                this.atualizaCidade({ target: { value: localidade } });
                this.atualizaUf({ target: { value: uf } });
                this.atualizaEndereco({ target: { value: logradouro } });
                this.atualizaBairro({ target: { value: bairro } })

                // console.log("CHECKCEP", data);
            });
    };


    //--------------------------------------------- FUNÇÕES DE TELA ---------------------------------------------
    // -------------------------------------------- FUNÇÕES VENDEDOR --------------------------------------------

    atualizaBuscaVendedor = (event) => {
        // console.log("vendedor selecionado:", vendedorSelecionado);
        this.setState({
            buscaVendedor: event.target.value
        });
    };

    selecionarVendedor = (vendedor) => {
        this.setState({
            vendedorSelecionado: vendedor,
            buscaVendedor: vendedor.contato.nome,
            vendedor: vendedor.contato.nome
        });
    };

    // atualizarBuscaVendedor = (event) => {
    //     this.setState({
    //         buscaVendedor: event.target.value
    //     });
    // };

    // selecionarVendedor = (contato) => {
    //     this.setState({
    //         contatoSelecionado: contato,
    //         descricao: contato.contato[0].contato.tiposContato[0].tipoContato.descricao,
    //         contatos: [],
    //     });
    //     this.atualizarBuscaContato({ target: { value: '' } });
    // };

    // adicionarVendedorSelecionado = (vendedorSelecionado) => {
    //     const { contatosSelecionados, cnpj } = this.state;
    //     const contatoExistente = contatosSelecionados.find((contato) => contato.contato.id === vendedorSelecionado.contato.id);

    //     if (contatoExistente) {
    //         contatoExistente.cnpj += cnpj; // Adiciona a quantidade selecionada
    //     } else {
    //         contatosSelecionados.push({
    //             nome: vendedorSelecionado.nome,
    //             descricao: vendedorSelecionado[0].contato.tiposContato[0].tipoContato.descricao
    //         });
    //     }

    //     this.setState({
    //         contatosSelecionados: contatosSelecionados,
    //         contatoSelecionado: null,
    //         nome: '',
    //         descricao: '',
    //         contatos: [],
    //         buscaContato: '',
    //     });
    // };

    // -------------------------------------------- FUNÇÕES / CADASTRO DE CONTATO ---------------------------------------------

    atualizarBuscaContato = (event) => {
        const buscaContato = event.target.value;
        // console.log("atualizarBuscaContato (buscaContato):", buscaContato);
        this.setState({
            buscaContato: buscaContato || "Consumidor Final",
            nome: buscaContato || "Consumidor Final",
        });
    };

    atualizaConsumidorFinal = (prevState) => {
        this.setState({
            consumidorFinal: "Consumidor Final"
        });
    }

    selecionarContato = (contato) => {
        this.setState({
            buscaContato: contato.contato.nome,
            contatoSelecionado: contato,
            nome: contato.contato.nome,
            consumidorFinal: contato.contato.nome,
            ie_rg: contato.contato.ie_rg,
            contribuinte: contato.contato.contribuinte,
            rg: contato.contato.rg,
            cep: contato.contato.cep,
            complemento: contato.contato.complemento,
            email: contato.contato.email,
            fone: contato.contato.fone,
            celular: contato.contato.celular,
            dataNascimento: contato.contato.dataNascimento,
            tipo: contato.contato.tipo,
            cnpj: contato.contato.cnpj,
            codigo: contato.contato.codigo,
            fantasia: contato.contato.fantasia,
            endereco: contato.contato.endereco,
            numero: contato.contato.numero,
            bairro: contato.contato.bairro,
            cidade: contato.contato.cidade,
            uf: contato.contato.uf,
            contatos: [],
        });
        // console.log("atualizarBuscaContato (buscaContato):", buscaContato);
        // console.log("selecionarContato (contatoSelecionado)", contatoSelecionado)
        // console.log("selecionarContato (contato)", contato);
        // console.log("selecionarContato (nome)", contato.contato.nome);
        // console.log("selecionarContato (consumidorFinal)", contato.contato.nome);
        // console.log("selecionarContato (ie_rg)", contato.contato.ie_rg);
        // console.log("selecionarContato (contribuinte)", contato.contato.contribuinte);
        // console.log("selecionarContato (rg)", contato.contato.rg);
        // console.log("selecionarContato (cep)", contato.contato.cep);
        // console.log("selecionarContato (complemento)", contato.contato.complemento);
        // console.log("selecionarContato (email)", contato.contato.email);
        // console.log("selecionarContato (fone)", contato.contato.fone);
        // console.log("selecionarContato (celular)", contato.contato.celular);
        // console.log("selecionarContato (dataNascimento)", contato.contato.dataNascimento);
        // console.log("selecionarContato (tipo)", contato.contato.tipo);
        // console.log("selecionarContato (cnpj)", contato.contato.cnpj);
        // console.log("selecionarContato (codigo)", contato.contato.codigo);
        // console.log("selecionarContato (fantasia)", contato.contato.fantasia);
        // console.log("selecionarContato (endereco)", contato.contato.endereco);
        // console.log("selecionarContato (numero)", contato.contato.numero);
        // console.log("selecionarContato (bairro)", contato.contato.bairro);
        // console.log("selecionarContato (cidade)", contato.contato.cidade);
        // console.log("selecionarContato (uf)", contato.contato.uf);
        // console.log("selecionarContato (contatos)", []);
    };

    atualizaNome = (event) => {
        const nome = event.target.value;
        // console.log("Nome:", nome);
        this.setState({
            nome: nome,
            buscaContato: nome
        });
    };

    atualizaTipoPessoa = (event) => {
        // console.log("tipo:", event.target.value);
        this.setState({
            tipo: event.target.value
        });
    };

    atualizaCodigo = (event) => {
        // console.log("Codigo:", event.target.value);
        this.setState({
            codigo: event.target.value
        });
    };

    atualizaFantasia = (event) => {
        // console.log("Fantasia:", event.target.value);
        this.setState({
            fantasia: event.target.value
        });
    };

    atualizaCpfCnpj = (event) => {
        const cpfCnpj = event.target.value;

        // Remove qualquer pontuação existente
        const cpfCnpjSemPontuacao = cpfCnpj.replace(/[^\d]/g, "");

        // Verifica se é um CPF válido
        if (cpfCnpjSemPontuacao.length === 11) {
            const cpfFormatado = cpfCnpjSemPontuacao.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            this.setState({ cnpj: cpfFormatado });
        }
        // Verifica se é um CNPJ válido
        else if (cpfCnpjSemPontuacao.length === 14) {
            const cnpjFormatado = cpfCnpjSemPontuacao.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            this.setState({ cnpj: cnpjFormatado });
        }
        // Caso contrário, mantém o valor original
        else {
            this.setState({ cnpj: cpfCnpj });
        }
    };

    atualizaRg = (event) => {
        const rg = event.target.value;
        const rgSemPontuacao = rg.replace(/[^\d]/g, "");
        const rgFormatado = rgSemPontuacao.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
        this.setState({ rg: rgFormatado });
    };

    atualizaIe = (event) => {
        const ie_rg = event.target.value;
        const ieSemPontuacao = ie_rg.replace(/[^\d]/g, "");
        const ieFormatado = ieSemPontuacao.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1.$2.$3.$4");
        this.setState({
            ie_rg: ieFormatado,
            ie: ieFormatado
        });

        if (this.state.contribuinte === "2") {
            this.setState({
                ie_rg: "ISENTO",
                ie: "ISENTO"
            });
        }
    };

    atualizaContribuinte = (event) => {
        const contribuinte = event.target.value;
        this.setState({
            contribuinte: contribuinte
        });

        if (contribuinte === "2") {
            this.setState({
                ie_rg: "ISENTO",
                ie: "ISENTO"
            });
        }
    };

    atualizaCidade = (event) => {
        // console.log("cidade: ", event.target.value);
        this.setState({
            cidade: event.target.value
        });
    };

    atualizaEndereco = (event) => {
        // console.log("endereco: ", event.target.value);
        this.setState({
            endereco: event.target.value
        });
    };

    atualizaNumero = (event) => {
        // console.log("numero: ", event.target.value);
        this.setState({
            numero: event.target.value
        });
    };

    atualizaBairro = (event) => {
        // console.log("bairro: ", event.target.value);
        this.setState({
            bairro: event.target.value
        });
    };

    atualizaComplemento = (event) => {
        // console.log("complemento: ", event.target.value);
        this.setState({
            complemento: event.target.value
        });
    };

    atualizaCep = (event) => {
        const cep = event.target.value;
        const cepSemPontuacao = cep.replace(/[^\d]/g, "");
        const cepFormatado = cepSemPontuacao.replace(/(\d{5})(\d{3})/, "$1-$2");
        this.setState({ cep: cepFormatado });
    };

    atualizaUf = (event) => {
        // console.log("uf: ", event.target.value);
        this.setState({
            uf: event.target.value
        });
    };

    atualizaEmail = (event) => {
        // console.log("email: ", event.target.value);
        this.setState({
            email: event.target.value
        });
    };

    atualizaCelular = (event) => {
        const celular = event.target.value;
        const celularSemPontuacao = celular.replace(/[^\d]/g, "");
        const celularFormatado = celularSemPontuacao.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        this.setState({ celular: celularFormatado });
    };

    atualizaDataNascimento = (event) => {
        const dataNascimento = event.target.value;
        const dataNascimentoSemPontuacao = dataNascimento.replace(/[^\d]/g, "");
        const dataNascimentoFormatada = dataNascimentoSemPontuacao.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
        this.setState({ dataNascimento: dataNascimentoFormatada });
    };

    atualizaFone = (event) => {
        const fone = event.target.value;
        const foneSemPontuacao = fone.replace(/[^\d]/g, "");
        const foneFormatado = foneSemPontuacao.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        this.setState({ fone: foneFormatado });
    };

    // adicionarContatoSelecionado = (contatoSelecionado) => {
    //     const { contatosSelecionados, cnpj } = this.state;
    //     const contatoExistente = contatosSelecionados.find((contato) => contato.contato.id === contatoSelecionado.contato.id);

    //     if (contatoExistente) {
    //         contatoExistente.cnpj += cnpj; // Adiciona a quantidade selecionada
    //     } else {
    //         contatosSelecionados.push({
    //             nome: contatoSelecionado.nome,
    //             cnpj: cnpj, // Salva a quantidade selecionada
    //         });
    //     }
    //     console.log("contatoscontatosSelecionados: ", contatosSelecionados, "contatoExistente: ", contatoExistente)
    //     this.setState({
    //         contatosSelecionados: contatosSelecionados,
    //         contatoSelecionado: null,
    //         cnpj: '',
    //         contatos: [],
    //         buscaContato: '',
    //     });
    // };

    // -------------------------------------------- FUNÇÕES PRODUTO / LISTA DE PRODUTO ---------------------------------------------

    atualizarBuscaProduto = (event) => {
        this.setState({
            buscaProduto: event.target.value
        });
    };

    selecionarProduto = (produto) => {
        const preco = parseFloat(produto.produto.preco).toFixed(2);
        const valorTotal = (parseFloat(produto.produto.preco) * 1).toFixed(2);
        this.setState({
            produtoSelecionado: produto,
            preco: preco,
            precoUnitario: preco,
            produtos: [],
            quantidade: 1,
            valorTotal: valorTotal,
            comentario: '',
            descontoInicialProduto: '',
            imagem: produto.produto.imageThumbnail
        });
        this.atualizarBuscaProduto({ target: { value: '' } });
    };

    adicionarProdutoSelecionado = (produtoSelecionado) => {
        if (!produtoSelecionado) {
            this.modalInserirProduto()
            return;
        }

        const { produtosSelecionados, quantidade, preco, precoUnitario } = this.state;
        const produtoExistenteIndex = produtosSelecionados.findIndex((produto) => produto.produto.id === produtoSelecionado.produto.id);

        if (produtoExistenteIndex !== -1) {
            produtosSelecionados[produtoExistenteIndex].quantidade += quantidade;
        } else {
            produtosSelecionados.push({
                produto: produtoSelecionado.produto,
                quantidade: quantidade,
                preco: preco,
                precoUnitario: preco,
                valorUnitarioLista: preco // Defina o valor do campo "Valor unitário" como o preço do produto adicionado
            });
        }

        console.log(produtosSelecionados)


        this.setState({
            produtosSelecionados: produtosSelecionados,
            produtoSelecionado: null,
            buscaProduto: '',
            produtos: [],
            quantidade: 1,
            valorTotal: '',
            preco: '',
            desconto: 0,
            comentario: '',
            descontoInicialProduto: ''
        }, () => {
            this.calcularTotal();
        });
    };

    excluirProdutoSelecionado = (index) => {
        const produtosSelecionados = [...this.state.produtosSelecionados];
        const produtoExcluido = produtosSelecionados.splice(index, 1)[0];
        const quantidadeExcluida = produtoExcluido.quantidade;
        const produto = produtoExcluido.produto;
        const subTotalAnterior = this.state.subTotal;
        const subTotal = (parseFloat(subTotalAnterior) - this.calcularSubTotal(produto, quantidadeExcluida)).toFixed(2);
        // console.log("Novo Subtotal:", subTotal);
        this.setState({
            produtosSelecionados,
            subTotal,
        });
    };

    // -------------------------------------------- FUNÇÕES CALCULOS ---------------------------------------------

    calcularTotal() {
        let total = 0;
        this.state.produtosSelecionados.forEach((produto) => {
            total += this.calcularSubTotal(produto.produto, produto.quantidade, produto.preco);
        });
        const subTotal = total.toFixed(2);

        if (this.state.subTotal !== subTotal) {
            this.setState({ subTotal });
        }
        return parseFloat(subTotal);
    }

    calcularSubTotal = (produto, quantidade, preco) => {
        return preco * quantidade
    };

    atualizaQuantidade = (event) => {
        const quantidade = parseFloat(event.target.value);
        this.setState({
            quantidade
        }, this.atualizarValorTotal);
    };

    atualizaPreco = (event) => {
        const preco = event.target.value;
        this.setState({
            preco: preco
        });
    };

    // -------------------------------------------- FUNÇÕES CAMPO PREÇO (%) --------------------------------------------

    atualizaDescontoProduto = (event) => {
        const descontoInicialProduto = event.target.value;
        this.setState({
            descontoInicialProduto: descontoInicialProduto
        }, () => {
            clearTimeout(this.valorTotalTimeout);
            this.valorTotalTimeout = setTimeout(this.atualizarValorTotal, 500);
        });
    };

    atualizarValorTotal = () => {
        const { quantidade, preco, descontoInicialProduto } = this.state;
        let novoPrecoDesconto = parseFloat(preco);
        let descontoTotal = 0;

        if (descontoInicialProduto !== '') {
            const descontoPorcentagem = parseFloat(descontoInicialProduto.replace(',', '.'));
            const descontoDecimal = descontoPorcentagem / 100;
            descontoTotal = novoPrecoDesconto * descontoDecimal;
            novoPrecoDesconto -= descontoTotal;
        }

        const valorTotal = quantidade * novoPrecoDesconto;

        // console.log("DESCONTO: ", descontoTotal);
        // console.log("VALOR TOTAL: ", valorTotal);

        this.setState({
            preco: novoPrecoDesconto.toFixed(2),
            valorTotal: valorTotal.toFixed(2)
        });
    };

    // -------------------------------------------- FUNÇÕES CAMPO DESCONTO (TOTAL) --------------------------------------------


    calcularTotalComDesconto = (desconto, subTotal) => {
        const subtotal = subTotal || this.calcularTotal();
        const valorDesconto = desconto || 0;
        const totalComDesconto = subtotal - valorDesconto;

        let formattedValorDesconto = 0;
        let formattedTotalComDesconto = 0;

        formattedValorDesconto = valorDesconto
        formattedTotalComDesconto = totalComDesconto.toFixed(2);

        if (isNaN(totalComDesconto)) {
            // console.log("Total com desconto é NaN!");
        }

        return {
            valorDesconto: formattedValorDesconto,
            totalComDesconto: formattedTotalComDesconto,
        };
    };

    atualizaDesconto(event) {
        const descontoString = event.target.value.replace(',', '.');
        const descontoNumber = parseFloat(descontoString.replace(/[^\d.-]/g, ''));

        if (isNaN(descontoNumber)) {
            this.setState({
                valorDesconto: '',
                desconto: false,
                totalComDesconto: '',
            });
            return;
        }

        const resultado = this.calcularTotalComDesconto(descontoNumber);
        this.setState({
            valorDesconto: descontoString,
            desconto: descontoNumber.toFixed(2),
            totalComDesconto: resultado.totalComDesconto,
        });
    };

    // -------------------------------------------- FUNÇÕES CAMPOS TOTAL EM DINHEIRO E TROCO --------------------------------------------


    calcularTotalComDinheiro = (dinheiro) => {
        const totalRecebidoEmDinheiro = parseFloat(dinheiro) || 0;
        const subTotalGeral = this.state.subTotalGeral;

        if (isNaN(totalRecebidoEmDinheiro)) {
            return {
                dinheiroRecebido: 0,
                troco: 0,
            };
        }

        let troco = totalRecebidoEmDinheiro - subTotalGeral;

        if (troco < 0) {
            troco = 0;
        }

        return {
            dinheiroRecebido: dinheiro,
            troco: troco.toFixed(2),
        };
    };

    atualizaTroco = (event) => {
        const valorRecebido = event.target.value;

        if (!valorRecebido) {
            this.setState({
                dinheiroRecebido: 0,
                troco: 0,
            });
            return;
        }

        if (!isNaN(parseFloat(valorRecebido)) && parseFloat(valorRecebido) > 0) {
            const { totalComDesconto } = this.state;
            const { dinheiroRecebido, troco } = this.calcularTotalComDinheiro(valorRecebido, totalComDesconto);

            this.setState({
                dinheiroRecebido,
                troco: troco,
            });
        }
    };

    // -------------------------------------------- FUNÇÕES CAMPO FRETE --------------------------------------------


    atualizaTotalComFrete(event) {
        const valor = event.target.value.replace(',', '.');
        let frete = parseFloat(valor);
        if (isNaN(frete)) {
            frete = 0;
        }
        const subTotal = this.state.subTotal;
        const totalComDesconto = this.state.totalComDesconto;

        let subTotalComFrete;
        if (totalComDesconto && totalComDesconto.length > 0) {
            subTotalComFrete = (parseFloat(totalComDesconto) + frete).toFixed(2);
        } else {
            subTotalComFrete = (parseFloat(subTotal) + frete).toFixed(2);
        }

        this.setState({
            subTotalComFrete: subTotalComFrete.replace('.', ','),
            frete: frete,
            freteInserido: true,
        });
    };

    calcularSubTotalGeral = () => {
        const subTotal = this.calcularTotal().toFixed(2);
        const desconto = this.state.valorDesconto;
        const totalComDesconto = this.calcularTotalComDesconto(desconto, subTotal).totalComDesconto;
        const frete = this.state.frete;
        const subTotalComFrete = parseFloat(totalComDesconto) + parseFloat(frete);
        let subTotalGeral = subTotalComFrete.toFixed(2);

        return parseFloat(subTotalGeral);
    };

    // incrementarQuantidade = () => {
    //     this.setState(prevState => ({
    //         quantidade: prevState.quantidade + 1
    //     }),
    //         this.atualizarValorTotal);
    // };

    // decrementarQuantidade = () => {
    //     this.setState(prevState => ({
    //         quantidade: prevState.quantidade > 1 ? prevState.quantidade - 1 : 1
    //     }),
    //         this.atualizarValorTotal);
    // };

    // atualizaTotalComFrete(event) {
    //     const valor = event.target.value;
    //     // console.log('valor:', valor);
    //     let frete = 0;
    //     if (typeof valor === 'string') {
    //         frete = parseFloat(valor);
    //     }
    //     // console.log('frete:', frete);
    //     const subTotal = this.state.subTotal.toFixed(2);
    //     const totalComDesconto = this.state.totalComDesconto;
    //     // console.log('subTotal:', subTotal);
    //     // console.log('totalComDesconto:', totalComDesconto);
    //     let subTotalComFrete;
    //     if (totalComDesconto && totalComDesconto.length > 0) {
    //         subTotalComFrete = (parseFloat(totalComDesconto) + frete).toFixed(2);
    //     } else {
    //         subTotalComFrete = (parseFloat(subTotal) + frete).toFixed(2);
    //     }
    //     // console.log('subTotalComFrete:', subTotalComFrete);
    //     this.setState({
    //         subTotalComFrete: subTotalComFrete,
    //         frete: frete,
    //         freteInserido: true
    //     });
    // };

    // atualizaDataPrevista = (novaDataPrevista) => {
    //     // console.log(novaDataPrevista);
    //     const dataPrevista = novaDataPrevista.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    //     // console.log(dataPrevista);
    //     this.setState({
    //         dataPrevista: novaDataPrevista
    //     });
    // };

    // -------------------------------------------- FUNÇÕES TELA SELEÇÃO DE LOJA E UNIDADE --------------------------------------------


    atualizaNomeLoja = (event) => {
        const idLoja = event.target.options[event.target.selectedIndex].value;
        console.log("idLoja: ", idLoja)
        const unidadeLojaSelecionada = this.state.objeto.find((objeto) => objeto.idLoja === idLoja)?.unidadeLoja || '';
        this.setState({
            idLoja: idLoja,
            unidadeLoja: unidadeLojaSelecionada
        });
    };

    atualizaUnidadeNegocio = (event) => {
        const unidadeLojaSelecionada = event.target.value;
        this.setState({
            unidadeLoja: unidadeLojaSelecionada
        });
    };


    atualizaObservacoes = (event) => {
        const observacoes = event.target.value;
        // console.log(event.target.value);
        this.setState({
            observacoes
        });
    };

    atualizaObservacaoInterna = (event) => {
        const observacaointerna = event.target.value;
        // console.log(event.target.value);
        this.setState({
            observacaointerna
        });
    };

    atualizarComentario = (event) => {
        const comentario = event.target.value;
        // console.log("Comentario", event.target.value);
        this.setState({
            comentario
        });
    };


    // handleChangeDesconto = (event) => {
    //     const { value } = event.target;
    //     const desconto = parseFloat(value);

    //     if (isNaN(desconto)) {
    //         this.setState({ desconto: "" });
    //         return;
    //     }

    //     const { subTotal } = this.state;
    //     const totalComDesconto = (subTotal - desconto).toFixed(2);

    //     this.setState({ desconto, totalComDesconto });
    // };


    // calcularValorTotalInicial = () => {
    //     const { preco } = this.state;
    //     const quantidade = 1;
    //     const valorTotal = quantidade * parseFloat(preco);
    //     this.setState({ quantidade, valorTotal });
    // };

    // calcularTotalComDesconto = (desconto, subTotal) => {
    //     const subtotal = subTotal || this.calcularTotal();
    //     const valorDesconto = desconto || 0;
    //     const totalComDesconto = subtotal - valorDesconto;

    //     const formattedValorDesconto = valorDesconto.toFixed(2);
    //     const formattedTotalComDesconto = totalComDesconto.toFixed(2);

    //     console.log("valorDesconto: ", formattedValorDesconto);
    //     console.log("totalComDesconto: ", formattedTotalComDesconto);


    //     if (isNaN(totalComDesconto)) {
    //         console.log("Total com desconto é NaN!");
    //     }

    //     return {
    //         valorDesconto: formattedValorDesconto,
    //         totalComDesconto: formattedTotalComDesconto
    //     };
    // }


    // -------------------------------------------- FUNÇÕES BOTÕES ---------------------------------------------

    excluirPedido = () => {
        this.setState({
            vendedor: '',
            vendedorSelecionado: '',
            contatoSelecionado: '',
            nome: '',
            tipo: '',
            cnpj: '',
            codigo: '',
            fantasia: '',
            buscaContato: '',
            consumidorFinal: '',
            ie_rg: '',
            contribuinte: 9,
            rg: '',
            cep: '',
            complemento: '',
            email: '',
            fone: '',
            celular: '',
            dataNascimento: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            uf: '',
            produtosSelecionados: [], // adiciona a limpeza da lista aqui
            produtoSelecionado: '',
            quantidade: 1,
            desconto: 0,
            preco: 0,
            valorTotal: 0,
            comentario: '',
            subTotal: 0,
            valorDesconto: 0,
            totalComDesconto: 0,
            dinheiroRecebido: '',
            dinheiro: 0,
            troco: 0,
            condicao: '',
            parcelas: [{ dias: 0, observacao: '', valor: '' }],
            dataPrevista: '',
            depositoSelecionado: '',
            frete: 0,
            observacoes: '',
            observacaointerna: '',
            subTotalGeral: 0,
            descontoInicialProduto: 0,
            validated: false,
            buscaVendedor: '',
            vendedores: []

        });
        this.ModalExcluirPedido()
        this.modalSalvarPedido()
    };

    limparPedido = () => {
        this.setState({
            vendedor: '',
            vendedorSelecionado: '',
            buscaVendedor: '',
            contatoSelecionado: '',
            nome: '',
            tipo: '',
            cnpj: '',
            codigo: '',
            fantasia: '',
            buscaContato: '',
            consumidorFinal: '',
            ie_rg: '',
            contribuinte: 9,
            rg: '',
            cep: '',
            complemento: '',
            email: '',
            fone: '',
            celular: '',
            dataNascimento: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            uf: '',
            produtosSelecionados: [], // adiciona a limpeza da lista aqui
            quantidade: 1,
            desconto: 0,
            preco: 0,
            valorTotal: 0,
            comentario: '',
            subTotal: 0,
            valorDesconto: 0,
            totalComDesconto: 0,
            dinheiroRecebido: '',
            dinheiro: 0,
            troco: 0,
            condicao: '',
            parcelas: [{ dias: 0, observacao: '', valor: '' }],
            dataPrevista: '',
            depositoSelecionado: '',
            frete: 0,
            observacoes: '',
            observacaointerna: '',
            descontoInicialProduto: 0,
            validated: false,
            vendedores: []
        });
    };

    validaVenda = (event) => {
        event.preventDefault(); // Evita a atualização da página
        const form = event.currentTarget;
        console.log("TESTE:", form.checkValidity())
        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setState({ validated: true }); // Atualiza o estado para mostrar as mensagens de validação
        } else {
            this.finalizaVenda();
        }
    };

    finalizaVenda = () => {
        // const dataPrevista = new Date(this.state.dataPrevista); // converte para objeto Date
        // const dataPrevistaFormatted = `${dataPrevista.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${dataPrevista.toLocaleTimeString('pt-BR')}`;
        // console.log(this.state.dataPrevista)
        // console.log(dataPrevistaFormatted)
        const condicao = this.state.condicao;
        const nome = this.state.nome;
        const cnpj = this.state.cnpj;
        const vendedor = this.state.vendedor;
        const observacoes = this.state.observacoes;
        const observacaointerna = this.state.observacaointerna;
        const valorDesconto = this.state.desconto;
        const itens = [];
        const prazo = [];


        this.state.produtosSelecionados.forEach((produto) => {
            const item = {
                codigo: produto.produto.codigo,
                descricao: produto.produto.descricao,
                qtde: produto.quantidade,
                vlr_unit: produto.precoUnitario,
                descontoItemLista: produto.descontoItem
            };
            itens.push(item);
        });

        console.log(prazo);

        this.state.parcelas.forEach((parcela) => {
            const parcelas = {
                data: parcela.data,
                valor: parcela.valor,
                observacao: parcela.observacao,
                forma: parcela.forma
            };
            prazo.push(parcelas);
        });


        if (itens.length === 0) {
            this.ModalFinalizarVendaSemItem();
            return;
        } else if (!condicao || condicao === 'Selecione a forma') {
            this.ModalFormaPagamento();
            return;
        } else {
            this.canvasFinalizarPedido();
        }

        return {
            nome, cnpj, itens, vendedor, observacoes, observacaointerna, valorDesconto, prazo,
            // dataPrevista,
            // dataPrevistaFormatted
        };
    };

    gerarXmlItensParaEnvio = () => {
        const { itens, prazo, dataPrevistaFormatted = '' } = this.finalizaVenda();

        const xml = `<?xml version="1.0"?>
          <pedido>
          <vlr_desconto>${this.state.valorDesconto}</vlr_desconto>
            <data_prevista>${dataPrevistaFormatted}</data_prevista>
            <obs>${this.state.observacoes}</obs>
            <obs_internas>${this.state.observacaointerna}</obs_internas>
            <vendedor>${this.state.vendedor}</vendedor>
            <vlr_frete>${this.state.frete}</vlr_frete>
            <loja>${this.state.idLoja}</loja>
            <cliente>
                <nome>${this.state.nome}</nome>
                <cpf_cnpj>${this.state.cnpj}</cpf_cnpj>
                <tipoPessoa>${this.state.tipo}</tipoPessoa>
                <ie>${this.state.ie}</ie>
                <rg>${this.state.rg}</rg>
                <contribuinte>${this.state.contribuinte}</contribuinte>
                <endereco>${this.state.endereco}</endereco>
                <numero>${this.state.numero}</numero>
                <complemento>${this.state.complemento}</complemento>
                <bairro>${this.state.bairro}</bairro>
                <cep>${this.state.cep}</cep>
                <cidade>${this.state.cidade}</cidade>
                <uf>${this.state.uf}</uf>
                <fone>${this.state.fone}</fone>
                <celular>${this.state.celular}</celular>
                <email>${this.state.email}</email>
                <dataNascimento>${this.state.dataNascimento}</dataNascimento>
            </cliente>
            <itens>
              ${itens.map((item) => `
                <item>
                  <codigo>${item.codigo}</codigo>
                  <descricao>${item.descricao}</descricao>
                  <qtde>${item.qtde}</qtde>
                  <vlr_unit>${item.vlr_unit}</vlr_unit>
                  <vlr_desconto>${item.descontoItemLista}</vlr_desconto>
                </item>`).join('')}
            </itens>
            <parcelas>
            ${prazo.map((parcelas) => `
                <parcela>
                    <data>${parcelas.data}</data>
                    <vlr>${parcelas.valor}</vlr>
                    <obs>${parcelas.observacao}</obs>
                    <forma_pagamento>
                        <id>${parcelas.forma}</id>
                    </forma_pagamento>
               </parcela>`).join('')}
            </parcelas>
          </pedido > `;

        console.log(xml);

        const xmlContato = ('xml', xml);

        this.cadastrarPedido(xmlContato);
        this.limparPedido();
        this.modalSalvarPedido();
        this.canvasFinalizarPedido();

        return xml;
    };


    // -------------------------------------------- FUNÇÕES PARCELAS ---------------------------------------------

    handleChange(event) {
        this.setState({
            condicao: event.target.value,
        });
    };

    handleChangePrazo(event) {
        this.setState({
            prazo: event.target.value
        });
    };

    handleChangeDias = (index, value) => {
        const { parcelas } = this.state;
        const newParcelas = [...parcelas];
        newParcelas[index].dias = value;
        // Atualize o valor da data com base nos dias alterados
        newParcelas[index].data = this.calcularData(value);
        this.setState({ parcelas: newParcelas });
    };


    handleChangeParcela(index, campo, valor) {
        const parcelas = [...this.state.parcelas];
        parcelas[index][campo] = valor;
        this.setState({
            parcelas
        });
    };

    adicionarParcela() {
        const { condicao } = this.state;
        const { prazo } = this.state;
        console.log("prazo: ", prazo)
        const dias = parseInt(prazo);
        const forma = condicao;
        const hoje = new Date();
        const data = new Date(hoje.getTime() + parseInt(dias) * 24 * 60 * 60 * 1000);
        const dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const novaParcela = {
            dias: prazo,
            data: dataFormatada,
            valor: '',
            forma, // Atribui o valor de "condicao" em "forma"
            observacao: '',
            acao: '',
        };

        let parcelas = [...this.state.parcelas];
        const index = parcelas.findIndex((parcela) => parcela.dias === 0);
        if (index !== -1) {
            parcelas.splice(index, 1);
        }
        parcelas = [...parcelas, novaParcela];

        // Divide o valor total entre as parcelas
        const numParcelas = parcelas.length;
        const valorParcela = (this.state.subTotalGeral / numParcelas).toFixed(2);

        // Atualiza o valor de cada parcela
        const newParcelas = parcelas.map((parcela, i) => ({
            ...parcela,
            valor: valorParcela,
        }));

        this.setState({
            numLinhas: this.state.numLinhas + 1,
            parcelas: newParcelas,
        });

        console.log("dias", dias)
        console.log("data", dataFormatada)
    }


    handleValorChangeParcela(index, campo, valor) {
        const parcelas = [...this.state.parcelas];
        const numParcelas = parcelas.length;

        // Calcula a soma total dos valores das parcelas
        // const valorTotalParcelas = parcelas.reduce((acc, curr) => acc + parseFloat(curr.valor || 0), 0);

        // Calcula o valor atual da parcela selecionada
        const valorAtualParcela = parseFloat(parcelas[index].valor || 0);

        // Calcula a diferença de valor a ser aplicada nas demais parcelas
        const diferenca = (valorAtualParcela - valor) / (numParcelas - 1);

        // Atualiza o valor da parcela selecionada
        parcelas[index][campo] = valor;

        // Atualiza os valores das outras parcelas com a diferença calculada
        const newParcelas = parcelas.map((parcela, i) => {
            if (i !== index) {
                const novoValor = parseFloat(parcela.valor || 0) + diferenca;
                return { ...parcela, valor: novoValor.toFixed(2) };
            }
            return parcela;
        });

        this.setState({ parcelas: newParcelas });
    };


    // handleFormaChange = (index, event) => {
    //     const parcelas = [...this.state.parcelas];
    //     parcelas[index].forma = event.target.value;
    //     this.setState({
    //         parcelas
    //     });
    // };

    handleObservacaoChange = (index, event) => {
        const parcelas = [...this.state.parcelas];
        parcelas[index].observacao = event.target.value;
        this.setState({
            parcelas
        });
    };

    handleDeleteParcela(index) {
        const parcelas = [...this.state.parcelas];
        const valorExcluido = parseFloat(parcelas[index].valor || 0);
        parcelas.splice(index, 1);

        const numParcelas = parcelas.length;
        const valorParcela = this.state.subTotalGeral / numParcelas;
        const valorRestante = this.state.subTotalGeral - valorExcluido;

        const diferenca = valorRestante - parcelas.reduce((acc, cur) => acc + parseFloat(cur.valor || 0), 0);
        const valorRestanteParcela = diferenca / numParcelas;

        const newParcelas = parcelas.map((parcela, i) => {
            return {
                ...parcela,
                valor: (valorParcela + valorRestanteParcela).toFixed(2)
            };
        });

        let parcelasRestantes = [];
        if (numParcelas < this.state.numParcelas) {
            const numParcelasRestantes = this.state.numParcelas - numParcelas;
            parcelasRestantes = new Array(numParcelasRestantes).fill().map((_, i) => {
                return {
                    numeroParcela: numParcelas + i + 1,
                    valor: valorRestanteParcela.toFixed(2)
                };
            });
        }

        this.setState({
            parcelas: [...newParcelas, ...parcelasRestantes],
            valorTotalParcela: valorRestanteParcela.toFixed(2),
        });
    };

    calcularData = (dias) => {
        const dataAtual = new Date();
        const dataCalculada = new Date(dataAtual.getTime() + dias * 24 * 60 * 60 * 1000);
        const dia = dataCalculada.getDate().toString().padStart(2, '0');
        const mes = (dataCalculada.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataCalculada.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    // handleChangeParcela(index, campo, valor) {
    //     const parcelas = [...this.state.parcelas];
    //     parcelas[index][campo] = valor;
    //     this.setState({ parcelas });
    // }

    // adicionarParcela() {
    //     const { condicao } = this.state;
    //     const dias = parseInt(condicao);
    //     const hoje = new Date();
    //     const data = new Date(hoje.getTime() + dias * 24 * 60 * 60 * 1000);
    //     const dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    //     const novaParcela = {
    //         dias,
    //         data: dataFormatada,
    //         valor: '',
    //         forma: '',
    //         observacao: '',
    //         acao: '',
    //     };

    //     console.log(dataFormatada)

    //     let parcelas = [...this.state.parcelas];
    //     const index = parcelas.findIndex(parcela => parcela.dias === 0);
    //     if (index !== -1) {
    //         parcelas.splice(index, 1);
    //     }
    //     parcelas = [...parcelas, novaParcela];

    //     this.setState({ parcelas });
    // }

    // --------------------------------------- FUNÇÕES ACRESCENTA .00 CAMPOS ----------------------------------------


    formatarDesconto = (event) => {
        let valor = event.target.value.trim();
        let desconto = valor !== '' && !isNaN(valor) ? parseFloat(valor).toFixed(2) : 0;
        this.setState({
            valorDesconto: desconto
        });
    };

    formatarFrete = (event) => {
        const valorFrete = event.target.value.trim();
        const frete = valorFrete !== '' && !isNaN(valorFrete) ? parseFloat(valorFrete).toFixed(2) : 0;
        this.setState({
            frete: frete
        });
    };

    formatarTroco = (event) => {
        const dinheiroRecebido = event.target.value.trim();
        const dinheiro = dinheiroRecebido !== '' && !isNaN(dinheiroRecebido) ? parseFloat(dinheiroRecebido).toFixed(2) : 0;
        // console.log(dinheiroRecebido, dinheiro)
        this.setState({
            dinheiroRecebido: dinheiro
        });
    };


    // --------------------------------------- FUNÇÕES EDITAR LISTA DE PRODUTOS ----------------------------------------


    atualizaValorLista = (event) => {
        this.setState({
            valorLista: event.target.value
        });
    };

    atualizaQuantidadeLista = (event) => {
        const quantidadeLista = Number(event.target.value);
        this.setState({
            quantidadeLista
        },
            this.atualizaSubTotalLista
        );
    };

    atualizaDescontoItem = (event) => {
        const descontoItemLista = event.target.value;
        this.setState({
            descontoItemLista
        });
    };

    atualizaValorUnitario = (event) => {
        const valorUnitarioLista = event.target.value;
        this.setState({
            valorUnitarioLista
        });
    };

    aplicaDescontoItem = () => {
        const { descontoItemLista, valorUnitarioOriginal, quantidadeLista } = this.state;

        if (descontoItemLista !== '') {

            const descontoPorcentagem = parseFloat(descontoItemLista.replace(',', '.'));
            const descontoDecimal = descontoPorcentagem / 100;
            const novoValorUnitario = valorUnitarioOriginal - (valorUnitarioOriginal * descontoDecimal);
            const valorTotalLista = (quantidadeLista * novoValorUnitario).toFixed(2);

            this.setState({
                valorUnitarioLista: novoValorUnitario.toFixed(2),
                valorTotalLista: valorTotalLista
            }, () => {
                console.log('Novo valor unitário:', this.state.valorUnitarioLista);
                console.log('Subtotal:', this.state.valorTotalLista);
            });
        } else {
            this.setState({
                valorUnitarioLista: valorUnitarioOriginal,
                valorTotalLista: (quantidadeLista * valorUnitarioOriginal).toFixed(2)
            }, () => {
                console.log('Valor unitário original restaurado:', this.state.valorUnitarioLista);
                console.log('Subtotal:', this.state.valorTotalLista);
            });
        }
    };

    atualizaSubTotalLista = () => {
        const { quantidadeLista, valorUnitarioLista } = this.state;

        if (valorUnitarioLista !== '' && !isNaN(parseFloat(valorUnitarioLista))) {
            const valorTotalLista = (quantidadeLista * parseFloat(valorUnitarioLista)).toFixed(2);

            this.setState({
                valorTotalLista: valorTotalLista
            }, () => {
                console.log('Subtotal:', this.state.valorTotalLista);
            });
        } else {
            this.setState({
                valorTotalLista: '0.00'
            }, () => {
                console.log('Subtotal:', this.state.valorTotalLista);
            });
        }
    };

    salvarProdutoLista = () => {
        const { produtoSelecionadoIndex, quantidadeLista, valorUnitarioLista, descontoItemLista, produtosSelecionados } = this.state;

        if (produtoSelecionadoIndex !== null && produtoSelecionadoIndex >= 0) {
            const produtosAtualizados = [...produtosSelecionados];
            let novoPreco = parseFloat(valorUnitarioLista);

            const produtoAtualizado = {
                ...produtosAtualizados[produtoSelecionadoIndex],
                quantidade: quantidadeLista,
                preco: novoPreco,
                descontoItem: descontoItemLista
            };

            produtosAtualizados[produtoSelecionadoIndex] = produtoAtualizado;

            this.setState({
                produtosSelecionados: produtosAtualizados,
                modalEditarProduto: false,
                valorLista: '',
                quantidadeLista: '',
                valorUnitarioLista: '',
            });
        }
    };

    fecharModalEditarProduto = () => {
        this.setState({
            modalEditarProduto: false,
        })
    }

    // atualizaDescontoItem = (event) => {
    //     const descontoItemLista = event.target.value;
    //     const { quantidadeLista, valorUnitarioLista } = this.state;

    //     // Verificar se há um desconto aplicado
    //     if (descontoItemLista) {
    //         const desconto = parseFloat(descontoItemLista.replace(",", "."));

    //         // Atualizar o valor unitário subtraindo o desconto
    //         const novoValorUnitario = (valorUnitarioLista - desconto).toFixed(2);

    //         this.setState(
    //             {
    //                 descontoItemLista,
    //                 valorUnitarioLista: novoValorUnitario,
    //             },
    //             this.atualizaSubTotalLista
    //         );
    //     } else {
    //         this.setState(
    //             {
    //                 descontoItemLista,
    //             },
    //             this.atualizaSubTotalLista
    //         );
    //     }
    // };

    // atualizaValorUnitario = (event) => {
    //     let valorUnitarioLista = event.target.value;
    //     if (valorUnitarioLista.includes(",")) {
    //         valorUnitarioLista = valorUnitarioLista.replace(",", ".");
    //     }
    //     this.setState(
    //         {
    //             valorUnitarioLista
    //         },
    //         this.atualizaSubTotalLista
    //     );
    // };

    // atualizaSubTotalLista = () => {
    //     const { quantidadeLista, valorUnitarioLista } = this.state;
    //     const valorTotalLista = (quantidadeLista * parseFloat(valorUnitarioLista)).toFixed(2);
    //     this.setState({
    //         valorTotalLista
    //     });
    // };

    // atualizaDescontoItem = (event) => {
    //     this.setState({
    //         descontoItemLista: event.target.value
    //     });
    // };

    // atualizaValorUnitario = (event) => {
    //     let valorUnitarioLista = event.target.value;
    //     if (valorUnitarioLista.includes(",")) {
    //         valorUnitarioLista = valorUnitarioLista.replace(",", ".");
    //     }
    //     this.setState({
    //         valorUnitarioLista
    //     }, this.atualizaSubTotalLista);
    // };


    // atualizaSubTotalLista = () => {
    //     const { quantidadeLista, valorUnitarioLista } = this.state;
    //     const valorTotalLista = (quantidadeLista * parseFloat(valorUnitarioLista)).toFixed(2);
    //     this.setState({
    //         valorTotalLista
    //     });
    // };




    render() {

        //Produto
        const { produtos, produtoNaoLocalizado, produtoSelecionado, buscaProduto, carregandoProduto, preco, valorTotal, quantidade, desconto, imagem } = this.state;
        //Contatos
        const { contatos, contatoNaoLocalizado, vendedorNaoLocalizado, contatoSelecionado, buscaContato, buscaVendedor, vendedorSelecionado, nome, cnpj, rg, ie_rg, tipo, contribuinte, codigo, fantasia, cep, cidade, uf, endereco, numero, complemento, bairro, email, fone, celular, dataNascimento } = this.state;
        //Calculos
        const { subTotalGeral, observacoes, observacaointerna, valorDesconto, dinheiroRecebido, troco, frete, condicao, depositoSelecionado, subTotal, dataPrevista, consumidorFinal, prazo, numeroPedido, descontoProduto } = this.state;
        //Modals
        const { carregado, erro, validated, primeiroProdutoDesconto, nomeLoja, idLoja, unidadeLoja } = this.state;

        let quantidadeTotal = 0;
        for (const produto of this.state.produtosSelecionados) {
            quantidadeTotal += produto.quantidade;
        }

        if (erro) {
            return (
                <Modal show={true} onHide={() => window.location.reload()} centered>
                    <Modal.Header closeButton className="bg-danger text-white">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                        <Modal.Title>
                            ERRO
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Ocorreu um erro:</p>
                            <p style={{ fontSize: "20px" }}>{erro}</p>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="dark" onClick={() => window.location.reload()}>
                            Tentar novamente
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }

        if (!carregado) {
            return (
                <div className="spinner-container">
                    <div className="d-flex align-items-center justify-content-center">
                        <Spinner variant="secondary" animation="border" role="status">
                            <span className="visually-hidden">Carregando Frente de caixa...</span>
                        </Spinner>
                    </div>
                    <div>
                        <p>Carregando Frente de caixa...</p>
                    </div>
                </div>
            )
        } else {

            return (

                <Container fluid className="pb-5" >
                    <Form noValidate validated={this.state.validated} onSubmit={this.validaVenda}>
                        <Row className="d-flex">
                            <Col md={6} className="">
                                <div className="grid-1">
                                    <div className="mb-3">
                                        <h5>Vendedor</h5>
                                    </div>
                                    <Row className="row align-items-center">
                                        <Col xs={4} >
                                            <Form.Label htmlFor="vendedor" className="texto-campos">Adicionar vendedor</Form.Label>
                                            <Form.Group className="mb-3" >
                                                <InputGroup>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        id="vendedor"
                                                        className="form-control"
                                                        placeholder="Digite o nome do vendedor"
                                                        value={buscaVendedor || ''}
                                                        onChange={this.atualizaBuscaVendedor}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault(); // Evita o comportamento padrão de submit do formulário
                                                                if (buscaVendedor) {
                                                                    this.buscarVendedor(buscaVendedor);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <Button variant="secondary" onClick={() => { if (buscaVendedor) { this.buscarVendedor(buscaVendedor) } }} >
                                                        <FontAwesomeIcon icon={faSearch} />
                                                    </Button>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        {vendedorNaoLocalizado && (
                                            <Row className="row align-items-center">
                                                <Col className="col" xs={4}>
                                                    <Alert variant="danger">
                                                        <p>Vendedor não localizado.</p>
                                                    </Alert>
                                                </Col>
                                            </Row>
                                        )}
                                        {vendedorSelecionado && (
                                            <Col className="col" xs={3}>
                                                <Form.Label htmlFor="vendedorSelecionado" className="text-center d-block">Vendedor selecionado</Form.Label>
                                                <Form.Group className="mb-3">
                                                    <Form.Control type="text" id="vendedorSelecionado" className="form-control text-center" name="vendedorSelecionado" value={vendedorSelecionado.contato.nome || ''} disabled />
                                                </Form.Group>
                                            </Col>
                                        )}
                                    </Row>
                                    {!vendedorSelecionado && (
                                        <ul className="lista-produtos">
                                            {this.state.vendedores.map((contato) => (
                                                <li
                                                    key={contato.contato.id}
                                                    onClick={() => this.selecionarVendedor(contato)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === " ") {
                                                            e.preventDefault();
                                                            this.selecionarVendedor(contato)
                                                        }
                                                    }}
                                                    tabIndex={0}
                                                >
                                                    Cód: {contato.contato.codigo} Vendedor: {contato.contato.nome}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* <div className="divisa"></div> */}


                                    <div className="mb-3">
                                        <h5>Produto</h5>
                                    </div>
                                    <Row className="row align-items-center">
                                        <Col xs={8}>
                                            <Form.Label htmlFor="produto" className="texto-campos">Adicionar produto</Form.Label>
                                            <Form.Group className="mb-3">
                                                <InputGroup>
                                                    <Form.Control
                                                        type="text"
                                                        id="produto"
                                                        className="form-control"
                                                        placeholder="Busque um produto pelo (Nome ou Código ou SKU ou EAN ou Descrição/Nome Fornecedor)"
                                                        value={buscaProduto || ''}
                                                        onChange={this.atualizarBuscaProduto}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault(); // Evita o comportamento padrão de submit do formulário
                                                                if (buscaProduto) {
                                                                    this.buscarProdutos(buscaProduto); // Chame a função de busca aqui
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <Button variant="secondary" onClick={() => { if (buscaProduto) { this.buscarProdutos(buscaProduto) } }}>
                                                        <FontAwesomeIcon icon={faSearch} />
                                                    </Button>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {produtos.map((produto) => (
                                        <ul className="lista-produtos">
                                            <li
                                                key={produto.produto.id}
                                                onClick={() => this.selecionarProduto(produto)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === " ") {
                                                        e.preventDefault();
                                                        this.selecionarProduto(produto);
                                                    }
                                                }}
                                                tabIndex={0}
                                            >
                                                Cód: {produto.produto.codigo} Produto: {produto.produto.descricao} - Preço R$ {produto.produto.preco = parseFloat(produto.produto.preco).toFixed(2)}
                                            </li>
                                        </ul>
                                    ))}
                                    {produtoNaoLocalizado && (
                                        <Row className="row align-items-center">
                                            <Col className="col" xs={4}>
                                                <Alert variant="danger">
                                                    <p>Produto não localizado.</p>
                                                </Alert>
                                            </Col>
                                        </Row>
                                    )}
                                    {produtoSelecionado && (
                                        <div className="produto-selecionado">
                                            <h2>Produto selecionado: {produtoSelecionado.produto.codigo} - {produtoSelecionado.produto.descricao}</h2>
                                            <Row className="row">
                                                <Col className="col">
                                                    <Form.Group className="mb-3">
                                                        <Row>
                                                            <Col>
                                                                {imagem ? (
                                                                    <Image src={imagem} className="imagem-preview" style={{ width: '171px', height: '180px' }} rounded />
                                                                ) : (
                                                                    <Image src="https://www.bling.com.br/images/imagePdv.svg" className="imagem-preview" style={{ width: '171px', height: '180px' }} rounded />
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="quantidade" className="texto-campos">Quantidade</Form.Label>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            {/* <Button variant="outline-success rounded-0" type="button" onClick={this.decrementarQuantidade} disabled={!produtoSelecionado}>
                                                                        -
                                                                    </Button> */}
                                                            <Form.Control type="text" id="quantidade" className="form-control" name="quantidade" value={quantidade || ''} onChange={this.atualizaQuantidade} disabled={!produtoSelecionado} />
                                                            {/* <Button variant="outline-success rounded-0" type="button" onClick={this.incrementarQuantidade} disabled={!produtoSelecionado}>
                                                                        +
                                                                    </Button> */}
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col" >
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="desconto" className="texto-campos">
                                                            Desconto preço (%)
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            id="desconto"
                                                            className="form-control"
                                                            name="desconto"
                                                            placeholder="0.00"
                                                            value={this.state.descontoInicialProduto || ''}
                                                            onChange={this.atualizaDescontoProduto}
                                                            disabled={this.state.opcaoDescontoItem === 'desliga'}
                                                        />
                                                        <Form.Check
                                                            type="switch"
                                                            id="ligaSwitch"
                                                            label={this.state.opcaoDescontoItem === 'liga' ? 'Habilitado' : 'Desabilitado'}
                                                            checked={this.state.opcaoDescontoItem === 'liga'}
                                                            onChange={(e) => this.setState({ opcaoDescontoItem: e.target.checked ? 'liga' : 'desliga' })}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="preco" className="texto-campos">Preço unitário</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            id="preco"
                                                            className="form-control"
                                                            name="preco"
                                                            placeholder="00.00"
                                                            value={this.state.preco || ''}
                                                            onChange={this.atualizaPreco}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter' || e.key === "Tab") {
                                                                    this.atualizarValorTotal();
                                                                }
                                                            }}
                                                            tabIndex={0}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="valorTotal" className="texto-campos">Sub total</Form.Label>
                                                        <Form.Control type="text" id="valorTotal" className="form-control" name="valorTotal" placeholder="00.00" value={valorTotal || ''} onChange={this.atualizarValorTotal} readOnly />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <div className="text-end">
                                                <Button variant="outline-success" onClick={() => this.adicionarProdutoSelecionado(produtoSelecionado)}>Inserir produto</Button>
                                            </div>
                                            {/* <div className="container">
                                                        <Form.Label htmlFor="valorTotal" className="texto-campos">Comentário</Form.Label>
                                                        <Form.Control as="textarea" id="observacao" value={this.state.comentario || ''} onChange={this.atualizarComentario} disabled={!produtoSelecionado} style={{ height: '75px', width: '600px' }} />
                                                    </div> */}
                                        </div>
                                    )}


                                    <div className="divisa"></div>
                                    <Table responsive="lg" className="table table-sm table-transparent" >
                                        <thead>
                                            <tr>
                                                <th>Produto</th>
                                                <th>Quantidade</th>
                                                <th>Preço</th>
                                                <th>Subtotal</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.produtosSelecionados.map((produto, index) => (
                                                <tr key={produto.produto.id}>
                                                    <td>{produto.produto.codigo} - {produto.produto.descricao}</td>
                                                    <td>{produto.quantidade}</td>
                                                    <td>R$ {typeof produto.preco === "number"
                                                        ? produto.preco.toFixed(2)
                                                        : parseFloat(produto.preco).toFixed(2)}</td>
                                                    <td>R$ {this.calcularSubTotal(produto.produto, produto.quantidade, produto.preco).toFixed(2)}</td>
                                                    <td>
                                                        <Button variant="light" title="Editar produto" className="transparent-button" onClick={() => {
                                                            this.modalEditarProduto(produto)
                                                        }}>
                                                            <IonIcon icon={pencil} className="blue-icon" size="medium" />
                                                        </Button>
                                                        <Button variant="light" title="Excluir produto" className="transparent-button" onClick={() => {
                                                            if (window.confirm('Deseja excluir o item?\nEssa ação não poderá ser desfeita.')) {
                                                                this.excluirProdutoSelecionado(index);
                                                            }
                                                        }}>
                                                            <IonIcon icon={trashOutline} className="red-icon" size="medium" />
                                                        </Button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>

                                    <Modal show={this.state.modalEditarProduto} onHide={this.fecharModalEditarProduto} size="lg" centered>
                                        <Modal.Header closeButton className="">
                                            <Modal.Title>Editar</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ padding: '20px' }}>
                                            {this.state.produtoSelecionadoLista && (
                                                <div>
                                                    <Row className="row">
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="valorLista" className="texto-campos">Valor de lista</Form.Label>
                                                                <Form.Control type="text" id="valorLista" className="form-control" name="valorLista" value={this.state.valorLista || ''} disabled />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="quantidade" className="texto-campos">Quantidade</Form.Label>
                                                                <Form.Control type="text" id="quantidade" className="form-control" name="quantidade" value={this.state.quantidadeLista || ''} onChange={this.atualizaQuantidadeLista} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="descontoItem" className="texto-campos">Desconto item lista (%)</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="descontoItem"
                                                                    className="form-control"
                                                                    name="descontoItem"
                                                                    placeholder="00.00"
                                                                    value={this.state.descontoItemLista || ''}
                                                                    onChange={this.atualizaDescontoItem}
                                                                    onBlur={this.aplicaDescontoItem}
                                                                // disabled={this.state.produtosSelecionados.some((produto) => produto.temDesconto)}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="row align-items-center">
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="valorUnitario" className="texto-campos">Valor unitário</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="valorUnitario"
                                                                    className="form-control"
                                                                    name="valorUnitario"
                                                                    value={this.state.descontoItemLista !== '' ? (this.state.valorUnitarioOriginal * (1 - parseFloat(this.state.descontoItemLista.replace(',', '.')) / 100)).toFixed(2) : this.state.valorUnitarioLista || ''}
                                                                    onChange={this.atualizaValorUnitario}
                                                                    readOnly
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="subTotalLista" className="texto-campos">Sub total</Form.Label>
                                                                <Form.Control type="text" id="subTotalLista" className="form-control" name="subTotalLista" value={this.state.valorTotalLista || ''} disabled />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )}

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="outline-success" className="mr-2" onClick={this.fecharModalEditarProduto} style={{ marginRight: '10px' }}>Cancelar</Button>
                                            <Button variant="secondary" className="mr-2" onClick={this.salvarProdutoLista}>Salvar</Button>
                                        </Modal.Footer>
                                    </Modal>

                                    {/* <div className="divisa"></div> */}
                                    <div>
                                        <h5>Totais</h5>
                                    </div>
                                    <Row className="row align-items-center">
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="subtotal" className="texto-campos">Sub total</Form.Label>
                                                <Form.Control type="text" id="subtotal" className="form-control" name="subtotal" placeholder="00.00" value={subTotal || ''} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="desconto" className="texto-campos">Desconto (Total)</Form.Label>
                                                <Form.Control type="text" id="desconto" className="form-control" name="desconto" placeholder="00.00" value={valorDesconto || ''} onChange={this.atualizaDesconto} onBlur={this.formatarDesconto} />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="totaldavenda" className="texto-campos">Total da venda</Form.Label>
                                                <Form.Control type="text" id="totaldavenda" className="form-control" name="totaldavenda" placeholder="00.00" defaultValue={subTotalGeral || ''} disabled />
                                            </Form.Group>
                                        </Col>
                                        {/* <Col className="col mb-3" xs={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="frete" className="texto-campos">Frete</Form.Label>
                                                    <Form.Control type="text" className="" id="frete" name="frete" placeholder="00.00" value={frete || ''} onChange={this.atualizaTotalComFrete} onBlur={this.formatarFrete} />
                                                </Form.Group>
                                            </Col> */}
                                    </Row>
                                </div>
                            </Col>


                            <Col md={6}>
                                <div className="grid-2">
                                    {/* <div className="produto-header">Vendedor</div> */}
                                    {/* <div className="produto-header">Cliente</div> */}
                                    <div className="mb-3">
                                        <h5>Cliente</h5>
                                    </div>

                                    <div>
                                        <Row className="row align-items-center">
                                            <Col className="col" xs={12} md={5}>
                                                <div className="busca-cliente d-grid gap-2">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="cliente" className="texto-campos">Cliente (Nome)</Form.Label>
                                                        <InputGroup>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Digite o nome do cliente"
                                                                value={this.state.consumidorFinal || buscaContato || nome}
                                                                onChange={this.atualizarBuscaContato}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault(); // Evita o comportamento padrão de submit do formulário
                                                                        if (buscaContato) {
                                                                            this.buscarContato(buscaContato, nome, cnpj); // Chame a função de busca aqui
                                                                        }
                                                                    }
                                                                }}

                                                            />
                                                            <Button variant="secondary" onClick={() => { if (buscaContato) { this.buscarContato(buscaContato, nome, cnpj) } }}>
                                                                <FontAwesomeIcon icon={faSearch} />
                                                            </Button>
                                                        </InputGroup>
                                                        <Form.Control.Feedback type="invalid">Campo obrigatorio.</Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                            </Col>

                                            <Col className="col" xs={12} md={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="cpf" className="texto-campos">{tipo === 'J' ? 'CNPJ' : 'CPF'}</Form.Label>
                                                    <Form.Control type="text" id="cpf" className="form-control" name="cpf" value={cnpj || ''} onChange={this.atualizaCpfCnpj} />
                                                </Form.Group>
                                            </Col>
                                            {/* <Col className="col" xs={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="tipo" className="texto-campos">Tipo</Form.Label>
                                                    <Form.Select as="select" id="tipo" className="form-control" name="tipo" value={tipo || ''} onChange={this.atualizaTipoPessoa}>
                                                        <option value="F">Pessoa Física</option>
                                                        <option value="J">Pessoa Jurídica</option>
                                                        <option value="E">Estrangeiro</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col> */}
                                            <Col className="col" xs={12} md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="endereco" className="texto-campos">Endereço</Form.Label>
                                                    <Form.Control type="text" id="endereco" className="form-control" name="endereco" value={endereco || ''} onChange={this.atualizaEndereco} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        {contatoNaoLocalizado && (
                                            <Row className="row align-items-center">
                                                <Col xs={4}>
                                                    <Alert variant="danger" >
                                                        <p>Cliente não localizado.</p>
                                                    </Alert>
                                                </Col>
                                            </Row>
                                        )}
                                        {contatos.map((contato) => (
                                            <ul className="lista-contatos">
                                                <li
                                                    key={contato.contato.id}
                                                    onClick={() => this.selecionarContato(contato)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            this.selecionarContato(contato);
                                                        }
                                                    }}
                                                    tabIndex={0}
                                                >
                                                    Nome: {contato.contato.nome} - CPF/CNPJ: {contato.contato.cnpj}
                                                </li>
                                            </ul>
                                        ))}
                                        <Row className="row">
                                            <Button variant="link" onClick={this.ModalCadastrarCliente}>Opções avançadas</Button>
                                        </Row>
                                        {/* {contatoSelecionado && (
                                        <div className="produto-selecionado">
                                            <Row className="row">
                                                <Col className="col" xs={4}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="nome" className="texto-campos">Nome</Form.Label>
                                                        <Form.Control type="text" id="nome" className="form-control" name="nome" value={nome || ''} onChange={this.atualizaNome} />
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col" xs={4}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="cpf" className="texto-campos">{tipo === 'J' ? 'CNPJ' : 'CPF'}</Form.Label>
                                                        <Form.Control type="text" id="cpf" className="form-control" name="cpf" value={cnpj || ''} onChange={this.atualizaCpfCnpj} />
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col" xs={3}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="tipo" className="texto-campos">Tipo</Form.Label>
                                                        <Form.Select as="select" id="tipo" className="form-control" name="tipo" value={tipo || ''} onChange={this.atualizaTipoPessoa}>
                                                            <option value="F">Pessoa Física</option>
                                                            <option value="J">Pessoa Jurídica</option>
                                                            <option value="E">Estrangeiro</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="row">
                                                <Button variant="link" onClick={this.ModalCadastrarCliente}>Opções avançadas</Button>
                                            </Row>
                                        </div>
                                    )} */}

                                        <Modal show={this.state.ModalCadastrarCliente} onHide={this.ModalCadastrarCliente} size="xl" centered>
                                            <Modal.Header closeButton className="bg-secondary text-white">
                                                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                                                <Modal.Title>Cadastrar cliente</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body style={{ padding: '20px' }} >
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="nome" className="texto-campos">Nome</Form.Label>
                                                            <Form.Control type="text" id="nome" className="form-control" name="nome" value={nome || ''} onChange={this.atualizaNome} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="cpf" className="texto-campos">
                                                                {cnpj.replace(/[^\d]/g, '').length === 14 ? 'CNPJ' : 'CPF'}
                                                            </Form.Label>
                                                            <Form.Control type="text" id="cpf" className="form-control" name="cpf" value={cnpj || ''} onChange={this.atualizaCpfCnpj} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="tipo" className="texto-campos">Tipo</Form.Label>
                                                            <Form.Select as="select" id="tipo" className="form-control" name="tipo" value={tipo || ''} onChange={this.atualizaTipoPessoa}>
                                                                <option value="F">Pessoa Física</option>
                                                                <option value="J">Pessoa Jurídica</option>
                                                                <option value="E">Estrangeiro</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    {/* <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="codigo" className="texto-campos">Código</Form.Label>
                                                            <Form.Control type="text" id="codigo" className="form-control" name="codigo" value={codigo || ''} onChange={this.atualizaCodigo} />
                                                        </Form.Group>
                                                    </Col> */}
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="inscricaoEstadual" className="texto-campos">Inscrição estadual</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                id="inscricaoEstadual"
                                                                className="form-control"
                                                                name="inscricaoEstadual"
                                                                value={contribuinte === "2" ? "ISENTO" : ie_rg || ""}
                                                                onChange={this.atualizaIe}
                                                                disabled={contribuinte === "2"}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="contribuinte" className="texto-campos">Contribuinte</Form.Label>
                                                            <Form.Select
                                                                as="select"
                                                                id="contribuinte"
                                                                className="form-control"
                                                                name="contribuinte"
                                                                value={contribuinte || ""}
                                                                onChange={this.atualizaContribuinte}
                                                            >
                                                                <option value="1">1 - Contribuinte ICMS</option>
                                                                <option value="2">2 - Contribuinte isento de Inscrição no Cadastro de Contribuintes</option>
                                                                <option value="9">9 - Não contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="rg" className="texto-campos">RG</Form.Label>
                                                            <Form.Control type="text" id="rg" className="form-control" name="rg" value={rg || ''} onChange={this.atualizaRg} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="cep" className="texto-campos">CEP</Form.Label>
                                                            <Form.Control type="text" id="cep" className="form-control" name="cep" value={cep || ''} onChange={this.atualizaCep} onBlur={this.buscarCep} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="cidade" className="texto-campos">Cidade</Form.Label>
                                                            <Form.Control type="text" id="cidade" className="form-control" name="cidade" value={cidade || ''} onChange={this.atualizaCidade} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="uf" className="texto-campos">UF</Form.Label>
                                                            <Form.Select as="select" id="uf" className="form-control" name="uf" value={this.state.uf} onChange={this.atualizaUf}>
                                                                <option value="">Selecione</option>
                                                                <option value="AC">Acre</option>
                                                                <option value="AL">Alagoas</option>
                                                                <option value="AP">Amapá</option>
                                                                <option value="AM">Amazonas</option>
                                                                <option value="BA">Bahia</option>
                                                                <option value="CE">Ceará</option>
                                                                <option value="DF">Distrito Federal</option>
                                                                <option value="ES">Espírito Santo</option>
                                                                <option value="GO">Goiás</option>
                                                                <option value="MA">Maranhão</option>
                                                                <option value="MT">Mato Grosso</option>
                                                                <option value="MS">Mato Grosso do Sul</option>
                                                                <option value="MG">Minas Gerais</option>
                                                                <option value="PA">Pará</option>
                                                                <option value="PB">Paraíba</option>
                                                                <option value="PR">Paraná</option>
                                                                <option value="PE">Pernambuco</option>
                                                                <option value="PI">Piauí</option>
                                                                <option value="RJ">Rio de Janeiro</option>
                                                                <option value="RN">Rio Grande do Norte</option>
                                                                <option value="RS">Rio Grande do Sul</option>
                                                                <option value="RO">Rondônia</option>
                                                                <option value="RR">Roraima</option>
                                                                <option value="SC">Santa Catarina</option>
                                                                <option value="SP">São Paulo</option>
                                                                <option value="SE">Sergipe</option>
                                                                <option value="TO">Tocantins</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={8}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="endereco" className="texto-campos">Endereço</Form.Label>
                                                            <Form.Control type="text" id="endereco" className="form-control" name="endereco" value={endereco || ''} onChange={this.atualizaEndereco} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="numero" className="texto-campos">Número</Form.Label>
                                                            <Form.Control type="text" id="numero" className="form-control" name="numero" value={numero || ''} onChange={this.atualizaNumero} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={8}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="complemento" className="texto-campos">Complemento</Form.Label>
                                                            <Form.Control type="text" id="complemento" className="form-control" name="complemento" value={complemento || ''} onChange={this.atualizaComplemento} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="bairro" className="texto-campos">Bairro</Form.Label>
                                                            <Form.Control type="text" id="bairro" className="form-control" name="bairro" value={bairro || ''} onChange={this.atualizaBairro} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="email" className="texto-campos">E-mail</Form.Label>
                                                            <Form.Control type="text" id="email" className="form-control" name="email" value={email || ''} onChange={this.atualizaEmail} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="fone" className="texto-campos">Fone</Form.Label>
                                                            <Form.Control type="text" id="fone" className="form-control" name="fone" value={fone || ''} onChange={this.atualizaFone} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="celular" className="texto-campos">Celular</Form.Label>
                                                            <Form.Control type="text" id="celular" className="form-control" name="celular" value={celular || ''} onChange={this.atualizaCelular} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {/* <Row className="row">
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="dataNascimento" className="texto-campos">Data de nascimento</Form.Label>
                                                            <Form.Control type="text" id="dataNascimento" className="form-control" name="dataNascimento" value={dataNascimento || ''} onChange={this.atualizaDataNascimento} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row">
                                                    <Col className="col" xs={12} md={12}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="observacoes" className="texto-campos">Observações</Form.Label>
                                                            <textarea id="observacoes" className="form-control" rows={4} name="observacoes" value={observacoes || ''} onChange={this.atualizaObservacoes} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>*/}
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="outline-success" onClick={this.ModalCadastrarCliente}>Fechar</Button>
                                                <Button variant="success" onClick={this.ModalCadastrarCliente}>Salvar</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>

                                    <div className="divisa"></div>

                                    <div className="mb-3">
                                        <h5>Outras informações</h5>
                                    </div>
                                    {/* <Row className="row">
                                            <Col className="col">
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="vendedor" className="texto-campos">Vendedor</Form.Label>
                                                            <Form.Select className="campos-pagamento" id="vendedor" name="vendedor" value={this.state.vendedorSelecionado} onChange={this.atualizaVendedorSelecionado} >
                                                                <option value="">Selecione um vendedor</option>
                                                                {this.state.vendedor.map((contato) => (
                                                                    <option key={contato.contato.id} value={contato.contato.id}>
                                                                        {contato.contato.nome}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                            <Col className="col">
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="dataprevista" className="texto-campos">Data prevista</Form.Label>
                                                    <DatePicker locale={ptBR} id="dataprevista" name="dataprevista" selected={dataPrevista} onChange={this.atualizaDataPrevista} placeholderText="Selecione uma data" className="form-select" dateFormat="dd/MM/yyyy" />
                                                </Form.Group>
                                            </Col>
                                            <Col className="col">
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="depositolancamento" className="texto-campos">Depósito para lançamento</Form.Label>
                                                    <Form.Select className="" id="depositolancamento" name="depositolancamento" value={depositoSelecionado || ''} onChange={this.atualizaDepositoSelecionado} >
                                                        <option>Selecione o deposito</option>
                                                        {this.state.depositos.map((deposito) => (
                                                            <option key={deposito.deposito.id} value={deposito.deposito.id}>
                                                                {deposito.deposito.descricao}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row> */}
                                    <div>
                                        <Row className="row align-items-center">
                                            <Col className="col" xs={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="frete" className="texto-campos">Frete</Form.Label>
                                                    <Form.Control type="number" className="form-control" id="frete" name="frete" placeholder="00.00" value={frete || ''} onChange={this.atualizaTotalComFrete} onBlur={this.formatarFrete} />
                                                </Form.Group>
                                            </Col>
                                            <Col className="col" xs={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="totaldavenda" className="texto-campos">Total da venda</Form.Label>
                                                    <Form.Control type="text" id="totaldavenda" className="form-control" name="totaldavenda" placeholder="00.00" defaultValue={subTotalGeral || ''} disabled />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="row align-items-center">
                                            <Col className="col">
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="observacoes" className="texto-campos">Observações</Form.Label>
                                                    <textarea className="form-control" id="observacoes" rows="2" value={observacoes || ''} onChange={this.atualizaObservacoes} ></textarea>
                                                </Form.Group>
                                            </Col>
                                            <Col className="col">
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="observacaointerna" className="texto-campos">Observações internas</Form.Label>
                                                    <textarea className="form-control" id="observacaointerna" rows="2" value={observacaointerna || ''} onChange={this.atualizaObservacaoInterna} ></textarea>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>

                                    {/* <div className="pagamento-header">Pagamento</div> */}

                                    <div className="divisa"></div>

                                    <div className="mb-3">
                                        <h5>Forma de pagamento</h5>
                                    </div>
                                    <Row className="row align-items-center">
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="totaldinheiro" className="texto-campos">Total em dinheiro</Form.Label>
                                                <Form.Control type="text" id="totaldinheiro" className="form-control" name="totaldinheiro" placeholder="00.00" value={dinheiroRecebido || ''} onChange={this.atualizaTroco} onBlur={this.formatarTroco} />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="trocodinheiro" className="texto-campos">Troco em dinheiro</Form.Label>
                                                <Form.Control type="text" id="trocodinheiro" className="form-control" name="trocodinheiro" placeholder="00.00" defaultValue={troco || ''} disabled />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="row align-items-center">
                                        <Col className="col mb-3" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Formas de pagamento</Form.Label>
                                                <Form.Select type="number" placeholder="Digite a condição" value={condicao || ''} onChange={this.handleChange} >
                                                    <option>Selecione a forma</option>
                                                    {this.state.formaspagamento.map((formapagamento) => (
                                                        <option key={formapagamento.formapagamento.id} value={formapagamento.formapagamento.id}>
                                                            {formapagamento.formapagamento.descricao}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col className="col mb-3" xs={2}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Condição</Form.Label>
                                                <Form.Control type="text" id="prazo" className="form-control" name="trocodinheiro" value={this.state.prazo || ''} onChange={this.handleChangePrazo} />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col mb-3" >
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="gerarparcelas" className="texto-campos" style={{ marginRight: '20px' }}></Form.Label>
                                                <Button
                                                    variant="outline-success"
                                                    className="form-control"
                                                    onClick={() => {
                                                        if (this.state.subTotalGeral === '0.00') {
                                                            this.modalInserirParcela();
                                                        } else {
                                                            this.adicionarParcela();
                                                        }
                                                    }}
                                                    style={{ width: "200px", marginTop: "33px" }}
                                                >
                                                    Gerar parcelas
                                                </Button>

                                            </Form.Group>
                                        </Col>
                                        <div>
                                            <Table responsive="lg" className="table table-sm" striped>
                                                <thead>
                                                    <tr>
                                                        <th>Dias</th>
                                                        <th>Data</th>
                                                        <th>Valor</th>
                                                        {/* <th>Forma</th> */}
                                                        <th>Observação</th>
                                                        <th>Ação</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.parcelas.map((parcela, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <Col>
                                                                    <Form.Control
                                                                        type="number"
                                                                        value={parcela.dias}
                                                                        onChange={(event) => this.handleChangeDias(index, event.target.value)}
                                                                        className="form-control text-center"
                                                                    />
                                                                </Col>
                                                            </td>
                                                            <td>
                                                                <Col>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={this.calcularData(parcela.dias) || ''}
                                                                        disabled
                                                                        className=" form-control text-center"
                                                                    />
                                                                </Col>
                                                            </td>
                                                            <td>
                                                                <Col>
                                                                    <Form.Control
                                                                        type="number"
                                                                        value={parcela.valor}
                                                                        onChange={(event) => this.handleValorChangeParcela(index, 'valor', event.target.value)}
                                                                        className="form-control text-center" />
                                                                </Col>
                                                            </td>
                                                            {/* <td>
                                                                            <Form.Select
                                                                                value={parcela.forma || ''}
                                                                                onChange={(e) => this.handleFormaChange(index, e)}>
                                                                                {this.state.formaspagamento.map((formapagamento) => (
                                                                                    <option key={formapagamento.formapagamento.id} value={formapagamento.formapagamento.id}>
                                                                                        {formapagamento.formapagamento.descricao}
                                                                                    </option>
                                                                                ))}
                                                                            </Form.Select>
                                                                        </td> */}
                                                            <td>
                                                                <Col>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={parcela.observacao || ''}
                                                                        onChange={(e) => this.handleObservacaoChange(index, e) || ''}
                                                                        className="form-control text-center"
                                                                    />
                                                                </Col>
                                                            </td>
                                                            <td>
                                                                <Button variant="light" onClick={() => this.handleDeleteParcela(index)}>
                                                                    <IonIcon icon={trashOutline} className="red-icon" size="medium" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            {/* <div className="col d-flex justify-content-end">
                                                            <Button variant="light" onClick={() => {
                                                                if (this.state.subTotalGeral === 0) {
                                                                    this.modalInserirParcela();
                                                                } else {
                                                                    this.adicionarParcela();
                                                                }
                                                            }} defaultValue="0">+ Adicionar outra parcela</Button>
                                                        </div> */}
                                        </div>
                                        {/* <Col className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="vendedor" className="texto-campos">Categoria</Form.Label>
                                                        <Form.Select className="campos-pagamento" id="vendedor" name="vendedor" value={this.state.vendedorSelecionado || ''} onChange={this.atualizaVendedorSelecionado} >
                                                            <option>Selecione uma</option>
                                                            {this.state.vendedores.map((contato) => (
                                                                <option key={contato.contato.id} value={contato.contato.nome}>
                                                                    {contato.contato.nome}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col> */}
                                    </Row>
                                </div>
                            </Col>
                        </Row >

                        <Row className="fixed-bottom align-items-center">
                            <Col>
                                <div className="rodape">
                                    <div>
                                        <div className="botao-excluirvenda">
                                            <div>
                                                <Button variant="success" onClick={this.ModalExcluirPedido}>Excluir pedido</Button>
                                            </div>
                                        </div>
                                        <div className="botao-finalizarvenda">
                                            <Button variant="success" type="submit">Finalizar Venda</Button>
                                        </div>
                                    </div>
                                    <div className="div_total_venda">
                                        <div>
                                            <span className="span-total">Total:</span>
                                            <span className="span-valor">{this.calcularSubTotalGeral().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>


                    <Modal show={this.state.ModalFinalizarVendaSemItem} onHide={this.ModalFinalizarVendaSemItem} centered>
                        <Modal.Header closeButton className="bg-success text-white">
                            <Modal.Title>
                                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                                Atenção
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Este pedido não possui itens ou cliente, insira-os para realizar essa operação.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={this.ModalFinalizarVendaSemItem}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.ModalFormaPagamento} onHide={this.ModalFormaPagamento} centered>
                        <Modal.Header closeButton className="bg-success text-white">
                            <Modal.Title>
                                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                                Atenção
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Insira a forma de pagamento antes de finalizar a compra.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={this.ModalFormaPagamento}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.ModalExcluirPedido} onHide={this.ModalExcluirPedido} centered>
                        <Modal.Header closeButton className="bg-success text-white">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            <div>Deseja excluir o pedido {this.state.ultimoPedido}?</div>
                            <div>Essa ação não poderá ser desfeita.</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-success" onClick={this.ModalExcluirPedido}>Não</Button>
                            <Button variant="success" onClick={this.excluirPedido}>Sim</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.modalInserirProduto} onHide={this.modalInserirProduto} centered>
                        <Modal.Header closeButton className="bg-success text-white">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Nenhum produto selecionado!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botao-finalizarvenda" variant="success" onClick={this.modalInserirProduto}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>


                    <Offcanvas show={this.state.canvasFinalizarPedido} onHide={this.canvasFinalizarPedido} size="lg" placement="end" style={{ width: '35%' }}>
                        <Offcanvas.Header closeButton className="bg-success text-white">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Offcanvas.Title>Atenção </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ padding: '20px' }}>
                            <div className="d-flex flex-column  mb-4">
                                <h5 className="mb-3">
                                    <strong>
                                        Resumo do pedido:
                                    </strong>
                                </h5>
                                <div className="d-flex justify-content-between mb-2">
                                    <strong>
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" style={{ marginRight: '10px' }} />
                                        Data: {new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>
                                    <span>CPF/CNPJ: {cnpj}</span>
                                </div>
                                <span>Nome do Cliente: {nome}</span>
                                <span>Endereço: {endereco}, {numero}, {bairro}, {cidade} - {uf}</span>
                            </div>
                            <Table responsive="lg" className="table-responsive">
                                <thead>
                                    <tr>
                                        <th>Nome do produto</th>
                                        <th>Qtde.</th>
                                        <th>Preço un.</th>
                                        <th>Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.produtosSelecionados.map((produto, index) => (
                                        <tr key={produto.produto.id}>
                                            <td>{produto.produto.codigo} - {produto.produto.descricao}</td>
                                            <td>{produto.quantidade}</td>
                                            <td>R$ {typeof produto.preco === "number"
                                                ? produto.preco.toFixed(2)
                                                : parseFloat(produto.preco).toFixed(2)}</td>
                                            <td>R$ {this.calcularSubTotal(produto.produto, produto.quantidade, produto.preco).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="text-end">
                                            <strong>Quantidade total:</strong>
                                        </td>
                                        <td>
                                            <strong>{quantidadeTotal}</strong>
                                        </td>
                                    </tr>
                                    {desconto !== '' && desconto !== 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-end">
                                                <strong>Desconto:</strong>
                                            </td>
                                            <td>
                                                <strong>R$ {desconto}</strong>
                                            </td>
                                        </tr>
                                    )}
                                    {frete !== '' && frete !== 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-end">
                                                <strong>Frete:</strong>
                                            </td>
                                            <td>
                                                <strong>R$ {frete}</strong>
                                            </td>
                                        </tr>
                                    )}
                                    {dinheiroRecebido !== '' && dinheiroRecebido !== 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-end">
                                                <strong>Total dinheiro recebido:</strong>
                                            </td>
                                            <td>
                                                <strong>R$ {dinheiroRecebido}</strong>
                                            </td>
                                        </tr>
                                    )}
                                    {troco !== '' && troco !== 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-end">
                                                <strong>Troco:</strong>
                                            </td>
                                            <td>
                                                <strong>R$ {troco}</strong>
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td colSpan="3" className="text-end">
                                            <strong>Total:</strong>
                                        </td>
                                        <td>
                                            <strong>R$ {this.calcularSubTotalGeral().toFixed(2).replace('.', ',')}</strong>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>

                            <div className="divisa"></div>
                            <div className="d-flex flex-column  mb-4">
                                <h5 className="mb-3">
                                    <strong>
                                        O que fazer após fechar o pedido?
                                    </strong>
                                </h5>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button variant="outline-secondary" className="gerar-nota">Gerar NFC-e</Button>
                                <Button variant="outline-secondary" className="gerar-nota">Imprimir comprovante não fiscal</Button>
                            </div>
                            <div className="d-flex justify-content-end fixed-bottom mb-4" style={{ height: '40px' }}>
                                <Button variant="outline-success" className="mr-2" onClick={this.canvasFinalizarPedido} style={{ marginRight: '10px' }}>Cancelar</Button>
                                <Button variant="success" onClick={this.gerarXmlItensParaEnvio} style={{ marginRight: '10px' }}>Fechar pedido</Button>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>

                    <Modal show={this.state.modalInserirParcela} onHide={this.modalInserirParcela} centered>
                        <Modal.Header closeButton className="bg-success text-white">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Não foi possível gerar as parcelas, pois o valor faturado está zerado.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={this.modalInserirParcela}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.modalSalvarPedido} onHide={this.modalSalvarPedido} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }} ><strong>Pedido N.º: {this.state.ultimoPedido} </strong></span>
                            <span style={{ display: 'block' }}><strong>Salvo com sucesso!</strong></span>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.ModalSelecionarLoja} onHide={this.ModalSelecionarLoja} backdrop="static" centered>
                        <Modal.Header closeButton className="bg-secondary text-white">
                            <Modal.Title>Seleciona uma Loja</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            <div className="text-center" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#6c757d' }}>
                                Bem vindo ao frente de caixa!
                            </div>
                            <Col className="col">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="depositolancamento" className="texto-campos">Selecione a loja</Form.Label>
                                    <Form.Select className="form-control" id="depositolancamento" name="depositolancamento" value={idLoja || ''} onChange={this.atualizaNomeLoja}>
                                        <option>Selecione a loja</option>
                                        {this.state.objeto && this.state.objeto.map((objeto) => (
                                            <option key={objeto.idLoja} value={objeto.idLoja}>
                                                {objeto.nomeLoja}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col className="col">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="unidadenegocio" className="texto-campos">Selecione a unidade de negócio</Form.Label>
                                    <Form.Select className="form-control" id="unidadenegocio" name="unidadenegocio" value={unidadeLoja || ''} onChange={this.atualizaUnidadeNegocio} readOnly>
                                        <option>Selecione a unidade de negócio</option>
                                        {this.state.objeto && this.state.objeto.map((objeto) => (
                                            <option key={objeto.idLoja} value={objeto.unidadeLoja}>
                                                {objeto.unidadeLoja}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={this.ModalSelecionarLoja}>Salvar</Button>
                        </Modal.Footer>
                    </Modal>
                </Container >
            );
        }
    }
}



export default FrenteCaixa;

