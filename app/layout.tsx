import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./global.css";

import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CARSHOP | Tudo em um só lugar!",
  description:
    "Descubra a excelência da CARSHOP - Compra, venda, troca, financiamento, corretagem, carros, motos!",
  keywords: [
    "venda de carros",
    "carros usados",
    "carros novos",
    "motos usadas",
    "motos novas",
    "concessionária de veículos",
    "revenda de carros",
    "compra e venda de carros",
    "financiamento de veículos",
    "carros mais buscados",
    "carros populares",
    "carros de luxo",
    "SUVs",
    "picapes",
    "Toyota Hilux",
    "Toyota Corolla",
    "Honda Civic",
    "Chevrolet Onix",
    "Hyundai HB20",
    "Volkswagen Gol",
    "Fiat Strada",
    "moto Honda Biz",
    "moto Yamaha Fazer",
    "moto Honda CB 300",
    "carros 0km",
    "seminovos",
    "veículos seminovos",
    "oportunidades de carros",
    "promoções de carros",
    "melhores ofertas de carros",
    "melhores ofertas de motos",
    "comparar carros",
    "simulador de financiamento",
    "tabela FIPE",
    "preço de carros",
    "preço de motos",
    "avaliar meu carro",
    "trocar de carro",
    "vender meu carro",
    "garantia de veículos",
    "seguro de veículos",
    "acessórios para carros",
    "acessórios para motos",
    "peças para carros",
    "peças para motos",
    "manutenção de veículos",
    "venda online de carros",
    "venda online de motos",
    "carros com desconto",
    "motos com desconto",
    "veículos em promoção",
    "agendamento de test drive",
    "test drive de carros",
    "test drive de motos",
    "catálogo de carros",
    "catálogo de motos",
    "lançamentos de carros",
    "lançamentos de motos",
    "notícias automotivas",
    "comparativo de carros",
    "comparativo de motos",
    "guia de carros",
    "guia de motos",
    "dicas para comprar carros",
    "dicas para comprar motos",
    "melhor carro para comprar",
    "melhor moto para comprar",
    "carro ideal para você",
    "moto ideal para você",
    "encontre seu carro",
    "encontre sua moto",
    "veículos de procedência",
    "veículos com garantia",
    "veículos revisados",
    "veículos para família",
    "veículos para trabalho",
    "veículos para lazer",
    "veículos econômicos",
    "veículos potentes",
    "veículos confortáveis",
    "veículos seguros",
    "veículos modernos",
    "veículos clássicos",
    "veículos antigos",
    "veículos 4x4",
    "veículos blindados",
    "veículos elétricos",
    "veículos híbridos",
    "veículos importados",
    "veículos nacionais",
    "melhor atendimento",
    "melhor preço",
    "melhor avaliação",
    "facilidade de pagamento",
    "parcelamento facilitado",
    "financiamento sem entrada",
    "crédito para veículos",
    "leasing de veículos",
    "consórcio de veículos",
    "simulação de consórcio",
    "investimento em veículos",
    "sonho do carro novo",
    "sonho da moto nova",
    "realize seu sonho",
    "conquiste seu veículo",
    "dirija seu novo carro",
    "pilote sua nova moto",
    "felicidade sobre rodas",
    "liberdade de dirigir",
    "emoção de pilotar",
    "apaixonados por carros",
    "apaixonados por motos",
    "mundo automotivo",
    "mundo das motos",
    "veículos para um futuro melhor",
    "mobilidade sustentável",
    "carros para um mundo mais verde",
    "motos para um futuro mais limpo",
    "nossa paixão é te atender bem",
    "seu carro novo está aqui",
    "sua moto nova está aqui",
    "venha realizar seu sonho conosco",
    "estamos prontos para te ajudar",
    "seu veículo novo te espera",
    "sua moto nova te espera",
    "agende seu test drive agora",
    "não perca tempo, aproveite!",
    "as melhores ofertas estão aqui",
    "seu veículo está te esperando",
    "sua moto está te esperando",
    "realize seu sonho agora",
    "conquiste sua liberdade",
    "dirija com emoção",
    "pilote com paixão",
    "viva a experiência",
    "sinta a diferença",
    "descubra seu veículo ideal",
    "encontre sua moto perfeita",
    "seu próximo veículo está aqui",
    "sua próxima moto está aqui",
    "venha viver essa emoção"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          className={`${montserrat.className} bg-[#F5F5F0] dark:bg-background`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex min-h-screen w-full flex-col">
              <div className="flex-grow">{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
