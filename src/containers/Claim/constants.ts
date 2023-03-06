import { TOKEN_NAME } from '@/utils/constants'

export const STEPS = {
  VERIFY_URL: 1,
  CONNECT_WALLET: 2,
  ENCRYPT_DATA: 3,
  FINISH: 4,
}

export const STEP_NAME = {
  1: 'Verify',
  2: 'Login',
  3: `Claim ${TOKEN_NAME}`,
  4: `View ${TOKEN_NAME}`,
}

export const TICKET_IMAGE_URL =
  'https://ik.imagekit.io/chainlabs/Simplr_Events/vivacity_ticket_BEvIYgDtB.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1676119194637'
