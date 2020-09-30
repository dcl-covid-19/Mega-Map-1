// Resource objects

// Free grocery
const free_grocery = {
  name: 'free_grocery',
  sql_query: " WHERE resource = 'grocery' AND free = 1 AND status = 1",
  display_map: true,
  badges: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'call_in_advance', label: 'label.call_in_advance' },
    { var: 'curbside_pickup', label: 'label.curbside_pickup' },
    { var: 'delivery', label: 'label.delivery' }
  ],
  filters: [{ var: 'open_today', label: 'label.open_today' }, ['eligibility', { var: 'children', label: 'label.children' }]],
  sort: 'open_distance'
}
// Free meal
const meal = {
  name: 'meal',
  sql_query: " WHERE resource = 'meal' AND status = '1'",
  display_map: true,
  badges: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'call_in_advance', label: 'label.call_in_advance' }
  ],
  filters: [{ var: 'open_today', label: 'label.open_today' }, ['filter.eligibility', { var: 'children', label: 'label.children' }]],
  sort: 'open_distance'
}
// Calfresh/Wic stores
const snap_wic_retailer = {
  name: 'snap_wic_retailer',
  sql_query: " WHERE resource = 'grocery' AND free = 0 AND status = 1",
  display_map: true,
  badges: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'call_in_advance', label: 'label.call_in_advance' },
    { var: 'special_hours', label: 'label.special_hours' },
    { var: 'safe_pickup', label: 'label.safe_pickup' },
    { var: 'wic_only', label: 'label.wic_only' },
    { var: 'farmers_market', label: 'label.farmers_market' }
  ],
  filters: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'wic', label: 'label.wic' },
    { var: 'snap', label: 'label.snap' },
    { var: 'special_hours', label: 'label.special_hours' },
    { var: 'safe_pickup', label: 'label.safe_pickup' },
    { var: 'farmers_market', label: 'label.farmers_market' }
  ],
  sort: 'open_distance'
}
// Legal assistance
const legal_assistance = {
  name: 'legal_assistance',
  sql_query: " WHERE resource = 'legal_services' AND status = 1",
  display_map: false,
  badges: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'call_in_advance', label: 'label.call_in_advance' },
    { var: 'legal_criminal', label: 'legal.legal_criminal' },
    { var: 'legal_domviolence', label: 'legal.legal_domviolence' },
    { var: 'legal_worker_protection', label: 'legal.legal_worker_protection' },
    { var: 'legal_healthcare', label: 'legal.legal_healthcare' },
    { var: 'legal_housing', label: 'legal.legal_housing' },
    { var: 'legal_housing', label: 'legal.legal_immigration' }
  ],
  filters: [],
  sort: 'hotline_distance'
}
// Mental health
const mental_health = {
  name: 'mental_health',
  sql_query: " WHERE resource = 'health' AND med_mental_health = 1 AND status = 1",
  display_map: false,
  badges: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'call_in_advance', label: 'label.call_in_advance' }
  ],
  filters: [
    { var: 'in_person', label: 'label.in_person', display_map: true },
    { var: 'telehealth', label: 'label.telehealth' }
  ],
  sort: 'hotline_distance'
}
// Health
const health = {
  name: 'health',
  sql_query: " WHERE resource = 'health' AND status = 1",
  display_map: false,
  badges: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'call_in_advance', label: 'label.call_in_advance' }
  ],
  filters: [
    { var: 'in_person', label: 'label.in_person', display_map: true },
    { var: 'telehealth', label: 'label.telehealth' }
  ],
  sort: 'hotline_distance'
}

// BLM
const blm = {
  name: 'blm',
  sql_query: " WHERE resource = 'restaurant' AND status = 1 AND bob = 1",
  display_map: false,
  badges: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'bob', label: 'label.bob' },
    { var: 'catering', label: 'label.catering' },
    { var: 'in_store_pickup', label: 'label.takeaway' },
    { var: 'delivery', label: 'label.delivery' }
  ],
  filters: [
    { var: 'catering', label: 'label.catering' },
    { var: 'in_store_pickup', label: 'label.takeaway', display_map: true },
    { var: 'delivery', label: 'label.delivery', display_map: true },
    { var: 'open_today', label: 'label.open_today' }
  ],
  sort: 'open_distance'
}

// Eviction Resources
const eviction_resources = {
  name: 'eviction_resources',
  sql_query: " WHERE resource = 'legal_general_info' AND eviction = 1",
  display_map: false,
  badges: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'city', label: 'label.city' }
  ],
  filters: [],
  sort: 'open_distance'
}

/*
// Black Owned Restaurants
const black_owned_restaurants = {
  name: 'black_owned_restaurants',
  sql_query: " WHERE resource = 'restaurant'",
  display_map: true,
  badges: [
    { var: 'open_today', label: 'label.open_today' },
    { var: 'catering', label: 'label.catering' },
    { var: 'delivery', label: 'label.delivery' }
  ],
  filters: [],
  sort: 'open_distance'
}
*/

// UPDATE WHEN CREATING / REMOVING RESOURCES
export const needs = {
  free_grocery: free_grocery,
  meal: meal,
  snap_wic_retailer: snap_wic_retailer,
  legal_assistance: legal_assistance,
  mental_health: mental_health,
  health: health,
  blm: blm,
  eviction_resources: eviction_resources
}

export const needs_name = [
  'free_grocery',
  'meal',
  'snap_wic_retailer',
  'legal_assistance',
  'mental_health',
  'health',
  'blm',
  'eviction_resources'
]
