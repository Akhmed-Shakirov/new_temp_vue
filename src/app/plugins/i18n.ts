import { createI18n } from 'vue-i18n'

import en from '@/app/assets/lang/en.json'
import ru from '@/app/assets/lang/ru.json'
import kz from '@/app/assets/lang/kz.json'

let locale = localStorage.language || 'ru'

const i18n = createI18n({
    legacy: false,
    locale: locale,
    fallbackWarn: false,
    missingWarn: false,
    messages: {
        en,
        ru,
        kz
    },
    pluralRules: {
        'ru': function(choice: number) {
            if (choice === 0) {
                return 0
            } else if (choice % 10 == 1 && choice % 100 != 11) {
                return 1
            } else if( [2, 3, 4].includes(choice % 10) && ![12, 13, 14].includes(choice % 100) ){
                return 2
            } else if( (choice % 10) == 0 || ![5, 6, 7, 8, 9].includes(choice % 10) || ![11, 12, 13, 14].includes(choice % 100) ) {
                return 3
            }
        }
    }
})

export default i18n
