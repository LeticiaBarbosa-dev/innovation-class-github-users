import { useState } from "react";
import axios from "axios";
import logoGithub from "../public/logo-github.svg";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
}

export function App() {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setError(null); // Reseta o erro ao iniciar a busca
    setUserData(null); // Reseta os dados do usuário para evitar exibição de dados antigos

    // Verifica se o campo está vazio e exibe um erro
    if (!username.trim()) {
      setError("Digite um nome de usuário!");
      return;
    }

    try {
      // Faz a requisição à API do GitHub e tipa a resposta com GitHubUser
      const response = await axios.get<GitHubUser>(
        `https://api.github.com/users/${username}`
      );

      // Atualiza o estado com os dados recebidos da API
      setUserData(response.data);
    } catch {
      // Define uma mensagem de erro caso a requisição falhe
      setError(
        "Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="w-[1000px] h-[537px] bg-black flex items-center flex-col">
        <div className="mt-10">
          <h1 className="text-5xl font-bold flex items-center justify-center gap-2">
            <img src={logoGithub} alt="GitHub Logo" />
            Perfil <span className="font-black">GitHub</span>
          </h1>
        </div>

        <div className="bg-white w-[503px] h-15 mt-6 rounded-lg flex ">
          <input
            type="text"
            placeholder="Digite um usuário do Github"
            className="w-[503px] h-15 p-4 rounded-lg text-black ou placeholder:text-black placeholder:font-semibold focus:border-none focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={fetchUser}
            className="bg-blue-500 w-15 h-15 p-4 flex items-center justify-center border border-white rounded-lg hover:bg-blue-700"
          >
            <MagnifyingGlass size={26} />
          </button>
        </div>

        {error && (
          <div className="w-[650px] mt-8 bg-[#D9D9D9] text-[#FF0000] text-xl py-5 px-14 rounded-xl text-center">
            {error}
          </div>
        )}

        {userData && (
          <div className="w-[804px] h-[257px] mt-6 bg-[#D9D9D9] rounded-3xl flex items-center p-8">
            <img
              src={userData.avatar_url}
              alt={userData.login}
              className="w-52 h-52 rounded-full border-2 border-[#005CFF]"
            />
            <div className="ml-8 text-left">
              <h2 className="text-xl font-bold text-[#005CFF] mb-4">
                {userData.name || userData.login}
              </h2>
              <p className="text-black font-light">
                {userData.bio || "Sem descrição disponível."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
