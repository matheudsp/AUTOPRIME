import { Vehicle } from "@prisma/client";

export interface VehicleWithTotalPrice extends Omit<Vehicle, "basePrice"> {
  basePrice: number;
  totalPrice: number;
}

export const computeVehicleTotalPrice = (
  vehicle: Vehicle
): VehicleWithTotalPrice => {
  const basePrice = Number(vehicle.basePrice); 

  if (vehicle.discountPercentage === 0) {
    return {
      ...vehicle,
      basePrice,
      totalPrice: basePrice,
    };
  }

  const totalDiscount = basePrice * ((vehicle.discountPercentage || 0) / 100);

  return {
    ...vehicle,
    basePrice,
    totalPrice: basePrice - totalDiscount,
  };
};
