import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'

export const getTitle = () => {
    const route = useRoute()
    const { t } = useI18n()

    useTitle(t(String(route?.meta?.title || 'Template')))
}
