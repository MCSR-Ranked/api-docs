const responses = {
    'response/200': `{"status":"success","data":{}}`,
    'response/400': `{"status":"error","data":null}`,
    'response/401': `{"status":"error","data":"invalid \`type\` query. it must be >= 0 or <= 3"}`,
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
                name: 'country',
                type: 'String?',
                description: 'country code with lowercased ISO 3166-1 alpha-2 format'
            },
            {
                name: 'achievements.display',
                type: 'Achievement[]',
                description: 'A list of achievements to be displayed ingame'
            },
            {
                name: 'achievements.total',
                type: 'Achievement[]',
                description: 'A list of user\'s every achievements except `achievements.display`'
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
                name: 'seasonResult.last.phasePoint',
                type: 'Integer',
                description: 'Last phase points of season'
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
            {
                name: 'seasonResult.phases[].phase',
                type: 'Integer',
                description: 'Phase number'
            },
            {
                name: 'seasonResult.phases[].eloRate',
                type: 'Integer',
                description: 'Elo rate at phase ended'
            },
            {
                name: 'seasonResult.phases[].eloRank',
                type: 'Integer',
                description: 'Elo rank at phase ended'
            },
            {
                name: 'seasonResult.phases[].point',
                type: 'Integer',
                description: 'Phase reword point'
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
        description: 'Returns the `{identifier}`\'s recent matches',
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
                description: 'Cursor of match list, it must be match ID. get matches before than ID.'
            },
            {
                name: 'after',
                type: 'Integer',
                required: false,
                description: 'Cursor of match list, it must be match ID. get matches after than ID.'
            },
            {
                name: 'sort',
                type: 'String',
                required: false,
                description: 'Match list sort option. it must be one of these values: `newest`, `oldest`, `fastest`, `slowest` (default: `newest`)'
            },
            {
                name: 'count',
                type: 'Integer',
                required: false,
                description: 'Number of match count each page, it must `1` to `100`. (default: `20`)'
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
        sampleUrl: `https://api.mcsrranked.com/users/3c8757790ab0400b8b9e3936e0dd535b/matches`
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
                description: '`total` is just matches count, otherwise are win count of specific player (UUID)'
            },
            {
                name: 'changes.[key]',
                type: 'Integer',
                description: 'Total Elo rate changes in a match between both players'
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
                description: 'Cursor of match list, it must be match ID. get matches before than ID.'
            },
            {
                name: 'after',
                type: 'Integer',
                required: false,
                description: 'Cursor of match list, it must be match ID. get matches after than ID.'
            },
            {
                name: 'count',
                type: 'Integer',
                required: false,
                description: 'Number of match count each page, it must `1` to `100`. (default: `20`)'
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
        sampleUrl: `https://api.mcsrranked.com/users/3c8757790ab0400b8b9e3936e0dd535b/versus/17e787d1d6374f818b294f2319db370d/matches?season=7`
    },
    'users/{identifier}/seasons': {
        title: `Get User All of Season Results Data`,
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
                description: 'Elo rate of current season, If user haven\'t finished placement matches it will be `null`'
            },
            {
                name: 'eloRank',
                type: 'Integer?',
                description: 'rank of current season'
            },
            {
                name: 'country',
                type: 'String?',
                description: 'country code with lowercased ISO 3166-1 alpha-2 format'
            },
            {
                name: 'seasonResults.{season}.last.eloRate',
                type: 'Integer',
                description: 'Last Elo rate of season'
            },
            {
                name: 'seasonResults.{season}.last.eloRank',
                type: 'Integer?',
                description: 'Last Elo rank of season'
            },
            {
                name: 'seasonResults.{season}.last.phasePoint',
                type: 'Integer',
                description: 'Last phase points of season'
            },
            {
                name: 'seasonResults.{season}.highest',
                type: 'Integer',
                description: 'Highest Elo rate of season'
            },
            {
                name: 'seasonResults.{season}.lowest',
                type: 'Integer',
                description: 'Lowest Elo rate of season'
            },
            {
                name: 'seasonResults.{season}.phases[].phase',
                type: 'Integer',
                description: 'Phase number'
            },
            {
                name: 'seasonResults.{season}.phases[].eloRate',
                type: 'Integer',
                description: 'Elo rate at phase ended'
            },
            {
                name: 'seasonResults.{season}.phases[].eloRank',
                type: 'Integer',
                description: 'Elo rank at phase ended'
            },
            {
                name: 'seasonResults.{season}.phases[].point',
                type: 'Integer',
                description: 'Phase reword point'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/users/3c8757790ab0400b8b9e3936e0dd535b/seasons`
    },
    'users/{identifier}/live': {
        title: `Get User's Live Match Data`,
        method: 'GET',
        category: 'users',
        description: 'Returns real-time match data from the Private Room the player is in. To access this data, a `Private-Key` header is required. And, the player must be host or co-host of the Private Room.',
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
                description: 'It can be generated in-game via Profile -> Settings -> Generate & Copy API Private Key.'
            }
        ],
        structures: [
            {
                name: 'lastId',
                type: 'Integer?',
                description: 'Match ID of previous match. All data will be reset when the match has ended. You can get previous match data with this.'
            },
            {
                name: 'type',
                type: 'MatchType'
            },
            {
                name: 'status',
                type: 'String',
                description: 'It will be one of these value: `idle`, `counting`, `generate`, `ready`, `running`, `done`'
            },
            {
                name: 'time',
                type: 'Time',
                description: 'It will be `0` if match has not started.'
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
    'matches/': {
        title: `Get Recent Matches`,
        method: 'GET',
        category: 'matches',
        description: 'Returns the recent matches.',
        params: [
            {
                name: 'before',
                type: 'Integer',
                required: false,
                description: 'Cursor of match list, it must be match ID. get matches before than ID.'
            },
            {
                name: 'after',
                type: 'Integer',
                required: false,
                description: 'Cursor of match list, it must be match ID. get matches after than ID.'
            },
            {
                name: 'count',
                type: 'Integer',
                required: false,
                description: 'Number of match count each page, it must `1` to `100`. (default: `20`)'
            },
            {
                name: 'type',
                type: 'MatchType?',
                required: false,
                description: 'Only returns match list of the selected match type. (default: `null`)'
            },
            {
                name: 'tag',
                type: 'String',
                required: false,
                description: 'Specific tag of match'
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
                description: 'ID of match'
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
    'live/': {
        title: `Get Online Players & Live Stream Matches`,
        method: 'GET',
        category: 'live',
        description: 'Returns the online players count and live matches with public streams.<br>You can activate public stream by follow this steps: <ol><li>Link Twitch account with MCSR Ranked profile.</li><li>Make Twitch to public on MCSR Ranked profile.</li><li>Set "Public Stream" option in MCSR Ranked Settings.</li><li>Start your streaming on Twitch.</li></ol>',
        params: [],
        structures: [
            {
                name: 'players',
                type: 'Integer',
                description: 'Concurrent players count who connected to MCSR Ranked server'
            },
            {
                name: 'liveMatches[].currentTime',
                type: 'Time',
            },
            {
                name: 'liveMatches[].players',
                type: 'UserProfile[]',
                description: 'Only players with public stream activated will be included.'
            },
            {
                name: 'liveMatches[].data.{UUID}.liveUrl',
                type: 'String?',
                description: 'Live stream url of player. it\'s `null` if player hasn\'t activated public stream.'
            },
            {
                name: 'liveMatches[].data.{UUID}.timeline.time',
                type: 'Time',
                description: 'Match time of last player split update.'
            },
            {
                name: 'liveMatches[].data.{UUID}.timeline.type',
                type: 'String',
                description: 'Timeline idenfitier of last player split update.'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/live`
    },
    'leaderboard': {
        title: `Get Elo Leaderboard`,
        method: 'GET',
        category: 'leaderboards',
        description: 'Returns Top 150 Leaderboard for Elo rates (it\'s not always 150 players due to same ranks)',
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
                description: 'Date of season starts.'
            },
            {
                name: 'season.endsAt',
                type: 'Date',
                description: 'Date of season ends.'
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
        description: 'Returns Top 100 Phase Points Leaderboard for Current Season',
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
            },
            {
                name: 'predicted',
                type: 'Any',
                required: false,
                description: 'Get predicted phase points leaderboard. only works with current season'
            }
        ],
        structures: [
            {
                name: 'phase.endsAt',
                type: 'Date?',
                description: 'Date of season ends. If target season is not current season it will be `null`'
            },
            {
                name: 'phase.number',
                type: 'Integer?',
                description: 'Current phase number of the season. If target season is not current season it will be `null`'
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
                description: 'Predicted phase points of player for next phase. It will be same value with `users[].seasonResult.phasePoint` if response is an past season.'
            }
        ],
        sampleUrl: `https://api.mcsrranked.com/phase-leaderboard?predicted`
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
                description: 'Specific season. If it\'s `0`, target season will be current season. If it\'s not defined, get leaderboard for all seasons. (default: undefined)'
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
                description: 'Specific week number (as `id` in this endpoint). (default: current weekly race)'
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
        }

        $(`#${id}`).html(`<pre>${JSON.stringify(limitArraysToFive(json), null, 4)}</pre><a href="${url}" target="_blank">Show Full Response</a>`);
    })
}

function buildEndpointContainer(endpointKey, endpoint) {
    const defaultContainer = /*html*/ `<div class="container-fluid" id="[[ELEMENT_ID]]"><h2 class="page-title"><strong>[[ENDPOINT_TITLE]]</strong></h2><h4 class="page-title">[[ENDPOINT_DESCRIPTION]]</h4><div class="row"><div class=""><div class="panel"><div class="panel-heading"><h3 class="panel-title"><span class="label label-success">[[ENDPOINT_METHOD]]</span> &nbsp; <code>https://mcsrranked.com/api/[[ENDPOINT_TARGET]]</code></h3></div><div class="panel-body"><table class="table table-hover"><thead><tr><th>Parameter</th><th>Type</th><th>Required?</th><th>Description</th></tr></thead><tbody>[[PARAMS]]</tbody></table></div></div></div><div class=""><div class="panel"><div class="panel-heading pointer" data-toggle="collapse" data-target="#[[ELEMENT_ID]]-type"><h3 class="panel-title">Response Type</h3></div><div class="panel-body collapse" id="[[ELEMENT_ID]]-type"><table class="table table-hover"><thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead><tbody>[[STRUCTS]]</tbody></table></div></div></div><div class=""><div class="panel"><div class="panel-heading pointer" data-toggle="collapse" data-target="#[[ELEMENT_ID]]-sample" onclick="getSampleResponse('[[SAMPLE_URL]]', '[[ELEMENT_ID]]-sample')"><h3 class="panel-title">Show Sample Response</h3></div><div class="panel-body collapse" id="[[ELEMENT_ID]]-sample"></div></div></div></div></div><hr>`;
    const defaultParamRow  = /*html*/ `<tr><td>[[PARAM_NAME]]</td><td><code>[[PARAM_TYPE]]</code></td><td><code>[[PARAM_REQUIRED]]</code></td><td>[[PARAM_DESCRIPTION]]</td></tr>`;
    const defaultStructRow = /*html*/ `<tr><td>[[STRUCT_NAME]]</td><td><code>[[STRUCT_TYPE]]</code></td><td>[[STRUCT_DESCRIPTION]]</td></tr>`;

    const codeBlockRegex = /`(.([\s\w{}])*)`/gi;
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
        .replaceAll('[[STRUCT_DESCRIPTION]]', (structure.description ? structure.description.replace(codeBlockRegex, '<code>$1</code>') : ''))
    }).join(''))
    .replaceAll('[[SAMPLE_URL]]', endpoint.sampleUrl)
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