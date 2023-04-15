const responses = {
    'response/200': `{"status":"success","data":{}}`,
    'response/400': `{"status":"error","data":null}`,
    'response/401': `{"status":"error","data":"invalid \`filter\` query. it must be >= 0 or <= 3"}`,
    'response/429': `{"status":"error","data":"Too many requests"}`,
}

const endpoints = {
    'users/{identifier}': {
        title: `Get User Profile`,
        method: 'GET',
        category: 'users',
        description: 'Returns the `{identifier}`\'s profile.',
        params: [
            {
                name: '{identifier}',
                type: 'string',
                required: true,
                description: 'UUID or Nickname of User. UUID should be without dashes(`-`).'
            }
        ],
        sample: `{"status":"success","data":{"uuid":"bbc886da1b024739b4b80f1542e9f61d","nickname":"RED_LIME","badge":3,"elo_rate":1189,"elo_rank":146,"created_time":1676211633,"latest_time":1681448690,"total_played":97,"season_played":23,"highest_winstreak":7,"current_winstreak":0,"prev_elo_rate":1169,"best_elo_rate":1211,"best_record_time":837656,"records":{"1":{"win":0,"lose":0,"draw":0},"2":{"win":15,"lose":7,"draw":1}},"achievements":[{"achieve_type":6,"tag_name":"season_0_top500","achieve_time":1679875227,"achieve_data":"456"}],"connections":{"discord":{"id":"338669823167037440","name":"RedLime#0817"},"twitch":{"id":"163546699","name":"RedLimeRL"},"youtube":{"id":"UCxZDE9A8qewsM9BWNWj9nVg","name":"RedLime"}}}}`,
        nullable: ['data.elo_rank', 'data.connections.discord', 'data.connections.twitch', 'data.connections.youtube'],
        specificTypes: {'data.created_time': 'Date', 'data.latest_time': 'Date', 'data.achievements.achieve_time': 'Date', 'data.best_record_time': 'MatchDuration'}
    },
    'users/{identifier}/matches': {
        title: `Get User Matches`,
        method: 'GET',
        category: 'users',
        description: 'Returns the `{identifier}`\'s recent matches',
        params: [
            {
                name: '{identifier}',
                type: 'string',
                required: true,
                description: 'UUID or Nickname of User. UUID should be without dashes(`-`).'
            },
            {
                name: 'page',
                type: 'integer',
                required: false,
                description: 'Pagination of match list, it must be `0` to `99`. (default: `0`)'
            },
            {
                name: 'count',
                type: 'integer',
                required: false,
                description: 'Number of match count each page, it must `1` to `50`. (default: `20`)'
            },
            {
                name: 'filter',
                type: 'MatchType?',
                required: false,
                description: 'Only returns match list of the selected match type. (default: `null`)'
            },
            {
                name: 'season',
                type: 'integer',
                required: false,
                description: 'Specific season match (default: current season number)'
            }
        ],
        sample: `{"status":"success","data":[{"match_id":141463,"match_type":3,"match_date":1681359504,"winner":"13f9b2021cad450daf5ca6874e1ec39e","final_time":126020,"match_season":1,"members":[{"nickname":"Y_GangBak","uuid":"13f9b2021cad450daf5ca6874e1ec39e","badge":0,"elo_rate":1000,"elo_rank":null},{"nickname":"RED_LIME","uuid":"bbc886da1b024739b4b80f1542e9f61d","badge":3,"elo_rate":1189,"elo_rank":146}],"score_changes":null,"forfeit":true,"is_decay":false},{"match_id":141462,"match_type":3,"match_date":1681355869,"winner":null,"final_time":75954,"match_season":1,"members":[{"nickname":"RED_LIME","uuid":"bbc886da1b024739b4b80f1542e9f61d","badge":3,"elo_rate":1189,"elo_rank":146},{"nickname":"Y_GangBak","uuid":"13f9b2021cad450daf5ca6874e1ec39e","badge":0,"elo_rate":1000,"elo_rank":null}],"score_changes":null,"forfeit":true,"is_decay":false}]}`,
        nullable: ['data.score_changes', 'data.winner'],
        specificTypes: {'data.score_changes': 'ScoreChange[]', 'data.members': 'PlayerInfo[]', 'data.match_date': 'Date', 'data.final_time': 'MatchDuration'}
    },
    'users/{identifier1}/versus/{identifier2}': {
        title: `Get Versus Stats`,
        method: 'GET',
        category: 'versus',
        description: 'Returns the match stats between `{identifier1}` and `{identifier2}`.',
        params: [
            {
                name: '{identifier1}',
                type: 'string',
                required: true,
                description: 'UUID or Nickname of User. UUID should be without dashes(`-`).'
            },
            {
                name: '{identifier2}',
                type: 'string',
                required: true,
                description: 'UUID or Nickname of User. UUID should be without dashes(`-`).'
            }
        ],
        sample: `{"status":"success","data":{"users":[{"uuid":"bbc886da1b024739b4b80f1542e9f61d","nickname":"RED_LIME","badge":3,"elo_rate":1189,"elo_rank":146},{"uuid":"13f9b2021cad450daf5ca6874e1ec39e","nickname":"Y_GangBak","badge":0,"elo_rate":1000,"elo_rank":null}],"win_count":{"1":{"total":3,"bbc886da1b024739b4b80f1542e9f61d":1,"13f9b2021cad450daf5ca6874e1ec39e":2},"2":{"total":5,"bbc886da1b024739b4b80f1542e9f61d":2,"13f9b2021cad450daf5ca6874e1ec39e":2}}}}`,
        nullable: [],
        specificTypes: {'data.users': 'PlayerInfo[]', 'data.win_count.1': 'VersusWinCount', 'data.win_count.2': 'VersusWinCount'}
    },
    'users/{identifier1}/versus/{identifier2}/matches': {
        title: `Get Versus Matches`,
        method: 'GET',
        category: 'versus',
        description: 'Returns the recent matches between `{identifier1}` and `{identifier2}`.',
        params: [
            {
                name: '{identifier}',
                type: 'string',
                required: true,
                description: 'UUID or Nickname of User. UUID should be without dashes(`-`).'
            },
            {
                name: 'page',
                type: 'integer',
                required: false,
                description: 'Pagination of match list, it must be `0` to `99`. (default: `0`)'
            },
            {
                name: 'count',
                type: 'integer',
                required: false,
                description: 'Number of match count each page, it must `1` to `50`. (default: `20`)'
            },
            {
                name: 'filter',
                type: 'MatchType?',
                required: false,
                description: 'Only returns match list of the selected match type. (default: `null`)'
            },
            {
                name: 'season',
                type: 'integer',
                required: false,
                description: 'Specific season match (default: current season number)'
            }
        ],
        sample: `{"status":"success","data":[{"match_id":141463,"match_type":3,"match_date":1681359504,"winner":"13f9b2021cad450daf5ca6874e1ec39e","final_time":126020,"match_season":1,"members":[{"nickname":"Y_GangBak","uuid":"13f9b2021cad450daf5ca6874e1ec39e","badge":0,"elo_rate":1000,"elo_rank":null},{"nickname":"RED_LIME","uuid":"bbc886da1b024739b4b80f1542e9f61d","badge":3,"elo_rate":1189,"elo_rank":146}],"score_changes":null,"forfeit":true,"is_decay":false},{"match_id":141462,"match_type":3,"match_date":1681355869,"winner":null,"final_time":75954,"match_season":1,"members":[{"nickname":"RED_LIME","uuid":"bbc886da1b024739b4b80f1542e9f61d","badge":3,"elo_rate":1189,"elo_rank":146},{"nickname":"Y_GangBak","uuid":"13f9b2021cad450daf5ca6874e1ec39e","badge":0,"elo_rate":1000,"elo_rank":null}],"score_changes":null,"forfeit":true,"is_decay":false}]}`,
        nullable: ['data.score_changes', 'data.winner'],
        specificTypes: {'data.score_changes': 'ScoreChange[]', 'data.members': 'PlayerInfo[]', 'data.match_date': 'Date', 'data.final_time': 'MatchDuration'}
    },
    'matches/{match_id}': {
        title: `Get Match Info`,
        method: 'GET',
        category: 'matches',
        description: 'Returns the detailed match info.',
        params: [
            {
                name: '{match_id}',
                type: 'integer',
                required: true,
                description: 'ID of match'
            }
        ],
        sample: `{"status":"success","data":{"match_id":141463,"seed_type":"ruined_portal","match_type":3,"winner":"13f9b2021cad450daf5ca6874e1ec39e","members":[{"uuid":"13f9b2021cad450daf5ca6874e1ec39e","nickname":"Y_GangBak","badge":0,"elo_rate":1000,"elo_rank":null},{"uuid":"bbc886da1b024739b4b80f1542e9f61d","nickname":"RED_LIME","badge":3,"elo_rate":1189,"elo_rank":146}],"final_time":126020,"score_changes":null,"forfeit":true,"match_season":1,"category":"ANY","match_date":1681359504,"is_decay":false,"timelines":[{"time":126015,"timeline":"projectelo.timeline.forfeit","uuid":"bbc886da1b024739b4b80f1542e9f61d"},{"time":122448,"timeline":"story.enter_the_nether","uuid":"bbc886da1b024739b4b80f1542e9f61d"},{"time":122448,"timeline":"nether.root","uuid":"bbc886da1b024739b4b80f1542e9f61d"},{"time":114932,"timeline":"story.form_obsidian","uuid":"bbc886da1b024739b4b80f1542e9f61d"},{"time":85128,"timeline":"nether.find_fortress","uuid":"13f9b2021cad450daf5ca6874e1ec39e"},{"time":31985,"timeline":"nether.root","uuid":"13f9b2021cad450daf5ca6874e1ec39e"},{"time":31985,"timeline":"story.enter_the_nether","uuid":"13f9b2021cad450daf5ca6874e1ec39e"},{"time":23480,"timeline":"story.form_obsidian","uuid":"13f9b2021cad450daf5ca6874e1ec39e"}]}}`,
        nullable: ['data.score_changes', 'data.winner'],
        specificTypes: {'data.score_changes': 'ScoreChange[]', 'data.members': 'PlayerInfo[]', 'data.match_type': 'MatchType', 'data.match_date': 'Date', 'data.final_time': 'MatchDuration'}
    },
    'leaderboard': {
        title: `Get Elo Leaderboard`,
        method: 'GET',
        category: 'leaderboards',
        description: 'Returns Top 150 Leaderboard for Elo rates',
        params: [
            {
                name: 'type',
                type: 'integer (0 or 1)',
                required: false,
                description: 'Type of elo leaderboard. `0` is current season leaderboard, `1` is last season leaderboard. (default: `0`)'
            }
        ],
        sample: `{"status":"success","data":{"users":[{"uuid":"9a8e24df4c8549d696a6951da84fa5c4","nickname":"Feinberg","badge":3,"elo_rate":2005,"elo_rank":1}],"season_number":1,"season_end_time":1684022400000}}`,
        nullable: ['data.seasonEndTime'],
        specificTypes: {'data.users': 'PlayerInfo[]', 'data.season_end_time': 'MatchDuration'}
    },
    'record-leaderboard': {
        title: `Get Season Best Time Leaderboard`,
        method: 'GET',
        category: 'leaderboards',
        description: 'Returns Best Time Leaderboard for Current Season',
        params: [
            {
                name: 'distinct',
                type: 'any?',
                required: false,
                description: 'Type of best time leaderboard. If you send request with this parameter, it returns only the fastest run per player.'
            }
        ],
        sample: `{"status":"success","data":[{"final_time_rank":1,"match_id":105801,"final_time":475802,"match_date":1680079195,"user":{"uuid":"9a8e24df4c8549d696a6951da84fa5c4","nickname":"Feinberg","badge":3,"elo_rate":2005,"elo_rank":1}}]}`,
        nullable: [],
        specificTypes: {'data.user': 'PlayerInfo', 'data.match_date': 'Date', 'data.final_time': 'MatchDuration'}
    },
}


