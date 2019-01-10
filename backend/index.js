const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');

const PORT = 8081;
const defaultPolls = [
      {
        title: 'Sample default poll ?',
        options: ['Yes', 'No'],
      },
];

const polls = {};

// LOGIC

function createPoll(title, options) {
    const id = uuidv4();
    const poll = {
        id: id,
        title: title,
        options: options,
        votes: options.map(o => 0)
    }
    
    polls[id] = poll;

    return id;
}

function votePoll(id, vote) {
    const poll = polls[id];
    const pos = poll.options.indexOf(vote);
    // There is no concurrency
    poll.votes[pos] += 1;
}

function listPolls() {
    return Object.values(polls);
}

// API

function votePollHandler(req, res) {
    const id = req.params.id;
    const vote = req.body.vote;
    console.log(`VOTE: ${id} - ${vote}`);
    votePoll(id, vote);
    res.send(JSON.stringify({}));
}

function createPollHandler(req, res) {
    console.log('CREATE')
    const poll = req.body.poll;
    const title = poll.title;
    const options = poll.options;
    const id = createPoll(title, options);
    res.send(JSON.stringify({poll: polls[id]}));
}

function listPollsHandler(req, res) {
    console.log('LIST')
    res.send(JSON.stringify({data: listPolls()}));
}

// SERVER

function main() {
    for (const dpoll of defaultPolls) {
        createPoll(dpoll.title, dpoll.options);
    }

    app.use(bodyParser.json());

    app.post('/api/poll/:id', votePollHandler);
    app.post('/api/poll', createPollHandler);
    app.get('/api/poll', listPollsHandler);
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
}

main();
