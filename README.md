# ShoeCart

ShoeCart is a modern React Native e-commerce application designed for managing and purchasing shoes. It provides a complete experience for both administrators and users, with a clean interface and persistent state across sessions.

## Project Overview

ShoeCart allows admins to manage a shoe catalog and users to browse products, select sizes, add items to a cart, place orders, and review purchase history. The app is built with React Native CLI and TypeScript, using Redux Toolkit for state management and Redux Persist for persistence.

## Features

### Admin
- Add Shoe
- Edit Shoe
- Delete Shoe

### User
- Browse Shoes
- Select Size
- Add To Cart
- Update Quantity
- Checkout
- Orders

### Persistence
- Redux Persist for cart, orders, and catalog state across app sessions

## Architecture

The application follows a modular structure with clear separation between:
- Screens for user and admin flows
- Reusable UI components
- Redux slices for state management
- Navigation setup for role-based experiences
- Shared theme and utility modules

## Folder Structure

```text
src/
  components/
  navigation/
  redux/
    slices/
  screens/
    Admin/
    Common/
    User/
  theme/
  types/
  utils/
```

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Kriishnaaaa/ShoeCart-React-Native.git
   cd ShoeCart-React-Native
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Install iOS dependencies (if needed)
   ```bash
   cd ios && pod install && cd ..
   ```

## Run Android

```bash
npm run android
```

## Run iOS

```bash
npm run ios
```

## Screenshots

> Screenshots will be added soon.

## Future Improvements

- Add authentication for admin and users
- Implement payment integration
- Add search and filtering for shoes
- Improve onboarding and empty-state UX
- Add unit and integration tests

## Tech Stack

- React Native CLI
- TypeScript
- Redux Toolkit
- Redux Persist
- React Navigation
- React Hook Form
