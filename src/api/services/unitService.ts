import apiClient from '../client/axios';

// Types
export interface Unit {
  id: number;
  name: string;
  abbreviation: string;
  is_default: boolean;
  conversion_factor: number;
  shop_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateUnitData {
  name: string;
  abbreviation: string;
  is_default?: boolean;
  conversion_factor?: number;
}

export interface UpdateUnitData {
  name?: string;
  abbreviation?: string;
  is_default?: boolean;
  conversion_factor?: number;
}

// Unit API calls
const unitService = {
  // Get all units
  getUnits: async (): Promise<Unit[]> => {
    const response = await apiClient.get<{ status: string; data: { units: Unit[] } }>('/units');
    return response.data.data.units;
  },

  // Create new unit
  createUnit: async (unitData: CreateUnitData): Promise<Unit> => {
    const response = await apiClient.post<{ status: string; data: { unit: Unit } }>('/units', unitData);
    return response.data.data.unit;
  },

  // Update unit
  updateUnit: async (id: number, unitData: UpdateUnitData): Promise<Unit> => {
    const response = await apiClient.put<{ status: string; data: { unit: Unit } }>(`/units/${id}`, unitData);
    return response.data.data.unit;
  },

  // Delete unit
  deleteUnit: async (id: number): Promise<void> => {
    await apiClient.delete(`/units/${id}`);
  }
};

export default unitService; 