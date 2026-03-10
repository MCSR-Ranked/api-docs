const responses = {
    'response/200': `{"status":"success","data":{}}`,
    'response/400': `{"status":"error","data":null}`,
    'response/401': `{"status":"error","data":"invalid \`type\` query. it must be >= 0 or <= 3"}`,
    'response/429': `{"status":"error","data":"Too many requests"}`,
};

const endpoints = {
    'users/{identifier}': {
        title: `Get User Data`,
        method: 'GET',
        category: 'users',
        description: 'Returns `{identifier}`\'s entire profile data.',
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
                description: 'Elo rate of current season, if the user hasn\'t finished placement matches it is `null`'
            },
            {
                name: 'eloRank',
                type: 'Integer?',
                description: 'Current season rank'
            },
            {
                name: 'country',
                type: 'String?',
                description: 'Country code in lowercased ISO 3166-1 alpha-2 format'
            },
            {
                name: 'achievements.display',
                type: 'Achievement[]',
                description: 'Achievements displayed in-game'
            },
            {
                name: 'achievements.total',
                type: 'Achievement[]',
                description: 'Achievements not displayed in-game'
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
                name: 'timestamp.nextDecay',
                type: 'Date?',
                description: 'Date of user\'s next decay time'
            },
            {
                name: 'statistics.season.[key].[ranked | casual]',
                type: 'Integer?',
                description: 'Season statistics for specific match types (`ranked` or `casual`)'
            },
            {
                name: 'statistics.total.[key].[ranked | casual]',
                type: 'Integer?',
                description: 'All-time statistics for specific match types (`ranked` or `casual`)'
            },
            {
                name: 'connections.[key].id',
                type: 'Connection?',
                description: 'Identifier of user\'s third party connections like Twitch, Discord, etc.'
            },
            {
                name: 'connections.[key].name',
                type: 'Connection?',
                description: 'Display name of user\'s third party connections like Twitch, Discord, etc.'
            },
            {
                name: 'seasonResult',
                type: 'Object?',
                description: 'User\'s Elo data of season'
            },
            {
                name: 'seasonResult.last.eloRate',
                type: 'Integer',
                description: 'Current Elo rate this season'
            },
            {
                name: 'seasonResult.last.eloRank',
                type: 'Integer?',
                description: 'Current Elo rank this season'
            },
            {
                name: 'seasonResult.last.phasePoint',
                type: 'Integer',
                description: 'Current phase points this season'
            },
            {
                name: 'seasonResult.highest',
                type: 'Integer',
                description: 'Highest Elo rate this season'
            },
            {
                name: 'seasonResult.lowest',
                type: 'Integer',
                description: 'Lowest Elo rate this season'
            },
            {
                name: 'seasonResult.phases[].phase',
                type: 'Integer',
                description: 'Phase number'
            },
            {
                name: 'seasonResult.phases[].eloRate',
                type: 'Integer',
                description: 'Elo rate at phase end'
            },
            {
                name: 'seasonResult.phases[].eloRank',
                type: 'Integer',
                description: 'Elo rank at phase end'
            },
            {
                name: 'seasonResult.phases[].point',
                type: 'Integer',
                description: 'Phase reward points'
            },
            {
                name: 'weeklyRaces',
                type: 'Object[]',
                description: 'User\'s results of all weekly races'
            },
            {
                name: 'weeklyRaces[].id',
                type: 'Integer',
                description: 'ID of the weekly race'
            },
            {
                name: 'weeklyRaces[].time',
                type: 'Time',
                description: 'Final time of the weekly race'
            },
            {
                name: 'weeklyRaces[].rank',
                type: 'Integer',
                description: 'Rank in the weekly race'
            },
        ],
        sampleUrl: `https://api.mcsrranked.com/users/3c8757790ab0400b8b9e3936e0dd535b`
    },
    'users/{identifier}/matches': {
        title: `Get User Matches`,
        method: 'GET',
        category: 'users',
        description: 'Returns `{identifier}`\'s recent matches',
        params: [
            {
                name: '{identifier}',
                type: 'UserIdentifier',
                required: true,
                description: 'Check the `Objects#UserIdentifier` section.'
            },
            {
                name: 'before',
                type: 'Integer',
                required: false,
                description: 'Match list cursor, it must be match ID. Get matches before this ID.'
            },
            {
                name: 'after',
                type: 'Integer',
                required: false,
                description: 'Match list cursor, it must be match ID. Get matches after this ID.'
            },
            {
                name: 'sort',
                type: 'String',
                required: false,
                description: 'Match list sort option. It must be one of: `newest`, `oldest`, `fastest`, `slowest` (default: `newest`)'
            },
            {
                name: 'count',
                type: 'Integer',
                required: false,
                description: 'Number of matches in the response, it must be between `1` and `100` (default: `20`)'
            },
            {
                name: 'type',
                type: 'MatchType?',
                required: false,
                description: 'Filter by match type (default: `null`)'
            },
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Filter by season (default: current season number)'
            },
            {
                name: 'excludedecay',
                type: 'Boolean',
                required: false,
                description: 'Whether to exclude decayed matches (default: `false`)'
            }
        ],
        structures: [
            {
                name: 'Array[]',
                type: 'MatchInfo[]'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/users/3c8757790ab0400b8b9e3936e0dd535b/matches`
    },
    'users/{identifier1}/versus/{identifier2}': {
        title: `Get Versus Stats`,
        method: 'GET',
        category: 'versus',
        description: 'Returns the match stats between `{identifier1}` and `{identifier2}` for ranked/casual matches. If they haven\'t played each other, a `400` error will be returned.',
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
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Specific season match (default: current season number)'
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
                description: 'Mapping of wins per player, with their UUID as key. `total` key returns the sum of matches.'
            },
            {
                name: 'changes.[key]',
                type: 'Integer',
                description: 'Total Elo rate changes between players'
            },
        ],
        sampleUrl: `https://api.mcsrranked.com/users/3c8757790ab0400b8b9e3936e0dd535b/versus/17e787d1d6374f818b294f2319db370d?season=7`
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
                name: 'before',
                type: 'Integer',
                required: false,
                description: 'Match list cursor, it must be match ID. Get matches before this ID.'
            },
            {
                name: 'after',
                type: 'Integer',
                required: false,
                description: 'Match list cursor, it must be match ID. Get matches after this ID.'
            },
            {
                name: 'count',
                type: 'Integer',
                required: false,
                description: 'Number of matches in the response, it must be between `1` and `100` (default: `20`)'
            },
            {
                name: 'type',
                type: 'MatchType?',
                required: false,
                description: 'Filter by match type (default: `null`)'
            },
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Filter by season (default: current season number)'
            },
        ],
        structures: [
            {
                name: 'Array[]',
                type: 'MatchInfo[]'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/users/3c8757790ab0400b8b9e3936e0dd535b/versus/17e787d1d6374f818b294f2319db370d/matches?season=7`
    },
    'users/{identifier}/seasons': {
        title: `Get All User Season Results`,
        method: 'GET',
        category: 'users',
        description: 'Returns the `{identifier}`\'s entire profile data.',
        params: [
            {
                name: '{identifier}',
                type: 'UserIdentifier',
                required: true,
                description: 'Check the `Objects#UserIdentifier` section.'
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
                description: 'Elo rate of current season, if the user hasn\'t finished placement matches it is `null`'
            },
            {
                name: 'eloRank',
                type: 'Integer?',
                description: 'Current season rank'
            },
            {
                name: 'country',
                type: 'String?',
                description: 'Country code in lowercased ISO 3166-1 alpha-2 format'
            },
            {
                name: 'seasonResults.{season}.last.eloRate',
                type: 'Integer',
                description: 'Current Elo rate this season'
            },
            {
                name: 'seasonResults.{season}.last.eloRank',
                type: 'Integer?',
                description: 'Current Elo rank this season'
            },
            {
                name: 'seasonResults.{season}.last.phasePoint',
                type: 'Integer',
                description: 'Current phase points this season'
            },
            {
                name: 'seasonResults.{season}.highest',
                type: 'Integer',
                description: 'Highest Elo rate this season'
            },
            {
                name: 'seasonResults.{season}.lowest',
                type: 'Integer',
                description: 'Lowest Elo rate this season'
            },
            {
                name: 'seasonResults.{season}.phases[].phase',
                type: 'Integer',
                description: 'Phase number'
            },
            {
                name: 'seasonResults.{season}.phases[].eloRate',
                type: 'Integer',
                description: 'Elo rate at phase end'
            },
            {
                name: 'seasonResults.{season}.phases[].eloRank',
                type: 'Integer',
                description: 'Elo rank at phase end'
            },
            {
                name: 'seasonResults.{season}.phases[].point',
                type: 'Integer',
                description: 'Phase reward points'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/users/3c8757790ab0400b8b9e3936e0dd535b/seasons`
    },
    'users/{identifier}/live': {
        title: `Get User's Live Match Data`,
        method: 'GET',
        category: 'users',
        description: 'Returns real-time match data from the Private Room the player is in. To access this data, a `Private-Key` header is required and the player must be host or co-host of the Private Room.',
        params: [
            {
                name: '{identifier}',
                type: 'UserIdentifier',
                required: true,
                description: 'Check the `Objects#UserIdentifier` section.'
            },
            {
                name: 'Private-Key',
                type: 'String [Header]',
                required: true,
                description: 'It can be generated in-game via Profile &rarr; Settings &rarr; Generate & Copy API Private Key.'
            }
        ],
        structures: [
            {
                name: 'lastId',
                type: 'Integer?',
                description: 'Match ID of previous match. All data is reset when the match ends. You can get previous match data with this.'
            },
            {
                name: 'type',
                type: 'MatchType'
            },
            {
                name: 'status',
                type: 'String',
                description: 'One of `idle`, `counting`, `generate`, `ready`, `running`, `done`'
            },
            {
                name: 'time',
                type: 'Time',
                description: 'Returns `0` if the match has not started.'
            },
            {
                name: 'players',
                type: 'UserProfile[]',
            },
            {
                name: 'spectators',
                type: 'UserProfile[]',
            },
            {
                name: 'timelines[].uuid',
                type: 'String',
                description: 'Player uuid of timeline'
            },
            {
                name: 'timelines[].time',
                type: 'Time',
                description: 'Match time of timeline'
            },
            {
                name: 'timelines[].type',
                type: 'String',
                description: 'Identifier of timeline'
            },
            {
                name: 'completions[].uuid',
                type: 'String',
                description: 'Player uuid of completion'
            },
            {
                name: 'completions[].time',
                type: 'Time',
                description: 'Match time of completion'
            },
        ],
        sampleUrl: null
    },
    'matches': {
        title: `Get Recent Matches`,
        method: 'GET',
        category: 'matches',
        description: 'Returns recent completed matches.',
        params: [
            {
                name: 'before',
                type: 'Integer',
                required: false,
                description: 'Match list cursor, it must be match ID. Get matches before this ID.'
            },
            {
                name: 'after',
                type: 'Integer',
                required: false,
                description: 'Match list cursor, it must be match ID. Get matches after this ID.'
            },
            {
                name: 'count',
                type: 'Integer',
                required: false,
                description: 'Number of matches in the response, it must be between `1` and `100` (default: `20`)'
            },
            {
                name: 'type',
                type: 'MatchType?',
                required: false,
                description: 'Filter by match type (default: `null`)'
            },
            {
                name: 'tag',
                type: 'String',
                required: false,
                description: 'Filter by match tag.'
            },
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Filter by season (default: current season number)'
            },
            {
                name: 'includedecay',
                type: 'any?',
                required: false,
                description: 'Whether to include decay matches. If you want to use it, just add the key of the parameter, such as `?includedecay`'
            },
        ],
        structures: [
            {
                name: 'Array[]',
                type: 'MatchInfo[]'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/matches`,
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
                description: 'ID of the match'
            }
        ],
        structures: [
            {
                name: 'Object',
                type: 'MatchInfo (Advanced)'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/matches/2100446`
    },
    'live': {
        title: `Get Online Players & Live Stream Matches`,
        method: 'GET',
        category: 'live',
        description: 'Returns the online playercount and live matches with public streams.<br>To make your stream public:<ol><li>Link your Twitch account with your MCSR Ranked profile.</li><li>Make your Twitch public on your MCSR Ranked profile.</li><li>Set "Public Stream" option in MCSR Ranked Settings.</li><li>Start streaming on Twitch.</li></ol>',
        params: [],
        structures: [
            {
                name: 'players',
                type: 'Integer',
                description: 'Concurrent number of players who are connected to the MCSR Ranked server'
            },
            {
                name: 'liveMatches[].currentTime',
                type: 'Time',
            },
            {
                name: 'liveMatches[].players',
                type: 'UserProfile[]',
                description: 'Only players with public stream enabled are included.'
            },
            {
                name: 'liveMatches[].data.{UUID}.liveUrl',
                type: 'String?',
                description: 'Live stream url of player. This is `null` if the player hasn\'t activated public stream.'
            },
            {
                name: 'liveMatches[].data.{UUID}.timeline.time',
                type: 'Time',
                description: 'Match time of last player split update.'
            },
            {
                name: 'liveMatches[].data.{UUID}.timeline.type',
                type: 'String',
                description: 'Timeline identifier of last player split update.'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/live`
    },
    'leaderboard': {
        title: `Get Elo Leaderboard`,
        method: 'GET',
        category: 'leaderboards',
        description: 'Returns the top 150 players on the leaderboard, ranked by their Elo rate (it\'s not always 150 players due to same ranks)',
        params: [
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Specific season (default: current season number)'
            },
            {
                name: 'country',
                type: 'String',
                required: false,
                description: 'Specific country code with lowercased ISO 3166-1 alpha-2 format'
            }
        ],
        structures: [
            {
                name: 'season.startsAt',
                type: 'Date',
                description: 'Date of season start.'
            },
            {
                name: 'season.endsAt',
                type: 'Date',
                description: 'Date of season end.'
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
            },
            {
                name: 'users[].seasonResult.phasePoint',
                type: 'Integer',
                description: 'Final phase points of player in target season'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/leaderboard`
    },
    'phase-leaderboard': {
        title: `Get Season Phase Points Leaderboard`,
        method: 'GET',
        category: 'leaderboards',
        description: 'Returns the top 100 players ranked by their Phase Points',
        params: [
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Filter by season (default: current season number)'
            },
            {
                name: 'country',
                type: 'String',
                required: false,
                description: 'Filter by country (format: ISO 3166-1 alpha-2)'
            },
            {
                name: 'predicted',
                type: 'Any',
                required: false,
                description: 'Get predicted phase points leaderboard. Only works with the current season'
            }
        ],
        structures: [
            {
                name: 'phase.endsAt',
                type: 'Date?',
                description: 'Date the season ends. If target season is not current season it is `null`'
            },
            {
                name: 'phase.number',
                type: 'Integer?',
                description: 'Phase number of the season. If target season is not current season it is `null`'
            },
            {
                name: 'phase.season',
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
            },
            {
                name: 'users[].seasonResult.phasePoint',
                type: 'Integer',
                description: 'Final phase points of player in target season'
            },
            {
                name: 'users[].predPhasePoint',
                type: 'Integer',
                description: 'Predicted phase points of player for next phase. It will be same value with `users[].seasonResult.phasePoint` if response is a past season.'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/phase-leaderboard?predicted`
    },
    'record-leaderboard': {
        title: `Get Season Best Time Leaderboard`,
        method: 'GET',
        category: 'leaderboards',
        description: 'Returns the 100 fastest runs of a season',
        params: [
            {
                name: 'season',
                type: 'Integer',
                required: false,
                description: 'Filter by season. If it\'s `0`, it will default to the current season. If it\'s not defined, it combines all seasons. (default: undefined)'
            },
            {
                name: 'distinct',
                type: 'any?',
                required: false,
                description: 'Whether to only get distinct runners. If enabled, only the fastest run of each runner is returned.'
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
            },
            {
                name: '[].seed',
                type: 'MatchSeed'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/record-leaderboard`
    },
    'weekly-race/{id?}': {
        title: `Get Weekly Race Leaderboard`,
        method: 'GET',
        category: 'weekly-races',
        description: 'Returns Weekly Race info and leaderboard',
        params: [
            {
                name: '{id}',
                type: 'Integer',
                required: false,
                description: 'Specific week number (as `id` in this endpoint) (default: current weekly race)'
            }
        ],
        structures: [
            {
                name: 'id',
                type: 'Integer',
            },
            {
                name: 'seed.overworld',
                type: 'String',
            },
            {
                name: 'seed.nether',
                type: 'String',
            },
            {
                name: 'seed.theEnd',
                type: 'String',
            },
            {
                name: 'seed.rng',
                type: 'String',
            },
            {
                name: 'endsAt',
                type: 'Date',
            },
            {
                name: 'leaderboard[].rank',
                type: 'Integer'
            },
            {
                name: 'leaderboard[].player',
                type: 'User'
            },
            {
                name: 'leaderboard[].time',
                type: 'Time'
            },
            {
                name: 'leaderboard[].replayExist',
                type: 'Boolean'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/weekly-race`
    },
};


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
    if (!responses[endpoint]) throw `'${endpoint}' does not exist!`;
    return JSON.parse(responses[endpoint]);
}

function getSampleResponse(url, id) {
    if ($(`#${id}`).html()) return;
    if (!url.startsWith('https://')) {
        $(`#${id}`).html(`<pre>This endpoint doesn't support sample response. :(</pre>`);
        return;
    }
    $(`#${id}`).html(`<pre>Loading...</pre>`);
    fetch(url).then(r => r.json()).then(json => {
        const limitArraysToFive = (obj) => {
            if (Array.isArray(obj)) {
                return obj.slice(0, 3).map(limitArraysToFive);
            } else if (obj !== null && typeof obj === 'object') {
                const newObj = {};
                for (const key in obj) {
                    newObj[key] = limitArraysToFive(obj[key]);
                }
                return newObj;
            } else {
                return obj;
            }
        };

        $(`#${id}`).html(`<pre>${JSON.stringify(limitArraysToFive(json), null, 4)}</pre><a href="${url}" target="_blank">Show Full Response</a>`);
    });
}

function buildEndpointContainer(endpointKey, endpoint) {
    const defaultContainer = /*html*/ `<div class="container-fluid" id="[[ELEMENT_ID]]"><h2 class="page-title"><strong>[[ENDPOINT_TITLE]]</strong></h2><h4 class="page-title">[[ENDPOINT_DESCRIPTION]]</h4><div class="row"><div class=""><div class="panel"><div class="panel-heading"><h3 class="panel-title"><span class="label label-success">[[ENDPOINT_METHOD]]</span> &nbsp; <code>https://api.mcsrranked.com/[[ENDPOINT_TARGET]]</code></h3></div><div class="panel-body"><table class="table table-hover"><thead><tr><th>Parameter</th><th>Type</th><th>Required?</th><th>Description</th></tr></thead><tbody>[[PARAMS]]</tbody></table></div></div></div><div class=""><div class="panel"><div class="panel-heading pointer" data-toggle="collapse" data-target="#[[ELEMENT_ID]]-type"><h3 class="panel-title">Response Type</h3></div><div class="panel-body collapse" id="[[ELEMENT_ID]]-type"><table class="table table-hover"><thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead><tbody>[[STRUCTS]]</tbody></table></div></div></div><div class=""><div class="panel"><div class="panel-heading pointer" data-toggle="collapse" data-target="#[[ELEMENT_ID]]-sample" onclick="getSampleResponse('[[SAMPLE_URL]]', '[[ELEMENT_ID]]-sample')"><h3 class="panel-title">Show Sample Response</h3></div><div class="panel-body collapse" id="[[ELEMENT_ID]]-sample"></div></div></div></div></div><hr>`;
    const defaultParamRow = /*html*/ `<tr><td>[[PARAM_NAME]]</td><td><code>[[PARAM_TYPE]]</code></td><td><code>[[PARAM_REQUIRED]]</code></td><td>[[PARAM_DESCRIPTION]]</td></tr>`;
    const defaultStructRow = /*html*/ `<tr><td>[[STRUCT_NAME]]</td><td><code>[[STRUCT_TYPE]]</code></td><td>[[STRUCT_DESCRIPTION]]</td></tr>`;

    const codeBlockRegex = /`(.([\s\w-{}\#])*)`/gi;
    const identifier = endpointKey.replaceAll('/', '-').replace(/[^a-zA-Z0-9\-]/g, '');

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
                .replaceAll('[[STRUCT_DESCRIPTION]]', (structure.description ? structure.description.replace(codeBlockRegex, '<code>$1</code>') : ''));
        }).join(''))
        .replaceAll('[[SAMPLE_URL]]', endpoint.sampleUrl)
        .replaceAll('[[PARAMS]]', endpoint.params.map(param => {
            const isRequired = (value) => param.required ? `<strong>${value}</strong>` : value;
            return defaultParamRow
                .replaceAll('[[PARAM_NAME]]', isRequired(param.name))
                .replaceAll('[[PARAM_TYPE]]', isRequired(param.type))
                .replaceAll('[[PARAM_REQUIRED]]', isRequired(param.required))
                .replaceAll('[[PARAM_DESCRIPTION]]', isRequired(param.description.replace(codeBlockRegex, '<code>$1</code>')));
        }).join(''));
}

function buildEndpointSidebar(endpointKey, endpoint) {
    const defaultSideRow = /*html*/ `<li><a href="#[[ELEMENT_ID]]" class=""><span class="label label-success">[[ENDPOINT_METHOD]]</span> &nbsp; [[ENDPOINT_TITLE]]</a></li>`;

    const identifier = endpointKey.replaceAll('/', '-').replace(/[^a-zA-Z0-9\-]/g, '');

    return defaultSideRow
        .replaceAll('[[ELEMENT_ID]]', identifier)
        .replaceAll('[[ENDPOINT_TITLE]]', endpoint.title)
        .replaceAll('[[ENDPOINT_METHOD]]', endpoint.method);
}
