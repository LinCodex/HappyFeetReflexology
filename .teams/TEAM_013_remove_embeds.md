# TEAM_013: Remove Legacy Embeds & Verify Images

## Objectives
- Remove hardcoded `iframely` embeds from `Services.tsx`.
- Ensure all services render using the `image` property from `constants.ts`.
- Verify specific requests for Combination, Classical Facial, and Foot Reflexology photos.

## Key Changes
- **Services.tsx**:
    - Removed conditional logic for `isCombination`, `isFootReflexology`, and `isClassicalFacial`.
    - Removed `iframe` blocks associated with those conditions.
    - Simplified rendering to always use the `img` block with `categoryImage` source.

## Results
- **Combination Treatment**: Now uses `/combo.jpg`.
- **Classical Facial Treatment**: Now uses `/ClassicalFacial.jpg`.
- **Foot Reflexology**: Now uses `/FootReflexology.png` (Embedded DropBox photo removed).
- **Other Services**: Deep Cleaning and Collagen Hydration also using their local assets as previously configured.

## Status
- [x] Embeds removed.
- [x] Images standardized.
- [x] Pushed to remote.
