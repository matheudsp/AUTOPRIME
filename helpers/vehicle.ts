import { Vehicle } from "@prisma/client";

export interface VehicleWithTotalPrice extends Vehicle {
  totalPrice: number;
}

export const computeVehicleTotalPrice = (
  vehicle: Vehicle,
): VehicleWithTotalPrice => {
  if (vehicle.discountPercentage === 0) {
    return {
      ...vehicle,
      totalPrice: Number(vehicle.basePrice),
    };
  }

  const totalDiscount =
    Number(vehicle.basePrice) * (vehicle.discountPercentage! / 100);

  return {
    ...vehicle,
    totalPrice: Number(vehicle.basePrice) - totalDiscount,
  };
};
