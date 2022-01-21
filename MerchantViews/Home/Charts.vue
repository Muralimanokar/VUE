<template>
  <div>
  <div v-if="displayView">
    <div class="row">
      <div class="col-md-12">
        <LineChart :height="300"></LineChart>
        <LineChart :height="300" :data="customerDataSet"></LineChart>
      </div>
    </div>
    <div class="row">
    <!--<div class="row">
      <div class="col-md-12">
        <LineChart :height="300"></LineChart>
      </div>
      <div class="col-md-12">
        <LineChart :height="300"></LineChart>
      </div>
    </div>
    </div>-->
  </div> 
</template>

  components: {
    LineChart
  },
  props: [
    'id'
  ],
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      pointsGraphData: {
        allocatedPoints: 0,
        unAllocatedPoints: 0
      },
      salesGraphData: {
        purchaseCount: 0,
        purchaseDate: 0
      },
      customerDataSet: {},
      displayView: false,
      loadingbgcolor : '#0069d9',
      isLoading: false
    }
  },
  methods: {
    getPointsData(id) {
      let cachescope = this;
      this.isLoading = true;
      this.$store.dispatch("partner/getDashboardPointsGraphData", id).then(function(res) {
       // cachescope.myDebug("Points Graph Data:", JSON.stringify(res));
        cachescope.pointsGraphData.allocatedPoints = res.allocatedPoints;
        cachescope.pointsGraphData.unAllocatedPoints = res.unAllocatedPoints;
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Points Data fetch failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        //cachescope.$router.push({ path: `/merchanthome` });
      });
    },
    getSalesData(id) {
      let cachescope = this;
      this.isLoading = true;
      this.$store.dispatch("partner/getDashboardSalesGraphData", id).then(function(res) {
       // cachescope.myDebug("Sales Graph Data:", JSON.stringify(res));
        cachescope.salesGraphData.purchaseCount = res.purchaseCount;
        cachescope.salesGraphData.purchaseDate = res.purchaseDate;
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Sales Data fetch failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        //cachescope.$router.push({ path: `/merchanthome` });
      });
    },
    getCustomerData() {
      let cachescope = this;
      this.isLoading = true;
      this.$store.dispatch("customer/getCustomerWeeklyJoiningRate").then(function(res) {
        //cachescope.myDebug("Customer Graph Data:", JSON.stringify(res));
        cachescope.formCustomerGraphDataSet(res);
        cachescope.isLoading = false;
        cachescope.displayView = true;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer Graph Data fetch failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        //cachescope.$router.push({ path: `/merchanthome` });
      });
    },
    formCustomerGraphDataSet(data) {
      this.customerDataSet.dataSet = {
        labels: [],
        datasets: [
          {
            label: "Customer Weekly joining rate",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      };
      this.customerDataSet.options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Customer(Y) Weeks(X)"
        }
      }

      data.forEach((ele) => {
        this.customerDataSet.dataSet.labels.push(ele.weekNumber);
        this.customerDataSet.dataSet.datasets[0].data.push(ele.customersCount);
      });
    }
  },
  mounted() {
    if(this.id != undefined && this.id != "") {
      this.getPointsData(this.id);
      this.getSalesData(this.id);
      this.getCustomerData();
    }
  }
};
</script>
