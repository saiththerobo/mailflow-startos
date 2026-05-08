import { VersionGraph } from '@start9labs/start-sdk'
import { v_1_0_2_0 } from './v1.0.2_0'
import { v_1_0_2_1 } from './v1.0.2_1'
import { v_1_0_2_2 } from './v1.0.2_2'
import { v_1_0_2_3 } from './v1.0.2_3'
import { v_1_0_2_4 } from './v1.0.2_4'
import { v_1_0_3_0 } from './v1.0.3_0'

export const versionGraph = VersionGraph.of({
  current: v_1_0_3_0,
  other: [v_1_0_2_4, v_1_0_2_3, v_1_0_2_2, v_1_0_2_1, v_1_0_2_0],
})
