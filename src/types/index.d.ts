declare interface Navigator extends Navigator {
  userAgentData?: {
    brands: Array<{ brand: string; version: string }>
    mobile?: boolean
    platform?: string
  }
}
