<template>
   <div style="padding:10px 0px;">
       <div class="table_container">
         <DataTable :rows="rows" :columns="columns" :config="config" :dtName="'earnList'">
           <template slot="actionpnl"  slot-scope="props">
                 <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["transactionId"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                      </div>
            </template>
            <template slot="paginataion-previous-button">
                <i class="fa fa-arrow-left" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
            <template slot="paginataion-next-button">
                <i class="fa fa-arrow-right" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
          
            <template slot="datecreateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["created"]) }}</div>
            </template>
            <template slot="isDebtSlot"  slot-scope="props">
               <div v-if="props.row['isDebt']">Send</div>
               <div v-else>Receive</div>
            </template>
         </DataTable>
       </div>
   </div>
</template>

<script>
import DataTable from "@/components/DataTable/DataTable.vue";
import moment from "moment";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Vue from "vue";
export default {
  name: "MechnatPointsIndex",
  props: ["merchantid"],
  components: {
    DataTable
  },
  data: function() {
    return {
      rows: [],
      columns: [
        {
          label: "Date Created",
          name: "created",
          slot_name: "datecreateSlot",
              filter: {
            type: "simple",
            placeholder: "Date Created",
            showClearButton: false
          }
        },
        {
          label: "Type",
          name: "isDebt",
          slot_name: "isDebtSlot",
                    filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Points",
          name: "points",
                    filter: {
            type: "simple",
            placeholder: "Points",
            showClearButton: false
          }
        },
        {
          label: "Source Account",
          name: "sourceAccount",
                    filter: {
            type: "simple",
            placeholder: "Source Account",
            showClearButton: false
          }
        },
        {
          label: "Target Account",
          name: "targetAccount",
                    filter: {
            type: "simple",
            placeholder: "Target Account",
            showClearButton: false
          }
        },
         {
          label: "Action",
          name: "action",
          slot_name: "actionpnl"
        }
      ],
      config: {
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 10,
        global_search: {
          visibility: false
        }
      }
    };
  },
   provide:function(){
    return{
      handlePageSelected: this.handlePageSelected,
            updatedfilter:this.updatedfilter

    }
  },
  methods: {
     updatedfilter(payload){
},

    handlePageSelected(dtName,value){
},
    loadmerchantpoints() {
      var cache_obj = this;
      var dataobj = {
       
        partnerId:this.merchantid
      };
      this.$store
        .dispatch("merchant/viewpoints", this.merchantid)
        .then(function(res) {
          cache_obj.rows = res.data;
        });
    },
    handleViewItem(id) {
      let path = `/managetransfer/?action=view&transfer=${id}`;
      Vue.router.push({ path: path });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    },
  },
  created() {
     let cache_obj=this;
        cache_obj.partnerId  = this.$store.getters["account/getuserid"];
    this.loadmerchantpoints();
  }
};
</script>

