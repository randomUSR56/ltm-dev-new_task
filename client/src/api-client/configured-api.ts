import { FelhasznlApi } from './apis/FelhasznlApi'
import { Configuration } from './runtime'

const basePath = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

export class ConfiguredFelhasznlApi extends FelhasznlApi {
  constructor() {
    super(new Configuration({
      basePath,
      apiKey: () => sessionStorage.getItem('apikulcs') || ''
    }))
  }
}
