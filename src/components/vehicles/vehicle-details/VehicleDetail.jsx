import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getVehicleById, setRentVeh } from "../../../utils/services/vehicle-http-utils";
import { VehicleCard } from "../vehicle-card/VehicleCard";
import { Button } from "react-bootstrap";
import './VehicleDetail.scss';

export function VehicleDetail () {
    const params = useParams();
    const [vehicle, setVehicle] = useState({});
    const navigate = useNavigate();   

    useEffect(() => {
        if (params.id) {
            const promises = [getVehicleById(params.id)];
            Promise.all(promises)
                .then(result => {
                    setVehicle(result[0].data);
                });
        }
    }, [params.id])

    const rentClickHandler = () => {
        setRentVeh(vehicle)
        navigate(`/rentals/rent/${vehicle.id}`);
    }

    return (
        <div class="container">
		<div class="detail-card">
			<div class="container-fliud">
				<div class="wrapper row">
					<div class="preview col-md-8">
						  <div class="tab-pane active" id="pic-1"><img className="car-image" src={vehicle.photo} /></div>
					</div>
                    <div className="col details-pane ">
                        <h2 className="mb-3">Characteristics</h2>
                        <div className="row details">
                            <div className="col-3 types">
                                <div>Brand</div>
                                <div>Model</div>
                                <div>Type</div>
                                <div>Fuel</div>
                                <div>Seats</div>
                                <div>Price</div>
                                <div>Year</div>
                                <div>Available</div>
                            </div>
                            <div className="col-3 description">
                                <div>{vehicle.brand}</div>
                                <div>{vehicle.model}</div>
                                <div>{vehicle.type}</div>
                                <div>{vehicle.fuelType}</div>
                                <div>{vehicle.seatCount}</div>
                                <div>{vehicle.pricePDay}</div>
                                <div>{vehicle.constructionYear}</div>
                                <div>{vehicle.count}</div>
                            </div>
                        </div>
                        <Button onClick={rentClickHandler} className='btn btn-warning btn-rent'>Rent</Button>
                    </div>
				</div>
			</div>
		</div>
	</div>
    )
}