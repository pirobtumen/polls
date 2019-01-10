<template>
  <div class="list">
    <div v-for="poll in polls" v-bind:key="poll.id">
        <Poll v-bind:poll=poll></Poll>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Poll from './Poll.vue';
import { IPoll } from '@/interfaces/poll';

@Component({
  components: {
    Poll,
  },
})
export default class PollList extends Vue {
  @Prop() private polls!: IPoll[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
