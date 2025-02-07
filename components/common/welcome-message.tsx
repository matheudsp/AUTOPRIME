"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const getGreetingMessage = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) return "Bom dia";
  if (currentHour >= 12 && currentHour < 18) return "Boa tarde";
  return "Boa noite";
};

const WelcomeMessage = () => {
  const greeting = getGreetingMessage();

  return (
    <div className="flex flex-col dark:text-white">
      
        <h2 className="text-xl">
          <span className="font-bold">{greeting}!</span>
        </h2>

      <p className="text-sm font-light dark:text-white/70">
        {`Hoje é ${format(new Date(), "EEEE', dia' dd 'de' MMMM", {
          locale: ptBR,
        })}`}
        .
      </p>
    </div>
  );
};

export default WelcomeMessage;
