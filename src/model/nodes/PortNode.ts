import { Direction } from '../../constants';

export default class Port {
    id: String;
    name: String;
    role: Direction;

    constructor(id: string, name: string, role: Direction) {
        this.id = id ? id : this._throw('Port ID should be defined.', '');
        this.name = name ? name : id;
        this.role = role ? role : this._throw('Port role should be defined.', Direction.INPUT);
    }

    _throw(m: string, returnValue: any) {
        throw m;
        return returnValue;
    }

    getId() : String {
        return this.id;
    }

    getName() : String {
        return this.name;
    }

    getRole() : Direction {
        return this.role;
    }
}