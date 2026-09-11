# Testing Guide — Bloombridge Academy

## Validation Suite
Run the automated test runner:
```bash
npm test
# or
node test/validate-system.js
```

## Manual Verification
1. Run local preview: `npx -y serve . -l 3004`.
2. Open `http://localhost:3004/book-counselling.html`.
3. Submit a candidate application.
4. Check console logs for payload structure and `SN-BLO-` ID.
5. Verify the candidate application confirmation modal renders with reference code.
