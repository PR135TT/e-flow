
import { getProperties } from './getProperties';
import { getPropertyById } from './getPropertyById';
import { getPropertiesByType } from './getPropertiesByType';
import { submitPropertyInfo } from './submitPropertyInfo';
import { getPendingProperties } from './getPendingProperties';
import { approveProperty } from './approveProperty';
import { rejectProperty } from './rejectProperty';

// Export the property-related database functions
export const db = {
  getProperties,
  getPropertyById,
  getPropertiesByType,
  submitPropertyInfo,
  getPendingProperties,
  approveProperty,
  rejectProperty
};
