
export class PokemonModel {
        id?: number;
        name?: string;
        base_experience?: number;
        capture_rate?: number;
        weight?: number;
        height?: number;
        colorType?: string;
        generation?: string;
        habitat?: string;
        abilities?: Array<any>;
        status?: Array<any>;
        type?: Array<any>;
        evolutuion?: Array<any>;
}


export enum TYPE_COLOURS {
        bug = '#92BC2C',
        dark = '#595761',
        dragon = '#0C69C8',
        electric = '#F2D94E',
        fairy = '#EE90E6',
        fighting = '#D3425F',
        fire = '#FBA54C',
        flying = '#A1BBEC',
        ghost = '#5F6DBC',
        grass = '#5FBD58',
        ground = '#DA7C4D',
        ice = '#75D0C1',
        normal = '#A0A29F',
        poison = '#B763CF',
        psychic = '#FA8581',
        rock = '#C9BB8A',
        steel = '#5695A3',
        water = '#539DDF'
}