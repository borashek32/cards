export const paths = {
  MAIN: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  CHECK_EMAIL: '/check-email',
  SET_NEW_PASSWORD: '/set-new-password/:token',
  FORGOT_PASSWORD: '/forgot-password',
  PROFILE: '/profile',
  PACKS: '/packs',
  CARDS: '/cards/:cardsPack_id',
  LEARN: '/learn/:card_id'
} as const