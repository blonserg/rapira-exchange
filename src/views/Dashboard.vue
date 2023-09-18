<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-lg-0 ps-3 ps-xl-5 pt-10 ">
    <!--begin::Col-->
    <div v-if="!dataUser.realVerified" class="widget_padding col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-4 mt-0 px-2 ps-0">
      <WidgetAccess :widget="accessData[0]"/>
    </div>
    <div v-if="!dataUser.telegramId"  class="widget_padding col-md-6 col-lg-6 col-xl-3 col-xxl-3 mb-4 mt-0 px-2  ps-0">
      <WidgetAccess :widget="accessData[1]"/>
    </div>
    <div v-if="!dataUser.googleStatus" class="widget_padding col-md-6 col-lg-6 col-xl-3 col-xxl-3 mb-4 mt-0 px-2 ps-0">
      <WidgetAccess :widget="accessData[2]"/>
    </div>
    <div v-if="dataUser.realVerified || dataUser.telegramId || dataUser.googleStatus"
         class="widget_padding col-md-6 col-lg-6 mb-4 mt-0 ps-0 px-2 "
         :class="[(!dataUser.realVerified && dataUser.googleStatus) || (!dataUser.realVerified && dataUser.telegramId) ? 'col-xl-3 col-xxl-3' : 'col-xl-6 col-xxl-6']"
    >
      <WidgetAccess :widget="accessData[3]"/>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
  <!--begin::Row-->
  <div class="row g-5 mt-1">
    <!--begin::Col-->
    <div class="col-md-12 col-lg-12 col-xl-5 col-xxl-5 mb-4 mt-0">
      <WidgetChart :chartSize="132"/>
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-md-12 col-lg-12 col-xl-7 col-xxl-7 mb-4 mt-0">
      <WidgetActiveTable/>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
  <!--begin::Row-->
  <div class="row g-5 align-items-stretch mt-1">
    <!--begin::Col-->
    <div class="col-md-12 col-lg-12 col-xl-6 col-xxl-6 mb-4 mt-0">
      <WidgetTableTabs/>
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-md-12 col-lg-12 col-xl-6 col-xxl-6 mb-4 mt-0">
      <WidgetTableTabsP2P/>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
  <!--begin::Row-->
<!--  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">-->
<!--    &lt;!&ndash;begin::Col&ndash;&gt;-->
<!--    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-4 pe-2">-->
<!--      <WidgetTableSecurity/>-->
<!--    </div>-->
<!--    &lt;!&ndash;end::Col&ndash;&gt;-->
<!--    &lt;!&ndash;begin::Col&ndash;&gt;-->
<!--    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-4 ps-2">-->
<!--      <WidgetTableSecurity/>-->
<!--    </div>-->
<!--    &lt;!&ndash;end::Col&ndash;&gt;-->
<!--  </div>-->
  <!--end::Row-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {computed, defineComponent, onMounted} from "vue";
import WidgetAccess from "@/components/widgets/custom/Access.vue";
import WidgetChart from "@/components/widgets/custom/Chart.vue";
import WidgetActiveTable from "@/components/widgets/custom/TableActive.vue";
import WidgetTableTabs from "@/components/widgets/custom/TableTabs.vue";
import WidgetTableTabsP2P from "@/components/widgets/custom/TableTabsP2P.vue";
import WidgetTableSecurity from "@/components/widgets/custom/TableSecurity.vue";
import {useI18n} from "vue-i18n";
import {useBasicRequest} from "@/stores/basicRequests";

export default defineComponent({
  name: "main-dashboard",
  components: {
    WidgetAccess,
    WidgetChart,
    WidgetActiveTable,
    WidgetTableTabs,
    WidgetTableTabsP2P,
    WidgetTableSecurity,
  },
  setup() {
    const { t } = useI18n();
    const i18n = useI18n();
    const accessData = computed(() => ([
      {
        title: t('widgetaccess.verify.title'),
        level: t('widgetaccess.verify.level'),
        icon: "ki-tablet-ok",
        description: t('widgetaccess.verify.description'),
        button: t('widgetaccess.verify.button'),
        widgetVer: true,
        widgetRef: false,
      },
      {
        title: t('widgetaccess.telegram.title'),
        level: t('widgetaccess.telegram.level'),
        icon: "telegram",
        description: t('widgetaccess.telegram.description'),
        button: t('widgetaccess.telegram.button'),
        widgetVer: false,
        widgetRef: false,
      },
      {
        title: t('widgetaccess.googleAuth.title'),
        level: t('widgetaccess.googleAuth.level'),
        icon: "ki-key",
        description: t('widgetaccess.googleAuth.description'),
        button: t('widgetaccess.googleAuth.button'),
        widgetVer: false,
        widgetRef: false,
      },
      {
        title: t('widgetaccess.referal.title'),
        level: t('widgetaccess.referal.level'),
        icon: "ki-gift",
        description: t('widgetaccess.referal.description'),
        button: t('widgetaccess.referal.button'),
        widgetVer: false,
        widgetRef: true,
      }
    ]));

    const store = useBasicRequest();
    const dataUser = computed(() => {
      return store.securitySetting;
    });
    const systemLang = computed(() => store.securitySetting.language);
    const getLangNames = (number: number) => {
      return number === 0 ? "ru" : number === 1 ? "en" : number === 2 ? "zh" : number;
    };
    const setLang = () => {
      // @ts-ignore
      localStorage.setItem("lang", getLangNames(systemLang.value));
      // @ts-ignore
      i18n.locale.value = getLangNames(systemLang.value);
    };

    onMounted(() => {
      setLang();
    });

    return {
      getAssetPath,
      accessData,
      dataUser,
    };
  },
});
</script>
<style lang="scss" scoped>
@media screen and (min-width: 776px) {
  .widget_padding {
    padding-right: 10px !important;
  }
  .widget_bottom {

  }
}
</style>