export interface Space {
  id: number;
  name: string;
  type: string;
  location: string;
  capacity: number;
}

export interface CreateSpaceData {
  name: string;
  location: string;
  capacity: number;
}