import { createI18n } from "vue-i18n";
import ru from "../../assets/lang/ru";
import en from "../../assets/lang/en";
import zh from "../../assets/lang/zh";

const messages = {
  ru: ru,
  en: en,
  zh: zh,
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage["lang"] ? localStorage["lang"] : "ru" ,
  globalInjection: true,
  messages,
});

export default i18n;
