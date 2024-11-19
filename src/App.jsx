import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import './App.css'
import api from "./services/api" // Importa a instância de `axios` configurada

export default function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState("")

  async function handleSearch() {
    if (input === '') {
      alert("Preencha algum cep!")
      return
    }

    try {
      // Realiza a requisição para a URL construída com baseURL + input
      const response = await api.get(`${input}/json`)
      setCep(response.data) // Armazena os dados retornados
      setInput('') // Limpa o input após a busca
    } catch (error) {
      alert("Ops, algum problema foi encontrado! Tente digitar um CEP válido!")
      setInput('') // Limpa o input mesmo em caso de erro
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="container-input">
        <input 
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />
        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento || "Não disponível"}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          <span>Região: {cep.regiao}</span>
          <span>IBGE: {cep.ibge}</span>
          <span>DDD: {cep.ddd}</span>
        </main>
      )}
    </div>
  )
}
