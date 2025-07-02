export interface Reservation {
    id: number,
    clientFirstName: string,
    clientLastName:string,
    clientNumber: number,
    carModel: string,
    status?: 'pending' | 'accepted' | 'cancelled';
}
