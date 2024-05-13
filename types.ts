export type Film ={
    _id: string;
    brand: string;
    name: string;
    iso: number;
    formatThirtyFive: boolean;
    formatOneTwenty: boolean;
    color: boolean;
    process: string;
    staticImageUrl: string;
    description: string;
    customDescription: string[];
    keyFeatures: Features[];
    dateAdded: Date;
    __v: number;
}

export type Features = {
    _id: string;
    feature: string;
}

export type Project = {
    _id: string;
    name: string;
    films: Film[];
}

export type SelectedFilm = {
    film: Film;
    quantity: number;
}