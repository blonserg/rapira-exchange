<template>
  <div class="card">
    <div class="card-header border-0 pt-9 d-flex justify-space-between flex-lg-nowrap">
      <!--begin::Toolbar-->
      <div class="card-toolbar card-toolbar-history m-0 pb-1">
        <!--begin::Tab nav-->
        <ul
            class="nav nav-stretch fs-4 text-gray-800 fw-semobold nav-line-tabs nav-line-tabs border-transparent flex-lg-nowrap"
            role="tablist"
        >
          <li class="nav-item" role="presentation">
            <a
                id="All"
                class="nav-link text-active-dark active pb-4 pt-0 fw-bold me-6"
                data-bs-toggle="tab"
                role="tab"
                href="#history-all"
                v-on:click="changeTab('All')"
            >
              {{ $t('history.allTransactions') }}
            </a>
          </li>

          <li class="nav-item" role="presentation">
            <a
                id="Exchange"
                class="nav-link text-active-dark ms-3 pb-4 pt-0 fw-bold ms-6"
                data-bs-toggle="tab"
                role="tab"
                href="#history-exchange"
                v-on:click="changeTab('Exchange')"
            >
              {{ $t('history.exchangeDeal') }}
            </a>
          </li>

          <li class="nav-item" role="presentation">
            <a
                id="P2P"
                class="nav-link text-active-dark ms-3 pb-4 pt-0 fw-bold ms-6"
                data-bs-toggle="tab"
                role="tab"
                href="#history-p2p"
                v-on:click="changeTab('P2P')"
            >
              {{ $t('history.p2pDeal') }}
            </a>
          </li>

          <li class="nav-item" role="presentation">
            <a
                id="Rcode"
                class="nav-link text-active-dark ms-3 pb-4 pt-0 fw-bold ms-6"
                data-bs-toggle="tab"
                role="tab"
                href="#history-rcode"
                v-on:click="changeTab('Rcode')"
            >
              {{ $t('history.rCode') }}
            </a>
          </li>
        </ul>
        <!--end::Tab nav-->
      </div>
      <!--end::Toolbar-->
      <div>
        <div
            id="history-open-all"
            class="btn btn-icon btn-active-color-primary d-xl-none w-30px h-30px w-md-35px h-md-35px"
        >
          <KTIcon icon-name="setting-4" icon-class="fs-2 fs-md-1 text-gray-800"/>
        </div>
        <div
            data-kt-drawer="true"
            data-kt-drawer-name="history-all"
            data-kt-drawer-activate="{default: true, xl: false}"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="225px"
            data-kt-drawer-toggle="#history-open-all"
            id="history-filter-all"
            class="app-table app-table-drawer d-flex flex-column flex-lg-row align-items-center justify-content-center"
        >
          <div v-if="selectedTab === 'All'">
            <div class="d-flex flex-column flex-xl-row align-items-center justify-content-center gap-4">
              <!--begin::Select wrapper-->
              <div class="w-xl-auto w-100">
                <!--begin::Select-->
                <Multiselect placeholder="Валюта" class="min-w-125px multiselect-history_custom"
                             infinite-scroll-immediate=""
                             v-model="selectedCurrencyAll.value" v-bind="selectedCurrencyAll"
                             @select="changeCurrencyAll" @click="changeCurrencyAll">
                  <template v-slot:singlelabel="{ value }">
                    <div class="multiselect-single-label d-flex gap-2 template_custom">
                      <img class="character-label-icon w-20px" :src="getAssetPath(`media/crypto/${value.value}.svg`)"
                           :alt="value.value">
                      <p class="my-0 text-gray-800">{{ value.value }}</p>
                    </div>
                  </template>
                  <template v-slot:option="{ option }">
                    <div class="d-flex justify-content-between w-100 ps-2 template_custom">
                      <div class="d-flex gap-2">
                        <img class="character-label-icon w-20px "
                             :src="getAssetPath(`media/crypto/${option.value}.svg`)"
                             :alt="option.value">
                        <p class="my-0 h-100 w-100 p-2">{{ option.value }}</p>
                      </div>
                    </div>
                  </template>
                </Multiselect>
              </div>
              <!--end::Select wrapper-->
              <!--begin::Select wrapper-->
              <div class="mw-210px w-100">
                <!--begin::Select-->
                <Multiselect placeholder="Тип" class="min-w-150px mw-250px multiselect-history_custom"
                             v-model="selectedTypeAll.value" v-bind="selectedTypeAll" @select="changeTypeAll"
                             @click="changeTypeAll">
                  <template v-slot:singlelabel="{ value }">
                    <p class="multiselect-single-label my-0 text-gray-800 template_custom">{{ value.value }}</p>
                  </template>
                  <template v-slot:option="{ option }">
                    <p class="my-0 h-100 w-100 p-2 fs-6 template_custom">{{ option.value }}</p>
                  </template>
                </Multiselect>
              </div>
              <!--end::Select wrapper-->
              <!--begin::Datepicker-->
              <el-date-picker
                  v-model="selectedDateAll"
                  type="daterange"
                  placeholder="Select a date"
                  :teleported="false"
                  name="dueDate"
                  class="datepicker ms-lg-0 datepicker_custom"
                  popper-class="datepicker-popup"
                  size="small"
                  :unlink-panels=true
                  @change="changeTimeAll"
              />
              <!--end::Datepicker-->
            </div>
          </div>
          <div v-if="selectedTab === 'Exchange'">
            <div
                class="app-table app-table-drawer"
            >
              <div class="d-flex flex-column flex-xl-row align-items-center justify-content-center gap-4">
                <!--begin::Select wrapper-->
                <div class="w-100">
                  <!--begin::Select-->
                  <Multiselect placeholder="Валюта" class="min-w-125px multiselect-history_custom"
                               v-model="selectedNameExchange.value" v-bind="selectedNameExchange"
                               @select="changeCurrencyExchange" @click="changeCurrencyExchange">
                    <template v-slot:singlelabel="{ value }">
                      <p class="multiselect-single-label my-0 text-gray-800 template_custom">{{ value.value }}</p>
                    </template>
                    <template v-slot:option="{ option }">
                      <p class="my-0 h-100 w-100 p-2 template_custom">{{ option.value }}</p>
                    </template>
                  </Multiselect>
                </div>
                <!--end::Select wrapper-->
                <!--begin::Select type-->
                <div class="w-100">
                  <Multiselect placeholder="Тип" class="min-w-150px multiselect-history_custom"
                               v-model="orderListExchange.value" v-bind="orderListExchange" @select="changeTypeExchange"
                               @click="changeTypeExchange">
                    <template v-slot:singlelabel="{ value }">
                      <p class="multiselect-single-label my-0 text-gray-800 template_custom">{{ value.name }}</p>
                    </template>
                    <template v-slot:option="{ option }">
                      <p class="my-0 h-100 w-100 p-2 template_custom">{{ option.name }}</p>
                    </template>
                  </Multiselect>
                </div>
                <!--end::Select type-->
                <!--begin::Select status-->
                <div class="mb-lg-0 w-xl-auto w-100">
                  <Multiselect placeholder="Статус" class="min-w-125px mw-250px multiselect-history_custom"
                               v-model="selectedDirectionExchange.value" v-bind="selectedDirectionExchange"
                               @click="changeDirectionExchange" @select="changeDirectionExchange">
                    <template v-slot:singlelabel="{ value }">
                      <p class="multiselect-single-label my-0 text-gray-800 template_custom">{{ value.name }}</p>
                    </template>
                    <template v-slot:option="{ option }">
                      <p class="my-0 h-100 w-100 p-2 template_custom">{{ option.name }}</p>
                    </template>
                  </Multiselect>
                </div>
                <!--end::Select status-->

                <!--begin::Datepicker-->
                <div class="w-210px">
                  <el-date-picker
                      v-model="selectedDateExchange"
                      type="daterange"
                      placeholder="Select a date"
                      :teleported="false"
                      name="dueDate"
                      class="datepicker ms-lg-0 datepicker_custom"
                      popper-class="datepicker-popup"
                      size="small"
                      :unlink-panels=true
                      @change="changeTimeExchange"
                  />
                </div>

                <!--end::Datepicker-->
              </div>
            </div>
          </div>
          <div v-if="selectedTab === 'P2P'">
            <div
                class="app-table app-table-drawer"
            >
              <div class="d-flex flex-column flex-xl-row align-items-center justify-content-center gap-4">
                <!--begin::Select status-->
                <div class="mw-200px w-100">
                  <!--begin::Select-->
                  <Multiselect placeholder="Статус" class="min-w-100px multiselect-history_custom"
                               v-model="statusListP2P.value" v-bind="statusListP2P" @select="changeP2PStatus"
                               @click="changeP2PStatus">
                    <template v-slot:singlelabel="{ value }">
                      <p class="multiselect-single-label my-0 text-gray-800 template_custom">{{ value.name }}</p>
                    </template>
                    <template v-slot:option="{ option }">
                      <p class="my-0 h-100 w-100 p-2 template_custom">{{ option.name }}</p>
                    </template>
                  </Multiselect>
                </div>
                <!--end::Select status-->
                <!--begin::Search-->
                <div class="d-flex align-items-center position-relative mw-200px w-100 w-xl-auto">
                  <KTIcon
                      icon-name="magnifier"
                      icon-class="fs-4 position-absolute ms-4"
                  />
                  <input
                      type="text"
                      v-model="search"
                      @input="searchItems()"
                      class="form-control fs-6 w-100 min-w-175px ps-12"
                      placeholder="Номер заказа"
                  />
                </div>
                <!--end::Search-->
              </div>
            </div>
          </div>
          <div v-if="selectedTab === 'Rcode'">
            <div class="d-flex flex-column flex-xl-row align-items-center justify-content-center gap-4">

              <!--begin::Select wrapper-->
              <div class="mw-200px w-100">
                <!--begin::Select-->
                <Multiselect placeholder="Валюта" class="min-w-125px multiselect-history_custom"
                             v-model="selectedCurrencyRCode.value" v-bind="selectedCurrencyAll"
                             @select="changeCurrencyRcode" @click="changeCurrencyRcode">
                  <template v-slot:singlelabel="{ value }">
                    <div class="multiselect-single-label d-flex gap-2 template_custom">
                      <img class="character-label-icon w-20px" :src="getAssetPath(`media/crypto/${value.value}.svg`)"
                           :alt="value.value">
                      <p class="my-0 text-gray-800">{{ value.value }}</p>
                    </div>
                  </template>
                  <template v-slot:option="{ option }">
                    <div class="d-flex justify-content-between w-100 ps-2 template_custom">
                      <div class="d-flex gap-2">
                        <img class="character-label-icon w-20px"
                             :src="getAssetPath(`media/crypto/${option.value}.svg`)"
                             :alt="option.value">
                        <p class="my-0 h-100 w-100 p-2">{{ option.value }}</p>
                      </div>
                    </div>
                  </template>
                </Multiselect>
              </div>
              <!--end::Select wrapper-->

              <!--begin::Select status-->
              <div class="mw-210px w-100">
                <!--begin::Select-->
                <Multiselect placeholder="Статус" class="min-w-200px w-100 multiselect-history_custom"
                             v-model="selectedStatusRcode.value" v-bind="selectedStatusRcode"
                             @select="changeStatusRcode" @click="changeStatusRcode">
                  <template v-slot:singlelabel="{ value }">
                    <p class="multiselect-single-label my-0 text-gray-800 template_custom">{{ value.name }}</p>
                  </template>
                  <template v-slot:option="{ option }">
                    <p class="my-0 h-100 w-100 p-2 template_custom">{{ option.name }}</p>
                  </template>
                </Multiselect>
              </div>
              <!--end::Select status-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <div id="hystory_content" class="tab-content">
        <div
            id="history-all"
            class="py-0 tab-pane fade active show"
            role="tabpanel"
        >
          <Datatable
              :data="tableDataAll"
              :total="tableInfoAll"
              :header="tableHeaderAll"
              :itemsPerPageDropdownEnabled="false"
              :checkbox-enabled="false"
              :itemsPerPage=10
              class="table-active-orders"
              :show-total-count="true"
              @page-change="onPageChangeAll"
          >
            <template v-slot:createTime="{ row: transactions }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ formatDate(transactions.createTime) }}
              </div>
            </template>
            <template v-slot:type="{ row: transactions }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                <span>{{ getType(transactions.type) }}</span>
              </div>
            </template>
            <template v-slot:currency="{ row: transactions }">
              <div class="d-flex text-gray-800 align-items-center justify-content-start">
                <div class="symbol symbol-20px me-2">
                  <img
                      :alt=transactions.symbol
                      :src="getAssetPath('media/crypto/'+ transactions.symbol + '.svg')"
                  />
                </div>

                {{ transactions.symbol }}
              </div>
            </template>
            <template v-slot:count="{ row: transactions }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ transactions.amount }}
              </div>
            </template>
            <template v-slot:commissions="{ row: transactions }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                {{ transactions.fee }}
              </div>
            </template>
            <template v-slot:sale="{ row: transactions }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                {{ transactions.discountFee }}
              </div>
            </template>
            <template v-slot:total="{ row: transactions }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                {{ transactions.realFee }}
              </div>
            </template>
            <template v-slot:status="{ row: transactions }">
              <div class="d-flex flex-column justify-content-center">
                <div v-if="transactions.status === 'Успешно'">
                  <span class="badge badge-light-success badge-lg">{{ $t('status.success') }}</span>
                </div>
                <div v-else>
                  <span class="badge badge-light-danger badge-lg">{{ $t('status.cancel') }}</span>
                </div>
              </div>
            </template>
          </Datatable>
        </div>
        <div
            id="history-exchange"
            class="py-0 tab-pane fade"
            role="tabpanel"
        >
          <Datatable
              :data="tableDataExchanges"
              :total="tableInfoExchanges"
              :header="tableHeaderExchange"
              :itemsPerPageDropdownEnabled="false"
              :checkbox-enabled="false"
              :itemsPerPage=10
              class="table-active-orders"
              :show-total-count="true"
              @page-change="onPageChangeExchanges"
          >
            <template v-slot:index="{ row: exchanges }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ filteredDataExchanges.indexOf(exchanges) + 1 }}
              </div>
            </template>
            <template v-slot:time="{ row: exchanges }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ formatDate(exchanges.time) }}
              </div>
            </template>
            <template v-slot:name="{ row: exchanges }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ exchanges.symbol }}
              </div>
            </template>
            <template v-slot:type="{ row: exchanges }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                <div v-if="exchanges.type === 'LIMIT_PRICE'">
                  <span class="badge badge-lg">Лимитный</span>
                </div>
                <div v-else>
                  <span class="badge badge-lg">Безлимитный</span>
                </div>
              </div>
            </template>
            <template v-slot:direction="{ row: exchanges }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                <div v-if="exchanges.direction === 'SELL'">
                  <span class="badge badge-light-danger badge-lg w-100px justify-content-center">{{
                      $t('history.sell')
                    }}</span>
                </div>
                <div v-else>
                  <span class="badge badge-light-success badge-lg w-100px justify-content-center">{{
                      $t('history.buy')
                    }}</span>
                </div>
              </div>
            </template>
            <template v-slot:price="{ row: exchanges }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ exchanges.price }}
              </div>
            </template>
            <template v-slot:volume="{ row: exchanges }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                {{ exchanges.volume }}
              </div>
            </template>
            <template v-slot:done="{ row: exchanges }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                {{ exchanges.done }}
              </div>
            </template>
            <template v-slot:status="{ row: exchanges }">
              <div class="d-flex justify-content-end">
                <div v-if="exchanges.status === 'Успешно'">
                  <span class="badge badge-light-success badge-lg">{{ $t('status.success') }}</span>
                </div>
                <div v-else>
                  <span class="badge badge-light-danger badge-lg">{{ $t('status.cancel') }}</span>
                </div>
              </div>
            </template>
          </Datatable>
        </div>
        <div
            id="history-p2p"
            class="py-0 tab-pane fade"
            role="tabpanel"
        >
          <Datatable
              :data="tableDataP2P"
              :total="tableInfoP2P"
              :header="tableHeaderP2P"
              :itemsPerPageDropdownEnabled="false"
              :checkbox-enabled="false"
              :itemsPerPage=10
              class="table-active-orders"
              :show-total-count="true"
              @page-change="onPageChangeP2P"
          >
            <template v-slot:number="{ row: deals }">
              <div class="d-flex text-primary flex-column justify-content-center">
                {{ deals.orderSn }}
              </div>
            </template>
            <template v-slot:createTime="{ row: deals }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ formatDate(deals.createTime) }}
              </div>
            </template>
            <template v-slot:advertiseType="{ row: deals }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                <div v-if="deals.advertiseType === 0">
                  <span class="badge badge-light-success badge-lg w-100px justify-content-center">{{
                      getType(deals.advertiseType)
                    }}</span>
                </div>
                <div v-else-if="deals.advertiseType === 1">
                  <span class="badge badge-light-danger badge-lg w-100px justify-content-center">{{
                      getType(deals.advertiseType)
                    }}</span>
                </div>
              </div>
            </template>
            <template v-slot:customerName="{ row: deals }">
              <div class="d-flex text-primary flex-column justify-content-center">
                {{ deals.customerName }}
              </div>
            </template>
            <template v-slot:balance="{ row: deals }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ numberFormatting(deals.money) }}
              </div>
            </template>
            <template v-slot:fiat="{ row: deals }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                {{ deals.amount }}
              </div>
            </template>
            <template v-slot:status="{ row: deals }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                <div v-if="deals.status === 2 || deals.status === 3">
                  <span class="badge badge-light-success badge-lg w-100px justify-content-center">{{
                      getStatusP2P(deals.status)
                    }}</span>
                </div>
                <div v-else-if="deals.status === 4">
                  <span class="badge badge-light-warning badge-lg w-100px justify-content-center">{{
                      getStatusP2P(deals.status)
                    }}</span>
                </div>
                <div v-else-if="deals.status === 0 || deals.status === 1">
                  <span class="badge badge-light-danger badge-lg w-100px justify-content-center">{{
                      getStatusP2P(deals.status)
                    }}</span>
                </div>
              </div>
            </template>
          </Datatable>
        </div>
        <div
            id="history-rcode"
            class="py-0 tab-pane fade"
            role="tabpanel"
        >
          <Datatable
              :data="tableDataRcode"
              :total="tableInfoRcode"
              :header="tableHeaderRcode"
              :itemsPerPageDropdownEnabled="false"
              :checkbox-enabled="false"
              :itemsPerPage=10
              class="table-active-orders"
              :show-total-count="true"
              @page-change="onPageChangeRcode"
          >
            <template v-slot:createTime="{ row: rcodes }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ formatDate(rcodes.createTime) }}
              </div>
            </template>
            <template v-slot:unit="{ row: rcodes }">
              <div class="d-flex align-items-center">
                <div class="me-2 position-relative">
                  <div class="symbol symbol-20px">
                    <img
                        :alt=rcodes.unit
                        :src="getAssetPath('media/crypto/'+ rcodes.unit + '.svg')"
                    />
                  </div>
                </div>
                <div class="d-flex text-gray-800 flex-column justify-content-center">
                  {{ rcodes.unit }}
                </div>
              </div>
            </template>
            <template v-slot:price="{ row: rcodes }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ rcodes.amount }}
              </div>
            </template>
            <template v-slot:currency="{ row: rcodes }">
              <div class="d-flex align-items-center">
                <div class="me-2 position-relative">
                  <div class="symbol symbol-15px">
                    <img
                        :alt=rcodes.currency
                        :src="getAssetPath('media/crypto/'+ rcodes.currency + '.svg')"
                    />
                  </div>
                </div>
                <div class="d-flex text-gray-800 flex-column justify-content-center">
                  {{ rcodes.currency }}
                </div>
              </div>
            </template>
            <template v-slot:code="{ row: rcodes }">
              <div class="d-flex text-gray-600 align-items-center position-relative">
                <span>{{ maskText(rcodes.withdrawCode) }}</span>
                <el-popover
                    placement="top"
                    :trigger="['click', 'hover']"
                    :content=rcodes.withdrawCode
                    popper-class="w-auto tooltip-history"
                >
                  <template #reference>
                    <button class="btn btn-light btn-icon btn-sm btn-history ms-4">
                      <i class="ki-solid fs-6 ki-eye"></i>
                    </button>
                  </template>
                </el-popover>
                <button
                    :data-clipboard-text="rcodes.withdrawCode"
                    id="copyButton" @click="copyToClipboard"
                    class="btn btn-light btn-icon btn-sm btn-history ms-2"
                >
                  <i class="ki-solid ki-copy fs-6"></i>
                </button>
              </div>
            </template>
            <template v-slot:status="{ row: rcodes }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                <div v-if="rcodes.status === 0">
                  <span class="badge badge-light-primary badge-lg w-115px justify-content-center"
                        style="color: #2884EF">{{ getTypeRCode(rcodes.status) }}</span>
                </div>
                <div v-else-if="rcodes.status === 1">
                  <span class="badge badge-light-warning badge-lg w-115px">{{ getTypeRCode(rcodes.status) }}</span>
                </div>
                <div v-else-if="rcodes.status === 2">
                  <span class="badge badge-light-warning badge-lg w-115px">{{ getTypeRCode(rcodes.status) }}</span>
                </div>
                <div v-else-if="rcodes.status === 3">
                  <span class="badge badge-light-success badge-lg w-115px justify-content-center"
                        style="color: #47BE7D">{{ getTypeRCode(rcodes.status) }}</span>
                </div>
                <div v-else-if="rcodes.status === 4">
                  <span class="badge badge-light-danger badge-lg">{{ getTypeRCode(rcodes.status) }}</span>
                </div>
                <div v-else>
                  <span class="badge badge-light badge-lg">{{ $t('status.noResult') }}</span>
                </div>
              </div>
            </template>
          </Datatable>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, ref, reactive, computed} from "vue";
