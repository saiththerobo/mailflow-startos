import { VersionGraph } from '@start9labs/start-sdk'
import { v_1_0_2_0 } from './v1.0.2_0'
import { v_1_0_2_1 } from './v1.0.2_1'

export const versionGraph = VersionGraph.of({
  current: v_1_0_2_1,
  other: [v_1_0_2_0],
})
