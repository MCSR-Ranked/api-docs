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
        ],
        sample: `{"status":"success","data":{"uuid":"7665f76f431b41c6b321bea16aff913b","nickname":"lowk3y_","roleType":0,"eloRate":1966,"eloRank":4,"achievements":{"display":[{"id":"playoffsResult","date":1696807856,"data":["2"],"level":1},{"id":"seasonResult","date":1695081661,"data":["2","1"],"level":1},{"id":"bestTime","date":1706794941,"data":[],"level":11}],"total":[{"id":"highestWinStreak","date":1706794941,"data":[],"level":6,"goal":20},{"id":"playedMatches","date":1706794941,"data":[],"level":10,"goal":5000},{"id":"playtime","date":1706794941,"data":[],"level":8,"goal":3600000000},{"id":"wins","date":1706794941,"data":[],"level":9,"goal":2000},{"id":"seasonResult","date":1704499267,"data":["3","3"],"level":2},{"id":"seasonResult","date":1686787247,"data":["1","8"],"level":3}]},"timestamp":{"firstOnline":1676490707,"lastOnline":1707732310,"lastRanked":1707739886},"statistics":{"season":{"bestTime":{"ranked":495485,"casual":503736},"highestWinStreak":{"ranked":12,"casual":2},"currentWinStreak":{"ranked":0,"casual":1},"playedMatches":{"ranked":198,"casual":11},"playtime":{"ranked":128755994,"casual":6621089},"forfeits":{"ranked":1,"casual":0},"completions":{"ranked":112,"casual":2},"wins":{"ranked":135,"casual":4},"loses":{"ranked":53,"casual":4}},"total":{"bestTime":{"ranked":380341,"casual":489962},"highestWinStreak":{"ranked":18,"casual":3},"currentWinStreak":{"ranked":0,"casual":1},"playedMatches":{"ranked":2864,"casual":46},"playtime":{"ranked":1933913181,"casual":14962658},"forfeits":{"ranked":171,"casual":13},"completions":{"ranked":1345,"casual":8},"wins":{"ranked":1809,"casual":17},"loses":{"ranked":959,"casual":19}}},"connections":{"discord":{"id":"1037457184952434819","name":"lowkey#0996"},"youtube":{"id":"UC_HX7WdiAWRZgcG7aOYtCNg","name":"lowkey"},"twitch":{"id":"0lowkey","name":"0lowkey"}},"seasonResult":{"last":{"eloRate":1966,"eloRank":4,"phasePoint":50},"highest":2126,"lowest":1941,"phases":[{"phase":1,"eloRate":2126,"eloRank":1,"point":50}]}}}`,
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
        sample: `{"status":"success","data":{"players":[{"uuid":"a0c06d33c69941d09b22e0c98c4233fd","nickname":"jamyreaf","roleType":0,"eloRate":1637,"eloRank":44},{"uuid":"af22aaab9ee74596a3578bd6345d25b5","nickname":"Priffin","roleType":0,"eloRate":1637,"eloRank":44}],"results":{"ranked":{"total":3,"a0c06d33c69941d09b22e0c98c4233fd":2,"af22aaab9ee74596a3578bd6345d25b5":1},"casual":{"total":0,"a0c06d33c69941d09b22e0c98c4233fd":0,"af22aaab9ee74596a3578bd6345d25b5":0}},"changes":{"a0c06d33c69941d09b22e0c98c4233fd":33,"af22aaab9ee74596a3578bd6345d25b5":-33}}}`,
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
        description: 'Returns Top 150 Leaderboard for Elo rates (it\'s not always 150 players due to same ranks)',
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
            },
            {
                name: 'users[].seasonResult.eloRank',
                type: 'Integer',
                description: 'Final phase points of player in target season'
            }
        ],
        sample: `{"status":"success","data":{"season":{"endsAt":1712448000,"number":4},"users":[{"uuid":"3c8757790ab0400b8b9e3936e0dd535b","nickname":"doogile","roleType":3,"eloRate":2175,"eloRank":1,"seasonResult":{"eloRate":2175,"eloRank":1,"phasePoint":40}},{"uuid":"17e787d1d6374f818b294f2319db370d","nickname":"silverrruns","roleType":0,"eloRate":2002,"eloRank":2,"seasonResult":{"eloRate":2002,"eloRank":2,"phasePoint":25}},{"uuid":"70eb9286e3e24153a8b37c8f884f1292","nickname":"7rowl","roleType":0,"eloRate":1969,"eloRank":3,"seasonResult":{"eloRate":1969,"eloRank":3,"phasePoint":35}},{"uuid":"7665f76f431b41c6b321bea16aff913b","nickname":"lowk3y_","roleType":0,"eloRate":1966,"eloRank":4,"seasonResult":{"eloRate":1966,"eloRank":4,"phasePoint":50}},{"uuid":"af22aaab9ee74596a3578bd6345d25b5","nickname":"Priffin","roleType":0,"eloRate":1955,"eloRank":5,"seasonResult":{"eloRate":1955,"eloRank":5,"phasePoint":25}},{"uuid":"a29a2e3d1ed649f8b122de8ddad2668a","nickname":"Jud0zwerg","roleType":0,"eloRate":1446,"eloRank":147,"seasonResult":{"eloRate":1446,"eloRank":147,"phasePoint":0}},{"uuid":"0388b80ebe6c4216b4a8305c0cd27894","nickname":"tommorerow","roleType":1,"eloRate":1445,"eloRank":148,"seasonResult":{"eloRate":1445,"eloRank":148,"phasePoint":5}},{"uuid":"8021b1eb133346c3b0b88d19c5be9188","nickname":"gabboooz","roleType":0,"eloRate":1443,"eloRank":149,"seasonResult":{"eloRate":1443,"eloRank":149,"phasePoint":0}},{"uuid":"aa0aee82f7a94591a076331d899f836c","nickname":"sacanagem_online","roleType":0,"eloRate":1439,"eloRank":150,"seasonResult":{"eloRate":1439,"eloRank":150,"phasePoint":5}},{"uuid":"c7802cb7c30c47aabc1a7ec790ff2260","nickname":"iKme_","roleType":0,"eloRate":1439,"eloRank":150,"seasonResult":{"eloRate":1439,"eloRank":150,"phasePoint":0}}]}}`,
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
                description: 'Current phase number of the season. If season is old, it will be `null`'
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
                name: 'users[].seasonResult.eloRank',
                type: 'Integer',
                description: 'Final phase points of player in target season'
            }
        ],
        sample: `{"status":"success","data":{"phase":{"endsAt":1709769600,"number":2,"season":4},"users":[{"uuid":"7665f76f431b41c6b321bea16aff913b","nickname":"lowk3y_","roleType":0,"eloRate":1966,"eloRank":4,"seasonResult":{"eloRate":1966,"eloRank":4,"phasePoint":50}},{"uuid":"3c8757790ab0400b8b9e3936e0dd535b","nickname":"doogile","roleType":3,"eloRate":2175,"eloRank":1,"seasonResult":{"eloRate":2175,"eloRank":1,"phasePoint":40}},{"uuid":"70eb9286e3e24153a8b37c8f884f1292","nickname":"7rowl","roleType":0,"eloRate":1969,"eloRank":3,"seasonResult":{"eloRate":1969,"eloRank":3,"phasePoint":35}},{"uuid":"562a308be86c4ec09438387860e792cc","nickname":"Oxidiot","roleType":0,"eloRate":1942,"eloRank":8,"seasonResult":{"eloRate":1942,"eloRank":8,"phasePoint":30}},{"uuid":"17e787d1d6374f818b294f2319db370d","nickname":"silverrruns","roleType":0,"eloRate":2002,"eloRank":2,"seasonResult":{"eloRate":2002,"eloRank":2,"phasePoint":25}},{"uuid":"af22aaab9ee74596a3578bd6345d25b5","nickname":"Priffin","roleType":0,"eloRate":1955,"eloRank":5,"seasonResult":{"eloRate":1955,"eloRank":5,"phasePoint":25}},{"uuid":"fa61606e8131484c8dee506d1ff9a8dc","nickname":"AutomattPL","roleType":3,"eloRate":1947,"eloRank":6,"seasonResult":{"eloRate":1947,"eloRank":6,"phasePoint":25}},{"uuid":"aa0aee82f7a94591a076331d899f836c","nickname":"sacanagem_online","roleType":0,"eloRate":1439,"eloRank":150,"seasonResult":{"eloRate":1439,"eloRank":150,"phasePoint":5}},{"uuid":"5a2cb29136eb46529adc03aa4583a2d2","nickname":"GradientGray","roleType":0,"eloRate":1412,"eloRank":180,"seasonResult":{"eloRate":1412,"eloRank":180,"phasePoint":5}},{"uuid":"745a819973974fe1bb1608e57fd439b6","nickname":"centuriee","roleType":0,"eloRate":1412,"eloRank":180,"seasonResult":{"eloRate":1412,"eloRank":180,"phasePoint":5}},{"uuid":"4c3bc64c9f0a4cd988cad7703d80379e","nickname":"ColeTM","roleType":0,"eloRate":1392,"eloRank":209,"seasonResult":{"eloRate":1392,"eloRank":209,"phasePoint":5}}]}}`
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