import Datatable from "@/components/record-table/RecordTable.vue";
import type {IExchanges} from "@/core/data/exchange";
import Multiselect from '@vueform/multiselect';
import ClipboardJS from "clipboard";
import {ElMessage} from 'element-plus';
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    Multiselect,
  },
  data() {
    return {}
  },
  setup() {
    const {t} = useI18n();
    const tableHeaderAll = computed(() => ([
      {
        columnName: t('history.time'),
        columnLabel: "createTime",
        sortEnabled: false,
      },
      {
        columnName: t('history.type'),
        columnLabel: "type",
        sortEnabled: false,
      },
      {
        columnName: t('history.currency'),
        columnLabel: "currency",
        sortEnabled: false,
      },
      {
        columnName: t('history.total'),
        columnLabel: "count",
        sortEnabled: false,
      },
      {
        columnName: t('history.commission'),
        columnLabel: "commissions",
        sortEnabled: false,
      },
      // {
      //   columnName: t('history.status'),
      //   columnLabel: "status",
      //   sortEnabled: false,
      // },
    ]));
    const tableHeaderExchange = computed(() => ([
      {
        columnName: "#",
        columnLabel: "index",
        sortEnabled: false,
      },
      {
        columnName: t('history.time'),
        columnLabel: "time",
        sortEnabled: false,
      },
      {
        columnName: t('history.pair'),
        columnLabel: "name",
        sortEnabled: false,
      },
      {
        columnName: t('history.typeOrder'),
        columnLabel: "type",
        sortEnabled: false,
      },
      {
        columnName: t('history.direction'),
        columnLabel: "direction",
        sortEnabled: false,
      },
      {
        columnName: t('history.price'),
        columnLabel: "price",
        sortEnabled: false,
      },
      {
        columnName: t('history.volume'),
        columnLabel: "volume",
        sortEnabled: false,
      },
      {
        columnName: t('history.done'),
        columnLabel: "done",
        sortEnabled: false,
      },
      {
        columnName: t('history.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
    ]));
    const tableHeaderP2P = computed(() => ([
      {
        columnName: t('history.number'),
        columnLabel: "number",
        sortEnabled: false,
      },
      {
        columnName: t('history.timeCreate'),
        columnLabel: "createTime",
        sortEnabled: false,
      },
      {
        columnName: t('history.type'),
        columnLabel: "advertiseType",
        sortEnabled: false,
      },
      {
        columnName: t('history.seller'),
        columnLabel: "customerName",
        sortEnabled: false,
      },
      {
        columnName: t('history.balance'),
        columnLabel: "balance",
        sortEnabled: false,
      },
      {
        columnName: t('history.fiat'),
        columnLabel: "fiat",
        sortEnabled: false,
      },
      {
        columnName: t('history.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
    ]));
    const tableHeaderRcode = computed(() => ([
      {
        columnName: t('history.time'),
        columnLabel: "createTime",
        sortEnabled: false,
      },
      {
        columnName: t('history.currency'),
        columnLabel: "unit",
        sortEnabled: false,
      },
      {
        columnName: t('history.total'),
        columnLabel: "price",
        sortEnabled: false,
      },
      {
        columnName: t('history.code'),
        columnLabel: "code",
        sortEnabled: false,
      },
      {
        columnName: t('history.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
    ]));

    const tableDataAll = ref([]);
    const tableInfoAll = ref(0);
    const tableAllCurrency = ref('');
    const tableAllType = ref();
    const tableAllStartTime = ref();
    const tableAllEndTime = ref();

    const tableDataExchanges = ref([]);
    const tableInfoExchanges = ref(0);
    const tableExchangeCurrency = ref('');
    const tableExchangeType = ref('');
    const tableExchangeDirection = ref<number>();
    const tableExchangeStartTime = ref();
    const tableExchangeEndTime = ref();

    const tableDataP2P = ref([]);
    const tableInfoP2P = ref(0);
    const tableP2PStatus = ref([0, 2]);

    const tableDataRcode = ref([]);
    const tableInfoRcode = ref(0);
    const tableRcodeCurrency = ref('');
    const tableRcodeStatus = ref('');

    const search = ref<string>("");
    const selectedTab = ref('All');
    const selectedDateAll = ref('');
    const selectedNameExchange = ref({
      value: "",
      options: ['USDT/RUB', 'USDC/RUB', 'BUSD/RUB'],
    });
    const selectedDateExchange = ref('');
    const statusListP2P = ref({
      value: "",
      options: [
        {
          name: 'Выполнено',
          value: 2
        },
        {
          name: 'Отменено',
          value: 0
        },
      ],
    });
    const selectedCurrencyRCode = ref({
      value: "",
      options: [],
    });
    const selectedStatusRcode = ref({
      value: "",
      options: [
        {
          name: 'Не использован',
          value: 'PROCESSING'
        },
        {
          name: 'Зачислен',
          value: 'SUCCESS'
        },
      ]
    });
    const selectedCurrencyAll = ref({
      value: "",
      options: [],
    });
    const selectedTypeAll = ref({
      value: "",
      options: ["Пополнение", "Вывод", "Торговля"
        , "P2P торговля", "Реферальная выплата", "Пополнение админом", "Создание rCode", "Зачисление rCode", "Пополнение фиатом", "Вывод фиатом", "AML проверка"],
    });
    const currencyAllList = ref([]);
    const orderListExchange = ref({
      value: "",
      options: [
        {
          name: 'Лимитный',
          value: 'LIMIT_PRICE'
        },
        {
          name: 'Безлимитный',
          value: 'MARKET_PRICE'
        },
      ]
    });
    const selectedDirectionExchange = ref({
      value: "",
      options: [
        {
          name: 'Продать',
          value: 1
        },
        {
          name: 'Купить',
          value: 0
        },
      ]
    });
    const showText = reactive({});

    return {
      tableDataAll,
      tableInfoAll,
      tableAllCurrency,
      tableAllType,
      tableAllStartTime,
      tableAllEndTime,
      tableDataExchanges,
      tableInfoExchanges,
      tableExchangeType,
      tableExchangeDirection,
      tableExchangeStartTime,
      tableExchangeEndTime,
      tableDataP2P,
      tableInfoP2P,
      tableDataRcode,
      tableInfoRcode,
      tableRcodeCurrency,
      tableRcodeStatus,
      tableHeaderAll,
      tableHeaderExchange,
      tableExchangeCurrency,
      tableHeaderP2P,
      tableP2PStatus,
      tableHeaderRcode,
      getAssetPath,
      selectedCurrencyAll,
      selectedCurrencyRCode,
      selectedTypeAll,
      selectedDateAll,
      selectedNameExchange,
      selectedDateExchange,
      currencyAllList,
      orderListExchange,
      selectedDirectionExchange,
      selectedStatusRcode,
      statusListP2P,
      selectedTab,
      search,
      showText,
    };
  },

  computed: {
    filteredDataExchanges(): IExchanges[] {
      const {selectedNameExchange, orderListExchange, selectedDirectionExchange, selectedDateExchange} = this;
      let filtered = this.tableDataExchanges;
      if (selectedNameExchange.value) {
        filtered = filtered.filter((exchange: any) => exchange.symbol === selectedNameExchange.value);
      }
      if (orderListExchange.value) {
        filtered = filtered.filter((exchange: any) => exchange.type === orderListExchange.value);
      }
      if (selectedDirectionExchange.value) {
        filtered = filtered.filter((exchange: any) => exchange.direction === selectedDirectionExchange.value);
      }
      if (selectedDateExchange) {
        const startDate = new Date(selectedDateExchange[0]).getTime();
        const endDate = new Date(selectedDateExchange[1]).getTime();
        filtered = filtered.filter((exchange: any) => {
          return new Date(exchange.time).getTime() >= startDate && new Date(exchange.time).getTime() <= endDate;
        });
      }
      return filtered;
    },
  },

  methods: {
    async getDataList(page) {
      let formData = new FormData();
      formData.append("pageNo", page);
      formData.append("pageSize", "10");
      formData.append("symbol", this.tableAllCurrency);
      formData.append("type", this.tableAllType || this.tableAllType == 0 ? this.tableAllType : '');
      formData.append("startTime", this.tableAllStartTime ? this.tableAllStartTime : '');
      formData.append("endTime", this.tableAllEndTime ? this.tableAllEndTime : '');
      let response = await ApiService.post(Api.uc.history, formData);
      this.tableDataAll = response.data.data.content;
      this.tableInfoAll = response.data.data.totalElements;
    },
    getDataCoin() {
      ApiService.post(Api.uc.coinFull, "").then(response => {
        this.selectedCurrencyAll.options = response.data.data.coin.map(coin => coin.unit);
      })
    },
    getEntrustHistory(page) {
      let formData = new FormData();
      formData.append("pageNo", page);
      formData.append("pageSize", "10");
      formData.append("symbol", this.tableExchangeCurrency);
      formData.append("type", this.tableExchangeType);
      formData.append("startTime", this.tableExchangeStartTime ? this.tableExchangeStartTime : '');
      formData.append("endTime", this.tableExchangeEndTime ? this.tableExchangeEndTime : '');
      if (this.tableExchangeDirection || this.tableExchangeDirection === 0) {
        //@ts-ignore
        formData.append("direction", this.tableExchangeDirection);
      }
      ApiService.post(Api.exchange.entrustHistory, formData).then(response => {
        this.tableDataExchanges = response.data.data.content;
        this.tableInfoExchanges = response.data.data.totalElements;
      }).catch(response => {
        ElMessage.error(response.message)
      });
    },
    getMyOrder(page) {
      let formData = new FormData();
      let status: number[] = this.tableP2PStatus;
      status.forEach(item => formData.append("status[]", `${item}`));
      formData.append("pageNo", page);
      formData.append("pageSize", "10");
      formData.append("orderSn", this.search);
      ApiService.post(Api.otc.myOrder, formData).then(response => {
        this.tableDataP2P = response.data.data.content;
        this.tableInfoP2P = response.data.data.totalElements;
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    },
    getDataRCode(page) {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("pageSize", "10");
      formData.append("unit", this.tableRcodeCurrency);
      formData.append("status", this.tableRcodeStatus);
      ApiService.post(Api.uc.withdrawCode, formData).then(response => {
        this.tableDataRcode = response.data.data.content;
        this.tableInfoRcode = response.data.data.totalElements;
      }).catch(response => {
        ElMessage.error(response.data.message);
      });
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Moscow',
      }).format(new Date(date));
    },
    changeTab(tabName) {
      this.selectedTab = tabName;
      this.$router.push({query: {name: tabName}});
      this.$route.query.name = tabName;
    },
    currentTab() {
      setTimeout(() => {
        if (this.$route.query.name) {
          let button = document.getElementById(`${this.$route.query.name}`) as HTMLElement;
          button?.click();
        }
      })
    },
    copyToClipboard() {
      const clipboard = new ClipboardJS('#copyButton');
      clipboard.on('success', () => {
        clipboard.destroy();
        ElMessage.success('Copied to clipboard')
      });
      clipboard.on('error', () => {
        clipboard.destroy();
        ElMessage.error('Failed to copy to clipboard')
      });
    },
    maskText(text) {
      const masked = text;
      return masked.slice(0, 3) + '...' + masked.slice(-3);
    },
    getNumberRCode(string: string) {
      switch (string) {
        case 'Не зачислен':
          return 0;
        case 'Ожидание':
          return 1;
        case 'Ошибка':
          return 2;
        case 'Зачислен':
          return 3;
        case 'Отмена пользователем':
          return 4;
      }
    },
    getTypeRCode(number: number) {
      return number === 0 ? "Не зачислен" : number === 1 ? "Ожидание" : number === 2 ? "Ошибка" : number === 3 ? "Зачислен"
          : number === 4 ? "Отмена пользователем" : number
    },

    getNumber(string: string) {
      switch (string) {
        case 'Пополнение':
          return 0;
        case 'Вывод':
          return 1;
        case 'Торговля':
          return 3;
        case 'P2P торговля':
          return 4;
        case 'Реферальная выплата':
          return 7;
        case 'Пополнение админом':
          return 10;
        case 'Создание rCode':
          return 17;
        case 'Зачисление rCode':
          return 18;
        case 'Пополнение фиатом':
          return 25;
        case 'Вывод фиатом':
          return 26;
        case 'AML проверка':
          return 27;
      }
    },
    getType(number: number) {
      return number === 0 ? "Пополнение" : number === 1 ? "Вывод" : number === 3 ? "Торговля"
          : number === 4 ? "P2P торговля" : number === 7 ? "Реферальная выплата"
              : number === 10 ? "Пополнение админом" : number === 17 ? "Создание rCode" : number === 18 ? "Зачисление rCode" : number === 25 ? "Пополнение фиатом" : number === 26 ? "Вывод фиатом" : number === 27 ? "AML проверка"
                  : number;
    },
    getStatusP2P(number: number) {
      return number === 0 ? "Отменено" : number === 2 ? "Выполнено" : number;
    },
    getNumberStatusP2P(string: string) {
      switch (string) {
        case 'Отменено':
          return 0;
        case 'Выполнено':
          return 3;
      }
    },
    numberFormatting(number) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: 2}).format(number);
    },
    getStatusOrder(status) {
      return status === 0 ? "Отменено" : status === 1 ? "Неоплачено" : status === 2 ? "Оплачено" : status === 3 ? "Выполнено" : status === 4 ? "Арбитраж" : "";
    },
    onPageChangeAll(page) {
      this.getDataList(page);
    },
    onPageChangeRcode(page) {
      this.getDataRCode(page);
    },
    onPageChangeP2P(page) {
      this.getMyOrder(page);
    },
    onPageChangeExchanges(page) {
      this.getEntrustHistory(page);
    },
    changeCurrencyAll() {
      if (this.selectedCurrencyAll.value) {
        this.tableAllCurrency = this.selectedCurrencyAll.value;
        this.getDataList("1");
      } else {
        this.tableAllCurrency = "";
        this.getDataList("1");
      }
    },
    changeTypeAll() {
      if (this.selectedTypeAll.value) {
        this.tableAllType = this.getNumber(this.selectedTypeAll.value);
        this.getDataList("1");
      } else {
        this.tableAllType = "";
        this.getDataList("1");
      }
    },
    changeTimeAll: function () {
      if (this.selectedDateAll) {
        let startDate = new Date(this.selectedDateAll[0]);
        let endDate = new Date(this.selectedDateAll[1]);
        this.tableAllStartTime = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        this.tableAllEndTime = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
        this.getDataList("1");
      } else {
        this.tableAllStartTime = "";
        this.tableAllEndTime = "";
        this.getDataList("1");
      }
    },
    changeCurrencyExchange() {
      if (this.selectedNameExchange.value) {
        this.tableExchangeCurrency = this.selectedNameExchange.value;
        this.getEntrustHistory("1");
      } else {
        this.tableExchangeCurrency = "";
        this.getEntrustHistory("1");
      }
    },
    changeTypeExchange() {
      if (this.orderListExchange.value) {
        this.tableExchangeType = this.orderListExchange.value;
        this.getEntrustHistory("1");
      } else {
        this.tableExchangeType = "";
        this.getEntrustHistory("1");
      }
    },
    changeTimeExchange: function () {
      if (this.selectedDateExchange) {
        this.tableExchangeStartTime = new Date(this.selectedDateExchange[0]).getTime();
        this.tableExchangeEndTime = new Date(this.selectedDateExchange[1]).getTime();
        this.getEntrustHistory("1");
      } else {
        this.tableExchangeStartTime = "";
        this.tableExchangeEndTime = "";
        this.getEntrustHistory("1");
      }
    },
    changeDirectionExchange() {
      //@ts-ignore
      if (this.selectedDirectionExchange.value || this.selectedDirectionExchange.value === 0) {
        //@ts-ignore
        this.tableExchangeDirection = this.selectedDirectionExchange.value;
        this.getEntrustHistory("1");
      } else {
        //@ts-ignore
        this.tableExchangeDirection = "";
        this.getEntrustHistory("1");
      }
    },
    changeCurrencyRcode() {
      if (this.selectedCurrencyRCode.value) {
        this.tableRcodeCurrency = this.selectedCurrencyRCode.value;
        this.getDataRCode("0");
      } else {
        this.tableRcodeCurrency = "";
        this.getDataRCode("0");
      }
    },
    changeStatusRcode() {
      if (this.selectedStatusRcode.value) {
        this.tableRcodeStatus = this.selectedStatusRcode.value;
        this.getDataRCode("1");
      } else {
        this.tableRcodeStatus = "";
        this.getDataRCode("0");
      }
    },
    changeP2PStatus() {
      //@ts-ignore
      if (this.statusListP2P.value || this.statusListP2P.value === 0) {
        this.tableP2PStatus = [Number(this.statusListP2P.value)];
        this.getMyOrder("0");
      } else {
        this.tableRcodeStatus = "";
        this.tableP2PStatus = [0, 2];
        this.getMyOrder("0");
      }
    },
    searchItems() {
      setTimeout(() => {
        this.getMyOrder("0");
      }, 1000);
    },
    init() {
      ApiService.setHeader();
      this.getDataList("1");
      this.getEntrustHistory("1");
      this.getMyOrder("0");
      this.getDataRCode("0");
      this.currentTab();
    },
  },
  created() {
    this.init();
    this.getDataCoin();
  },
  watch: {
    $route() {
      this.currentTab()
    }
  },
});
</script>
<style lang="scss">
.multiselect-options {
  overflow-y: auto;
}

.multiselect-history_custom {
  .multiselect-options {
    padding: 7px 4px !important;
    border: none;
    margin-top: 0;
  }

  .multiselect-option {
    min-height: auto;
    padding: 1px 4px !important;
    background: #ffffff !important;
    color: rgb(126, 130, 153);
  }

  .multiselect-option.is-selected {
    background: #ffffff !important;
    padding: 1px 4px !important;

    .template_custom {
      color: var(--bs-primary);
      background-color: var(--bs-primary-light) !important;
      border-radius: 0.475rem;
    }
  }

  .multiselect-option.is-pointed {
    background: #ffffff !important;
    padding: 1px 4px !important;

    .template_custom {
      color: var(--bs-primary);
      background-color: var(--bs-primary-light) !important;
      border-radius: 0.475rem;
    }
  }

  .multiselect-option.is-selected.is-pointed {
    padding: 1px 4px !important;
    background: #ffffff !important;

    .template_custom {
      color: var(--bs-primary);
      background-color: var(--bs-primary-light) !important;
      border-radius: 0.475rem;
    }
  }

  .multiselect-placeholder {
    color: #7E8299;
  }
}

.nav-line-tabs .nav-item .nav-link.active, .nav-line-tabs .nav-item.show .nav-link, .nav-line-tabs .nav-item .nav-link:hover:not(.disabled) {
  border-bottom: 2px solid var(--bs-primary);
}

.w-115px {
  width: 115px !important;
}

.datepicker_custom {
  max-height: 40px !important;
  height: 40px !important;
  box-shadow: none !important;
}
</style>