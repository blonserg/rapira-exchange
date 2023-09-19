<template>
  <div class="table-responsive">
    <table
      :class="[loading && 'overlay overlay-block']"
      class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
    >
      <TableHeadRow
        @onSort="onSort"
        @onSelect="selectAll"
        :checkboxEnabledValue="check"
        :checkboxEnabled="checkboxEnabled"
        :sort-label="sortLabel"
        :sort-order="sortOrder"
        :header="header"
      />
      <TableBodyRow
        v-if="data.length !== 0"
        @onSelect="itemsSelect"
        :currentlySelectedItems="selectedItems"
        :data="data"
        :header="header"
        :checkbox-enabled="checkboxEnabled"
        :checkbox-label="checkboxLabel"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
          <slot :name="name" :row="item" />
        </template>
      </TableBodyRow>
      <template v-if="!isAuthenticated">
        <tr class="odd">
          <td colspan="9" class="dataTables_empty text-center">
            <div class="my-3">
              <a
                  class="fs-6 fw-bold cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#login-modal"
              >
                <span class="text-primary">{{ $t('exchange.login') }}</span>
              </a>
                {{ $t('exchange.or') }}
              <a
                  class="fs-6 fw-bold cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#register-modal"
              >
                <span class="text-primary">{{ $t('exchange.register') }}</span>
              </a>
            </div>
          </td>
        </tr>
      </template>
      <template v-if="data.length === 0 && isAuthenticated">
        <tr class="odd">
          <td colspan="9" class="dataTables_empty text-center">
            <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_501_21354)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.97656 3.5H29.2519V14.5466C29.2519 18.6887 32.6097 22.0466 36.7519 22.0466H47.9766V28.9966C49.0423 29.3068 50.0492 29.7551 50.9766 30.3208V20.5466L30.7519 0.5H6.97656C3.66285 0.5 0.976562 3.18629 0.976562 6.5V54.5C0.976562 57.8137 3.66285 60.5 6.97656 60.5H44.9766C48.2903 60.5 50.9766 57.8137 50.9766 54.5V51.6792C50.0492 52.2449 49.0423 52.6932 47.9766 53.0034V54.5C47.9766 56.1569 46.6335 57.5 44.9766 57.5H6.97656C5.31971 57.5 3.97656 56.1568 3.97656 54.5V6.5C3.97656 4.84315 5.31971 3.5 6.97656 3.5ZM45.2017 19.0466L32.2519 6.21078V14.5466C32.2519 17.0318 34.2666 19.0466 36.7519 19.0466H45.2017Z" fill="#B3D2F1"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5879 27.0505H37.5879V29.4505H11.5879V27.0505ZM34.8296 33.0505H11.5879V35.4505H33.2729C33.7002 34.5896 34.2238 33.7849 34.8296 33.0505ZM21.5879 39.0505H11.5879V41.4505H21.5879V39.0505Z" fill="#D9E8F8"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M44.4766 48.5C48.6187 48.5 51.9766 45.1421 51.9766 41C51.9766 36.8579 48.6187 33.5 44.4766 33.5C40.3345 33.5 36.9766 36.8579 36.9766 41C36.9766 45.1421 40.3345 48.5 44.4766 48.5ZM44.4766 51.5C50.2756 51.5 54.9766 46.799 54.9766 41C54.9766 35.201 50.2756 30.5 44.4766 30.5C38.6776 30.5 33.9766 35.201 33.9766 41C33.9766 46.799 38.6776 51.5 44.4766 51.5Z" fill="#408EDD"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M49.5272 47.4393C50.113 46.8536 51.0627 46.8536 51.6485 47.4393L60.1485 55.9393C60.7343 56.5251 60.7343 57.4749 60.1485 58.0607C59.5627 58.6464 58.613 58.6464 58.0272 58.0607L49.5272 49.5607C48.9414 48.9749 48.9414 48.0251 49.5272 47.4393Z" fill="#408EDD"/>
              </g>
              <defs>
                <clipPath id="clip0_501_21354">
                  <rect width="60" height="60" fill="white" transform="translate(0.976562 0.5)"/>
                </clipPath>
              </defs>
            </svg>
            <div class="text-gray-500">Нет результатов</div>
          </td>
        </tr>
      </template>
      <Loading v-if="loading" />
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import TableHeadRow from "@/components/kt-datatable/table-partials/table-content/table-head/TableHeadRow.vue";
import TableBodyRow from "@/components/kt-datatable/table-partials/table-content/table-body/TableBodyRow.vue";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import {useAuthStore} from "@/stores/auth";

export default defineComponent({
  name: "table-body",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    emptyTableText: { type: String, default: "Нет доступной информации" },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    loading: { type: Boolean, required: false, default: false },
  },
  emits: ["on-sort", "on-items-select"],
  components: {
    TableHeadRow,
    TableBodyRow,
    Loading,
  },
  setup(props, { emit }) {
    const selectedItems = ref<Array<unknown>>([]);
    const allSelectedItems = ref<Array<unknown>>([]);
    const check = ref<boolean>(false);
    const isAuthenticated = useAuthStore().isAuthenticated;

    watch(
      () => props.data,
      () => {
        selectedItems.value = [];
        allSelectedItems.value = [];
        check.value = false;
        // eslint-disable-next-line
        props.data.forEach((item: any) => {
          if (item[props.checkboxLabel]) {
            allSelectedItems.value.push(item[props.checkboxLabel]);
          }
        });
      }
    );

    // eslint-disable-next-line
    const selectAll = (checked: any) => {
      check.value = checked;
      if (checked) {
        selectedItems.value = [
          ...new Set([...selectedItems.value, ...allSelectedItems.value]),
        ];
      } else {
        selectedItems.value = [];
      }
    };

    //eslint-disable-next-line
    const itemsSelect = (value: any) => {
      selectedItems.value = [];
      //eslint-disable-next-line
      value.forEach((item:any) => {
        if (!selectedItems.value.includes(item)) selectedItems.value.push(item);
      });
    };

    const onSort = (sort: Sort) => {
      emit("on-sort", sort);
    };

    watch(
      () => [...selectedItems.value],
      (currentValue) => {
        if (currentValue) {
          emit("on-items-select", currentValue);
        }
      }
    );

    onMounted(() => {
      selectedItems.value = [];
      allSelectedItems.value = [];
      check.value = false;
      // eslint-disable-next-line
      props.data.forEach((item: any) => {
        if (item[props.checkboxLabel]) {
          allSelectedItems.value.push(item[props.checkboxLabel]);
        }
      });
    });

    return {
      onSort,
      selectedItems,
      selectAll,
      itemsSelect,
      check,
      isAuthenticated,
    };
  },
});
</script>
