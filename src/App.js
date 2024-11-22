import React, { useState } from "react";
import "./App.css";

function App() {
  // Estado para armazenar o nome da cidade
  const [cidade, setCidade] = useState("");
  // Estado para armazenar os dados da previsão do tempo
  const [previsao, setPrevisao] = useState(null);
  // Estado para mensagens de erro
  const [erro, setErro] = useState("");

  // Função para lidar com a mudança no input
  const handleChange = (event) => {
    setCidade(event.target.value);
    setErro(""); // Limpa mensagem de erro ao digitar
  };

  // Função para lidar com a pesquisa do tempo
  const handleSearch = async () => {
    if (!cidade.trim()) {
      setErro("Por favor, insira o nome de uma cidade.");
      return;
    }

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=49f1834cf8264440ad122012240601&q=${cidade}&lang=pt`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPrevisao(data);
        setErro(""); // Limpa mensagem de erro ao obter resultado
      } else {
        setErro("Erro ao buscar os dados. Verifique o nome da cidade.");
      }
    } catch (error) {
      setErro("Erro na chamada à API. Tente novamente mais tarde.");
    }
  };

  // Disparar busca ao pressionar Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="Box">
      <main className="container">
        <div>
          <div>
            <div className="group">
              <input
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Digite o nome da cidade"
                className="input"
                value={cidade}
              />
              <svg
                className="icon"
                aria-hidden="true"
                onClick={handleSearch}
                viewBox="0 0 24 24"
              >
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </div>
            {erro && <p className="erro">{erro}</p>}
          </div>
          {previsao ? (
            <div className="mt-5">
              <div className="locations">
                {previsao.location.name && <h3>{previsao.location.name}</h3>}
                {previsao.current.condition.icon && (
                  <div className="weather-info">
                    <img
                      src={previsao.current.condition.icon}
                      alt="Condição do Tempo"
                      className="weather-icon"
                    />
                    <p className="temperature">{previsao.current.temp_c} °C</p>
                  </div>
                )}
              </div>
              <div>
                <h3>Hoje o dia está: {previsao.current.condition.text}</h3>
              </div>
              <div className="hours">
                <h3>{previsao.location.localtime.split(" ")[1]}</h3>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
