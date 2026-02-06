# TEAM_030: Fix Mobile Modal Overlap

## Changes
- Updated `BookingSection.tsx` to use `React.createPortal` for the mobile booking modal.
- Increased modal z-indices to `z-[100]` (overlay) and `z-[110]` (content).

## Rationale
- The mobile modal was previously rendered inside the main `BookingSection` container, which likely had a lower stacking context due to `transition` or `z-index` properties.
- This caused the modal to be trapped behind the `QuickAccess` floating dock (`z-40`, fixed).
- By Portaling the modal to `document.body`, we ensure it respects global z-index and sits on top of all other elements, including the dock.
- This allows users to correctly interact with the modal and the "click outside" overlay to exit.

## Verification
- Code review confirms `createPortal` is used for the mobile modal conditional block.
- Z-indices are set to 100+ to guarantee visibility.
