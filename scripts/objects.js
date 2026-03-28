const fs = require('fs');
const path = require('path');
const vm = require('vm');

const objectsPath = path.resolve(__dirname, '..', 'assets', 'scripts', 'objects.js');
const objectsCode = fs.readFileSync(objectsPath, 'utf8');

const wrappedCode = `(function() { ${objectsCode}\n return { objects }; })()`;
const sandbox = {};
vm.createContext(sandbox);
const { objects } = vm.runInContext(wrappedCode, sandbox);


function mapFieldType(typeStr) {
    const nullable = typeStr.endsWith('?');
    const base = nullable ? typeStr.slice(0, -1) : typeStr;

    if (base.endsWith('[]')) {
        const inner = base.slice(0, -2);
        const result = { type: 'array', items: mapFieldType(inner) };
        if (nullable) result.nullable = true;
        return result;
    }

    const refs = ['UserProfile', 'Achievement', 'MatchInfo', 'MatchSeed', 'MatchType', 'Date', 'Time', 'UserIdentifier'];
    if (refs.includes(base)) {
        const ref = { $ref: `#/components/schemas/${base}` };
        if (nullable) return { allOf: [ref] };
        return ref;
    }

    const primitives = { String: 'string', Integer: 'integer', Boolean: 'boolean' };
    if (primitives[base]) {
        const result = { type: primitives[base] };
        if (nullable) result.nullable = true;
        return result;
    }

    return {};
}


function stripHtml(str) {
    if (!str) return undefined;
    return str.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, '');
}


const schemas = {};

for (const [name, obj] of Object.entries(objects)) {
    if (name === 'MatchType') {
        schemas.MatchType = {
            type: 'integer',
            description: 'Match type: 1 = Casual, 2 = Ranked, 3 = Private Room, 4 = Event Mode',
            enum: obj.values.map((v) => v.value),
        };
        continue;
    }

    if (name === 'UserIdentifier') {
        schemas.UserIdentifier = {
            type: 'string',
            description: stripHtml(obj.description),
        };
        continue;
    }

    if (name === 'Date') {
        schemas.Date = {
            type: 'integer',
            description: stripHtml(obj.description),
        };
        continue;
    }

    if (name === 'Time') {
        schemas.Time = {
            type: 'integer',
            description: stripHtml(obj.description),
        };
        continue;
    }

    if (!obj.fields) continue;

    const properties = {};
    const required = [];
    const grouped = {};

    for (const field of obj.fields) {
        const desc = stripHtml(field.description);
        const arrayMatch = field.name.match(/^(\w+)\[\]\.(\w+)$/);
        const dotMatch = field.name.match(/^(\w+)\.(\w+)$/);

        if (arrayMatch) {
            const [, arrName, subField] = arrayMatch;
            if (!grouped[arrName]) grouped[arrName] = [];
            const schema = mapFieldType(field.type);
            if (desc) schema.description = desc;
            grouped[arrName].push({ name: subField, schema });
            continue;
        }

        if (dotMatch) {
            const [, parent, child] = dotMatch;
            if (!grouped[parent]) grouped[parent] = [];
            const schema = mapFieldType(field.type);
            if (desc) schema.description = desc;
            grouped[parent].push({ name: child, schema, nested: true });
            continue;
        }

        const schema = mapFieldType(field.type);
        if (desc) schema.description = desc;
        properties[field.name] = schema;

        if (!field.type.endsWith('?')) {
            required.push(field.name);
        }
    }

    for (const [groupName, fields] of Object.entries(grouped)) {
        const isArray = fields.some((f) => !f.nested);
        const props = {};
        for (const f of fields) {
            props[f.name] = f.schema;
        }
        if (isArray) {
            properties[groupName] = {
                type: 'array',
                items: { type: 'object', properties: props },
            };
        } else {
            properties[groupName] = { type: 'object', properties: props };
        }
    }

    const schema = {
        type: 'object',
        description: stripHtml(obj.description) || `${name} data`,
        properties,
    };
    if (required.length > 0) schema.required = required;

    schemas[name] = schema;
}

const advancedFields = objects.MatchInfo.fields.filter(
    (f) => f.description && f.description.includes('(Advanced)')
);
const advancedProps = {};
for (const field of advancedFields) {
    const arrayMatch = field.name.match(/^(\w+)\[\]\.(\w+)$/);
    if (arrayMatch) {
        const [, arrName, subField] = arrayMatch;
        if (!advancedProps[arrName]) {
            advancedProps[arrName] = { type: 'array', items: { type: 'object', properties: {} } };
        }
        const schema = mapFieldType(field.type);
        const desc = stripHtml(field.description);
        if (desc) schema.description = desc;
        advancedProps[arrName].items.properties[subField] = schema;
    } else {
        const schema = mapFieldType(field.type);
        const desc = stripHtml(field.description);
        if (desc) schema.description = desc;
        advancedProps[field.name] = schema;
    }
}

schemas.MatchInfoAdvanced = {
    description: 'Match information with advanced fields (only from /matches/{match_id})',
    allOf: [
        { $ref: '#/components/schemas/MatchInfo' },
        { type: 'object', properties: advancedProps },
    ],
};

module.exports = schemas;
