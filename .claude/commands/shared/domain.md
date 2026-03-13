## Domain concepts
- `ProgramDay`: `'1-3' | '4' | '5'` — cycles based on program start date
- `calculateAmount(food)` = `amount × (mealMultiplierPercentage / 100) × dayMultiplier`, rounded to nearest 5
- `day4x` / `day5x`: multipliers applied on days 4 and 5; `Food.amount` is in grams
- `mealMultiplierPercentage`: global scale for all portions (default 100%)
- `unConvertible: true`: food has no valid unit conversion — do not pass through conversion logic
- Meal `type: 'all'` vs `type: 'one-of'`: all foods required vs user picks one per category
