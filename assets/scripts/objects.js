const objects = {
    UserProfile: {
        kind: 'Class',
        fields: [
            { name: 'uuid', type: 'String', description: "User's UUID" },
            { name: 'nickname', type: 'String', description: "User's nickname" },
            { name: 'roleType', type: 'Integer', description: "User's role type" },
            { name: 'eloRate', type: 'Integer?', description: "User's Elo rate. It is <code>null</code> if the user hasn't finished placement matches." },
            { name: 'eloRank', type: 'Integer?', description: "User's Elo rank" },
            { name: 'country', type: 'String?', description: 'User\'s country code in lowercased <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO 3166-1 alpha-2</a> format.' },
        ]
    },
    Achievement: {
        kind: 'Class',
        fields: [
            { name: 'id', type: 'String', description: 'Achievement Identifier' },
            { name: 'date', type: 'Date', description: 'Timestamp of when the achievement was earned' },
            { name: 'data', type: 'String[]', description: 'Additional data array' },
            { name: 'level', type: 'Integer', description: 'Level of achievement' },
            { name: 'value', type: 'Integer?', description: "Contains the current player's progression of the achievement. It is <code>null</code> if the achievement is not a leveling one." },
            { name: 'goal', type: 'Integer?', description: 'Next level goal of the achievement. It is <code>null</code> if the achievement is at max level or not a leveling one.' },
        ]
    },
    MatchInfo: {
        kind: 'Class',
        note: '<code>Advanced</code> parameters are only available with <code>/matches/{match_id}</code> endpoint.',
        fields: [
            { name: 'id', type: 'String' },
            { name: 'type', type: 'MatchType' },
            { name: 'season', type: 'Integer' },
            { name: 'category', type: 'String?', description: 'Match completions category. Default is <code>ANY</code>' },
            { name: 'date', type: 'Date' },
            { name: 'players', type: 'UserProfile[]' },
            { name: 'spectators', type: 'UserProfile[]' },
            { name: 'seed', type: 'MatchSeed?', description: "Seed ID if it's a ranked filtered seed. This is not the seed number. It is <code>null</code> if the seed is not filtered." },
            { name: 'result.uuid', type: 'String?', description: "Winner's UUID. It is <code>null</code> if the match was a draw." },
            { name: 'result.time', type: 'Time' },
            { name: 'forfeited', type: 'Boolean', description: 'Whether the match has no completions' },
            { name: 'decayed', type: 'Boolean', description: 'Whether the match has decayed' },
            { name: 'rank.season', type: 'Integer?', description: "Record rank of the match's season" },
            { name: 'rank.allTime', type: 'Integer?', description: 'Record rank of all-time' },
            { name: 'changes[].uuid', type: 'String', description: 'UUID of player' },
            { name: 'changes[].change', type: 'Integer?', description: 'Amount of changed Elo rate. It is <code>null</code> if the match is a placement.' },
            { name: 'changes[].eloRate', type: 'Integer?', description: 'Elo rate of the player. It is <code>null</code> if the match is a placement.' },
            { name: 'tag', type: 'String?', description: 'Special tag of this match. Used to get matches by tag.' },
            { name: 'beginner', type: 'Boolean', description: 'Whether beginner mode is enabled in the match.' },
            { name: 'vod[].uuid', type: 'String', description: 'UUID of VOD owner. Only players with public stream activated will be included.' },
            { name: 'vod[].url', type: 'String', description: 'VOD URL of this match' },
            { name: 'vod[].startsAt', type: 'Date', description: 'VOD start date. You can get a timestamp with <code>{date} - {vod[].startsAt}</code>' },
            { name: 'completions[].uuid', type: 'String', description: '(Advanced) Player uuid of completion' },
            { name: 'completions[].time', type: 'Time', description: '(Advanced) Match time of completion' },
            { name: 'timelines[].uuid', type: 'String', description: '(Advanced) Player uuid of timeline' },
            { name: 'timelines[].time', type: 'Time', description: '(Advanced) Match time of timeline' },
            { name: 'timelines[].type', type: 'String', description: '(Advanced) Identifier of timeline' },
            { name: 'replayExist', type: 'Boolean', description: '(Advanced) Whether the match replay exists in the server' },
        ]
    },
    MatchSeed: {
        kind: 'Class',
        fields: [
            { name: 'id', type: 'String?', description: "Seed id if it's a ranked filtered seed. This is not the seed number. It is <code>null</code> if the seed is not filtered." },
            { name: 'overworld', type: 'String?', description: 'Overworld structure type of the seed. It is <code>null</code> if the seed is not filtered.' },
            { name: 'nether', type: 'String?', description: 'Bastion remnants type of the seed. It is <code>null</code> if the seed is not filtered.' },
            { name: 'endTowers', type: 'Integer[]', description: 'The <a href="./assets/img/endTowers.png" target="_blank">zero related tower</a> heights of in The End dimension. It is an empty array if the seed is not filtered.' },
            { name: 'variations', type: 'String[]', description: 'Noticeable variations of the seed. It is an empty array if the seed is not filtered.' },
        ]
    },
    UserIdentifier: {
        kind: 'String',
        description: 'Identifier used when getting user information. You must use one of the formats below.',
        variants: [
            { type: 'UUID', description: 'UUID of User. You can also use it with dashes (<code>-</code>).', example: 'bbc886da1b024739b4b80f1542e9f61d' },
            { type: 'Nickname', description: 'Nickname of User. It is not case-sensitive.', example: 'RED_LIME' },
            { type: 'Discord ID', description: 'Linked Discord ID (Snowflake) of User. Must be <code>discord.[ID]</code> format.', example: 'discord.338669823167037440' },
        ]
    },
    MatchType: {
        kind: 'Integer',
        values: [
            { value: 1, description: 'Casual Match' },
            { value: 2, description: 'Ranked Match' },
            { value: 3, description: 'Private Room Match' },
            { value: 4, description: 'Event Mode Match' },
        ]
    },
    Date: {
        kind: 'Integer',
        description: 'Displays a specific date as an epoch time (timestamp) in seconds. (NOT milliseconds!)',
    },
    Time: {
        kind: 'Integer',
        description: 'Displays a specific duration in milliseconds.',
    },
};


