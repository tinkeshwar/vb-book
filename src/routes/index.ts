import { flatten } from 'lodash'
import Admin from './admin'
import Company from './company'

export default flatten([
  Admin as any,
  Company as any
])
