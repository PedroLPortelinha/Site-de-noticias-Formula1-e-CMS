import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div className="flex justify-center items-center h-screen bg-gray-100">
              <div className="text-center">
                  <div className=" text-6xl mb-8">404</div>
                  <div className="text-4xl mb-4">Página Não Encontrada</div>
                  <p className="text-lg mb-4">Desculpe, a página que você está procurando não existe.</p>
                  <p><Link to="/" className="text-blue-500 font-bold hover:underline">Voltar a página inicial.</Link></p>
              </div>
          </div>; 
    </div>
  );
}