function convertObjectTypeDisplay(obj, nullable = [], specificTypes = {}, path = '') {
    const type = typeof obj;

    if (specificTypes[path]) return specificTypes[path];

    if (obj === null) return 'null';
    if (Number.isInteger(obj)) return 'integer';
    if (Array.isArray(obj)) return [convertObjectTypeDisplay(obj[0], nullable, specificTypes, path)];

    if (type === 'object' && Object.getOwnPropertyNames(obj).length) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => {
            const newPath = path ? (path + '.' + key) : key;
            return [key + (nullable.includes(newPath) ? '?' : ''), convertObjectTypeDisplay(value, nullable, specificTypes, newPath)];
        }));
    }
    return type;
}


function getResponseType(endpoint) {
    const json = getResponseExample(endpoint);
    return convertObjectTypeDisplay(json);
}

function getResponseExample(endpoint) {
    if (!responses[endpoint]) throw `'${endpoint}' is not exist!`;
    return JSON.parse(responses[endpoint]);
}

function buildEndpointContainer(endpointKey, endpoint) {
    const defaultContainer = /*html*/ `<div class="container-fluid" id="[[ELEMENT_ID]]"><h2 class="page-title"><strong>[[ENDPOINT_TITLE]]</strong></h2><h4 class="page-title">[[ENDPOINT_DESCRIPTION]]</h4><div class="row"><div class=""><div class="panel"><div class="panel-heading"><h3 class="panel-title"><span class="label label-success">[[ENDPOINT_METHOD]]</span> &nbsp; <code>https://mcsrranked.com/api/[[ENDPOINT_TARGET]]</code></h3></div><div class="panel-body"><table class="table table-hover"><thead><tr><th>Parameter</th><th>Type</th><th>Required?</th><th>Description</th></tr></thead><tbody>[[PARAMS]]</tbody></table></div></div></div><div class=""><div class="panel"><div class="panel-heading pointer" data-toggle="collapse" data-target="#[[ELEMENT_ID]]-type"><h3 class="panel-title">Response Type</h3></div><div class="panel-body collapse" id="[[ELEMENT_ID]]-type"><p>If parameter name contains a <code>?</code>, it means that parameter is a nullable object, and doesn't actually contain a <code>?</code>.</p><pre class="endpoint-type" data-target="response/200">[[RESPONSE_TYPE]]</pre></div></div></div><div class=""><div class="panel"><div class="panel-heading pointer" data-toggle="collapse" data-target="#[[ELEMENT_ID]]-sample"><h3 class="panel-title">Show Sample Response</h3></div><div class="panel-body collapse" id="[[ELEMENT_ID]]-sample"><pre>[[RESPONSE_SAMPLE]]</pre></div></div></div></div></div><hr>`;
    const defaultParamRow  = /*html*/ `<tr><td>[[PARAM_NAME]]</td><td><code>[[PARAM_TYPE]]</code></td><td><code>[[PARAM_REQUIRED]]</code></td><td>[[PARAM_DESCRIPTION]]</td></tr>`;

    const codeBlockRegex = /`(.([\s\w{}])*)`/gi;
    const identifier = endpointKey.replaceAll('/', '-').replace(/[^a-zA-Z0-9\-]/g, '');
    const sampleObject = JSON.parse(endpoint.sample);
    const dataType = JSON.stringify(convertObjectTypeDisplay(sampleObject, endpoint.nullable, endpoint.specificTypes), null, 4);

    return defaultContainer
    .replaceAll('[[ELEMENT_ID]]', identifier)
    .replaceAll('[[ENDPOINT_TITLE]]', endpoint.title)
    .replaceAll('[[ENDPOINT_DESCRIPTION]]', endpoint.description.replace(codeBlockRegex, '<code>$1</code>'))
    .replaceAll('[[ENDPOINT_METHOD]]', endpoint.method)
    .replaceAll('[[ENDPOINT_TARGET]]', endpointKey)
    .replaceAll('[[RESPONSE_TYPE]]', dataType.replace(/\"/g, ''))
    .replaceAll('[[RESPONSE_SAMPLE]]', JSON.stringify(sampleObject, null, 4))
    .replaceAll('[[PARAMS]]', endpoint.params.map(param => {
        const isRequired = (value) => param.required ? `<strong>${value}</strong>` : value;
        return defaultParamRow
        .replaceAll('[[PARAM_NAME]]', isRequired(param.name))
        .replaceAll('[[PARAM_TYPE]]', isRequired(param.type))
        .replaceAll('[[PARAM_REQUIRED]]', isRequired(param.required))
        .replaceAll('[[PARAM_DESCRIPTION]]', isRequired(param.description.replace(codeBlockRegex, '<code>$1</code>')))
    }).join(''));
}

function buildEndpointSidebar(endpointKey, endpoint) {
    const deafaultSideRow = /*html*/ `<li><a href="#[[ELEMENT_ID]]" class=""><span class="label label-success">[[ENDPOINT_METHOD]]</span> &nbsp; [[ENDPOINT_TITLE]]</a></li>`;

    const identifier = endpointKey.replaceAll('/', '-').replace(/[^a-zA-Z0-9\-]/g, '');

    return deafaultSideRow
    .replaceAll('[[ELEMENT_ID]]', identifier)
    .replaceAll('[[ENDPOINT_TITLE]]', endpoint.title)
    .replaceAll('[[ENDPOINT_METHOD]]', endpoint.method);
}