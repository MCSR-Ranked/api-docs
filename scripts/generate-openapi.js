const fs = require('fs');
const path = require('path');
const vm = require('vm');
const yaml = require('js-yaml');
const objectSchemas = require('./objects');

const responsesPath = path.resolve(__dirname, '..', 'assets', 'scripts', 'responses.js');
const responsesCode = fs.readFileSync(responsesPath, 'utf8');

const wrappedCode = `(function() { ${responsesCode}\n return { responses, endpoints }; })()`;
const sandbox = {
    $: () => ({ html: () => {} }),
    fetch: () => Promise.resolve({ json: () => ({}) }),
    document: {},
};
vm.createContext(sandbox);
const { responses, endpoints } = vm.runInContext(wrappedCode, sandbox);


const spec = {
    openapi: '3.0.3',
    info: {
        title: 'MCSR Ranked API',
        description: 'API for Minecraft Speedrun Ranked.',
        version: '1.0.0',
    },
    servers: [
        { url: 'https://api.mcsrranked.com', description: 'Primary' },
        { url: 'https://mcsrranked.com/api', description: 'Alternative' },
    ],
    paths: {},
    components: {
        securitySchemes: {
            PrivateKey: {
                type: 'apiKey',
                in: 'header',
                name: 'Private-Key',
                description: 'Generated in-game via Profile > Settings > Generate & Copy API Private Key.',
            },
        },
        schemas: {
            ErrorResponse: {
                type: 'object',
                properties: {
                    status: { type: 'string', example: 'error' },
                    data: { type: 'string', nullable: true },
                },
            },
            ...objectSchemas,
        },
    },
};


function mapType(typeStr) {
    if (!typeStr) return {};

    if (typeStr === 'MatchInfo (Advanced)') {
        return { $ref: '#/components/schemas/MatchInfoAdvanced' };
    }

    if (typeStr === 'User') {
        return { $ref: '#/components/schemas/UserProfile' };
    }

    if (typeStr === 'any?' || typeStr === 'Any') {
        return {};
    }

    if (typeStr === 'Connection?') {
        return { type: 'string', nullable: true };
    }

    const nullable = typeStr.endsWith('?') && !typeStr.endsWith('[]?');
    const baseType = nullable ? typeStr.slice(0, -1) : typeStr;

    if (baseType.endsWith('[]')) {
        const inner = baseType.slice(0, -2);
        const result = { type: 'array', items: mapType(inner) };
        if (nullable) result.nullable = true;
        return result;
    }

    if (typeStr.endsWith('[]?')) {
        const inner = typeStr.slice(0, -3);
        return { type: 'array', items: mapType(inner), nullable: true };
    }

    const knownSchemas = [
        'UserProfile', 'Achievement', 'MatchInfo', 'MatchInfoAdvanced',
        'MatchSeed', 'UserIdentifier', 'MatchType', 'Date', 'Time',
    ];
    const simpleSchemaTypes = {
        Date: { type: 'integer', description: 'Epoch time in seconds' },
        Time: { type: 'integer', description: 'Duration in milliseconds' },
        MatchType: { type: 'integer', enum: [1, 2, 3, 4], description: 'Match type' },
        UserIdentifier: { type: 'string', description: 'User identifier' },
    };

    if (knownSchemas.includes(baseType)) {
        if (nullable && simpleSchemaTypes[baseType]) {
            return { ...simpleSchemaTypes[baseType], nullable: true };
        }
        const ref = { $ref: `#/components/schemas/${baseType}` };
        if (nullable) {
            return { allOf: [ref] };
        }
        return ref;
    }

    const primitives = {
        String: 'string',
        Integer: 'integer',
        Boolean: 'boolean',
        Object: 'object',
    };
    if (primitives[baseType]) {
        const result = { type: primitives[baseType] };
        if (nullable) result.nullable = true;
        return result;
    }

    return {};
}


