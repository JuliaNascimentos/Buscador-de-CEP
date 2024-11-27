import { FiSearch } from 'react-icons/fi'  // Importa o ícone de pesquisa do react-icons
import { useState } from 'react'  // Importa o hook useState para gerenciar o estado dos inputs
import './App.css'  // Importa o arquivo de estilos CSS
import api from "./services/api"  // Importa o arquivo de configuração da API para fazer requisições

export default function App() {
  // Declaração de dois estados:
  // input: o valor que o usuário digita no campo de texto
  // cep: os dados que serão retornados pela API após a busca
  const [input, setInput] = useState('') 
  const [cep, setCep] = useState("") 

  // Função assíncrona (async) que será executada quando o usuário clicar no botão de busca
  async function handleSearch() {
    // Se o campo de input estiver vazio, exibe um alerta
    if (input === '') {
      return(alert("Preencha algum cep!"))
    }

    // Usando try/catch para tratar erros. "try" tenta executar o código, "catch" captura erros que possam ocorrer.
    try {
      // Espera (await) a resposta da API. A requisição à API é assíncrona, então precisamos usar 'await' para aguardar a resposta antes de continuar
      const response = await api.get(`${input}/json`) 
      
      // Quando a resposta for obtida com sucesso, o estado 'cep' é atualizado com os dados retornados
      setCep(response.data) 
      
      // Limpa o campo de input após a busca
      setInput('') 
    } catch (error) {
      // Se ocorrer algum erro durante a requisição (exemplo: cep inválido ou problema na conexão), o 'catch' captura o erro
      alert("Ops, algum problema foi encontrado! Tente digitar um CEP válido!")
      
      // Limpa o campo de input mesmo após um erro
      setInput('') 
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="container-input">
        {/* Campo de input onde o usuário digita o CEP */}
        <input 
          type="text"
          placeholder="Digite seu cep..."
          value={input}  // Valor do input vinculado ao estado 'input'
          onChange={(e) => setInput(e.target.value)}  // Atualiza o estado 'input' conforme o usuário digita
        />
        
        {/* Botão que aciona a função handleSearch quando clicado */}
        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />  {/* Ícone de pesquisa */}
        </button>
      </div>

      {/* Exibe os dados do CEP retornados pela API caso o estado 'cep' tenha valores */}
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro || "Não disponível"}</span>
          <span>Complemento: {cep.complemento || "Não disponível"}</span>
          <span>Bairro: {cep.bairro || "Não disponível"}</span>
          <span>{cep.localidade || "Não disponível"} - {cep.uf || "Não disponível"}</span>
          <span>Região: {cep.regiao || "Não disponível"}</span>
          <span>IBGE: {cep.ibge || "Não disponível"}</span>
          <span>DDD: {cep.ddd || "Não disponível"}</span>
        </main>
      )}
    </div>
  )
}
