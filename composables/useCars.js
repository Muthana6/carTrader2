import cars from "../../carTrader2/data/cars.json"
import makes from "../../carTrader2/data/makes.json"
import listings from "../../carTrader2/data/listings.json"

export const useCars = () => {
    return {
        cars, makes,listings
    }
}