function cleanDescription(desc) {
    if (!desc) return undefined;
    let cleaned = desc.replace(/`([^`]*)`/g, '$1');
    cleaned = cleaned.replace(/&rarr;/g, '->').replace(/&[a-z]+;/gi, '');
    return cleaned;
}


function buildResponseSchema(structures) {
    if (!structures || structures.length === 0) {
        return {};
    }

    if (structures.length === 1 && structures[0].name === 'Array[]') {
        return mapType(structures[0].type);
    }

    if (structures.length === 1 && structures[0].name === 'Object') {
        return mapType(structures[0].type);
    }

    const isTopArray = structures.every((s) => s.name.startsWith('[].'));
    if (isTopArray) {
        const innerStructures = structures.map((s) => ({
            ...s,
            name: s.name.slice(3),
        }));
        return {
            type: 'array',
            items: buildObjectFromStructures(innerStructures),
        };
    }

    return buildObjectFromStructures(structures);
}


function buildObjectFromStructures(structures) {
    const properties = {};
    const grouped = {};

    for (const struct of structures) {
        const { name, type, description } = struct;
        const dotIdx = name.indexOf('.');
        const bracketArrayIdx = name.indexOf('[].');

        const additionalPropMatch = name.match(
            /^(\w+)\.\[([^\]]+)\](.*)$|^(\w+)\.\{([^}]+)\}(.*)$/
        );

        if (additionalPropMatch) {
            const propName = additionalPropMatch[1] || additionalPropMatch[4];
            const rest = additionalPropMatch[3] || additionalPropMatch[6];

            if (!grouped[propName]) grouped[propName] = { additionalProps: [] };
            if (rest) {
                const restName = rest.startsWith('.') ? rest.slice(1) : rest;
                grouped[propName].additionalProps.push({
                    name: restName,
                    type,
                    description,
                });
            } else {
                grouped[propName].leafType = type;
                grouped[propName].leafDescription = description;
            }
            continue;
        }

        if (bracketArrayIdx !== -1 && bracketArrayIdx < (dotIdx === -1 ? Infinity : dotIdx)) {
            const arrayPropName = name.slice(0, bracketArrayIdx);
            const rest = name.slice(bracketArrayIdx + 3);

            if (!grouped[arrayPropName]) grouped[arrayPropName] = { arrayItems: [] };
            if (!grouped[arrayPropName].arrayItems) grouped[arrayPropName].arrayItems = [];
            grouped[arrayPropName].arrayItems.push({ name: rest, type, description });
            continue;
        }

        if (dotIdx !== -1) {
            const parentName = name.slice(0, dotIdx);
            const rest = name.slice(dotIdx + 1);

            if (!grouped[parentName]) grouped[parentName] = { nestedFields: [] };
            if (!grouped[parentName].nestedFields) grouped[parentName].nestedFields = [];
            grouped[parentName].nestedFields.push({ name: rest, type, description });
            continue;
        }

        const schema = mapType(type);
        if (description) schema.description = cleanDescription(description);
        properties[name] = schema;
    }

    for (const [propName, group] of Object.entries(grouped)) {
        if (group.additionalProps && group.additionalProps.length > 0) {
            const innerSchema = buildObjectFromStructures(group.additionalProps);
            properties[propName] = {
                type: 'object',
                additionalProperties: innerSchema,
            };
        } else if (group.leafType) {
            properties[propName] = {
                type: 'object',
                additionalProperties: mapType(group.leafType),
                ...(group.leafDescription
                    ? { description: cleanDescription(group.leafDescription) }
                    : {}),
            };
        }

        if (group.arrayItems && group.arrayItems.length > 0) {
            const itemSchema = buildObjectFromStructures(group.arrayItems);
            properties[propName] = {
                type: 'array',
                items: itemSchema,
                ...(properties[propName]?.description
                    ? { description: properties[propName].description }
                    : {}),
            };
        }

        if (group.nestedFields && group.nestedFields.length > 0) {
            const existing = properties[propName];
            const nested = buildObjectFromStructures(group.nestedFields);
            if (existing && existing.nullable) {
                properties[propName] = { ...nested, nullable: true };
                if (existing.description) properties[propName].description = existing.description;
            } else if (existing && existing.description) {
                properties[propName] = { ...nested, description: existing.description };
            } else {
                properties[propName] = nested;
            }
        }
    }

    return {
        type: 'object',
        properties,
    };
}


const errorResponses = {
    400: {
        description: 'Bad Request',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
        },
    },
    401: {
        description: 'Unauthorized',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
        },
    },
    429: {
        description: 'Too Many Requests',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
        },
    },
};


for (const [endpointKey, endpoint] of Object.entries(endpoints)) {
    const hasOptionalPathParam = endpointKey.includes('{id?}');

    let pathKeys;
    if (hasOptionalPathParam) {
        const withParam = '/' + endpointKey.replace('{id?}', '{id}');
        const withoutParam = '/' + endpointKey.replace('/{id?}', '');
        pathKeys = [withoutParam, withParam];
    } else {
        pathKeys = ['/' + endpointKey];
    }

    for (const pathKey of pathKeys) {
        const isVariantWithParam =
            hasOptionalPathParam && pathKey.includes('{id}');
        const isVariantWithoutParam =
            hasOptionalPathParam && !pathKey.includes('{id}');

        const parameters = [];
        let needsSecurity = false;

        for (const param of endpoint.params) {
            if (
                isVariantWithoutParam &&
                param.name === '{id}'
            ) {
                continue;
            }

            const isPathParam = param.name.startsWith('{') && param.name.endsWith('}');
            const isHeader = param.type.includes('[Header]');

            if (isHeader && param.name === 'Private-Key') {
                needsSecurity = true;
                continue;
            }

            const paramName = isPathParam
                ? param.name.replace(/[{}]/g, '')
                : param.name;

            const paramType = param.type.replace(/\s*\[Header\]\s*/g, '');

            const paramSchema = mapType(paramType);
            const paramObj = {
                name: paramName,
                in: isPathParam ? 'path' : isHeader ? 'header' : 'query',
                required: isPathParam ? true : !!param.required,
                description: cleanDescription(param.description),
            };

            if (isVariantWithParam && paramName === 'id') {
                paramObj.required = false;
            }

            if (Object.keys(paramSchema).length > 0) {
                paramObj.schema = paramSchema;
            } else {
                paramObj.schema = { type: 'string' };
                paramObj.allowEmptyValue = true;
            }

            parameters.push(paramObj);
        }

        const dataSchema = buildResponseSchema(endpoint.structures);
        const successSchema = {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'success' },
                data: dataSchema,
            },
        };

        let operationId = endpoint.title
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+(.)/g, (_, c) => c.toUpperCase())
            .replace(/^\w/, (c) => c.toLowerCase());

        if (isVariantWithParam) {
            operationId += 'ById';
        }

        const operation = {
            summary: endpoint.title,
            description: cleanDescription(endpoint.description),
            operationId,
            tags: [endpoint.category],
        };

        if (parameters.length > 0) {
            operation.parameters = parameters;
        }

        if (needsSecurity) {
            operation.security = [{ PrivateKey: [] }];
        } else {
            operation.security = [];
        }

        operation.responses = {
            200: {
                description: 'Successful response',
                content: {
                    'application/json': {
                        schema: successSchema,
                    },
                },
            },
            ...errorResponses,
        };

        if (!spec.paths[pathKey]) spec.paths[pathKey] = {};
        spec.paths[pathKey][endpoint.method.toLowerCase()] = operation;
    }
}


const output = yaml.dump(spec, {
    lineWidth: 120,
    noRefs: true,
    sortKeys: false,
    quotingType: '"',
    forceQuotes: false,
});

const outPath = path.resolve(__dirname, '..', 'openapi.yaml');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`Generated ${outPath}`);
