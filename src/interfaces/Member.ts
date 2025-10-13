export interface Member {
    id: number;
    name: string;
    linkedin?: string;
    email?: string;
    website?: string;
    photo: string;
    role?: string; // Optional field to specify member roles
    description?: string; // Optional field for member descriptions
    board?: boolean; // Optional field to specify board members
}
