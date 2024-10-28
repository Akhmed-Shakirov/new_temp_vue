export interface TSRoute {
    path: string
    component: any
    meta?: {
        layout?: 'default' | 'empty'
    }
}
