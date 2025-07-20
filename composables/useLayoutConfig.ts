export interface LayoutConfig {
  showLeftSidebar: boolean
  showRightSidebar: boolean
  leftSidebarContent?: any
  rightSidebarContent?: any
  variant?: 'default' | 'with-sidebars' | 'left-sidebar' | 'right-sidebar' | 'centered' | 'full-width'
}

const layoutConfigKey: InjectionKey<LayoutConfig> = Symbol('layoutConfig')

export function useLayoutConfig() {
  const config = inject(layoutConfigKey, {
    showLeftSidebar: false,
    showRightSidebar: false,
    variant: 'default',
  })

  const setLayoutConfig = (newConfig: Partial<LayoutConfig>) => {
    Object.assign(config, newConfig)
  }

  return {
    config: readonly(config),
    setLayoutConfig,
  }
}

export function provideLayoutConfig(config: LayoutConfig) {
  provide(layoutConfigKey, config)
}
