export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    link?: string;
    category: string;
    gallery?: string[]; // Array of image paths for the project gallery
}