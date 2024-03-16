import {PlaceWithCoords} from "@shared/types/types";

function formatPlaces(places: PlaceWithCoords[]) {
    const res: Record<string, PlaceWithCoords[]> = {};
    let totalRows = 0;
    let totalColumns = 0;

    places.forEach(el => {
        const row = el.row;
        if (el.gridPosY > totalRows) {
            totalRows = el.gridPosY;
        }
        if (el.gridPosX > totalColumns) {
            totalColumns = el.gridPosX;
        }

        if (row in res) {
            res[row].push(el);
        } else {
            res[row] = [el];
        }
    })
    return {places: res, totalRows, totalColumns};
}

function formatPlacesCount(num: number) {
    switch (num) {
        case 1:
            return "1 место";
        case 2:
            return "2 места";
        case 3:
            return "3 места";
        case 4:
            return "4 места";
        default:
            return `${num} мест`;
    }
}

export {
    formatPlaces,
    formatPlacesCount
}