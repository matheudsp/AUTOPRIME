"use client"
import Lottie from "react-lottie-player"
import sadSearch from '@/components/animations/sad-search.json'

export function EmptyStateVehicle() {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center p-8 w-full ">
      <Lottie loop animationData={sadSearch} play className="md:w-32 md:h-32 w-24 h-24" />
      <p className="text-center mt-4 md:text-lg text-base text-gray-600">Nenhum veículo encontrado.</p>
    </div>
  )
}

