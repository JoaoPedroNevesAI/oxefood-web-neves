import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';


export default function FormProduto () {

    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();
    useEffect(() => {
                if (state != null && state.id != null) {
                    axios.get("http://localhost:8080/api/produto/" + state.id)
    .then((response) => {
                                setIdProduto(response.data.id)
                                setCodigo(response.data.codigo)
                                setTitulo(response.data.titulo)
                                setDescricao(response.data.descricao)
                                setValorUnitario(response.data.valorUnitario)
                                setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
                                setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
                    })
                }
        }, [state])


    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

    function salvar() {

		let produtoRequest = {
		     codigo: codigo,
		     titulo: titulo,
		     descricao: descricao,
		     valorUnitario: valorUnitario,
		     tempoEntregaMinimo: tempoEntregaMinimo,
             tempoEntregaMaximo: tempoEntregaMaximo
		}
	
       if (idProduto != null) { //Alteração:
           axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
           .then((response) => { console.log('Produto alterado com sucesso.') })
           .catch((error) => { console.log('Erro ao alter um produto.') })
       } else { //Cadastro:
           axios.post("http://localhost:8080/api/produto", produtoRequest)
           .then((response) => { console.log('Produto cadastrado com sucesso.') })
           .catch((error) => { console.log('Erro ao incluir o produto.') })
       }

	}
    return (

        <div>
            <MenuSistema tela={'produto'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                        { idProduto === undefined &&
                            <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                        }
                        { idProduto != undefined &&
                            <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                        }

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    width={10}
                                    value={titulo}
                                    placeholder="Informe o título do produto"
			                        onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do produto'
                                    maxLength="100"
                                    width={6}
                                    value={codigo}
                                    placeholder="Informe o código do produto"
			                        onChange={e => setCodigo(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.TextArea
                                    fluid
                                    label='Descrição'
                                    placeholder="Informe a descrição do produto"
                                    maxLength="500"
                                    value={descricao}
                                    rows={3}
			                        onChange={e => setDescricao(e.target.value)}
                                />
                            </Form.Group>
                            
                            
                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor unitário'                                    
                                    width={6}
                                    value={valorUnitario}
			                        onChange={e => setValorUnitario(e.target.value)}>  
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de entrega mínimo em minutos'
                                    placeholder="30"
                                    width={6}
                                    value={tempoEntregaMinimo}
                                    onChange={e => setTempoEntregaMinimo(e.target.value)}
                                    >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de entrega máximo em minutos'
                                    width={6}
                                    placeholder="50"
                                    value={tempoEntregaMaximo}
			                        onChange={e => setTempoEntregaMaximo(e.target.value)}
                                > 
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                onClick={() => window.history.back()}
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}
