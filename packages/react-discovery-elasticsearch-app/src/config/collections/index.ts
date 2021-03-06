import {cambridge} from './cambridge'
import deepmerge from 'deepmerge'
import {ecodices} from './ecodices'
import {getty} from './getty'
import {harvard} from './harvard'
import {hsp2} from './hsp2'
import {nga} from './nga'
import {ox1} from './ox'
import {ubl} from './ubl'
export const collections = deepmerge.all([cambridge, ecodices, getty, harvard, hsp2, nga, ox1, ubl])
