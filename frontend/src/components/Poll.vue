<template>
    <div class="poll">
        <div class="title">{{ipoll.title}}</div>
        <div class="options">
            <button 
                v-for="opt in ipoll.options" v-bind:key="opt" 
                v-on:click="sendVote(poll, opt)"
                v-bind:class="{'bttn-selected':opt===vote}">{{opt}}</button>
        </div>
        <div class="results" v-if="vote !== null">
            <div v-for="(opt, i) in ipoll.options" v-bind:key="opt">{{opt}} - {{ipoll.votes[i]}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPoll } from '@/interfaces/poll';

@Component
export default class Poll extends Vue {
    private vote: string | null = null;
    private ipoll: IPoll = {
        id: '',
        title: '',
        options: [],
        votes: [],
    };
    @Prop() private poll!: IPoll;

    public created() {
        this.ipoll = this.poll;
        this.vote = localStorage.getItem(this.ipoll.id);
    }

    private async sendVote(poll: IPoll, vote: string) {
        if (this.vote === null) {
            const res = await fetch(`/api/poll/${poll.id}`, {method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({vote})});

            const i = this.poll!.options.indexOf(vote);
            this.poll!.votes[i] += 1;
            this.vote = vote;
            localStorage.setItem(this.ipoll.id, vote);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .poll {
      padding-bottom: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid #c5c5c5;

      .title {
        text-align: start;
        margin-bottom: 20px;
      }

      .options {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;
      }
    }

    .results {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>
