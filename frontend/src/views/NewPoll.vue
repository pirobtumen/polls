<template>

  <div class="new-poll">
    <div class="list">
        <div class="question">
            <h3>Question</h3>
            <input v-model="pollTitle"/>
        </div>
    
        <div v-for="(option, i) in pollOptions" v-bind:key="i">
            <p>Option {{i + 1}}</p>
            <div>
            <input v-model="pollOptions[i]"/>
            <button class="bttn-remove" v-if="pollOptions.length > 2" v-on:click="removeOption(i)">Remove</button>
            </div>
        </div>

        <div class="actions">
            <button v-on:click="addOption()">Add option</button>
            <button class="bttn-selected" v-on:click="save()">Create poll</button>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IPoll } from '@/interfaces/poll';

@Component({
  components: {
  },
})
export default class Home extends Vue {
    public pollTitle: string = '';
    public pollOptions: string[] = [];
    public initialOptions = 0;
    private readonly maxOptions = 6;

    public created() {
        this.addOption();
        this.addOption();
    }

    public addOption() {
        if (this.initialOptions < this.maxOptions) {
            this.initialOptions += 1;
            this.pollOptions.push('');
        }
    }

    public removeOption(i: number) {
        this.initialOptions -= 1;
        this.pollOptions.splice(i, 1);
    }

    public async save() {
        const poll = {
            title: this.pollTitle,
            options: this.pollOptions,
        };

        const res = await fetch('/api/poll', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({poll}),
        });

        this.$router.push('/');
    }
}
</script>

<style scoped lang="scss">
input {
    max-width: 100%;
    margin-right: 5px;
}

.new-poll {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .question {
        input {
            width: 100%;
        }
    }

    .actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 15px;
    }
}
</style>