function buildObjectContainer(name, obj) {
    const id = 'objects-' + name.toLowerCase();
    const labelClass = obj.kind === 'Class' ? 'label-success' : 'label-primary';

    if (!obj.fields && !obj.variants && !obj.values) {
        // Simple type (Date, Time) — just title + description
        return /*html*/ `<div class="container-fluid" id="${id}">
          <h2 class="page-title"><strong><span class="label ${labelClass}">${obj.kind}</span> &nbsp; ${name}</strong></h2>
          <h4 class="page-title">${obj.description || ''}</h4>
        </div>
        <hr />`;
    }

    let bodyHtml = '';

    if (obj.fields) {
        // Class with fields table
        const noteHtml = obj.note ? obj.note : '';
        const rows = obj.fields.map(f =>
            `<tr><td>${f.name}</td><td><code>${f.type}</code></td><td>${f.description || ''}</td></tr>`
        ).join('');
        bodyHtml = `<table class="table table-hover">
                  ${noteHtml}
                  <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>
                  <tbody>${rows}</tbody>
                </table>`;
    } else if (obj.variants) {
        // String type with variant formats (UserIdentifier)
        const rows = obj.variants.map(v =>
            `<tr><td>${v.type}</td><td>${v.description}</td><td><code>${v.example}</code></td></tr>`
        ).join('');
        bodyHtml = `<table class="table table-hover">
                  <thead><tr><th>Type</th><th>Description</th><th>Example</th></tr></thead>
                  <tbody>${rows}</tbody>
                </table>`;
    } else if (obj.values) {
        // Integer enum (MatchType)
        const rows = obj.values.map(v =>
            `<tr><td><code>${v.value}</code></td><td>${v.description}</td></tr>`
        ).join('');
        bodyHtml = `<table class="table table-hover">
                  <thead><tr><th>Value</th><th>Description</th></tr></thead>
                  <tbody>${rows}</tbody>
                </table>`;
    }

    const descHtml = obj.description ? `<h4 class="page-title">${obj.description}</h4>` : '';

    return /*html*/ `<div class="container-fluid" id="${id}">
          <h2 class="page-title"><strong><span class="label ${labelClass}">${obj.kind}</span> &nbsp; ${name}</strong></h2>
          ${descHtml}
          <div class="row">
            <div class="panel">
              <div class="panel-body">
                ${bodyHtml}
              </div>
            </div>
          </div>
        </div>
        <hr />`;
}

function buildObjectSidebar(name, obj) {
    const id = 'objects-' + name.toLowerCase();
    const labelClass = obj.kind === 'Class' ? 'label-success' : 'label-primary';
    return `<li><a href="#${id}" class=""><span class="label ${labelClass}">${obj.kind}</span> &nbsp; ${name}</a></li>`;
}
