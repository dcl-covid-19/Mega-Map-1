// Boolean filters
export const booleanFilters = [
  'special_hours',
  'farmers_market',
  'wic',
  'snap',
  'call_in_advance',
  'seniors',
  'children',
  'public',
  'telehealth',
  'in_person',
  'legal_criminal',
  'legal_domviolence',
  'legal_worker_protection',
  'legal_healthcare',
  'legal_housing',
  'legal_immigration',
  'in_store_pickup',
  'delivery'
]

// Combination of boolean filters
export const complexFilters = [{ name: 'safe_pickup', columns: ['curbside_pickup', 'delivery'], combine: ([a, b]) => a || b }]

// Day filters
export const dayFilters = ['sun', 'mon', 'tues', 'wed', 'thr', 'fri', 'sat'].map((attr) => `${attr}`)
export const seniorDayFilters = ['sun', 'mon', 'tues', 'wed', 'thr', 'fri', 'sat'].map((attr) => `sp_${attr}`)

export const weekdayHours = [
  { day: 'sunday' },
  { day: 'monday' },
  { day: 'tuesday' },
  { day: 'wednesday' },
  { day: 'thursday' },
  { day: 'friday' },
  { day: 'saturday' }
]
