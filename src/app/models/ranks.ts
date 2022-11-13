export interface IRanks {
  id: number,
  rank_name: string,
  queue: number
  users: {
    id: number,
    name: string,
  }
}
