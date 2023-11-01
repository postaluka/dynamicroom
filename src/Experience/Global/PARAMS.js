import Materials from "../Resources/Materials"

const materials = new Materials()

const PARAMS = {
    room: {
        width: 10,
        height: 10,
        depth: 10
    },
    floor: {
        sideX: 10,
        sideY: 10,
        rotateY: 0,
    },
    sphere: {
        radius: 0.85,
    },
    objectsToUpdate: [],
}

export default PARAMS 