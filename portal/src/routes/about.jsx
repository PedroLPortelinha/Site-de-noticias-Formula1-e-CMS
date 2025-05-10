import Logo from "../assets/logo.webp";

export default function About() {
    return (
        <main className="flex flex-col items-center justify-center">
            <div>
                <img src={Logo} alt="Logo" className="h-36 mt-10" />
                <h1 className="text-center text-4xl mt-10"> Sobre </h1>
            </div>
            <p className="m-10 text-2xl">Bem-vindo ao Fas1, sua fonte definitiva de notícias e informações sobre o emocionante mundo da Fórmula 1, Fórmula 2 e Fórmula 3. Nosso site nasceu da paixão por corridas e do desejo de compartilhar essa paixão com outros entusiastas.

            Aqui, você encontrará cobertura completa de todas as corridas, desde os grandes prêmios emocionantes da Fórmula 1 até as batalhas acirradas da Fórmula 2 e Fórmula 3. Nossa equipe de jornalistas apaixonados e especializados está sempre em busca das últimas notícias, análises aprofundadas, entrevistas exclusivas e muito mais para manter você atualizado e informado.

            Nossa missão é proporcionar uma experiência única para os fãs de corridas, oferecendo conteúdo de qualidade e insights que enriqueçam sua paixão pelo esporte. Junte-se a nós nessa jornada emocionante pelo mundo da velocidade!</p>
        </main>
    )
}