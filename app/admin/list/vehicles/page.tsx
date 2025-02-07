import { vehicles } from "@/actions/vehicles";
import VehicleItem from "@/components/vehicle-item";

import { computeVehicleTotalPrice } from "@/helpers/vehicle";

const VehicleList = async () => {
  const vehiclesData = await vehicles();

  return (
    <section className="mx-auto w-full max-w-7xl p-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {vehiclesData.map((vehicle) => (
          <VehicleItem
            key={vehicle.id}
            vehicle={computeVehicleTotalPrice(vehicle)}
            isAdminPage={true}
          />
        ))}
      </div>
    </section>
  );
};

export default VehicleList;
