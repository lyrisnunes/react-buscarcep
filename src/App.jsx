import { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";

import api from './api'

//styles
import './styles.css'

export function App(){
  const [input, setInput]= useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Prencha algum cep!")
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch{
      alert("Ops erro no Cep digite outro");
      setInput=("");
    } 
  }

  return(
    <div className="container">
      <h1>Procure aqui seu endereço</h1>

      <div className="container-Input">
        <input  type="text" placeholder="Digite aqui seu cep"  onChange={(e) => setInput(e.target.value)} />

        <button className="button" onClick={AiFillPlayCircle}>
          <FiSearch size="25" color="#FFF" />
        </button>
      </div>

      {/*se for maior que 1 aparece*/}
      {Object.keys(cep).length > 0 && (
        <div className="container-form">
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Localidade: {cep.localidade}</span>
        <span>UF: {cep.uf}</span>
      </div>
      )}
      
    </div>
  )
}