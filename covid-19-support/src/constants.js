export const dayAny = 7

export const weekdays = [
  { day: 'any', pos: dayAny },
  { day: 'monday', pos: 1 },
  { day: 'tuesday', pos: 2 },
  { day: 'wednesday', pos: 3 },
  { day: 'thursday', pos: 4 },
  { day: 'friday', pos: 5 },
  { day: 'saturday', pos: 6 },
  { day: 'sunday', pos: 0 }
]

export const weekdaysJs = [
  { day: 'sunday' },
  { day: 'monday' },
  { day: 'tuesday' },
  { day: 'wednesday' },
  { day: 'thursday' },
  { day: 'friday' },
  { day: 'saturday' }
]

export const weekdayHours = [
  { day: 'sunday' },
  { day: 'monday' },
  { day: 'tuesday' },
  { day: 'wednesday' },
  { day: 'thursday' },
  { day: 'friday' },
  { day: 'saturday' }
]

export const openStreetMapAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
export const mapBoxAttribution =
  '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://carto.com/attribution">CARTO</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'

export const dayFilters = ['sun', 'mon', 'tues', 'wed', 'thr', 'fri', 'sat'].map((attr) => `${attr}`)
export const seniorDayFilters = ['sun', 'mon', 'tues', 'wed', 'thr', 'fri', 'sat'].map((attr) => `sp_${attr}`)

export const booleanFilters = [
  'pay_at_pickup',
  'curbside_pickup',
  'special_hours',
  'meal_student',
  'meal_public',
  'family_meal',
  'pay_phone',
  'pay_online',
  'must_preorder',
  'discount_medical',
  'delivery',
  'free_produce',
  'free_groceries',
  'farm_pick_up',
  'farmers_market',
  'free',
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
  'legal_immigration'
]

// Combination of boolean filters
export const complexFilters = [
  { name: 'curbside_or_delivery', columns: ['curbside_pickup', 'delivery'], combine: ([a, b]) => a || b },
  { name: 'safe_pick_up', columns: ['curbside_pickup', 'delivery'], combine: ([a, b]) => a || b }
]

// CARTO DB VARIABLES
export const cartoBaseURL =
  // 'https://mfincker.carto.com/api/v2/sql?api_key=' + process.env.VUE_APP_CARTO_API_KEY
  'https://dcl-mega-map.carto.com/api/v2/sql?'

export const cartoDBName = 'mega_map_database'

export const needs = ['free_grocery', 'meal', 'snap_wic_retailer', 'legal_assistance', 'medical', 'mental_health']

export const needsWithGeoFilter = ['legal_assistance', 'medical', 'mental_health']

export const sqlQueries = {
  free_grocery: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'grocery' AND free = 1 AND status = 1",
  meal: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'meal'",
  snap_wic_retailer: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'grocery' AND free = 0 AND status = 1",
  // legal_general_info: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'legal_general_info'",
  legal_assistance: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'legal_services' AND status = 1",
  medical: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'medical' AND status = 1",
  mental_health: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'mental_health' AND status = 1"
}

export const countyLatLon = {
  anywhere: { lat: 37.594, lon: -122.223, zoom: 8 },
  alameda: { lat: 37.8097, lon: -122.25328, zoom: 10 },
  contra_costa: { lat: 37.897914, lon: -122.070408, zoom: 10 },
  marin: { lat: 38.0319, lon: -122.665367, zoom: 10 },
  monterey: { lat: 36.625121, lon: -121.765207, zoom: 10 },
  napa: { lat: 38.417836, lon: -122.380023, zoom: 10 },
  san_francisco: { lat: 37.7749, lon: -122.4194, zoom: 10 },
  san_mateo: { lat: 37.529076, lon: -122.308764, zoom: 10 },
  santa_clara: { lat: 37.308325, lon: -121.859261, zoom: 10 },
  solano: { lat: 38.258686, lon: -122.014371, zoom: 10 },
  sonoma: { lat: 38.481106, lon: -122.797838, zoom: 10 }
}
