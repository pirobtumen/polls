<template>
  <div class="home">
    <div class="info">
      <p>{{polls.length}} polls</p>
    </div>
    <PollList v-bind:polls=polls></PollList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PollList from '@/components/PollList.vue'; // @ is an alias to /src
import { IPoll } from '@/interfaces/poll';

@Component({
  components: {
    PollList,
  },
})
export default class Home extends Vue {
  public polls: IPoll[] = [];

  public created() {
    this.loadPolls();
  }

  private async loadPolls() {
    const data = await fetch('/api/poll', {method: 'GET'});
    const polls = (await data.json()).data;
    this.polls = polls;
  }
}
</script>

<style lang="scss">
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .info {

    p {
      margin: 0;
      margin-bottom: 5px;
    }
  }

  h2 {
    margin-top: 0;
  }
}
</style>
