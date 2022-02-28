import { lighten } from 'polished'

export const wrapStyles = `
  background-color: #2a292e;
  border: 2px solid ${lighten(0.05, '#2a292e')};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

export const eerieBlack = '#18181a'
export const raisinBlack = '#2a292e'

export const mmOrange = '#E2761B'
export const bmPink = '#FF91AF'

export const lightenedCandyPink = lighten(0.15, '#e26263')

export const COLORS = { mmOrange, bmPink, raisinBlack, eerieBlack, flickrBlue, springGreen, tartOrange }
