import { tabsFunctions } from './tabs'
import { shellFns } from './shell'

export const blockFunctions = () => {
  shellFns()
  tabsFunctions()
}
