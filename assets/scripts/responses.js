const responses = {
    'response/200': `{"status":"success","data":{}}`,
    'response/400': `{"status":"error","data":null}`,
    'response/401': `{"status":"error","data":"invalid \`filter\` query. it must be >= 0 or <= 3"}`,
    'response/429': `{"status":"error","data":"Too many requests"}`,
}

const endpoints = {
    'users/{identifier}': {
        title: `Get User Data`,
        method: 'GET',
        category: 'users',
        description: 'Returns the `{identifier}`\'s entire profile data.',
        params: [
            {
                name: '{identifier}',
                type: 'UserIdentifier',
                required: true,
                description: 'Check the `Objects#UserIdentifier` section.'
            },
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Specific season match for statistics (default: current season number)'
            }
        ],
        structures: [
            {
                name: 'uuid',
                type: 'String',
                description: 'UUID (without Dashes)'
            },
            {
                name: 'nickname',
                type: 'String'
            },
            {
                name: 'roleType',
                type: 'Integer'
            },
            {
                name: 'eloRate',
                type: 'Integer?',
                description: 'Elo rate of current season, If user haven\'t finished placement matches it will be `null`'
            },
            {
                name: 'eloRank',
                type: 'Integer?',
                description: 'rank of current season'
            },
            {
                name: 'achievements.display',
                type: 'Achievement[]',
                description: 'A list of achievements to be displayed ingame'
            },
            {
                name: 'achievements.total',
                type: 'Achievement[]',
                description: 'A list of user\'s every achievements'
            },
            {
                name: 'timestamp.firstOnline',
                type: 'Date',
                description: 'Date of user\'s first connection'
            },
            {
                name: 'timestamp.lastOnline',
                type: 'Date',
                description: 'Date of user\'s last connection'
            },
            {
                name: 'timestamp.lastRanked',
                type: 'Date',
                description: 'Date of user\'s last ranked match'
            },
            {
                name: 'statistics.season.[key].[ranked | casual]',
                type: 'Integer?',
                description: 'season statistic for specific match type (`ranked` or `casual`)'
            },
            {
                name: 'statistics.total.[key].[ranked | casual]',
                type: 'Integer?',
                description: 'all-time statistic for specific match type (`ranked` or `casual`)'
            },
            {
                name: 'connections.[key].id',
                type: 'Connection?',
                description: 'Identifier of user\'s third party connections like Twitch, Discord and etc'
            },
            {
                name: 'connections.[key].name',
                type: 'Connection?',
                description: 'Display name of user\'s third party connections like Twitch, Discord and etc'
            },
            {
                name: 'seasonResult',
                type: 'Object?',
                description: 'User\'s Elo data of season'
            },
            {
                name: 'seasonResult.last.eloRate',
                type: 'Integer',
                description: 'Last Elo rate of season'
            },
            {
                name: 'seasonResult.last.eloRank',
                type: 'Integer?',
                description: 'Last Elo rank of season'
            },
            {
                name: 'seasonResult.highest',
                type: 'Integer',
                description: 'Highest Elo rate of season'
            },
            {
                name: 'seasonResult.lowest',
                type: 'Integer',
                description: 'Lowest Elo rate of season'
            },
        ],
        sample: `{"status":"success","data":{"uuid":"bbc886da1b024739b4b80f1542e9f61d","nickname":"RED_LIME","roleType":3,"eloRate":1120,"eloRank":1354,"achievements":{"display":[{"id":"seasonResult","date":1679875227,"data":["0","456"],"level":6},{"id":"seasonResult","date":1686787248,"data":["1","417"],"level":6},{"id":"seasonResult","date":1695081662,"data":["2","639"],"level":7}],"total":[{"id":"seasonResult","date":1679875227,"data":["0","456"],"level":6},{"id":"seasonResult","date":1686787248,"data":["1","417"],"level":6},{"id":"seasonResult","date":1695081662,"data":["2","639"],"level":7}]},"timestamp":{"firstOnline":1676211633,"lastOnline":1698609147,"lastRanked":1695836921},"statistics":{"season":{"bestTime":{"ranked":207285,"casual":407285},"highestWinStreak":{"ranked":4,"casual":0},"currentWinStreak":{"ranked":0,"casual":0},"playedMatches":{"ranked":60,"casual":0},"playtime":{"ranked":51219898,"casual":0},"forfeits":{"ranked":0,"casual":0},"completions":{"ranked":36,"casual":0},"wins":{"ranked":36,"casual":0},"loses":{"ranked":22,"casual":0}},"total":{"bestTime":{"ranked":207285,"casual":307285},"highestWinStreak":{"ranked":4,"casual":0},"currentWinStreak":{"ranked":0,"casual":0},"playedMatches":{"ranked":67,"casual":0},"playtime":{"ranked":55518342,"casual":0},"forfeits":{"ranked":0,"casual":0},"completions":{"ranked":38,"casual":0},"wins":{"ranked":38,"casual":0},"loses":{"ranked":26,"casual":0}}},"connections":{"twitch":{"id":"163546699","name":"RedLimeRL"},"youtube":{"id":"UCxZDE9A8qewsM9BWNWj9nVg","name":"RedLime"}},"seasonResult":{"last":{"eloRate":1276,"eloRank":417},"highest":1292,"lowest":1044}}}`,
    },
    'users/{identifier}/matches': {
        title: `Get User Matches`,
        method: 'GET',
        category: 'users',
        description: 'Returns the `{identifier}`\'s recent matches',
        params: [
            {
                name: '{identifier}',
                type: 'UserIdentifier',
                required: true,
                description: 'Check the `Objects#UserIdentifier` section.'
            },
            {
                name: 'page',
                type: 'Integer',
                required: false,
                description: 'Pagination of match list, it must be `0` to `99`. (default: `0`)'
            },
            {
                name: 'count',
                type: 'Integer',
                required: false,
                description: 'Number of match count each page, it must `1` to `50`. (default: `10`)'
            },
            {
                name: 'type',
                type: 'MatchType?',
                required: false,
                description: 'Only returns match list of the selected match type. (default: `null`)'
            },
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Specific season match (default: current season number)'
            },
            {
                name: 'excludedecay',
                type: 'Boolean',
                required: false, 
                description: 'Whether exclude decayed matches (default: `false`)'
            }
        ],
        structures: [
            {
                name: 'Array[]',
                type: 'MatchInfo[]'
            }
        ],
        sample: `{"status":"success","data":[{"id":534065,"type":2,"season":3,"category":"ANY","date":1695836921,"players":[{"uuid":"7e697c9f25e74b3c9f7a7c51797987c4","nickname":"not_tomorrow_yet","roleType":0,"eloRate":1121,"eloRank":570,"__v":0},{"uuid":"bbc886da1b024739b4b80f1542e9f61d","nickname":"RED_LIME","roleType":3,"eloRate":null,"eloRank":null,"__v":0}],"spectators":[],"result":{"uuid":"7e697c9f25e74b3c9f7a7c51797987c4","time":268613},"forfeited":false,"decayed":false,"rank":{"season":null,"allTime":null},"changes":[{"uuid":"7e697c9f25e74b3c9f7a7c51797987c4","change":17,"eloRate":1234},{"uuid":"bbc886da1b024739b4b80f1542e9f61d","change":null,"eloRate":null}],"seedType":"shipwreck"}]}`,
    },
    'users/{identifier1}/versus/{identifier2}': {
        title: `Get Versus Stats`,
        method: 'GET',
        category: 'versus',
        description: 'Returns the match stats between `{identifier1}` and `{identifier2}` for ranked/casual matches. If there\'s no match between both users, `400` error will returned.',
        params: [
            {
                name: '{identifier1}',
                type: 'UserIdentifier',
                required: true,
                description: 'Check the `Objects#UserIdentifier` section.'
            },
            {
                name: '{identifier2}',
                type: 'UserIdentifier',
                required: true,
                description: 'Check the `Objects#UserIdentifier` section.'
            }
        ],
        structures: [
            {
                name: 'players',
                type: 'UserProfile[]'
            },
            {
                name: 'results.[ranked | casual].[key]',
                type: 'Integer',
                description: '`total` is just matches count, otherwise are win count of specific player (UUID)'
            },
            {
                name: 'changes.[key]',
                type: 'Integer',
                description: 'Total Elo rate changes in a match between both players'
            },
        ],
        sample: `{"status":"success","data":{"uuid":"734a1c6118754829acc234135470152c","nickname":"Yeopgihoney","roleType":0,"eloRate":1553,"eloRank":76,"achievements":{"display":[{"id":"seasonResult","date":1679875227,"data":["0","459"],"level":6},{"id":"seasonResult","date":1686787248,"data":["1","296"],"level":6},{"id":"seasonResult","date":1695081662,"data":["2","253"],"level":6}],"total":[{"id":"seasonResult","date":1679875227,"data":["0","459"],"level":6},{"id":"seasonResult","date":1686787248,"data":["1","296"],"level":6},{"id":"seasonResult","date":1695081662,"data":["2","253"],"level":6}]},"timestamp":{"firstOnline":1676211709,"lastOnline":1698668054,"lastRanked":1701249404},"statistics":{"season":{"bestTime":{"ranked":34962,"casual":null},"highestWinStreak":{"ranked":7,"casual":0},"currentWinStreak":{"ranked":0,"casual":0},"playedMatches":{"ranked":548,"casual":0},"playtime":{"ranked":388663864,"casual":0},"forfeits":{"ranked":0,"casual":0},"completions":{"ranked":283,"casual":0},"wins":{"ranked":283,"casual":0},"loses":{"ranked":243,"casual":0}},"total":{"bestTime":{"ranked":6720,"casual":1158540},"highestWinStreak":{"ranked":13,"casual":1},"currentWinStreak":{"ranked":0,"casual":1},"playedMatches":{"ranked":1115,"casual":1},"playtime":{"ranked":769409509,"casual":1158540},"forfeits":{"ranked":0,"casual":0},"completions":{"ranked":575,"casual":1},"wins":{"ranked":575,"casual":1},"loses":{"ranked":499,"casual":0}}},"connections":{"twitch":{"id":"498630076","name":"엽기꿀"}},"seasonResult":{"last":{"eloRate":1553,"eloRank":76},"highest":1602,"lowest":1553}}}`,
    },
    'users/{identifier1}/versus/{identifier2}/matches': {
        title: `Get Versus Matches`,
        method: 'GET',
        category: 'versus',
        description: 'Returns the recent matches between `{identifier1}` and `{identifier2}`.',
        params: [
            {
                name: '{identifier1}',
                type: 'UserIdentifier',
                required: true,
                description: 'Check the `Objects#UserIdentifier` section.'
            },
            {
                name: '{identifier2}',
                type: 'UserIdentifier',
                required: true,
                description: 'Check the `Objects#UserIdentifier` section.'
            },
            {
                name: 'page',
                type: 'Integer',
                required: false,
                description: 'Pagination of match list, it must be `0` to `99`. (default: `0`)'
            },
            {
                name: 'count',
                type: 'Integer',
                required: false,
                description: 'Number of match count each page, it must `1` to `50`. (default: `10`)'
            },
            {
                name: 'type',
                type: 'MatchType?',
                required: false,
                description: 'Only returns match list of the selected match type. (default: `null`)'
            },
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Specific season match (default: current season number)'
            },
        ],
        structures: [
            {
                name: 'Array[]',
                type: 'MatchInfo[]'
            }
        ],
        sample: `{"status":"success","data":[{"id":581743,"type":2,"season":3,"category":"ANY","date":1698165617,"players":[{"uuid":"7665f76f431b41c6b321bea16aff913b","nickname":"lowk3y_","roleType":0,"eloRate":2027,"eloRank":2},{"uuid":"af22aaab9ee74596a3578bd6345d25b5","nickname":"Priffin","roleType":0,"eloRate":1637,"eloRank":44}],"spectators":[],"result":{"uuid":"af22aaab9ee74596a3578bd6345d25b5","time":643074},"forfeited":false,"decayed":false,"rank":{"season":649,"allTime":1904},"changes":[{"uuid":"af22aaab9ee74596a3578bd6345d25b5","change":20,"eloRate":1898},{"uuid":"7665f76f431b41c6b321bea16aff913b","change":-20,"eloRate":1900}],"seedType":"buried_treasure"}]}`,
    },
    'matches/': {
        title: `Get Recent Matches`,
        method: 'GET',
        category: 'matches',
        description: 'Returns the recent matches.',
        params: [
            {
                name: 'page',
                type: 'Integer',
                required: false,
                description: 'Pagination of match list, it must be `0` to `99`. (default: `0`)'
            },
            {
                name: 'count',
                type: 'Integer',
                required: false,
                description: 'Number of match count each page, it must `1` to `50`. (default: `10`)'
            },
            {
                name: 'filter',
                type: 'MatchType?',
                required: false,
                description: 'Only returns match list of the selected match type. (default: `null`)'
            },
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Specific season match (default: current season number)'
            },
            {
                name: 'includedecay',
                type: 'any?',
                required: false,
                description: 'Whether a include decay matches. if you want to use it, just add parameter only like `?includedecay`'
            },
        ],
        structures: [
            {
                name: 'Array[]',
                type: 'MatchInfo[]'
            }
        ],
        sample: `{"status":"success","data":[{"id":519261,"type":2,"season":2,"category":"ANY","date":1695081655,"players":[{"uuid":"0c302ac113da46deb653c0e7225a8355","nickname":"Nadoms","roleType":0,"eloRate":1266,"eloRank":320},{"uuid":"c569bf473f5d43eba599e56ec51c050c","nickname":"Burawoy","roleType":0,"eloRate":1166,"eloRank":495,"__v":0}],"spectators":[],"result":{"uuid":null,"time":0},"forfeited":false,"decayed":false,"rank":{"season":null,"allTime":null},"changes":[{"uuid":"c569bf473f5d43eba599e56ec51c050c","change":0,"eloRate":1229},{"uuid":"0c302ac113da46deb653c0e7225a8355","change":0,"eloRate":1264}],"seedType":"buried_treasure"}]}`,
    },
    'matches/{match_id}': {
        title: `Get Match Info`,
        method: 'GET',
        category: 'matches',
        description: 'Returns the detailed match info.',
        params: [
            {
                name: '{match_id}',
                type: 'Integer',
                required: true,
                description: 'ID of match'
            }
        ],
        structures: [
            {
                name: 'Object',
                type: 'MatchInfo (Advanced)'
            }
        ],
        sample: `{"status":"success","data":{"id":590105,"type":2,"season":3,"category":"ANY","date":1698623666,"players":[{"uuid":"4427794ee7ad48bc9b53c156fa4092e1","nickname":"kW1st","roleType":1,"eloRate":1834,"eloRank":12},{"uuid":"b903905bc08f4366a551e957ca4dcd78","nickname":"inlifeiminlove","roleType":0,"eloRate":1830,"eloRank":13}],"spectators":[],"result":{"uuid":"4427794ee7ad48bc9b53c156fa4092e1","time":809939},"forfeited":false,"decayed":false,"rank":{"season":4507,"allTime":null},"changes":[{"uuid":"4427794ee7ad48bc9b53c156fa4092e1","change":16,"eloRate":1849},{"uuid":"b903905bc08f4366a551e957ca4dcd78","change":-16,"eloRate":1750}],"completions":[{"uuid":"4427794ee7ad48bc9b53c156fa4092e1","time":809939}],"timelines":[{"uuid":"b903905bc08f4366a551e957ca4dcd78","time":8297,"type":"story.form_obsidian"},{"uuid":"b903905bc08f4366a551e957ca4dcd78","time":8297,"type":"story.obtain_armor"},{"uuid":"b903905bc08f4366a551e957ca4dcd78","time":8269,"type":"story.iron_tools"}],"seedType":"village"}}`
    },
    'leaderboard': {
        title: `Get Elo Leaderboard`,
        method: 'GET',
        category: 'leaderboards',
        description: 'Returns Top 150 Leaderboard for Elo rates',
        params: [
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Specific season (default: current season number)'
            }
        ],
        structures: [
            {
                name: 'season.endsAt',
                type: 'Date?',
                description: 'Date of season ends. If target season is not current season it will be `null`'
            },
            {
                name: 'season.number',
                type: 'Integer'
            },
            {
                name: 'users',
                type: 'UserProfile[]'
            },
            {
                name: 'users[].seasonResult.eloRate',
                type: 'Integer',
                description: 'Final Elo rate of player in target season'
            },
            {
                name: 'users[].seasonResult.eloRank',
                type: 'Integer',
                description: 'Final Elo rank of player in target season'
            }
        ],
        sample: `{"status":"success","data":{"season":{"endsAt":1702857600,"number":3},"users":[{"uuid":"562a308be86c4ec09438387860e792cc","nickname":"Oxidiot","roleType":0,"eloRate":2083,"eloRank":1,"seasonResult":{"eloRate":2083,"eloRank":1}},{"uuid":"7665f76f431b41c6b321bea16aff913b","nickname":"lowk3y_","roleType":0,"eloRate":2027,"eloRank":2,"seasonResult":{"eloRate":2027,"eloRank":2}}]}}`,
    },
    'record-leaderboard': {
        title: `Get Season Best Time Leaderboard`,
        method: 'GET',
        category: 'leaderboards',
        description: 'Returns Best Time Leaderboard for Current Season',
        params: [
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Specific season (default: current season number)'
            },
            {
                name: 'distinct',
                type: 'any?',
                required: false,
                description: 'Type of best time leaderboard. If you send request with this parameter, it returns only the fastest run per player.'
            }
        ],
        structures: [
            {
                name: '[].rank',
                type: 'Integer'
            },
            {
                name: '[].season',
                type: 'Integer'
            },
            {
                name: '[].date',
                type: 'Date'
            },
            {
                name: '[].id',
                type: 'Integer',
                description: 'Match ID'
            },
            {
                name: '[].time',
                type: 'Time'
            },
            {
                name: '[].user',
                type: 'UserProfile'
            }
        ],
        sample: `{"status":"success","data":[{"rank":1,"season":1,"date":1685157577,"id":284288,"time":433388,"user":{"uuid":"08476f5847fc4daeba74a2544fc9d65b","nickname":"Zylenox","roleType":0,"eloRate":1523,"eloRank":90}},{"rank":2,"season":1,"date":1685696875,"id":300983,"time":457763,"user":{"uuid":"17e787d1d6374f818b294f2319db370d","nickname":"silverrruns","roleType":0,"eloRate":1818,"eloRank":15}}]}`
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
    const defaultContainer = /*html*/ `<div class="container-fluid" id="[[ELEMENT_ID]]"><h2 class="page-title"><strong>[[ENDPOINT_TITLE]]</strong></h2><h4 class="page-title">[[ENDPOINT_DESCRIPTION]]</h4><div class="row"><div class=""><div class="panel"><div class="panel-heading"><h3 class="panel-title"><span class="label label-success">[[ENDPOINT_METHOD]]</span> &nbsp; <code>https://mcsrranked.com/api/[[ENDPOINT_TARGET]]</code></h3></div><div class="panel-body"><table class="table table-hover"><thead><tr><th>Parameter</th><th>Type</th><th>Required?</th><th>Description</th></tr></thead><tbody>[[PARAMS]]</tbody></table></div></div></div><div class=""><div class="panel"><div class="panel-heading pointer" data-toggle="collapse" data-target="#[[ELEMENT_ID]]-type"><h3 class="panel-title">Response Type</h3></div><div class="panel-body collapse" id="[[ELEMENT_ID]]-type"><table class="table table-hover"><thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead><tbody>[[STRUCTS]]</tbody></table></div></div></div><div class=""><div class="panel"><div class="panel-heading pointer" data-toggle="collapse" data-target="#[[ELEMENT_ID]]-sample"><h3 class="panel-title">Show Sample Response</h3></div><div class="panel-body collapse" id="[[ELEMENT_ID]]-sample"><pre>[[RESPONSE_SAMPLE]]</pre></div></div></div></div></div><hr>`;
    const defaultParamRow  = /*html*/ `<tr><td>[[PARAM_NAME]]</td><td><code>[[PARAM_TYPE]]</code></td><td><code>[[PARAM_REQUIRED]]</code></td><td>[[PARAM_DESCRIPTION]]</td></tr>`;
    const defaultStructRow = /*html*/ `<tr><td>[[STRUCT_NAME]]</td><td><code>[[STRUCT_TYPE]]</code></td><td>[[STRUCT_DESCRIPTION]]</td></tr>`;

    const codeBlockRegex = /`(.([\s\w{}])*)`/gi;
    const identifier = endpointKey.replaceAll('/', '-').replace(/[^a-zA-Z0-9\-]/g, '');
    const sampleObject = JSON.parse(endpoint.sample);

    return defaultContainer
    .replaceAll('[[ELEMENT_ID]]', identifier)
    .replaceAll('[[ENDPOINT_TITLE]]', endpoint.title)
    .replaceAll('[[ENDPOINT_DESCRIPTION]]', endpoint.description.replace(codeBlockRegex, '<code>$1</code>'))
    .replaceAll('[[ENDPOINT_METHOD]]', endpoint.method)
    .replaceAll('[[ENDPOINT_TARGET]]', endpointKey)
    .replaceAll('[[STRUCTS]]', endpoint.structures.map(structure => {
        return defaultStructRow
        .replaceAll('[[STRUCT_NAME]]', structure.name)
        .replaceAll('[[STRUCT_TYPE]]', structure.type)
        .replaceAll('[[STRUCT_DESCRIPTION]]', (structure.description ? structure.description.replace(codeBlockRegex, '<code>$1</code>') : ''))
    }).join(''))
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