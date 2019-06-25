import { mapState, mapGetters, mapActions } from "vuex";
import feathersClient from "@/feathers";

export default {
  computed: {
    ...mapState("users", {
      areUsersLoading: "isFindPending",
      usersPagination: "pagination"
    }),
    ...mapGetters("users", {
      findUsersInStore: "find",
      listUsers: "list"
    })
  },
  methods: {
    ...mapActions("users", {
      findUsers: "find"
    })
  },
  async created() {
    console.log("UsersMixin was loaded");

    feathersClient.service("users").on("created", data => {
      console.log(`User created - ${data.email}`);
    });

    try {
      await this.findUsers({});
      console.log("found users");
    } catch (e) {
      console.error(e);
    }
  }
};
