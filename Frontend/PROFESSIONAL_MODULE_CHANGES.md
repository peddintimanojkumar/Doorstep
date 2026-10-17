# Doorstep Pro - Professional Module

## New folders/files

Create this folder if it does not exist:

`src/components/professional/`

Inside it:

- `ProfessionalPage.jsx`

Create these data files:

`src/data/`

- `professionalReviews.js`
- `professionalDocuments.js`

Create these professional pages:

`src/pages/professional/`

- `Schedule.jsx`
- `Profile.jsx`
- `Documents.jsx`
- `Reviews.jsx`
- `Settings.jsx`
- `Help.jsx`

The existing files below were upgraded:

- `Dashboard.jsx`
- `Requests.jsx`
- `Jobs.jsx`
- `Earnings.jsx`
- `../../layouts/ProfessionalLayout.jsx`
- `../../routes/AppRoutes.jsx`
- `../../constants/routes.js`
- `../../hooks/useAuth.js`
- `../../index.css`

## Routes added

- `/professional`
- `/professional/requests`
- `/professional/jobs`
- `/professional/earnings`
- `/professional/schedule`
- `/professional/profile`
- `/professional/documents`
- `/professional/reviews`
- `/professional/settings`
- `/professional/help`

## Functional behavior

- Requests load from `useProfessionalJobs`.
- Accept changes `pending` -> `upcoming`.
- Decline changes `pending` -> `declined`.
- Mark completed changes `upcoming`/`active` -> `completed`.
- Jobs and earnings update through TanStack Query invalidation.
- Professional request badge is calculated from actual pending jobs.
- Profile edits persist through `doorstep.session`.
- Settings persist through `doorstep.professional.settings`.
- Documents/reviews are frontend demo data ready for a future API.
- Sidebar uses exact routes and only Overview is active on `/professional` because it uses `end` matching.
- Mobile sidebar closes after navigation.

## Background

Professional pages use `#F3F4F6` as the gray page background, with white cards for contrast.

Global `body` background is also set to `#F3F4F6` in `src/index.css`.

## Existing dependencies

No new npm package is required for these Professional changes. The project already contains React Router, TanStack Query, Lucide React and React Hook Form.

## Start

```bash
npm install
npm run dev
```

Then log in as a Professional and open:

`http://localhost:5173/professional`
